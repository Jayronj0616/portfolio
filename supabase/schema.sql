-- Portfolio database schema.
-- Run this once in the Supabase SQL editor for your project
-- (Dashboard -> SQL Editor -> New query -> paste -> Run).

create extension if not exists "pgcrypto";

-- Projects shown in the "Featured Work" section. Lets you edit/add
-- projects without redeploying the site.
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  tags text[] not null default '{}',
  live_url text,
  github_url text,
  cover_image text,
  images text[] not null default '{}',
  company text,
  role text,
  status text not null default 'live' check (status in ('live', 'building', 'archived')),
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Testimonials/recommendations. Only rows here are rendered, so the
-- section simply disappears until you add your first row.
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  company text,
  quote text not null,
  avatar_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Messages submitted through the contact form.
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Lightweight analytics: page views and outbound clicks (live site,
-- GitHub, CV download, etc).
create table if not exists analytics_events (
  id bigint generated always as identity primary key,
  event_type text not null,
  project_slug text,
  path text,
  created_at timestamptz not null default now()
);

create index if not exists analytics_events_type_idx on analytics_events (event_type, created_at desc);
create index if not exists analytics_events_project_idx on analytics_events (project_slug);

-- Row Level Security: the public (anon) key may only READ projects and
-- testimonials. Everything else -- writing contact messages, writing
-- analytics, and any access to those two tables' write side -- goes
-- through the service role key from Server Actions only, which bypasses
-- RLS. No policy is created for anon on contact_messages or
-- analytics_events, so the default is deny-all for that key.
alter table projects enable row level security;
alter table testimonials enable row level security;
alter table contact_messages enable row level security;
alter table analytics_events enable row level security;

create policy "Public can read projects" on projects
  for select using (true);

create policy "Public can read testimonials" on testimonials
  for select using (true);

