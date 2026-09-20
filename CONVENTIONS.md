# Conventions

**What this file is for:** the agents in `.claude/agents/` know how to plan, verify and audit, but
nothing about *your* project. This is where you tell them. Four short sections is a good day one —
**delete any you cannot fill honestly.** An empty section is fine; a section of placeholder text is not.

---

## What this project is

Jayron's personal portfolio: a single-page public site (hero, about, projects, toolkit,
certifications, experience, testimonials, contact) plus a password-gated admin dashboard at `/admin`
for editing all of it without a redeploy. It exists to attract freelance clients alongside his day job
at Accenture. It talks to one Supabase project — Postgres for content, Storage for uploaded images —
and is deployed on Vercel.

**Stack:** Next.js 16 App Router (Turbopack) on React 19, **JavaScript, not TypeScript** — `.js`/`.jsx`
throughout, with `jsconfig.json` for the `@/` alias. Tailwind CSS v4 (no config file; theme tokens are
CSS variables in `src/app/globals.css`). Supabase JS for data. Server Actions for every write. Also
framer-motion (the `Reveal` wrapper), lucide-react (icons), and react-three-fiber (the hero blob only).

---

## Commands

<!-- The first two MUST match harness.config.json. If they drift, the gates check something different
     from what you run by hand, and the disagreement will not be obvious. -->

| Purpose | Command |
| --- | --- |
| Full check (the closing gate) | `npm run verify` |
| Fast check (runs every turn) | `npm run lint` |
| Tests, one file | — none. There is no test suite. |
| Run the app locally | `npm run dev` |

`npm run verify` is `npm run lint && npm run build`. With no tests, **the build is the only real gate** —
it typechecks nothing (this is plain JS), so it catches import and syntax errors and little else. Verify
anything behavioural by loading the page.

`npm run dev` refuses to start a second instance against the same project, so stop the running one before
starting another. To exercise the fallback content path, start it with `NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""` — otherwise `.env.local` points local dev at the live Supabase project.

<!-- Add any command with a trap attached. "This suite exits 1 on a healthy tree because N tests are
     known-red" is exactly the kind of thing an agent cannot infer and will misread as a failure. -->

---

## Where things live

| Layer | Path | Owns |
| --- | --- | --- |
| Page composition | `src/app/page.js` | The order of the public sections. One line per section. |
| Public sections | `src/components/*.jsx` | One component per section, props in, no data fetching. |
| Data access | `src/lib/data.js` | The only place the public site reads Supabase. Falls back to `src/data/`. |
| Fallback content | `src/data/fallback*.js` | Seeds used **only** when Supabase env vars are absent. |
| Schema + seeds | `supabase/schema.sql` | Tables, RLS policies, and the seed data. Hand-run, no migration tool. |
| Admin dashboard | `src/app/admin/(dashboard)/` | One folder per resource: `page.js`, `actions.js`, a form component. |
| Writes | `**/actions.js` | Server Actions. Every write goes through one; nothing writes from the client. |
| Supabase clients | `src/lib/supabase/` | `server.js` = anon/read. `admin.js` = service role, `server-only`. |

**Read this first:** `src/components/CertificationsSection.jsx` — the newest section built end to end.
Trace it through `src/lib/data.js`, `supabase/schema.sql` and `src/app/admin/(dashboard)/site/` to see
the whole path a `site_settings`-backed section takes. For a section backed by its **own table** with
full CRUD instead, the template is `src/app/admin/(dashboard)/testimonials/`.

<!-- This is the highest-value line in the file. "Read X before building Y" replaces a page of prose,
     and unlike prose it cannot drift from the code. Pick a module that is genuinely representative,
     not merely the newest — whatever you name becomes the template for everything built next. -->

---

## Traps

<!-- Things that are true, non-obvious, and have already cost someone time. Each one should change what
     somebody DOES, not just what they know. This is the section people actually read. -->

- **Editing `src/data/fallback*.js` does not change the live site.** Those files are used only when the
  Supabase env vars are missing. Live content lives in Supabase and is edited at `/admin/site`. A change
  to content needs to land in *both* if you want the seed and the live row to agree.
- **`getSiteContent` uses `select("*")` on purpose — do not "tidy" it into named columns.** Naming a
  column the database does not have yet fails the whole query, and the error path falls back to static
  content, so one missing column silently reverts About, Experience and the Toolkit to their seeds.
- **`supabase/schema.sql` is not re-runnable end to end.** `create policy` has no `if not exists`, so a
  full re-run errors on a database that already has the policies. Against a live database, run only the
  specific new statements.
- **The `site_settings` seed insert is `on conflict (id) do nothing`.** It will not touch the row once it
  exists, so new seed data needs its own `update ... where` guarded on the field still being empty.
- **`src/data/portfolioData.js` is mostly dead.** Only `about` is imported anywhere (`app/layout.js`
  metadata and `MaintenancePage`). Its `experience`, `education` and `skills` arrays are stale and have
  already drifted from `fallbackSiteContent.js` — do not read them as current or copy them as precedent.
