import Link from "next/link";
import { Gauge, Eye, CalendarDays, Mail, FolderKanban, ArrowRight } from "lucide-react";
import { getProjects } from "@/lib/data";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import Reveal from "@/components/Reveal";
import AdminPageHeader from "../AdminPageHeader";
import AdminStatCard from "../AdminStatCard";
import { getAnalyticsOverview } from "./data";
import ViewsChart from "./ViewsChart";
import TopProjectsList from "./TopProjectsList";

export const dynamic = "force-dynamic";

async function getRecentMessages() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { messages: [], total: 0 };

  const [{ data }, { count }] = await Promise.all([
    supabase
      .from("contact_messages")
      .select("id, name, email, created_at")
      .order("created_at", { ascending: false })
      .limit(3),
    supabase
      .from("contact_messages")
      .select("id", { count: "exact", head: true }),
  ]);

  return { messages: data ?? [], total: count ?? 0 };
}

function formatRelative(iso) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default async function AdminOverviewPage() {
  const [analytics, projects, { messages, total: totalMessages }] =
    await Promise.all([
      getAnalyticsOverview(),
      getProjects(),
      getRecentMessages(),
    ]);

  const titleBySlug = new Map(projects.map((p) => [p.slug, p.title]));
  const topProjects = analytics.topProjects.map((item) => ({
    ...item,
    title: titleBySlug.get(item.slug) ?? item.slug,
  }));
  const liveProjectsCount = projects.filter((p) => p.status === "live").length;

  return (
    <div>
      <AdminPageHeader
        icon={Gauge}
        title="Overview"
        description="How the portfolio is doing at a glance."
      />

      <Reveal
        delay={0.05}
        className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        <AdminStatCard label="Total views" value={analytics.totalViews} icon={Eye} />
        <AdminStatCard
          label="Views (7d)"
          value={analytics.viewsThisWeek}
          icon={CalendarDays}
        />
        <AdminStatCard label="Inquiries" value={totalMessages} icon={Mail} />
        <AdminStatCard
          label="Live projects"
          value={liveProjectsCount}
          icon={FolderKanban}
        />
      </Reveal>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Reveal
          delay={0.1}
          className="card-hover rounded-2xl border border-border bg-surface p-6"
        >
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Page views — last 14 days
          </h2>
          <div className="mt-5">
            <ViewsChart data={analytics.dailyViews} />
          </div>
        </Reveal>

        <Reveal
          delay={0.15}
          className="card-hover rounded-2xl border border-border bg-surface p-6"
        >
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Top projects by clicks
          </h2>
          <div className="mt-5">
            <TopProjectsList items={topProjects} />
          </div>
        </Reveal>
      </div>

      <Reveal
        delay={0.2}
        className="card-hover mt-6 rounded-2xl border border-border bg-surface p-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Recent inquiries
          </h2>
          <Link
            href="/admin/messages"
            className="flex items-center gap-1 text-sm text-accent transition hover:brightness-125"
          >
            View all
            <ArrowRight size={14} />
          </Link>
        </div>

        {messages.length === 0 ? (
          <p className="mt-4 text-sm text-muted">No messages yet.</p>
        ) : (
          <div className="mt-4 divide-y divide-border">
            {messages.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{m.name}</p>
                  <p className="truncate text-xs text-muted">{m.email}</p>
                </div>
                <span className="shrink-0 font-mono text-xs text-muted">
                  {formatRelative(m.created_at)}
                </span>
              </div>
            ))}
          </div>
        )}
      </Reveal>
    </div>
  );
}
