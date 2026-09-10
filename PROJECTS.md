# Project status tracker

Tracks what's shown in the "Featured Projects" section and what's still
needed before each one is fully wired up. Source of truth for the actual
data is `supabase/schema.sql` (once Supabase is connected) or
`src/data/fallbackProjects.js` (used until then) — update both when a
status changes here.

| Project | Status | Live URL | GitHub | Notes |
|---|---|---|---|---|
| Airline System | 🟡 Building | — | — | Personal project. Need live URL + repo link once deployed. |
| QR Pass System | ⚫ Archived | — (won't be linked) | — | Asian Land Strategies Corporation, in-house/company-owned system — can't be publicly deployed or linked. Shown via screenshots only. |
| Caffeine Co. | 🟡 Building | — | — | Personal project. Need live URL + repo link once deployed. |
| ~~Booking System~~ | Removed | — | — | Phoenix Publishing House Inc. internship project — excluded from the portfolio entirely per Jayron's request. |

## Status legend

- 🟢 **Live** — deployed and publicly linked (Vercel/Supabase etc.), shows the green "Live" badge and a working "Live site" link.
- 🟡 **Building** — not deployed yet, shows the muted "In Progress" badge and "Not deployed yet".
- ⚫ **Archived** — intentionally not deployed (e.g. in-house/company-owned), shows the muted "Archived" badge and "In-house project — screenshots only" instead of a live link.

## Open items

- [ ] Get live Vercel URL + GitHub repo link for Airline System, or confirm it stays "Building" for now.
- [ ] Get GitHub repo link for Caffeine Co. (or confirm private/no public repo).
- [ ] Supabase project not created yet — see `.env.local.example` and `supabase/schema.sql`.
- [x] Social links pending: WhatsApp, Viber, Facebook (see `src/data/portfolioData.js` `about.socials`).
