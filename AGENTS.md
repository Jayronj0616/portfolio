# AGENTS.md

## What this is
Jayron's personal portfolio: a single-page public site plus a password-gated admin dashboard at
`/admin` for editing its content without a redeploy. It exists to attract freelance clients alongside
his day job at Accenture (Cloud First Platforms / Microsoft, DnA practice).

## Start here
**`CONVENTIONS.md` is the current, verified description of this codebase** — stack, commands, where
each layer lives, and the traps that have already cost time. Read it before planning or editing
anything. This file does not repeat it; the two drifting apart is how the previous version of this
file ended up describing a stack that no longer existed.

`PROJECTS.md` tracks the per-project status behind the "Featured Projects" section — which are live,
which are still building, and which are deliberately unlinked.

## Stack, in one line
Next.js 16 App Router on React 19, **plain JavaScript, not TypeScript**, Tailwind v4, Supabase
(Postgres + Storage), deployed on Vercel. Server Actions for every write. See `CONVENTIONS.md` for
the rest.

## Current state
The public homepage composes ten sections in `src/app/page.js`: Navbar, Hero, About, Projects, Stack,
Certifications, Experience, Testimonials, Contact, Footer. All content is read from Supabase through
`src/lib/data.js`, with `src/data/fallback*.js` used only when the Supabase env vars are absent.

The admin dashboard under `src/app/admin/(dashboard)/` covers overview, projects, testimonials,
messages and site content, behind a single shared password.

## Working agreements
- **Do not commit the `impeccable` skill's files.** The third-party design skill installed at
  `.claude/skills/impeccable/` and its `.claude/agents/impeccable-*.md` agents are personal tooling,
  not part of the site. The binary and `.claude/settings.local.json` are gitignored; the rest is
  deliberately left untracked. Skip them when staging.
- **Do not invent placeholder links.** If a project has no real repo or live URL yet, omit the key
  rather than defaulting to `#`. A live portfolio with dead links looks worse than an omitted button.
- Commit conventions, including why the history is split into logical units, are in `CONVENTIONS.md`.

## Do not touch
- The `nextjs-agent-rules` block below — `next dev` rewrites it. See the note inside it.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
