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
    cover_image: "/images/lending/dashboard.jpg",
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
    cover_image: "/images/payroll/dashboard.jpg",
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
    status: "live",
  },
];
