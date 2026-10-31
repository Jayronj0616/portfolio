# OpenPanel Tracking + "All projects" Page — Implementation Plan (phases 1 and 1b)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The portfolio sends its lead-funnel events to OpenPanel, and `/admin/analytics` shows every tracked project as a card with numbers pulled from OpenPanel's API.

**Architecture:** `@openpanel/nextjs` is mounted once from the root layout through a small client wrapper that skips `/admin`, with its requests proxied through `/api/op` so adblockers don't eat them. Click events use OpenPanel's `data-track` attributes (no JS); only `contact_submitted` uses the hook. The admin page reads a code config of tracked projects, calls OpenPanel's Insights/Export API server-side with one organization-level client, and renders one card per project.

**Tech Stack:** Next.js 16 App Router, React 19, plain JavaScript, Tailwind v4, `@openpanel/nextjs` 1.5.x, OpenPanel Cloud REST API (`https://api.openpanel.dev`).

**Spec:** `docs/superpowers/specs/2026-10-31-openpanel-project-tracking-design.md`

## Global Constraints

- Plain JavaScript (`.js`/`.jsx`), `@/` alias. No TypeScript.
- No test suite, on purpose (`CONVENTIONS.md`, deferral (a)). The gate is `npm run verify` (lint + build) plus checking behaviour in the browser. Do **not** add a test framework.
- Analytics must never throw into the UI or block a form.
- No PII in any event: no names, emails, message text, `identify` or `profileId`.
- Only Vercel Production sends real data. The only code gate is "env var present". No `VERCEL_ENV` check.
- `/admin` is never tracked.
- `clientSecret` and the API client are server-only (`import "server-only"`, no `NEXT_PUBLIC_` prefix).
- Never invent placeholder config. An unknown OpenPanel project ID is `null`, never a fake string.
- The Supabase `analytics_events` tracker, `logAnalyticsEvent` and `/admin/overview` stay exactly as they are.
- Before writing Next.js code, read the relevant guide in `node_modules/next/dist/docs/` (per `AGENTS.md`). Next 16 differs from training data.
- After any dependency change, check the lockfile the way CI does: `npx npm@latest ci --dry-run --os=linux --cpu=x64 --libc=glibc`, and again with `npm@10` (`CONVENTIONS.md` trap).
- Work on branch `feat/openpanel-tracking`. One commit per logical unit, imperative sentence-case subject, a body explaining why, and the trailer `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Never commit to `master`, never merge. Stop at a pushed branch for Jayron to review.
- Never stage `.claude/skills/impeccable/`, `.claude/agents/impeccable-*.md` or `.superpowers/`.

## Facts the code relies on (read from OpenPanel's source on 2026-10-31; confirm in Task 4)

- **A `read` client is locked to its own project**, so it ignores the `projectId` in the path. To query several projects with one key you need a **`root` client** (organization-wide), which then requires `projectId`. This plan uses one `root` client, held server-side only, the same trust level as the Supabase service-role key already in this app's env. *(Claude's call. The alternative is one read client per project, meaning 8 secrets.)*
- Auth headers: `openpanel-client-id`, `openpanel-client-secret`.
- `GET /insights/{projectId}/metrics?startDate=&endDate=` (or `range=7d`) returns `{ metrics: { unique_visitors, total_sessions, total_screen_views, … }, series: [{ date, unique_visitors, … }] }`.
- `GET /insights/{projectId}/referrer?range=7d` returns `[{ name, sessions, pageviews }]`.
- `GET /export/events?projectId=&event=<name>&start=<ISO>&end=<ISO>&limit=1` returns `{ meta: { totalCount, … }, data }`.
- Valid `range` values include `7d`, `30d`, `today`, `yesterday`.
- Dashboard URLs are `<dashboard origin>/<organizationId>/<projectId>`.

## Review Focus

1. **Read env vars missing (local dev, Preview).** `/admin/analytics` renders every card as "No data yet" plus one note naming the env vars to set. No crash, no error page. *(Task 5 verification step.)*
2. **One project's API call fails (bad key → 401, 429, network).** Only that card shows "No data yet". The other cards and the tiles still render. *(Task 4 contract + Task 5 verification step.)*
3. **Previous week is 0.** The change shows `▲ N` (absolute), never `Infinity%` or `NaN%`. Both weeks 0 shows "No change". *(Task 4 `formatChange` + Task 5 verification step.)*
4. **The tracker is blocked or not configured.** The contact form still submits, and no console error comes from analytics. *(Task 2 verification step.)*
5. **A project with an ID but zero traffic.** It shows `0` and a flat sparkline, not "No data yet". Zero is data. *(Task 4 contract + Task 5 verification step.)*

---

### Task 0: Branch and commit the design

**Files:**
- Add: `docs/superpowers/specs/2026-10-31-openpanel-project-tracking-design.md`, `docs/superpowers/plans/2026-10-31-openpanel-portfolio-tracking.md`

- [ ] **Step 1:** `git checkout -b feat/openpanel-tracking` from up-to-date `master`.
- [ ] **Step 2:** Commit both docs as one commit ("Add the OpenPanel tracking design and plan").

---

### Task 1: Mount the OpenPanel tracker, with an adblock proxy

**Files:**
- Modify: `package.json`, `package-lock.json` (add `@openpanel/nextjs`)
- Create: `src/components/AnalyticsScript.jsx`
- Create: `src/app/api/[...op]/route.js`
- Modify: `src/app/layout.js` (render `<AnalyticsScript />` at the end of `<body>`)
- Modify: `.env.local.example`

**Interfaces:**
- Produces: `window`-level OpenPanel SDK on every public page when `NEXT_PUBLIC_OPENPANEL_CLIENT_ID` is set. `trackAttributes` on, so later tasks can use `data-track`.

- [ ] **Step 1:** `npm install @openpanel/nextjs`, then run the two lockfile checks from Global Constraints. Both must pass. Commit the dependency alone ("Add the OpenPanel Next.js SDK").
- [ ] **Step 2:** Create `src/app/api/[...op]/route.js`, exporting `{ GET, POST }` from `createRouteHandler()` (`@openpanel/nextjs/server`). There are no other `/api` routes, so the catch-all collides with nothing.
- [ ] **Step 3:** Create `AnalyticsScript.jsx` (`"use client"`). Read `process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID`. Return `null` when it's empty or `usePathname()` starts with `/admin`. Otherwise render `<OpenPanelComponent clientId=… apiUrl="/api/op" scriptUrl="/api/op/op1.js" trackScreenViews trackOutgoingLinks trackAttributes />`. Add a short comment explaining the `/admin` gate. Known edge, write it in the comment: a client-side navigation *from* a public page *into* `/admin` keeps the already-loaded script. This is acceptable because admin is reached by URL, not by an in-site link.
- [ ] **Step 4:** Render it in `layout.js` inside `<body>` after `{children}`.
- [ ] **Step 5:** Add to `.env.local.example`, commented, with an empty value: `NEXT_PUBLIC_OPENPANEL_CLIENT_ID=`. Add a line saying to use the "Dev / test" project's ID locally and the real one only in Vercel **Production**.
- [ ] **Step 6: Verify.** Run `npm run verify` and expect PASS. Then `npm run dev`:
  - With the env var **unset**: load `/`. There should be no requests to `/api/op` and no console errors.
  - With the "Dev / test" client ID set (ask Jayron for it, never invent one): load `/`. You should see a request to `/api/op/op1.js` and a screen-view POST through `/api/op`, and the event in OpenPanel's live view. Load `/admin/login`: no `/api/op` requests.
  - If Jayron hasn't created the Dev / test project yet, record "live check pending the client ID" and continue. Do not skip silently.
- [ ] **Step 7:** Commit ("Mount OpenPanel on public pages behind a first-party proxy").

---

### Task 2: Track the lead funnel

**Files:**
- Modify: `src/components/ProjectCard.jsx` (the two links near lines 244 and 262)
- Modify: `src/components/Navbar.jsx` (CV links near lines 62 and 101, `#contact` links near lines 68 and 108)
- Modify: `src/components/Hero.jsx` ("Let's talk" `#contact` link)
- Modify: `src/components/ContactSection.jsx`

