# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences that Jayron deliberately serves at once, rather than narrowing to either:

- **People who can hire him for freelance work** — managers and owners at small-to-mid companies who
  need a custom internal business system built, taken over, or replaced. The existing client work
  (loan tracking, payroll, fleet payroll/attendance, real estate listings) is the shape of the demand.
- **Potential employers** — hiring managers and recruiters evaluating him for a role alongside or
  beyond his current position at Accenture.

Reach is explicitly international, not limited to the Philippines. A visitor may have no context for
Philippine employers, schools, or company names, and may be evaluating in a different time zone with
no opportunity to ask a follow-up question in the moment.

## Product Purpose

A personal portfolio that turns a visitor who already had some reason to click into a conversation.
It exists to attract freelance clients alongside Jayron's day job at Accenture (Cloud First Platforms
/ Microsoft, DnA practice), and to stand as his professional record for employers.

The contact form is the conversion point; submissions land in `contact_messages` and are read in the
admin dashboard. A second, equally real purpose is that Jayron maintains the content himself: the
password-gated dashboard at `/admin` exists so that updating projects, testimonials, certifications
and site copy never requires a code change or a redeploy.

## Positioning

The work on display is production systems that companies actually run day to day — not tutorial
builds, cloned demos, or portfolio filler. Several were sold or deployed per client. Some cannot be
linked at all because the client runs them in-house, and that unlinkability is itself evidence of
commercial work rather than a gap to apologise for.

Jayron does this while holding a full-time position at Accenture, so the freelance record is
additional to, not instead of, an enterprise track record.

## Operating Context

- Visitors arrive from links on Jayron's social media profiles. They carry some prior context, but it
  may be no more than a name and a headline.
- The public site is a single page, so the whole evaluation happens in one scroll session. There is no
  multi-page journey in which to build an argument gradually.
- Content changes are frequent and self-served through `/admin`, gated by one shared password. Project
  status in particular is expected to move over time; `PROJECTS.md` tracks the current state of each.
- The repository is itself part of the product. Visible, readable commit activity on Jayron's GitHub
  profile is a deliverable, because the portfolio is what he points prospective clients at.

## Capabilities and Constraints

Confirmed functionality:

- Public single page composing ten sections in `src/app/page.js`: Navbar, Hero, About, Projects,
  Stack, Certifications, Experience, Testimonials, Contact, Footer.
- Admin dashboard under `src/app/admin/(dashboard)/` covering overview, projects, testimonials,
  messages and site content. Every write goes through a Server Action.
- Content is read from Supabase via `src/lib/data.js`, with `src/data/fallback*.js` used only when the
  Supabase environment variables are absent.
- `MAINTENANCE_MODE` in `src/config/site.js` replaces the entire homepage with `MaintenancePage`.

Constraints future work must preserve:

- **Real production client data must never appear in screenshots used on this site.** In-house systems
  may be shown visually, but not with live client records in frame.
- Some projects can never be publicly linked — QR Pass System (Asian Land Strategies Corporation) and
  Trucking System are client- or company-owned and run in-house.
- Admin auth is one shared password in `ADMIN_PASSWORD`, not a user system. This is the intended
  design for a one-person site, not an oversight.
- There is no test suite. `npm run verify` (lint + build) is deliberately the entire gate, and since
  the project is plain JavaScript the build typechecks nothing. Behaviour is verified by loading pages.
- The multi-image gallery in `ProjectCard.jsx` is switched off on purpose; the data and the code both
  still exist.
- The Booking System (Phoenix Publishing House internship project) is excluded from the portfolio
  entirely, by Jayron's decision.

## Brand Commitments

- Jayron's real name and his employment at Accenture (Cloud First Platforms / Microsoft, DnA practice)
  are named on the site.
- **Never invent a placeholder link.** If a project has no real repo or live URL, the key is omitted
  rather than defaulting to `#`. A live portfolio with dead links reads worse than an absent button.
- Project status is stated honestly. The Live / Building / Archived badges reflect actual deployment
  state, and a project in progress says so rather than being dressed up as shipped.

## Evidence on Hand

Real and usable:

- **Live, linkable deployments:** Lending System, PayrollPro, AgentPro, Lapse. URLs are recorded in
  `PROJECTS.md`.
- **In-house systems shown by screenshot only:** QR Pass System, Trucking System — subject to the
  no-client-data constraint above.
- **Certifications**, rendered by `CertificationsSection.jsx` and edited at `/admin/site`.
- **GitHub contribution activity** as evidence of ongoing work.
- **Real client testimonials are obtainable** — Jayron confirmed he can collect actual quotes from the
  lending, payroll and AgentPro clients.

Open, and not to be filled in by invention:

- The `testimonials` table is seeded empty and only real rows render. **No testimonials have been
  collected yet.** The section must stay empty until genuine quotes exist.
- Lapse cover and gallery images are pending; Jayron is capturing them himself. Paths are reserved at
  `/images/lapse/{landing,dashboard,documents}.jpg`.
- There are no customer counts, revenue figures, benchmarks, pricing, awards, or press mentions. None
  exist, and none may be fabricated to fill a section.

## Product Principles

1. **Serve both readers without splitting the site.** A hiring manager and a freelance prospect read
   the same single page. Neither gets a separate track, and neither is served by copy that only makes
   sense to the other.
2. **Show systems in use, not demos.** The strongest claim available is that real companies run this
   software. Lead with that rather than with stack lists.
3. **Never manufacture proof.** An omitted button, an empty section, or a missing link is always
   preferable to a placeholder, a fabricated quote, or an invented number.
4. **The content is Jayron's to change.** Anything that will need updating belongs behind `/admin`,
   not hardcoded into a component.
5. **State status honestly.** Building is building, archived is archived, and saying so is a
   credibility asset rather than something to work around.
