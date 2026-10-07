# Portfolio

Personal portfolio for Jayron Javier, a software engineer: a single-page public site
plus a password-gated admin dashboard at `/admin` for editing its content without a
redeploy.

## Features

- Public homepage: hero, about, featured projects, toolkit, certifications, experience,
  testimonials and contact form
- `/projects` page listing every project, not just the homepage's top picks
- Admin dashboard for projects, testimonials, contact messages and site content, with
  page-view analytics on the overview
- Content served from Supabase, with local fallback data when the database isn't configured
- SEO basics: Open Graph and Twitter tags, canonical URL, `robots.txt`, sitemap and
  Person structured data
- Accessibility basics: skip link, focus management and descriptive image alt text

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router) on React 19, plain JavaScript
- Tailwind CSS v4 (theme tokens are CSS variables in `src/app/globals.css`)
- Supabase (Postgres and Storage); Server Actions for every write
- framer-motion, lucide-react, react-three-fiber (hero blob only)
- Deployed on Vercel

## Getting started

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

The site runs without Supabase and falls back to the data in `src/data/`. Open
[http://localhost:3000](http://localhost:3000).

The database schema is in `supabase/schema.sql`.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key (read-only via RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key used by Server Actions for writes |
| `ADMIN_PASSWORD` | Password for the `/admin` login |
| `NEXT_PUBLIC_SITE_URL` | Optional. Site origin for canonical URLs, Open Graph, robots and sitemap |

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the project |
| `npm run verify` | Lint and build (the closing check) |

## Project docs

- [`CONVENTIONS.md`](CONVENTIONS.md): stack, commands, code layout and known traps
- [`PRODUCT.md`](PRODUCT.md): who the site is for and which claims it can back up
- [`PROJECTS.md`](PROJECTS.md): status of every featured project