- **`MAINTENANCE_MODE` in `src/config/site.js` replaces the entire homepage** with `MaintenancePage`
  when true. If the site renders as a holding page for no apparent reason, check this first.
- **`react-github-calendar`, `clsx` and `tailwind-merge` are in `package.json` but imported nowhere** —
  leftovers from the pre-Next.js version of this site. Not precedent.

---

## Reporting rules

<!-- These four hold in every project. They are here rather than in the agent prompts because they are
     about YOUR backlog, and an agent cannot infer any of them from the code. Delete one only if you
     genuinely disagree with it. -->

- **A deferral is not a gap.** Work that was consciously postponed must not be reported as a defect, a
  finding, or a hand-off item — by a person or by an agent. From inside any single module a deliberate
  absence looks exactly like an oversight, so it will be re-raised on every audit until it is written
  down. List the deferrals here: **(a)** there is no test suite, and `npm run verify` (lint + build) is
  deliberately the whole gate; **(b)** the multi-image gallery in `ProjectCard.jsx` is switched off on
  purpose — `project.images` still holds the full set in the database and the code to re-enable it is
  commented in place; **(c)** admin auth is one shared password in `ADMIN_PASSWORD`, not a user system,
  which is the intended design for a one-person site.
- **A claim that ages carries the date it was measured.** Any count, or any "every / all / none"
  statement, written into something durable — a doc, a status field, a user-visible string — says when it
  was measured: `measured NULL on 25 of 25 rows on 2026-08-06`. Not to prove the measurement happened,
  but because writing a date for a measurement you did not take is a deliberate act rather than an
  accident of momentum. It also makes the claim checkable later; `NULL on all rows` reads as eternally
  true.
- **Red is not automatically yours.** A failing typecheck, lint or test in code this turn did not touch
  is evidence about the tree, not a defect to fix. Where more than one session or person has uncommitted
  work in the same checkout, it is usually theirs — and "fixing" it overwrites work in progress that
  looks, from inside a single session, exactly like a mistake. Establish provenance first, and never by
  stashing: `git show HEAD:<path> | diff - <path>` compares against the committed version and changes
  nothing. `git stash && <check> && git stash pop` is refused by `guard-destructive` for that reason —
  a `pop` that conflicts buries whatever was uncommitted.
- **A priority label is not permission to start.** "Critical" or "P1" in a spec or a ticket says what
  matters, not what is next, and not what has already been decided against. Check whatever records
  decisions in this project before planning from a label.

---

## Git

- **Split a large change into one commit per logical unit, then push.** Not one squashed commit.
  This is deliberate and it is not a style preference: the contribution graph on Jayron's GitHub
  profile is part of what this repo is *for* — it is the portfolio he points freelance clients at,
  so visible commit activity is a deliverable, not a side effect. Split along real seams — assets,
  then a component, then its data, then the schema, then the wiring that renders it — so each commit
  still stands on its own and leaves the tree building. Where one file holds two separate concerns it
  is fine to commit the intermediate state. Do **not** manufacture empty or no-op commits to inflate
  the count; the history has to be readable by someone who was not there.
- **Work lands on `master` directly.** There is no PR flow here, and a commit on a side branch that
  never merges does not count toward the contribution graph at all, which defeats the point above.
- **Commit message format:** imperative subject in sentence case, no prefix or ticket ID, blank line,
  a wrapped body explaining *why*, and a `Co-Authored-By` trailer. `git log -20` is the real
  convention — read it before writing the first one.

---

<!-- ────────────────────────────────────────────────────────────────────────────────────────────────
     OPTIONAL — add a heading below only when you have something real to put under it. Each one earns
     its place on a bigger or older codebase and is noise on a small one.

       Data flow                  The path a request takes, as one line, then the rules it implies —
                                  the ONE sanctioned way to reach the network, and what to never do.

       Registering something new  The cross-cutting checklist that fails SILENTLY when missed. Usually
                                  not an error, just a screen that never loads. Plans forget this.

       Code conventions           ONLY what an agent would get wrong. Anything your linter enforces
                                  does not belong here — the linter is the enforcement.

       Dead code to ignore        Template leftovers and abandoned experiments. An agent that does not
                                  know these are dead will read them as precedent and copy them.

       Decisions that override    Where a later decision beats the spec, and which wins. An agent
       the spec                   reading only the spec implements work that was cancelled.

       Git                        Branch naming, commit format, ticket prefix. Note that `git log -20`
                                  is the real convention; record only what is easy to get wrong.
     ──────────────────────────────────────────────────────────────────────────────────────────────── -->

<!-- Keep this file tracked in git and keep it SHORT. Everything here is read on most planning tasks,
     so it competes with the code for the same attention. If a section outgrows a screen, it wants to
     be a doc that this file points at. -->
