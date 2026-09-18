import { getSupabaseAdmin } from "@/lib/supabase/admin";

const DAY_MS = 24 * 60 * 60 * 1000;

function dateKey(d) {
  return d.toISOString().slice(0, 10);
}

const EMPTY = {
  totalViews: 0,
  viewsToday: 0,
  viewsThisWeek: 0,
  dailyViews: [],
  topProjects: [],
};

export async function getAnalyticsOverview() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return EMPTY;

  const since = new Date(Date.now() - 13 * DAY_MS);
  since.setUTCHours(0, 0, 0, 0);

  const [{ count: totalViews }, { data: recentViews }, { data: clicks }] =
    await Promise.all([
      supabase
        .from("analytics_events")
        .select("id", { count: "exact", head: true })
        .eq("event_type", "page_view"),
      supabase
        .from("analytics_events")
        .select("created_at")
        .eq("event_type", "page_view")
        .gte("created_at", since.toISOString()),
      supabase
        .from("analytics_events")
        .select("project_slug, event_type")
        .in("event_type", ["project_live_click", "project_github_click"])
        .not("project_slug", "is", null)
        .limit(5000),
    ]);

  const buckets = new Map();
  for (let i = 0; i < 14; i++) {
    const d = new Date(since.getTime() + i * DAY_MS);
    buckets.set(dateKey(d), { date: d, count: 0 });
  }
  (recentViews ?? []).forEach((row) => {
    const bucket = buckets.get(dateKey(new Date(row.created_at)));
    if (bucket) bucket.count += 1;
  });
  const dailyViews = Array.from(buckets.values());

  const viewsToday = dailyViews[dailyViews.length - 1]?.count ?? 0;
  const viewsThisWeek = dailyViews
    .slice(-7)
    .reduce((sum, b) => sum + b.count, 0);

  const clickCounts = new Map();
  (clicks ?? []).forEach((row) => {
    clickCounts.set(
      row.project_slug,
      (clickCounts.get(row.project_slug) ?? 0) + 1
    );
  });
  const topProjects = Array.from(clickCounts.entries())
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalViews: totalViews ?? 0,
    viewsToday,
    viewsThisWeek,
    dailyViews,
    topProjects,
  };
}
