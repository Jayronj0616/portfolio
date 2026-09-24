// Used only when Supabase env vars aren't configured yet, so the site
// still renders real content during local dev / before the DB is set
// up. Once Supabase is connected, src/lib/data.js reads from the
// `projects` table (see supabase/schema.sql) instead of this file.
export const fallbackProjects = [
  {
    slug: "airline-system",
    title: "Airline System",
    description:
      "Designed and developed a full-stack airline booking and revenue management system as a personal project to simulate real-world airline operations. Implemented demand-based dynamic pricing, concurrency-safe seat inventory, and automated background jobs to handle complex backend logic and ensure data integrity.",
    tags: ["Laravel 10", "PHP", "MySQL", "Tailwind CSS"],
    live_url: null,
    github_url: "https://github.com/Jayronj0616/airline-system",
    cover_image: "/images/airlines/airline.png",
    status: "building",
  },
  {
    slug: "lending-system",
    title: "Lending System",
    description:
      "A multi-admin SaaS platform for tracking client loans, payments, and investors. Each admin's clients, balances, and collections are fully isolated from every other admin. Live dashboards surface outstanding balances, collection rate, and investor exposure in real time.",
    tags: ["React", "Express", "PostgreSQL", "Supabase", "JWT"],
    live_url: "https://lending-system-three.vercel.app/",
    github_url: null,
    cover_image: "/images/lending/landing.jpg",
    status: "live",
  },
  {
    slug: "payrollpro",
    title: "PayrollPro",
    description:
      "A SaaS payroll platform for managing employees and running payroll without spreadsheets, including hands-free payroll entry via voice commands (Web Speech API). Each account keeps its own employees and payroll history, private by default. Ported 1:1 from an original Laravel system to Next.js.",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    live_url: "https://payroll-system-beryl.vercel.app/",
    github_url: null,
    cover_image: "/images/payroll/landing.jpg",
    status: "live",
  },
  {
    slug: "agentpro",
    title: "AgentPro",
    description:
      "A productized real estate website system for licensed brokers and agents — property listing management with photos, pricing, and status, plus a booking system for buyers to request property viewings directly from the site. Each client gets their own branded instance with an admin dashboard.",
    tags: ["React", "Vite", "Supabase", "Tailwind CSS"],
    live_url: "https://agentpro-theta.vercel.app/",
    github_url: "https://github.com/Jayronj0616/agentpro",
    cover_image: "/images/agentpro/landing.jpg",
    status: "live",
  },
  {
    slug: "qr-pass-system",
    title: "QR Pass System",
    description:
      "Developed a Laravel 10 QR Pass Management System with role-based access control and real-time dashboard updates. Implemented automated pass expiration and offline-first scanner using IndexedDB.",
    tags: ["Laravel 10", "IndexedDB", "Role-Based Access"],
    live_url: null,
    github_url: null,
    cover_image: "/images/qrsystem/main.png",
    company: "Asian Land Strategies Corporation",
    role: "Full Stack Developer",
    status: "archived",
  },
  {
    slug: "caffeine-co",
    title: "Caffeine Co.",
    description:
      "A coffee shop ordering platform with a luxury 'Artisan Cream & Espresso' aesthetic — customer ordering plus a full admin console (dashboard, POS, inventory, sales, accounts). Built with React and Tailwind CSS, backed directly by Supabase (Postgres, Auth, Storage) with no separate server.",
    tags: ["React", "Vite", "Supabase", "Tailwind CSS"],
    live_url: "https://caffeine-co-smoky.vercel.app/",
    github_url: "https://github.com/Jayronj0616/caffeine_co",
    cover_image: "/images/coffeeshop/Screenshot 2026-02-13 111127.png",
    status: "building",
  },
  {
    slug: "lapse",
    title: "Lapse",
    description:
      "Multi-tenant compliance document expiry monitoring — organizations upload permits, registrations, and insurance policies, and Lapse reads each one, works out when it expires, and chases the responsible person until it's renewed. Uncertain AI extractions are gated into a human review queue rather than trusted blindly, and a self-monitoring daily sweep sends escalating reminders by email and in-app.",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Inngest"],
    live_url: "https://lapse-chi.vercel.app/",
    github_url: "https://github.com/Jayronj0616/Lapse",
    cover_image: "/images/lapse/landing.jpg",
    status: "live",
  },
  {
    slug: "trucking-system",
    title: "Trucking System",
    description:
      "An internal payroll and attendance system for a trucking fleet — trip-based attendance tracking, driver and helper commission payroll, and admin-controlled employee accounts with an approval workflow. Built with plain PHP and MySQL for straightforward deployment on shared hosting.",
    tags: ["PHP", "MySQL", "Tailwind CSS"],
    live_url: null,
    github_url: "https://github.com/Jayronj0616/iznahanyachay_trucking",
    cover_image: "/images/trucking/landing.jpg",
    status: "building",
  },
  {
    slug: "bugs-auto-quality-cars",
    title: "BUGS Auto Quality Cars",
    description:
      "A dealership platform built for a real automotive client: a public storefront for browsing inventory, estimating monthly payments, and sending inquiries, plus an admin dashboard for vehicles, photos, financing, and leads. Live in production with the dealership's actual inventory — Postgres RLS is the final word on every row, so anonymous visitors can read published vehicles but can't write to anything, and every customer submission is validated and rate-limited server-side before it reaches the CRM.",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    live_url: "https://bugs-auto-quality-cars.vercel.app",
    github_url: "https://github.com/Jayronj0616/bugs-auto-quality-cars",
    // Cover image pending -- Jayron is capturing his own screenshots. Left
    // null rather than pointed at a path that doesn't exist yet: the card
    // falls back to a plain icon instead of a broken image.
    cover_image: null,
    status: "live",
  },
  {
    slug: "attendflow-ai",
    title: "AttendFlow AI",
    description:
      "An HR tool for correcting attendance records: employees describe a correction in plain language, and deterministic business rules — never the AI — decide whether to apply it automatically or escalate it to HR, with every decision fully audited. Live in production for sign-in, corrections, and the HR review queue; natural-language parsing currently runs on a documented placeholder pending an LLM key, with its output already validated at the boundary so swapping it in changes nothing downstream.",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    live_url: "https://attendflow-ai.vercel.app",
    github_url: "https://github.com/Jayronj0616/AttendFlow_Ai",
    // Same as above -- screenshots pending.
    cover_image: null,
    // Deployed and reachable, but the natural-language extraction step is
    // still a placeholder (see the description) -- marked archived rather
    // than live until that's real. live_url is still set, so the card
    // keeps its working "Live site" link; only the badge changes.
    status: "archived",
  },
];
