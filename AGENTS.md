# AGENTS.md

## What this is
Jayron's personal portfolio site, built to attract freelance clients alongside his day job (Accenture, Cloud First Platforms / Microsoft, DnA practice). Dark-theme, single-page React app with animated hero, experience timeline, project showcase, and a GitHub contribution calendar.

## Stack
- React 18 + Vite 5
- Framer Motion (animations/transitions)
- @react-three/fiber + @react-three/drei + three.js (animated 3D blob hero background — `Scene3D.jsx`)
- react-github-calendar (GitHub contribution graph embed)
- lucide-react + react-icons (icons)
- No CSS framework — hand-written `dark-theme.css` + `index.css`
- Deployed via Vercel (`vercel.json` present)

## Structure
- `src/App.jsx` — single file containing all sections/components (Navbar, hero, experience, projects, skills, etc.) plus the `Navbar` subcomponent
- `src/components/Scene3D.jsx` — the Three.js hero background
- `src/data/portfolioData.js` — **the single source of truth** for all content: about, experience, projects, stacks, education, skills
- `src/data/projects.js` — **dead code, not imported anywhere.** Do not edit this thinking it affects the site. Should eventually be deleted, pending confirmation.

## Current state (as of this doc's creation)
- Hero, experience, projects, skills, stacks, education sections are built and rendering from `portfolioData.js`
- 3 experience entries (Accenture, Asian Land Strategies Corporation, Phoenix Publishing House) — **all have `period: "FILL_IN_START_DATE..."` placeholders still unresolved**
- 4 project entries (Airline System, QR Pass System, Caffeine Co., Booking System) — **all have `link: "#"` and `github: "#"` placeholders.** Real repo/live links have not been added yet.
- GitHub contribution calendar is wired in via `react-github-calendar`

## Next up
- Add real `github` / `link` URLs to each project entry in `portfolioData.js` (do not fabricate URLs — ask the user for them)
- Resolve `FILL_IN_START_DATE` / `FILL_IN_END_DATE` placeholders in `experience[]`
- Decide fate of `src/data/projects.js` (likely delete — confirm with user first)
- User wants to add more (even simple/basic) projects to maximize GitHub contribution activity — additional project entries may be added to `portfolioData.js` over time, each needing a real repo link

## Known gotchas
- Two project data files exist (`portfolioData.js` and `projects.js`) — only `portfolioData.js` is live. Confirm which file you're editing.
- Don't invent placeholder links (`#`) for new entries — a live portfolio with dead links looks worse than an omitted button. If no real link exists yet, omit the `github`/`link` key rather than defaulting to `#` (may require a small conditional-render change in `App.jsx` if not already handled).

## Do not touch
- Nothing flagged as fragile/intentional yet. Update this section as it comes up.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
