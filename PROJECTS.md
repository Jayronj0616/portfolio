# Project status tracker

Tracks what's shown in the "Featured Projects" section and what's still
needed before each one is fully wired up. Source of truth for the actual
data is `supabase/schema.sql` (once Supabase is connected) or
`src/data/fallbackProjects.js` (used until then) — update both when a
status changes here.

| Project | Status | Live URL | GitHub | Notes |
|---|---|---|---|---|
| Airline System | 🟡 Building | — | github.com/Jayronj0616/airline-system | Personal project. Repo is actually Laravel 10/PHP/MySQL, not the React/Node stack previously listed. No live URL yet. |
| Lending System | 🟢 Live | lending-system-three.vercel.app | — (private) | Multi-admin SaaS lending/loan tracker. Freelance work. |
| PayrollPro | 🟢 Live | payroll-system-beryl.vercel.app | — (private) | SaaS payroll platform, ported from Laravel to Next.js. Freelance work. |
| AgentPro | 🟢 Live | agentpro-theta.vercel.app | github.com/Jayronj0616/agentpro | Real estate website system, sold per-client. Freelance work. |
| QR Pass System | ⚫ Archived | — (won't be linked) | — | Asian Land Strategies Corporation, in-house/company-owned system — can't be publicly deployed or linked. Shown via screenshots only. |
| Caffeine Co. | 🟡 Building | caffeine-co-smoky.vercel.app | github.com/Jayronj0616/caffeine_co | Personal project. Rewritten since the original MERN prototype — now React + Vite + Supabase. Marked in progress, not live. |
| Trucking System | 🟡 Building | — | github.com/Jayronj0616/iznahanyachay_trucking | Freelance work — payroll/attendance system for a trucking fleet. PHP/MySQL, no framework. Not deployed publicly (client runs it in-house). |
| ~~Booking System~~ | Removed | — | — | Phoenix Publishing House Inc. internship project — excluded from the portfolio entirely per Jayron's request. |

## Status legend

- 🟢 **Live** — deployed and publicly linked (Vercel/Supabase etc.), shows the green "Live" badge and a working "Live site" link.
- 🟡 **Building** — not deployed yet, shows the muted "In Progress" badge and "Not deployed yet".
- ⚫ **Archived** — intentionally not deployed (e.g. in-house/company-owned), shows the muted "Archived" badge and "In-house project — screenshots only" instead of a live link.

## Open items

- [x] Get GitHub repo link for Airline System — found (github.com/Jayronj0616/airline-system, Laravel 10/PHP/MySQL). Still no live URL / not deployed.
- [x] Get GitHub repo link for Caffeine Co. — found, plus a live deployment (caffeine-co-smoky.vercel.app). Marked Live.
- [x] **Connect the portfolio's own Supabase project** — connected. `.env.local` created locally (gitignored), `supabase/schema.sql` run against the project (seeds the 6 real projects), and the same 3 vars added to Vercel Production env (redeployed). Verified: projects load from Supabase, and a test contact form submission wrote to `contact_messages` and was cleaned up. Note: `experience`/`about`/`stacks`/`education` in `portfolioData.js` are still static — no Supabase table or fetch path exists for those yet, so that part of the original note was aspirational.
- [x] Social links pending: WhatsApp, Viber, Facebook (see `src/data/portfolioData.js` `about.socials`).