**Interfaces:**
- Consumes: Task 1's tracker with `trackAttributes` on.
- Produces these event names and properties, used verbatim by Tasks 3 and 4:

| Event | Attributes on the element |
|---|---|
| `project_live_click` | `data-track="project_live_click" data-project={project.slug}` |
| `project_github_click` | `data-track="project_github_click" data-project={project.slug}` |
| `cv_click` | `data-track="cv_click" data-location="navbar"` / `"mobile_menu"` |
| `contact_cta_click` | `data-track="contact_cta_click" data-location="navbar"` / `"mobile_menu"` / `"hero"` |
| `contact_submitted` | none. Fired from JS, with no properties. |

- [ ] **Step 1:** Add the `data-track` attributes in the table above. Keep the existing `onClick={() => track(...)}` Supabase calls in `ProjectCard.jsx` untouched. Both trackers run.
- [ ] **Step 2:** In `ContactSection.jsx`, fire `contact_submitted` once each time `state.status` becomes `"success"`. Use a `useEffect` on `state`, calling `useOpenPanel().track("contact_submitted")`, wrapped so a missing SDK can't throw. Before relying on it, read `node_modules/@openpanel/nextjs` to confirm `useOpenPanel` is safe when `<OpenPanelComponent>` isn't mounted (env unset). If it isn't safe, guard the call on `process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID`.
- [ ] **Step 3: Verify.** Run `npm run verify` and expect PASS. Then run dev with the Dev / test ID:
  - Click a project's Live site link, its GitHub link, Resume (desktop and the mobile menu at 375px), "Let's talk", and the navbar contact button. Each should show up in OpenPanel's live view with the right properties.
  - Submit the contact form with test data. You should see one `contact_submitted` event and one row in `contact_messages`. Delete that test row afterwards.
  - With the env var **unset**, submit the form again. It should succeed with no console errors (Review Focus 4). Delete that row too.
