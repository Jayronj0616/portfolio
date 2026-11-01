import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getProjects } from "@/lib/data";
import {
  formatChange,
  getEventCount,
  getProjectWeek,
  isOpenPanelReadConfigured,
} from "@/lib/openpanel";
import { OPENPANEL_DASHBOARD_BASE, TRACKED_PROJECTS } from "@/config/openpanel";

const DAY_MS = 24 * 60 * 60 * 1000;

function utcDayStart(offset) {
  const d = new Date(Date.now() + offset * DAY_MS);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

// Portfolio leads this week and last, from the portfolio's key event.
async function getLeads(projectId, eventName) {
  const [count, previous] = await Promise.all([
    getEventCount(projectId, eventName, utcDayStart(-6), new Date()),
    getEventCount(projectId, eventName, utcDayStart(-13), utcDayStart(-6)),
  ]);
  if (count === null || previous === null) return null;
  return { count, previous, change: formatChange(count, previous) };
}

export async function getAllProjectsAnalytics() {
  // The dashboard layout redirects, but a layout's check does not stop this
  // page from running or from appearing in the RSC payload of a logged-out
  // request (Next's authentication guide). Check next to the data.
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const configured = isOpenPanelReadConfigured();
  const projects = await getProjects();
  const statusBySlug = new Map(projects.map((p) => [p.slug, p.status]));

  const portfolio = TRACKED_PROJECTS.find((p) => p.slug === "portfolio");
  const canQuery = (entry) => configured && Boolean(entry?.projectId);

  const [weeks, leads] = await Promise.all([
    Promise.all(
      TRACKED_PROJECTS.map((entry) =>
        canQuery(entry) ? getProjectWeek(entry.projectId, entry.keyEvent?.name ?? null) : null
      )
    ),
    canQuery(portfolio) && portfolio.keyEvent
      ? getLeads(portfolio.projectId, portfolio.keyEvent.name)
      : null,
  ]);

  const cards = TRACKED_PROJECTS.map((entry, i) => ({
    slug: entry.slug,
    name: entry.name,
    status: entry.status ?? statusBySlug.get(entry.slug) ?? "building",
    week: weeks[i],
    change: weeks[i] ? formatChange(weeks[i].visitors, weeks[i].previousVisitors) : null,
    keyEventLabel: entry.keyEvent?.label ?? null,
    dashboardUrl:
      OPENPANEL_DASHBOARD_BASE && entry.projectId
        ? `${OPENPANEL_DASHBOARD_BASE}/${entry.projectId}`
        : null,
  }));

  // Busiest first; cards without data keep their config order at the end
  // (Array.prototype.sort is stable).
  cards.sort((a, b) => (b.week?.visitors ?? -1) - (a.week?.visitors ?? -1));

  const withData = cards.filter((c) => c.week);
  const visitors = withData.reduce((sum, c) => sum + c.week.visitors, 0);
  const previousVisitors = withData.reduce((sum, c) => sum + c.week.previousVisitors, 0);

  return {
    configured,
    totals: withData.length
      ? { visitors, previousVisitors, change: formatChange(visitors, previousVisitors) }
      : null,
    leads,
    cards,
  };
}
