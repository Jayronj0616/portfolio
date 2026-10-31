# OpenPanel project tracking — design

Date: 2026-10-31. Status: draft, awaiting Jayron's approval.

## Intent

Jayron wants one private place to see how all his deployed projects are doing, using
[OpenPanel](https://github.com/Openpanel-dev/openpanel) (open-source product analytics). The audience is
**Jayron only** — no client-facing reports, no shared dashboards. He wants "anything" useful, so the
priority order below is a recommendation he accepted, not a list he wrote.

What he actually wants to *look at* is **one page in his portfolio's `/admin` that shows every project
side by side** — not OpenPanel's own dashboard, which shows one project at a time. The tracking code in
each repo exists to feed that page.

The question that matters most is the portfolio's: **is the site bringing in freelance leads, and which
projects make people click through?** Everything else (traffic on showcase sites, usage on SaaS apps) is
second.

## Goals

1. Every in-scope site sends events to its own OpenPanel project, all under one OpenPanel organization.
2. The portfolio records the lead funnel: page view → project live/GitHub click → CV click → contact
   form submitted.
3. The SaaS apps record sign-ups/logins and one "core action" each, so Jayron can see real usage.
4. Event names are consistent across repos, and one doc in this repo lists every project, its OpenPanel
   project, its env var and its events.
5. **An "All projects" page in `/admin`** shows every tracked project as a card, pulling its numbers from
   OpenPanel's read API. This is the thing Jayron opens day to day.

## Non-goals

- Client-facing dashboards or per-client reports.
- Rebuilding OpenPanel's dashboard. The `/admin` page is a glance view; for drill-down (pages, countries,
  devices, funnels) each card links out to that project in OpenPanel.
- Session replay, A/B testing, funnels configured in OpenPanel's UI (Jayron can build those himself once
  data flows).
- Tracking the projects that are not publicly deployed: QR Pass, Trucking System, RONIN, Airline System.

## Anti-goals (would make this a failure even if it "works")

- **Breaking or slowing a page because analytics failed.** Analytics must never throw into the UI. The
  portfolio's existing `logAnalyticsEvent` already follows this rule; keep it.
- **Collecting personal data.** No names, emails, or `identify` calls with PII in any app. Events stay
  anonymous everywhere. *(Claude's call: the dashboard only needs counts, and anonymous data keeps every
  app clear of privacy questions.)*
- **Dev and preview traffic polluting the numbers.** Only Vercel Production sends events.
- **Leaking a `clientSecret` to the browser.** Browser code uses the `clientId` only.
- **Inventing placeholder config.** If a project has no OpenPanel client ID yet, the tracker simply does
  not render — same philosophy as the "no placeholder links" rule in `AGENTS.md`.

## Facts the design rests on (checked 2026-10-31 against openpanel.dev docs)

- **Cloud pricing:** 30-day free trial, then paid by monthly event volume — 5K events $2.50/mo,
  10K $5/mo, 100K $20/mo (yearly is cheaper). Unlimited projects/sites on every tier. No permanent free
  tier was found on the pricing page. Self-hosting is free but needs a Linux box with ≥4 GB RAM running
  Docker (ClickHouse, Postgres, Redpanda/Redis).
- **Next.js SDK:** `@openpanel/nextjs`. `<OpenPanelComponent clientId trackScreenViews trackOutgoingLinks
  trackAttributes />` in the root layout; `useOpenPanel()` hook → `op.track(name, props)` in client
  components. Props default to `false` on the Next.js page — set them explicitly.
- **Adblocker proxy:** `app/api/[...op]/route` exporting `createRouteHandler()` from
  `@openpanel/nextjs/server`, plus `apiUrl="/api/op"` and `scriptUrl="/api/op/op1.js"`.
- **Other stacks:** no dedicated React/Vite SDK — use `@openpanel/web` (or the plain script tag). No
  PHP/Laravel SDK; a REST `/track` API exists.
- **Click tracking without code:** `data-track="event_name"` plus `data-*` props on an element, when
  `trackAttributes` is on.
- **Secrets:** `clientSecret` is server-only. The docs show `clientId` in browser code for every web SDK.
- **Privacy:** OpenPanel describes itself as cookieless; device IDs are a daily-rotating salted hash.
  Its consent-management page was not read — the builder should skim it before shipping.

## Decisions

- **Hosting: OpenPanel Cloud** (Jayron, 2026-10-31). No self-hosted instance, so no instance-URL env var;
  SDK defaults point at `api.openpanel.dev`, and the Next proxy forwards there.