-- Seed data, kept in sync with src/data/fallbackProjects.js (the
-- source of truth until this migrates -- see PROJECTS.md).
insert into projects (slug, title, description, tags, live_url, github_url, cover_image, images, sort_order, status, company, role)
values
  (
    'airline-system',
    'Airline System',
    'Designed and developed a full-stack airline booking and revenue management system as a personal project to simulate real-world airline operations. Implemented demand-based dynamic pricing, concurrency-safe seat inventory, and automated background jobs to handle complex backend logic and ensure data integrity.',
    array['Laravel 10', 'PHP', 'MySQL', 'Tailwind CSS'],
    null,
    'https://github.com/Jayronj0616/airline-system',
    '/images/airlines/airline.png',
    array[
      '/images/airlines/airline.png',
      '/images/airlines/Screenshot 2026-02-13 082108.png',
      '/images/airlines/Screenshot 2026-02-13 082115.png',
      '/images/airlines/Screenshot 2026-02-13 082123.png',
      '/images/airlines/Screenshot 2026-02-13 082349.png',
      '/images/airlines/Screenshot 2026-02-13 082407.png',
      '/images/airlines/Screenshot 2026-02-13 082502.png',
      '/images/airlines/Screenshot 2026-02-13 082512.png',
      '/images/airlines/Screenshot 2026-02-13 082628.png',
      '/images/airlines/Screenshot 2026-02-13 082636.png',
      '/images/airlines/Screenshot 2026-02-13 082654.png'
    ],
    1,
    'building',
    null,
    null
  ),
  (
    'lending-system',
    'Lending System',
    'A multi-admin SaaS platform for tracking client loans, payments, and investors. Each admin''s clients, balances, and collections are fully isolated from every other admin. Live dashboards surface outstanding balances, collection rate, and investor exposure in real time.',
    array['React', 'Express', 'PostgreSQL', 'Supabase', 'JWT'],
    'https://lending-system-three.vercel.app/',
    null,
    '/images/lending/dashboard.jpg',
    array['/images/lending/dashboard.jpg', '/images/lending/landing.jpg'],
    2,
    'live',
    null,
    null
  ),
  (
    'payrollpro',
    'PayrollPro',
    'A SaaS payroll platform for managing employees and running payroll without spreadsheets, including hands-free payroll entry via voice commands (Web Speech API). Each account keeps its own employees and payroll history, private by default. Ported 1:1 from an original Laravel system to Next.js.',
    array['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    'https://payroll-system-beryl.vercel.app/',
    null,
    '/images/payroll/dashboard.jpg',
    array['/images/payroll/dashboard.jpg', '/images/payroll/landing.jpg'],
    3,
    'live',
    null,
    null
  ),
  (
    'agentpro',
    'AgentPro',
    'A productized real estate website system for licensed brokers and agents — property listing management with photos, pricing, and status, plus a booking system for buyers to request property viewings directly from the site. Each client gets their own branded instance with an admin dashboard.',
    array['React', 'Vite', 'Supabase', 'Tailwind CSS'],
    'https://agentpro-theta.vercel.app/',
    'https://github.com/Jayronj0616/agentpro',
    '/images/agentpro/landing.jpg',
    array['/images/agentpro/landing.jpg'],
    4,
    'live',
    null,
    null
  ),
  (
    'qr-pass-system',
    'QR Pass System',
    'Developed a Laravel 10 QR Pass Management System with role-based access control and real-time dashboard updates. Implemented automated pass expiration and offline-first scanner using IndexedDB.',
    array['Laravel 10', 'IndexedDB', 'Role-Based Access'],
    null,
    null,
    '/images/qrsystem/main.png',
    array[
      '/images/qrsystem/main.png',
      '/images/qrsystem/Screenshot 2026-02-13 093423.png',
      '/images/qrsystem/Screenshot 2026-02-13 093437.png',
      '/images/qrsystem/Screenshot 2026-02-13 093454.png',
      '/images/qrsystem/Screenshot 2026-02-13 093511.png',
      '/images/qrsystem/Screenshot 2026-02-13 093528.png',
      '/images/qrsystem/Screenshot 2026-02-13 093534.png',
      '/images/qrsystem/Screenshot 2026-02-13 093610.png',
      '/images/qrsystem/Screenshot 2026-02-13 093626.png',
      '/images/qrsystem/Screenshot 2026-02-13 093635.png',
      '/images/qrsystem/Screenshot 2026-02-13 093733.png',
      '/images/qrsystem/Screenshot 2026-02-13 093740.png',
      '/images/qrsystem/Screenshot 2026-02-13 093753.png'
    ],
    5,
    'archived',
    'Asian Land Strategies Corporation',
    'Full Stack Developer'
  ),
  (
    'caffeine-co',
    'Caffeine Co.',
    'A coffee shop ordering platform with a luxury ''Artisan Cream & Espresso'' aesthetic — customer ordering plus a full admin console (dashboard, POS, inventory, sales, accounts). Built with React and Tailwind CSS, backed directly by Supabase (Postgres, Auth, Storage) with no separate server.',
    array['React', 'Vite', 'Supabase', 'Tailwind CSS'],
    'https://caffeine-co-smoky.vercel.app/',
    'https://github.com/Jayronj0616/caffeine_co',
    '/images/coffeeshop/Screenshot 2026-02-13 111127.png',
    array[
      '/images/coffeeshop/Screenshot 2026-02-13 111127.png',
      '/images/coffeeshop/Screenshot 2026-02-13 111134.png',
      '/images/coffeeshop/Screenshot 2026-02-13 111144.png',
      '/images/coffeeshop/Screenshot 2026-02-13 111157.png',
      '/images/coffeeshop/Screenshot 2026-02-13 111206.png'
    ],
    6,
    'live',
    null,
    null
  )
on conflict (slug) do nothing;

-- If schema.sql already ran once with the old seed (which included a
-- "booking-system" row), remove it -- it's excluded from the portfolio.
delete from projects where slug = 'booking-system';
