// Sites that send (or will send) events to OpenPanel, shown as cards on
// /admin/analytics. Must agree with the table in docs/analytics.md.
//
// projectId is the OpenPanel project ID, null until that project exists
// in OpenPanel -- never a placeholder. A null projectId renders as a
// "No data yet" card. slug matches projects.slug in Supabase, which is
// where the status badge comes from; the portfolio is not in that table,
// so it carries its own status.
//
// keyEvent is the one custom event that means "someone actually used
// it"; its count replaces "Top source" on the card. Each app's is chosen
// in its own phase plan.

// Dashboard origin plus organization, e.g.
// "https://dashboard.openpanel.dev/<organizationId>" -- copy it from the
// browser's address bar in OpenPanel. Null hides the "Open in OpenPanel" links.
export const OPENPANEL_DASHBOARD_BASE = null;

export const TRACKED_PROJECTS = [
  {
    slug: "portfolio",
    name: "Portfolio",
    status: "live",
    projectId: null,
    keyEvent: { name: "contact_submitted", label: "Messages" },
  },
  { slug: "lapse", name: "Lapse", projectId: null, keyEvent: null },
  { slug: "attendflow-ai", name: "AttendFlow AI", projectId: null, keyEvent: null },
  { slug: "caffeine-co", name: "Caffeine Co.", projectId: null, keyEvent: null },
  { slug: "lending-system", name: "Lending System", projectId: null, keyEvent: null },
  { slug: "payrollpro", name: "PayrollPro", projectId: null, keyEvent: null },
  { slug: "agentpro", name: "AgentPro", projectId: null, keyEvent: null },
  {
    slug: "bugs-auto-quality-cars",
    name: "BUGS Quality Cars",
    projectId: null,
    keyEvent: null,
  },
];
