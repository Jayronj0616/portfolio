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

-- Site text (about, experience, education, tools/stacks) editable from
-- /admin/site instead of redeploying with a portfolioData.js change.
-- Single row, id is always 'main'.
create table if not exists site_settings (
  id text primary key default 'main',
  about jsonb not null default '{}'::jsonb,
  experience jsonb not null default '[]'::jsonb,
  education jsonb not null default '[]'::jsonb,
  stacks jsonb not null default '[]'::jsonb,
  certifications jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

-- Added after the first release, so existing databases need the column
-- backfilled rather than getting it from the create above.
alter table site_settings
  add column if not exists certifications jsonb not null default '[]'::jsonb;

alter table site_settings enable row level security;

create policy "Public can read site settings" on site_settings
  for select using (true);

insert into site_settings (id, about, experience, education, stacks)
values (
  'main',
  '{
    "name": "Jayron",
    "role": "Software Engineer",
    "bio": "I design and ship full-stack systems end-to-end — from the database schema to a live deployment. Right now that means building AI-powered tools with Azure OpenAI at Accenture, and shipping SaaS products of my own as a freelancer: a multi-admin lending platform, a voice-driven payroll system, a real estate booking site. I care less about how a demo looks and more about whether it holds up once real people are using it.",
    "cvLink": "/files/CV_JAYRONJAVIER.pdf",
    "socials": {
      "github": "https://github.com/Jayronj0616",
      "linkedin": "https://www.linkedin.com/in/jayronjavier/",
      "email": "mailto:jayronxjavier@gmail.com",
      "whatsapp": "https://wa.me/639496281120",
      "viber": "viber://chat?number=%2B639496281120",
      "facebook": "https://www.facebook.com/jyrnjvr6"
    }
  }'::jsonb,
  '[
    {
      "company": "Accenture",
      "role": "Packaged App Development Associate",
      "period": "April 2026 - Present",
      "current": true,
      "description": "Cloud First Platforms (Microsoft) practice. Completed the Data & AI bootcamp, delivering a full-stack analytics dashboard (Azure Databricks, Azure OpenAI, Azure Speech).",
      "tech": ["Azure", "Azure Databricks", "Azure OpenAI", "Power BI"]
    },
    {
      "company": "Self-employed",
      "role": "Freelance Software Developer",
      "period": "November 2025 - Present",
      "current": true,
      "description": "Independently designed and built multiple full-stack SaaS products end-to-end, from database schema to deployment: a multi-admin lending and loan tracking platform, a payroll system with voice-command entry, and a real estate listing platform with booking and admin dashboards. Each shipped to production with its own auth and database.",
      "tech": ["React", "Next.js", "Supabase", "PostgreSQL"]
    },
    {
      "company": "Asian Land Strategies Corporation",
      "role": "Full Stack Developer",
      "period": "November 2025 - April 2026",
      "current": false,
      "description": "Developed a Laravel 10 QR Pass Management System with role-based access control, real-time dashboard updates, automated pass expiration, and an offline-first scanner using IndexedDB.",
      "tech": ["Laravel 10", "IndexedDB", "Role-Based Access"]
    },
    {
      "company": "Phoenix Publishing House Inc.",
      "role": "Software Developer Intern",
      "period": "February 2025 - May 2025",
      "current": false,
      "description": "Enhanced and maintained an existing booking and scheduling system, ensuring data consistency and improving stability by debugging and fixing booking-conflict issues.",
      "tech": ["Legacy System", "Debugging"]
    }
  ]'::jsonb,
  '[
    {
      "title": "Bulacan State University",
      "degree": "Bachelor of Science in Information Technology",
      "period": "2020 - 2025"
    },
    {
      "title": "Saint Dominic Academy of Pulilan Inc.",
      "degree": "Senior High School — Accountancy, Business, and Management",
      "period": "2018 - 2020"
    }
  ]'::jsonb,
  '[
    {
      "name": "Frontend",
      "icon": "Layout",
      "items": ["JavaScript", "React", "Next.js", "Vue.js", "Blade Templates", "Tailwind", "Canva", "HTML5", "CSS3"]
    },
    {
      "name": "Backend",
      "icon": "Server",
      "items": ["PHP", "C#", "Laravel", "Node.js", "Java", "Express", "Python", "Spring Boot"]
    },
    {
      "name": "Database",
      "icon": "Database",
      "items": ["MySQL", "SQL", "MongoDB", "PostgreSQL"]
    },
    {
      "name": "Tools & DevOps",
      "icon": "Wrench",
      "items": ["Docker", "Git", "Agile/Scrum", "VS Code", "Claude AI", "Antigravity", "Cursor AI"]
    }
  ]'::jsonb
)
on conflict (id) do nothing;

