import "server-only";

/**
 * Read side of OpenPanel, for /admin/analytics. Uses one organization-level
 * `root` client because a `read` client is locked to its own project (see
 * docs/analytics.md). Server-only: the secret never reaches the browser.
 *
 * Every function here returns null instead of throwing -- one project's
 * failed request must cost that card its numbers, not the whole page.
 */

const API_URL = "https://api.openpanel.dev";
const CACHE_TTL_MS = 5 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

// The admin layout is force-dynamic, which turns every fetch into
// no-store, so `next: { revalidate }` would be ignored. unstable_cache is
// superseded by `use cache` in Next 16, which needs Cache Components
// switched on site-wide. A small per-instance memo is enough for a
// one-person dashboard: it just keeps reloads from re-querying OpenPanel.
const cache = new Map();

export function isOpenPanelReadConfigured() {
  return Boolean(
    process.env.OPENPANEL_API_CLIENT_ID && process.env.OPENPANEL_API_CLIENT_SECRET
  );
}

async function opFetch(path, params) {
  if (!isOpenPanelReadConfigured()) return null;

  const url = `${API_URL}${path}?${new URLSearchParams(params)}`;
  const hit = cache.get(url);
  if (hit && hit.expires > Date.now()) return hit.value;

  try {
    const res = await fetch(url, {
      cache: "no-store",
      // A stalled connection would otherwise hold the whole page until the
      // platform kills the function; the catch below turns the abort into
      // null, so the card just says "No data yet".
      signal: AbortSignal.timeout(5000),
      headers: {
        "openpanel-client-id": process.env.OPENPANEL_API_CLIENT_ID,
        "openpanel-client-secret": process.env.OPENPANEL_API_CLIENT_SECRET,
      },
    });
    if (!res.ok) return null;
    const value = await res.json();
    cache.set(url, { value, expires: Date.now() + CACHE_TTL_MS });
    return value;
  } catch {
    return null;
  }
}

// Calendar day `offset` days from today (UTC), as YYYY-MM-DD.
function dayKey(offset) {
  return new Date(Date.now() + offset * DAY_MS).toISOString().slice(0, 10);
}

function dayStart(offset) {
  return new Date(`${dayKey(offset)}T00:00:00.000Z`);
}

/** Count of `eventName` events between two Dates, or null on failure. */
export async function getEventCount(projectId, eventName, start, end) {
  const data = await opFetch("/export/events", {
    projectId,
    event: eventName,
    start: start.toISOString(),
    end: end.toISOString(),
    limit: "1",
  });
  const total = data?.meta?.totalCount;
  return typeof total === "number" ? total : null;
}

/**
 * The last 7 days of one project against the 7 before. `visitors` is the
 * sum of daily unique visitors (one request for all 14 days, the same
 * measure on every card) -- not de-duplicated across the week.
 *
 * Returns null when the metrics request fails; topSource and
 * keyEventCount fall back to null on their own.
 */
export async function getProjectWeek(projectId, keyEventName) {
  const [metrics, referrers, keyEventCount] = await Promise.all([
    opFetch(`/insights/${encodeURIComponent(projectId)}/metrics`, {
      startDate: dayKey(-13),
      endDate: dayKey(0),
    }),
    opFetch(`/insights/${encodeURIComponent(projectId)}/referrer`, {
      range: "7d",
    }),
    keyEventName
      ? getEventCount(projectId, keyEventName, dayStart(-6), new Date())
      : null,
  ]);

  if (!Array.isArray(metrics?.series)) return null;

  // Days with no sessions may be missing from the series, so place each
  // row on its date and leave the gaps at 0.
  const byDay = new Map(
    metrics.series.map((row) => [
      String(row.date).slice(0, 10),
      Number(row.unique_visitors) || 0,
    ])
  );
  const fortnight = Array.from({ length: 14 }, (_, i) => byDay.get(dayKey(i - 13)) ?? 0);
  const daily = fortnight.slice(7);
  const sum = (values) => values.reduce((total, n) => total + n, 0);

  let topSource = null;
  if (Array.isArray(referrers) && referrers.length > 0) {
    const top = referrers.reduce((best, row) =>
      (row.sessions ?? 0) > (best.sessions ?? 0) ? row : best
    );
    topSource = top.name || "Direct";
  }

  return {
    visitors: sum(daily),
    previousVisitors: sum(fortnight.slice(0, 7)),
    daily,
    topSource,
    keyEventCount,
  };
}

/** Week-over-week change for display: "22%", "3" (from zero), or "No change". */
export function formatChange(current, previous) {
  if (current === previous) return { direction: "flat", label: "No change" };
  const direction = current > previous ? "up" : "down";
  if (previous === 0) return { direction, label: String(current) };
  const percent = Math.round((Math.abs(current - previous) / previous) * 100);
  return { direction, label: `${percent}%` };
}