- [ ] **Step 4:** Commit ("Track the portfolio lead funnel in OpenPanel").

---

### Task 3: Project registry and tracked-projects config

**Files:**
- Create: `src/config/openpanel.js`
- Create: `docs/analytics.md`
- Modify: `PROJECTS.md` (one line under the title pointing at `docs/analytics.md`)

**Interfaces:**
- Produces: `TRACKED_PROJECTS` and `OPENPANEL_DASHBOARD_BASE` from `src/config/openpanel.js`:

```js
// One entry per site that sends (or will send) events to OpenPanel.
// projectId is null until Jayron creates the OpenPanel project -- never a placeholder.
export const OPENPANEL_DASHBOARD_BASE = null; // e.g. "https://dashboard.openpanel.dev/<organizationId>", set by Jayron
export const TRACKED_PROJECTS = [
  { slug: "portfolio", name: "Portfolio", status: "live", projectId: null,
    keyEvent: { name: "contact_submitted", label: "Messages" } },
  // slug must match projects.slug in Supabase for the status badge, except "portfolio" (status given above)
  { slug: "<lapse slug>", name: "Lapse", projectId: null, keyEvent: null },
  // ...one entry each for AttendFlow AI, Caffeine Co., Lending System, PayrollPro, AgentPro, BUGS Auto Quality Cars
];
```

- [ ] **Step 1:** Look up each project's real `slug` in `supabase/schema.sql` and `src/data/fallbackProjects.js`, and write the 8 entries. `keyEvent` stays `null` for everything except the portfolio. The phase 2/3 plans fill those in later.
- [ ] **Step 2:** Write `docs/analytics.md`. It holds the naming rule (`snake_case`, `object_action`, no PII) and one table with these columns: project, slug, OpenPanel project (name), tracker env var, phase, status (`not started` / `wired` / `live`), custom events. Portfolio is `wired`, and the rest are `not started`. Add a section on the `/admin/analytics` read client: which env vars it needs and that it's an organization-level `root` client (created in OpenPanel → Settings → API Clients). Note that `trackOutgoingLinks` also logs project link clicks as outgoing-link events, so those are counted twice on purpose. Client IDs and secrets are **not** written in this doc. Say they live in Vercel env, and that `src/config/openpanel.js` must agree with this table.
- [ ] **Step 3:** Run `npm run verify` and expect PASS. Commit ("Add the OpenPanel project registry").

