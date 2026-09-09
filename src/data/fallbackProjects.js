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
    tags: ["React", "Node.js", "MongoDB", "Express"],
    live_url: null,
    github_url: null,
    cover_image: "/images/airlines/airline.png",
    status: "building",
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
      "A premium MERN stack coffee shop application featuring a luxury 'Artisan Cream & Espresso' aesthetic. Built with React and Tailwind CSS for a seamless UI, and powered by an Express/MongoDB backend to manage an interactive menu with category filtering and ordering system.",
    tags: ["MERN Stack", "React", "Node.js", "MongoDB", "Tailwind CSS"],
    live_url: null,
    github_url: null,
    cover_image: "/images/coffeeshop/Screenshot 2026-02-13 111127.png",
    status: "building",
  },
];
