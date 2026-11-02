# Analytics registry

Every deployed project sends anonymous events to its own project in **OpenPanel Cloud**, all under one
OpenPanel organization. The portfolio's `/admin/analytics` page reads them back and shows one card per
project. Design: `docs/superpowers/specs/2026-10-31-openpanel-project-tracking-design.md`.

This table and `src/config/openpanel.js` must agree. When a project gets wired, update both.

## Projects

| Project | Slug | OpenPanel project | Tracker env var | Phase | Status | Custom events |
|---|---|---|---|---|---|---|
| Portfolio | `portfolio` | Portfolio | `NEXT_PUBLIC_OPENPANEL_CLIENT_ID` | 1 | wired | `project_live_click`, `project_github_click`, `cv_click`, `contact_cta_click`, `contact_submitted` |
| Lapse | `lapse` | — | — | 2 | not started | — |
| AttendFlow AI | `attendflow-ai` | — | — | 2 | not started | — |
| Caffeine Co. | `caffeine-co` | — | — | 2 | not started | — |
| Lending System | `lending-system` | — | — | 3 | not started | — |
| PayrollPro | `payrollpro` | — | — | 3 | not started | — |
| AgentPro | `agentpro` | — | — | 3 | not started | — |
| BUGS Quality Cars | `bugs-auto-quality-cars` | — | — | 3 | not started | — |

Status: **not started** (no tracker code) → **wired** (code merged, client ID not yet set in Vercel
Production) → **live** (events arriving). Status as of 2026-10-31.

Every site also gets OpenPanel's automatic `screen_view` and outgoing-link events.

Client IDs and secrets are not written here. They live in each project's Vercel environment variables
(and in OpenPanel → project settings → Clients).

## Naming rule

- Event names are `snake_case`, `object_action`, past tense for completed things (`contact_submitted`).
- Property names are `snake_case` too.
- **No personal data, ever:** no names, emails, message text, user IDs, or `identify` calls. Counts and
  slugs only.

## Portfolio events

| Event | Fired by | Properties |
|---|---|---|
| `project_live_click` | "Live site" link on a project card | `project` (slug) |
| `project_github_click` | "Code" link on a project card | `project` (slug) |
| `cv_click` | Resume link | `location`: `navbar` / `mobile_menu` |
| `contact_cta_click` | "Contact Me" / "Let's talk" buttons | `location`: `navbar` / `mobile_menu` / `hero` |
| `contact_submitted` | Contact form, after a successful send | — |

Clicks use OpenPanel's `data-track` attributes, so they need no JavaScript. Project link clicks are also
logged by `trackOutgoingLinks` as outgoing-link events. That double count is deliberate: the custom
event carries the slug, and the outgoing-link event is OpenPanel's own. The portfolio also still logs
page views and project clicks to Supabase `analytics_events` for `/admin/overview`. That tracker is
separate and unchanged.

## The `/admin/analytics` read client

The cards are fetched server-side from `https://api.openpanel.dev` using an **organization-level `root`
client**. A `read` client only works for the single project it belongs to, so it can't fill a page of
several projects. Create it in OpenPanel → Settings → API Clients, type *root*, and copy the secret
straight away because it's shown only once. Then set:

| Env var | Where |
|---|---|
| `OPENPANEL_API_CLIENT_ID` | portfolio: Vercel Production + local `.env.local` |
| `OPENPANEL_API_CLIENT_SECRET` | portfolio: Vercel Production + local `.env.local` |

Both are server-only. Never prefix them with `NEXT_PUBLIC_`. Without them, every card shows "No data
yet". The root client can manage the whole organization, so treat the secret like
`SUPABASE_SERVICE_ROLE_KEY`.

Each card also needs its project's OpenPanel project ID in `src/config/openpanel.js` (`projectId`), and
the "Open in OpenPanel" links need `OPENPANEL_DASHBOARD_BASE` there.

## Testing

Use the shared **"Dev / test"** OpenPanel project's client ID locally, so test clicks never land in a
real project's numbers. Each project's real client ID is set only in Vercel **Production**.