---

### Task 4: Server-only OpenPanel read client

**Files:**
- Create: `src/lib/openpanel.js`

**Interfaces:**
- Consumes: `OPENPANEL_API_CLIENT_ID`, `OPENPANEL_API_CLIENT_SECRET` (server env, root client).
- Produces:
  - `isOpenPanelReadConfigured(): boolean`
  - `getProjectWeek(projectId: string, keyEventName: string | null): Promise<ProjectWeek | null>`. Returns `null` on **any** failure (never throws). Shape:
    `{ visitors: number, previousVisitors: number, daily: number[7] /* oldest → newest */, topSource: string | null, keyEventCount: number | null }`
  - `getEventCount(projectId: string, eventName: string, start: Date, end: Date): Promise<number | null>`
  - `formatChange(current: number, previous: number): { direction: "up" | "down" | "flat", label: string }`. `label` is `"22%"` normally, `"3"` when `previous === 0 && current > 0`, and `"No change"` when they're equal.

- [ ] **Step 1: Confirm the API before coding.** Read `node_modules/next/dist/docs/` on `fetch` caching inside `force-dynamic` routes. Then, once Jayron has put the root client into `.env.local`, run `curl` against `/insights/{portfolioId}/metrics?startDate=…&endDate=…`, `/insights/{id}/referrer?range=7d` and `/export/events?projectId=…&event=contact_submitted&limit=1`. Record the date format the API accepts, whether `series` comes back one row per day for a 14-day window, and whether `referrer` is sorted by sessions. If they differ from "Facts" above, follow the API and note the difference in `docs/analytics.md`. If no key is available yet, build against "Facts" and mark this step pending.
- [ ] **Step 2:** Implement `src/lib/openpanel.js` with `import "server-only"`. Make one private `opFetch(path, params)` that adds the auth headers and `next: { revalidate: 300 }` (or whatever the docs from Step 1 say gives a 5-minute cache), and returns parsed JSON or `null` on any non-2xx or thrown error.
  - `getProjectWeek` makes **one** metrics call for the last 14 days (today included, project timezone handled by the API). `daily` is the last 7 `series[].unique_visitors`, `visitors` is their sum, and `previousVisitors` is the sum of the first 7. *(Claude's call: summed daily uniques, one request, consistent across cards. It isn't de-duplicated weekly uniques, and the label says "Visitors 7d".)*
  - `topSource` is the referrer row with the most `sessions`, or `null` if the list is empty.
  - `keyEventCount` comes from `getEventCount` over the same last 7 days, or `null` when `keyEventName` is `null`.
  - Run the calls for one project with `Promise.all`. If the metrics call fails, return `null`. If only referrer or key event fails, set that field to `null`.
- [ ] **Step 3: Verify.** Run `npm run verify` and expect PASS. The functions are exercised end to end by Task 5's verification. Record the curl results from Step 1 in the commit body.
- [ ] **Step 4:** Commit ("Add a server-only OpenPanel read client").

---

### Task 5: The "All projects" admin page

**Files:**
- Create: `src/app/admin/(dashboard)/analytics/page.js`
- Create: `src/app/admin/(dashboard)/analytics/data.js`
- Create: `src/app/admin/(dashboard)/analytics/ProjectStatCard.jsx`
- Modify: `src/app/admin/(dashboard)/AdminSidebar.jsx` (add `{ href: "/admin/analytics", label: "All projects", icon: BarChart3 }` after Overview)

**Interfaces:**
- Consumes: `TRACKED_PROJECTS`, `OPENPANEL_DASHBOARD_BASE` (Task 3); `getProjectWeek`, `getEventCount`, `formatChange`, `isOpenPanelReadConfigured` (Task 4); `getProjects()` from `src/lib/data.js` for status badges; `AdminPageHeader`, `AdminStatCard`, `Reveal`.
- Produces: `getAllProjectsAnalytics(): Promise<{ configured: boolean, totals: { visitors, previousVisitors }, leads: { count, previous } | null, cards: Card[] }>` in `data.js`, where `Card = { slug, name, status, week: ProjectWeek | null, keyEventLabel: string | null, dashboardUrl: string | null }`.