- **Budget:** no ceiling set. Automatic screen views + outgoing links stay on everywhere; Jayron checks
  event volume at the end of the 30-day trial and turns automatic tracking down per site if it pushes
  past the tier he wants. *(Claude's call.)*
- **Test events go to a separate OpenPanel project named "Dev / test"**, shared by every repo. Local
  verification uses its client ID; production uses each site's real one. The only gate in code is "env var
  present" — no `VERCEL_ENV` check — so local verification works, and preview/dev stay clean because the
  real ID is set in Vercel **Production** scope only. *(Claude's call.)*
- **`/admin` is never tracked.** Render the OpenPanel component only on public routes (e.g. skip it when
  the path starts with `/admin`, or mount it outside the admin layout). *(Claude's call.)*
- **Planning scope:** the first implementation plan covers phase 1 and 1b (both in this repo). Phases 2 and 3 each get their own
  plan, written in that repo when it's their turn. *(Claude's call.)*
- **Every system in scope is Jayron's own** (Jayron, 2026-10-31), including the ones first built as
  freelance work and AgentPro's deployment. No client sign-off is needed before any phase, and all of this
  — design doc and registry included — can be committed to the public portfolio repo.

## Scope and phasing

Each phase is its own branch and PR in its own repo. Per `CONVENTIONS.md`, Jayron reviews and merges;
nothing is merged by the builder. (Note: `PROJECTS.md` still describes some of these as client/freelance
work; that's the portfolio's public framing and is not changed by this work.)

| Phase | Project | Repo (local path under `Desktop/`) | Stack | What to track |
|---|---|---|---|---|
| 1 | Portfolio | `portfolio` | Next 16, JS | Screen views + lead funnel (below) |
| 2 | Lapse | `lapse` | Next 16, TS | Screen views, sign-up, login, core action |
| 2 | AttendFlow AI | `Attendflow_AI` | Next 16, TS | Screen views, login, core action |
| 2 | Caffeine Co. | `CaffeineCo/client` | Vite + React | Screen views, outgoing links |
| 3 | Lending System | `lending_system/frontend` | Create React App | Screen views, login, core action |
| 3 | PayrollPro | `payroll-system-deployed` | Next 14, TS | Screen views, login, core action |
| 3 | AgentPro | `agentpro` | Vite + React | Screen views, outgoing links |
| 3 | BUGS Auto Quality Cars | `bugs-auto-quality-cars` | Next 16, TS | Screen views, outgoing links, inquiry submitted if a form exists |

Phases are an order of work, not a permission gate: phase 2 is the personal projects, phase 3 the ones
first built as freelance work. All are Jayron's now.

### Phase 1 — portfolio (this repo)

The portfolio already has a homegrown tracker: `logAnalyticsEvent` (`src/app/actions.js`) writes
`page_view`, `project_live_click` and `project_github_click` rows to the Supabase `analytics_events`
table, and `/admin` overview charts them (`src/app/admin/(dashboard)/overview/data.js`).

**Decision: run both side by side.** Keep the Supabase tracker and the `/admin` overview exactly as they
are; add OpenPanel next to them. Whether to retire the homegrown tracker is a later call once OpenPanel
has a few weeks of data. (Builder: do not remove or rename anything in `analytics_events`.)

Wiring:

- `OpenPanelComponent` in `src/app/layout.js`, rendered only when `NEXT_PUBLIC_OPENPANEL_CLIENT_ID` is
  set. `trackScreenViews`, `trackOutgoingLinks`, `trackAttributes` all `true`.
- Adblocker proxy route as above (the portfolio's visitors include developers, who block trackers).
- Funnel events, using the names in the event catalogue below:
  - `project_live_click` / `project_github_click` with `{ project: slug }` — send from the same `track`
    helper in `ProjectCard.jsx` that already logs to Supabase, so the two stay in step.
  - `cv_click` — the Navbar CV link (desktop and mobile), currently untracked.
  - `contact_cta_click` — the Navbar and Hero "#contact" buttons.
  - `contact_submitted` — fired client-side when the contact form's action state returns
    `status: "success"`. No form contents in the event.
- Env var added to `.env.local.example` (commented, empty) and to Vercel Production only.

Note the RONIN spotlight renders no links by design — nothing to track there.

### Phase 1b — the "All projects" page in `/admin` (this repo)

Built right after phase 1, so it is useful from day one with just the portfolio, and fills in as each
later phase lands. Jayron picked the **project cards** layout (mockup option A, 2026-10-31).

**Layout:**

- **Two summary tiles on top:** total visitors across all projects in the last 7 days (with % change vs
  the 7 days before), and portfolio leads in the last 7 days (`contact_submitted` count, with change).
- **One card per tracked project, busiest first.** Each card shows:
  - project name and its status badge (Live / Building / Archived, from the existing `projects` table, so
    it matches the public site);
  - visitors in the last 7 days, with ▲/▼ change vs the previous 7 days;
  - a 7-bar sparkline, one bar per day;
  - one bottom line: the project's core action count if it has one (e.g. "Docs uploaded: 14"), otherwise
    its top traffic source;
  - a link out to that project in OpenPanel for drill-down.
- A project that is in the registry but has no data yet (not wired, or the API failed) still gets a card,
  showing "No data yet" — never an error page, never a missing card.

**Where it lives:** a new admin resource following the existing pattern — a folder under
`src/app/admin/(dashboard)/` with its own `page.js` and a `data.js` like `overview/data.js`, plus a link in
the admin nav. Read-only: no Server Actions. *(Folder and nav label are the builder's call.)* The existing
overview page and its Supabase charts stay as they are.

**Data source:** OpenPanel's read API (`https://api.openpanel.dev`), called from server code only.
- Auth is `openpanel-client-id` + `openpanel-client-secret` headers on a client with `read` (or `root`)
  access — the default `write` clients the trackers use are not enough. These go in **server-only** env
  vars in the portfolio (no `NEXT_PUBLIC_` prefix), Vercel Production plus `.env.local` for Jayron.
- OpenPanel's source (read 2026-10-31) shows a `read` client is locked to its own project, so one key
  for every project means an organization-level `root` client. The plan uses one root client
  (`OPENPANEL_API_CLIENT_ID` / `OPENPANEL_API_CLIENT_SECRET`), server-only. *(Claude's call: one secret
  instead of eight; same trust level as the Supabase service-role key already in this app's env.)* Visitors per day and top referrer should come from the Insights metrics endpoint if it
  offers them, otherwise from `/export/charts`.
- **Which projects appear** is a small server-side config in the portfolio mapping each project slug to
  its OpenPanel project ID (project IDs are not secret). The portfolio itself is an entry too. This config
  and `docs/analytics.md` must agree; the builder may generate one from the other. *(Claude's call: a
  code config, not a new database column — it changes only when a project gets wired.)*
- Cached for 5 minutes (`next: { revalidate: 300 }` or equivalent), so loading the page doesn't hammer the
  API (limit is 100 requests per 10 s). If the read env vars are missing, the page renders every card as
  "No data yet" with a one-line note saying what to set.

### Phases 2–3 — the other repos

- **Next.js apps:** same pattern as the portfolio (component in root layout, env-gated, proxy route).
  PayrollPro is on Next 14 — the builder confirms `@openpanel/nextjs` supports it; if not, fall back to
  `@openpanel/web`.
- **Vite / CRA apps:** `@openpanel/web` initialised once at the app entry, env-gated
  (`VITE_OPENPANEL_CLIENT_ID` / `REACT_APP_OPENPANEL_CLIENT_ID`). Screen views on, and SPA route changes
  must register as screen views — the builder verifies this by clicking through routes.
- **Core action per SaaS app:** the builder reads each repo and picks the one action that means "someone
  actually used it". Starting guesses, to confirm against the code: Lending → `loan_created`;
  PayrollPro → `payroll_run`; Lapse → `document_uploaded`; AttendFlow → `correction_submitted`.
- **Auth events:** `signed_up`, `logged_in`, fired client-side after success. No user ID, email or name
  attached.

## Event catalogue (shared across all repos)

Naming: `snake_case`, `object_action` (past tense for completed things). Properties are `snake_case`
too, and never contain PII.

| Event | Where | Properties |
|---|---|---|
| `screen_view` | automatic, every site | (SDK-provided) |
| outgoing link | automatic, every site | (SDK-provided) |
| `project_live_click` | portfolio | `project` |
| `project_github_click` | portfolio | `project` |
| `cv_click` | portfolio | `location` (`navbar` / `mobile_menu`) |
| `contact_cta_click` | portfolio | `location` (`navbar` / `hero` / `mobile_menu`) |
| `contact_submitted` | portfolio | — |
| `signed_up` | SaaS apps | — |
| `logged_in` | SaaS apps | — |
| `<core action>` | each SaaS app | non-PII counts only, e.g. `{ count: 3 }` |
| `inquiry_submitted` | BUGS Auto (if a form exists) | — |

## The registry doc

`docs/analytics.md` in this repo: one table — project, OpenPanel project name, env var name, phase,
status (not started / wired / live), and its custom events. Client IDs themselves are **not** written
there (they live in each project's Vercel env); the doc says where to find them. Update it as each phase
lands, and add a line to `PROJECTS.md`'s header pointing at it.

## Verification (per repo)

There are no tests in these projects; verification is behavioural:

1. `npm run build` (or the repo's equivalent) passes.
2. With the client ID set locally, load the site, click each tracked element, and see the events arrive
   in OpenPanel's live view. Then unset it and confirm nothing renders and nothing errors.
3. Check the browser console for errors and the network tab for requests going to `/api/op` (Next) or
   OpenPanel (others).
4. With an adblocker on (Next apps), confirm events still arrive through the proxy.

## What Jayron has to do himself

- Create the OpenPanel account and organization, then one project per site plus one "Dev / test"
  project; copy each client ID.
- Create the `read` client(s) for the `/admin` page and put their ID + secret in the portfolio's Vercel
  Production env and his `.env.local`.
  (Creating accounts and handling keys is his to do, not the builder's.)
- Add each `*_OPENPANEL_CLIENT_ID` env var to that project's Vercel Production settings and redeploy.

## Left to the builder

- Exact component placement and file names, following each repo's existing conventions.
- Avoiding double counts where `trackOutgoingLinks` and a custom click event fire on the same link
  (e.g. use the `filter` prop or drop one) — either is fine as long as the registry says which.
- Whether the Vite/CRA apps get a proxy (e.g. a Vercel rewrite) — nice to have, not required.
- Choosing the core action per SaaS app, within the rule above.
- Commit splitting, per this repo's `CONVENTIONS.md` (one commit per logical unit, on a branch).
