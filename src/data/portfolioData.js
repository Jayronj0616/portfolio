export const portfolioData = {
  about: {
    name: "Jay-Ron",
    role: "Software Engineer",
    bio: "I build robust, scalable systems that solve real-world problems. Specializing in full-stack development with a focus on performance and intuitive user experiences.",
    cvLink: "/files/Resume_JayronJavierF.pdf",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "mailto:jayronxjavier@gmail.com",
    },
  },
  projects: [
    {
      id: "01",
      title: "Airline System",
      hoverImage: "/images/airlines/airline.png",
      description:
        "Designed, developed, and deployed a full-stack airline booking and revenue management system simulating real-world airline operations. Implemented demand-based dynamic pricing, concurrency-safe seat inventory, and automated background jobs to optimize revenue and ensure data integrity.",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      link: "#",
      github: "#",
      images: [
        "/images/airlines/airline.png",
        "/images/airlines/Screenshot 2026-02-13 082108.png",
        "/images/airlines/Screenshot 2026-02-13 082115.png",
        "/images/airlines/Screenshot 2026-02-13 082123.png",
        "/images/airlines/Screenshot 2026-02-13 082349.png",
        "/images/airlines/Screenshot 2026-02-13 082407.png",
        "/images/airlines/Screenshot 2026-02-13 082502.png",
        "/images/airlines/Screenshot 2026-02-13 082512.png",
        "/images/airlines/Screenshot 2026-02-13 082628.png",
        "/images/airlines/Screenshot 2026-02-13 082636.png",
        "/images/airlines/Screenshot 2026-02-13 082654.png",
      ],
    },
    {
      id: "02",
      title: "QR Pass System",
      description:
        "Developed a Laravel 10 QR Pass Management System with role-based access control and real-time dashboard updates. Implemented automated pass expiration and offline-first scanner using IndexedDB.",
      tags: ["Laravel 10", "IndexedDB", "Role-Based Access"],
      link: "#",
      github: "#",
      company: "Metro Jobs & Payment Solutions",
      role: "Full Stack Developer",
      images: [
        "/images/qr.png",
        "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80&w=800",
      ],
    },
    {
      id: "03",
      title: "Booking System",
      description:
        "Enhanced and maintained an existing booking and scheduling system, ensuring data consistency. Improved system stability by debugging and fixing issues related to booking conflicts.",
      tags: ["Legacy System", "Maintenance", "Debugging"],
      link: "#",
      github: "#",
      company: "Phoenix Publishing House Inc.",
      role: "Software Developer Intern",
      images: [
        "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1435575653489-b0873ec954e2?auto=format&fit=crop&q=80&w=800",
      ],
    },
  ],
  stacks: [
    {
      name: "Frontend",
      icon: "Layout",
      items: [
        "JavaScript",
        "React",
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
      items: [
        "PHP",
        "C#",
        "Laravel",
        "Node.js",
        "Express",
        "Python",
        "Spring Boot",
      ],
    },
    {
      name: "Database",
      icon: "Database",
      items: ["MySQL", "SQL", "MongoDB", "PostgreSQL"],
    },
    {
      name: "Tools & DevOps",
      icon: "Wrench",
      items: [
        "Docker",
        "Git",
        "Agile/Scrum",
        "VS Code",
        "Claude AI",
        "Antigravity",
        "Cursor AI",
      ],
    },
  ],
  education: [
    {
      title: "Bulacan State University",
      degree: "Bachelor of Science in Information Technology",
      period: "2020 - 2025",
    },
    {
      title: "Senior High School",
      degree: "Accountancy, Business, and Management",
      period: "Graduated: June, 2020",
    },
  ],
  skills: [
    {
      name: "Web Application Development",
      desc: "Building responsive, high-performance web apps using modern frameworks like React and Node.js.",
    },
    {
      name: "Database Management & Optimization",
      desc: "Designing efficient schemas and optimizing queries for MySQL, MongoDB, and PostgreSQL.",
    },
    {
      name: "Technical Support & Issue Resolution",
      desc: "Diagnosing complex technical issues and providing swift, effective solutions for end-users.",
    },
    {
      name: "Analytical & Critical Thinking",
      desc: "Evaluating system requirements and logic to make data-driven architectural decisions.",
    },
    {
      name: "Problem Solving & Logical Reasoning",
      desc: "Breaking down complex problems into manageable algorithms and efficient code logic.",
    },
    {
      name: "Professional Communication",
      desc: "Translating technical concepts for stakeholders and collaborating effectively within diverse teams.",
    },
    {
      name: "Attention to Detail",
      desc: "Ensuring pixel-perfect UI implementation and bug-free logic through rigorous code reviews.",
    },
    {
      name: "Team Collaboration",
      desc: "Working seamlessly with designers, PMs, and other devs using Agile methodologies.",
    },
    {
      name: "System Analysis & Improvement",
      desc: "Auditing existing systems to identify bottlenecks and implementing performance enhancements.",
    },
    {
      name: "Rapid Technology Adaptation",
      desc: "Quickly mastering new languages, frameworks, and tools to stay ahead of industry trends.",
    },
    {
      name: "Debugging & Troubleshooting",
      desc: "Utilizing advanced debugging tools to trace errors and maintaining system stability.",
    },
  ],
};