- [ ] **Step 1: `data.js`.** For each `TRACKED_PROJECTS` entry: if `projectId` is null or the read client isn't configured, set `week: null`. Otherwise call `getProjectWeek`. Status comes from the matching `getProjects()` row by slug, or the entry's own `status` for the portfolio, defaulting to `"building"`. `totals` sums `visitors`/`previousVisitors` over cards with data. `leads` is the portfolio's `contact_submitted` count for the last 7 days and the 7 before (two `getEventCount` calls), or `null` without data. `dashboardUrl` is `${OPENPANEL_DASHBOARD_BASE}/${projectId}` only when both are set. Sort cards with data by `visitors` descending, then cards without data in config order.
- [ ] **Step 2: `ProjectStatCard.jsx`.** Follow the existing admin card styling (`rounded-2xl border border-border bg-surface`, the mono uppercase labels from `overview/page.js`). It shows:
  - the name and a status badge using the public site's labels (Live / In progress / Archived);
  - "Visitors 7d", the number, and the `formatChange` arrow and label (▲ green / ▼ red / flat muted);
  - a 7-bar sparkline from `daily`, plain divs scaled to the max, all bars at minimum height when every day is 0;
  - a bottom line, `${keyEventLabel}: ${keyEventCount}` when available, else `Top source: ${topSource}`, else nothing;
  - an "Open in OpenPanel" link (`target="_blank" rel="noopener noreferrer"`) when `dashboardUrl` is set.
  When `week` is null, show the name, the badge, and "No data yet" in place of the numbers.
- [ ] **Step 3: `page.js`.** Use `export const dynamic = "force-dynamic"` like the overview. Add `AdminPageHeader` (title "All projects", description "Every tracked project, last 7 days."). Below it go two `AdminStatCard`s: "Visitors, all projects (7d)" and "Portfolio leads (7d)", each with its change (extend `AdminStatCard` with an optional sub-line only if it can't show one already). Then a responsive grid of `ProjectStatCard`s (1 column on mobile, 2 at `sm`, 3 at `lg`). When `configured` is false, show a one-line note above the grid: "Set OPENPANEL_API_CLIENT_ID and OPENPANEL_API_CLIENT_SECRET to load numbers."
- [ ] **Step 4: Verify.** Run `npm run verify` and expect PASS. Then in the browser, logged in to `/admin`:
  - Without the read env vars: the "All projects" link sits in the sidebar, all 8 cards say "No data yet", the note shows, and the console is clean (Review Focus 1).
  - With the root client and the portfolio's `projectId` set: the portfolio card shows real numbers matching OpenPanel's dashboard for the same 7 days, and the other 7 cards say "No data yet".
  - Temporarily set a second entry's `projectId` to a project with no traffic (the Dev / test project). It should show `0` with a flat sparkline (Review Focus 5). Then temporarily break the secret: every card should drop to "No data yet" with no error page (Review Focus 2). Revert both.
  - Check `formatChange` by reading it against these cases: (10, 0) gives "▲ 10", (0, 0) gives "No change", (8, 10) gives "▼ 20%" (Review Focus 3).
  - Check the layout at 375px and desktop width, light and dark themes if the admin has both. Take a screenshot for Jayron.
- [ ] **Step 5:** Commit the nav entry and page as one or two commits along real seams, e.g. card component, then page + data + nav ("Add the All projects analytics page to admin").

---

### Task 6: Hand-off

- [ ] **Step 1:** Run `npm run verify` and both lockfile checks one last time. All should pass.
- [ ] **Step 2:** `git push -u origin feat/openpanel-tracking`. Don't open a PR or merge unless Jayron asks.
- [ ] **Step 3:** Report to Jayron:
  - what's live-verified and what's pending his keys;
  - the exact env vars to add: `NEXT_PUBLIC_OPENPANEL_CLIENT_ID` (Production, the portfolio project), and `OPENPANEL_API_CLIENT_ID` + `OPENPANEL_API_CLIENT_SECRET` (Production + `.env.local`, the root client);
  - that he fills in `projectId` values and `OPENPANEL_DASHBOARD_BASE` in `src/config/openpanel.js` as each OpenPanel project is created.
