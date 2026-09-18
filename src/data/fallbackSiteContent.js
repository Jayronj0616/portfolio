// Used only when Supabase env vars aren't configured yet, or the
// `site_settings` row hasn't been created, so the site still renders
// real content during local dev / before the DB is set up. Once
// Supabase is connected, src/lib/data.js reads from the
// `site_settings` table (see supabase/schema.sql) instead of this
// file. Edit this to change the *default* seed only -- once the row
// exists in Supabase, edit it from /admin/site instead.
export const fallbackSiteContent = {
  about: {
    name: "Jayron",
    role: "Software Engineer",
    bio: "I design and ship full-stack systems end-to-end — from the database schema to a live deployment. Right now that means building AI-powered tools with Azure OpenAI at Accenture, and shipping SaaS products of my own as a freelancer: a multi-admin lending platform, a voice-driven payroll system, a real estate booking site. I care less about how a demo looks and more about whether it holds up once real people are using it.",
    cvLink: "/files/CV_JAYRONJAVIER.pdf",
    avatar: "/images/pogi.jpg",
    socials: {
      github: "https://github.com/Jayronj0616",
      linkedin: "https://www.linkedin.com/in/jayronjavier/",
      email: "mailto:jayronxjavier@gmail.com",
      whatsapp: "https://wa.me/639496281120",
      viber: "viber://chat?number=%2B639496281120",
      facebook: "https://www.facebook.com/jyrnjvr6",
    },
  },
  experience: [
    {
      company: "Accenture",
      role: "Packaged App Development Associate",
      period: "April 2026 - Present",
      current: true,
      description:
        "Cloud First Platforms (Microsoft) practice. Completed the Data & AI bootcamp, delivering a full-stack analytics dashboard (Azure Databricks, Azure OpenAI, Azure Speech). Currently pursuing Microsoft Azure AI Engineer Associate (AI-102) certification.",
      tech: ["Azure", "Azure Databricks", "Azure OpenAI", "Power BI"],
    },
    {
      company: "Self-employed",
      role: "Freelance Software Developer",
      period: "November 2025 - Present",
      current: true,
      description:
        "Independently designed and built multiple full-stack SaaS products end-to-end, from database schema to deployment: a multi-admin lending and loan tracking platform, a payroll system with voice-command entry, and a real estate listing platform with booking and admin dashboards. Each shipped to production with its own auth and database.",
      tech: ["React", "Next.js", "Supabase", "PostgreSQL"],
    },
    {
      company: "Asian Land Strategies Corporation",
      role: "Full Stack Developer",
      period: "November 2025 - April 2026",
      current: false,
      description:
        "Developed a Laravel 10 QR Pass Management System with role-based access control, real-time dashboard updates, automated pass expiration, and an offline-first scanner using IndexedDB.",
      tech: ["Laravel 10", "IndexedDB", "Role-Based Access"],
    },
    {
      company: "Phoenix Publishing House Inc.",
      role: "Software Developer Intern",
      period: "February 2025 - May 2025",
      current: false,
      description:
        "Enhanced and maintained an existing booking and scheduling system, ensuring data consistency and improving stability by debugging and fixing booking-conflict issues.",
      tech: ["Legacy System", "Debugging"],
    },
  ],
  education: [
    {
      title: "Bulacan State University",
      degree: "Bachelor of Science in Information Technology",
      period: "2020 - 2025",
    },
    {
      title: "Saint Dominic Academy of Pulilan Inc.",
      degree: "Senior High School — Accountancy, Business, and Management",
      period: "2018 - 2020",
    },
  ],
  stacks: [
    {
      name: "Frontend",
      icon: "Layout",
      items: [
        "JavaScript",
        "React",
        "Next.js",
        "Vue.js",
        "Blade Templates",
        "Tailwind",
        "Canva",
        "HTML5",
        "CSS3",
      ],
    },
    {
      name: "Backend",
      icon: "Server",
      items: ["PHP", "C#", "Laravel", "Node.js", "Java", "Express", "Python", "Spring Boot"],
    },
    {
      name: "Database",
      icon: "Database",
      items: ["MySQL", "SQL", "MongoDB", "PostgreSQL"],
    },
    {
      name: "Tools & DevOps",
      icon: "Wrench",
      items: ["Docker", "Git", "Agile/Scrum", "VS Code", "Claude AI", "Antigravity", "Cursor AI"],
    },
  ],
};