-- Seeds the certifications list, but only while it is still empty, so
-- re-running this file never clobbers edits made from /admin/site.
update site_settings
set certifications = '[
  {
    "name": "Microsoft Certified: Azure AI Fundamentals",
    "issuer": "Microsoft",
    "date": "August 2026",
    "credentialId": "BC4B39739FA0D49",
    "url": "https://learn.microsoft.com/en-us/users/JavierJayRonR-9034/credentials/BC4B39739FA0D49",
    "badge": "/images/certs/azure-ai-fundamentals.svg",
    "skills": ["AI concepts", "Microsoft Foundry"],
    "status": "earned"
  },
  {
    "name": "Reinvention with Agentic AI",
    "issuer": "Accenture",
    "date": "July 2026",
    "url": "https://www.credly.com/badges/e00611bd-ffe0-491b-9358-8599fc7c0d72/public_url",
    "badge": "/images/certs/reinvention-with-agentic-ai.png",
    "skills": ["AI Agents", "AI Agents & Workflow Integration", "Artificial Intelligence"],
    "status": "earned"
  },
  {
    "name": "Microsoft Certified: Azure AI Engineer Associate (AI-102)",
    "issuer": "Microsoft",
    "skills": ["Azure AI Services", "Generative AI solutions"],
    "status": "in-progress"
  }
]'::jsonb
where id = 'main'
  and (certifications is null or certifications = '[]'::jsonb);

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
    '/images/lending/landing.jpg',
    array['/images/lending/landing.jpg', '/images/lending/dashboard.jpg'],
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
    '/images/payroll/landing.jpg',
    array['/images/payroll/landing.jpg', '/images/payroll/dashboard.jpg', '/images/payroll/payroll.jpg', '/images/payroll/payroll-groups.jpg'],
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
    array['/images/agentpro/landing.jpg', '/images/agentpro/listings.jpg', '/images/agentpro/about.jpg'],
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
  ),
  (
    'trucking-system',
    'Trucking System',
    'An internal payroll and attendance system for a trucking fleet — trip-based attendance tracking, driver and helper commission payroll, and admin-controlled employee accounts with an approval workflow. Built with plain PHP and MySQL for straightforward deployment on shared hosting.',
    array['PHP', 'MySQL', 'Tailwind CSS'],
    null,
    'https://github.com/Jayronj0616/iznahanyachay_trucking',
    '/images/trucking/landing.jpg',
    array[
      '/images/trucking/landing.jpg',
      '/images/trucking/login-modal.jpg',
      '/images/trucking/dashboard-overview.jpg',
      '/images/trucking/timesheet.jpg',
      '/images/trucking/payroll.jpg',
      '/images/trucking/routes.jpg',
      '/images/trucking/settings.jpg',
      '/images/trucking/dashboard-overview-dark.jpg'
    ],
    7,
    'building',
    null,
    null
  ),
  (
    'lapse',
    'Lapse',
    'Multi-tenant compliance document expiry monitoring — organizations upload permits, registrations, and insurance policies, and Lapse reads each one, works out when it expires, and chases the responsible person until it''s renewed. Uncertain AI extractions are gated into a human review queue rather than trusted blindly, and a self-monitoring daily sweep sends escalating reminders by email and in-app.',
    array['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Inngest'],
    'https://lapse-chi.vercel.app/',
    'https://github.com/Jayronj0616/Lapse',
    '/images/lapse/landing.jpg',
    array[
      '/images/lapse/landing.jpg',
      '/images/lapse/dashboard.jpg',
      '/images/lapse/documents.jpg'
    ],
    8,
    'live',
    null,
    null
  )
on conflict (slug) do nothing;

-- If schema.sql already ran once with the old seed (which included a
-- "booking-system" row), remove it -- it's excluded from the portfolio.
delete from projects where slug = 'booking-system';
