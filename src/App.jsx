import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Moon,
  Menu,
  X,
  Code2,
  FileText,
  Send
} from "lucide-react";
import { GitHubCalendar } from "react-github-calendar";
import {
  SiJavascript, SiReact, SiVuedotjs, SiTailwindcss, SiCanva, SiHtml5, SiCss,
  SiPhp, SiLaravel, SiNodedotjs, SiExpress, SiPython, SiSpringboot,
  SiMysql, SiMongodb, SiPostgresql,
  SiDocker, SiGit, SiNextdotjs
} from "react-icons/si";
import { FaCode, FaJava } from "react-icons/fa";
import { portfolioData } from "./data/portfolioData";
import "./index.css";
import "./dark-theme.css";

const Navbar = ({ activeTab, onTabClick, tabs, toggleTheme, isDark }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="nav-container-target">
      <div className="nav-content-target">
        <div className="nav-avatar">
          <img src="/images/pogi.jpg" alt="Avatar" />
        </div>
        
        <div className="nav-links-desktop">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-link-target ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => onTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
          <div className="nav-divider"></div>
          <button className="theme-toggle" onClick={toggleTheme}>
            <Moon size={18} fill={isDark ? "currentColor" : "none"} />
          </button>
        </div>

        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu-dropdown">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className="nav-link-target"
              onClick={() => {
                onTabClick(tab.id);
                setIsMenuOpen(false);
              }}
            >
              {tab.label}
            </button>
          ))}
          <button className="nav-link-target" onClick={toggleTheme} style={{textAlign: 'left'}}>
            Toggle Theme
          </button>
        </div>
      )}
    </nav>
  );
};

const HeroTypewriter = () => {
  const words = ["Full Stack Developer", "Software Engineer"];
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentWord = words[wordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentWord.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }, 50);
    } else {
      timer = setTimeout(() => {
        setText(currentWord.substring(0, text.length + 1));
        if (text.length === currentWord.length) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
        }
      }, 100);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  return (
    <div className="hero-typewriter">
      {text}
      <span className="typewriter-cursor">_</span>
    </div>
  );
};

const Hero = ({ data }) => (
  <section id="hero" className="hero-section-target">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="hero-content-wrapper"
    >
      <div className="hero-avatar-large">
        <img src="/images/pogi.jpg" alt="Profile" />
      </div>

      <h1 className="hero-title-target">
        Hi, I'm {data.name.split('-')[0]}
      </h1>
      
      <HeroTypewriter />
      
      <h2 className="hero-subtitle-target">
        Building Scalable Solutions for the Modern Web.
      </h2>
      
      <div className="hero-actions-target">
        <a href={data.cvLink} className="target-btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} download>
          <FileText size={18} /> Resume / CV
        </a>
        <a href={data.socials.email} className="target-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Send size={18} /> Get in touch
        </a>
      </div>

      <div className="hero-socials">
        <a href={data.socials.github} target="_blank" rel="noreferrer"><Github size={20} /></a>
        <a href={data.socials.linkedin} target="_blank" rel="noreferrer"><Linkedin size={20} /></a>
        <a href={data.socials.email}><Mail size={20} /></a>
      </div>
    </motion.div>
  </section>
);

const ProjectCard = ({ project, index, onImageClick }) => {
  const imgSrc = project.images?.[0] || '/placeholder.png';
  return (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="project-card-target"
  >
    <div className="project-image-target" style={{ cursor: 'pointer', display: 'block' }} onClick={() => onImageClick(imgSrc)}>
      <img 
        src={imgSrc} 
        alt={project.title} 
      />
    </div>
    <div className="project-content-target">
      <div className="project-header-target">
        <h3>{project.title}</h3>
        <div className="project-links-target">
          <a href={project.link || "#"}><ArrowUpRight size={20} /></a>
          <a href={project.github || "#"}><Github size={18} /></a>
        </div>
      </div>
      <p className="project-desc-target">{project.description}</p>
      
      <div className="project-tech-target">
        <span className="tech-label-target">TECHNOLOGIES</span>
        <div className="tech-tags-target">
          {project.tags.slice(0, 4).map(tag => (
            <span key={tag} className="tech-tag-pill">{tag}</span>
          ))}
          {project.tags.length > 4 && (
            <span className="tech-tag-pill">+{project.tags.length - 4}</span>
          )}
        </div>
      </div>

      <div className="project-footer-target">
        <div className="status-indicator-target">
          <span className="dot"></span> ALL SYSTEMS OPERATIONAL
        </div>
        <a href={project.link || "#"} className="view-details-target">
          View Details <ArrowUpRight size={16} />
        </a>
      </div>
    </div>
  </motion.div>
  );
};

const getSkillIcon = (name) => {
  const iconMap = {
    "JavaScript": <SiJavascript style={{color: '#f7df1e'}} />,
    "React": <SiReact style={{color: '#61dafb'}} />,
    "Next.js": <SiNextdotjs style={{color: '#ffffff'}} />,
    "Vue.js": <SiVuedotjs style={{color: '#4fc08d'}} />,
    "Blade Templates": <SiLaravel style={{color: '#ff2d20'}} />,
    "Tailwind": <SiTailwindcss style={{color: '#38b2ac'}} />,
    "Canva": <SiCanva style={{color: '#00c4cc'}} />,
    "HTML5": <SiHtml5 style={{color: '#e34f26'}} />,
    "CSS3": <SiCss style={{color: '#1572b6'}} />,
    "PHP": <SiPhp style={{color: '#777bb4'}} />,
    "C#": <FaCode style={{color: '#239120'}} />,
    "Laravel": <SiLaravel style={{color: '#ff2d20'}} />,
    "Node.js": <SiNodedotjs style={{color: '#339933'}} />,
    "Java": <FaJava style={{color: '#f89820'}} />,
    "Express": <SiExpress style={{color: '#808080'}} />,
    "Python": <SiPython style={{color: '#3776ab'}} />,
    "Spring Boot": <SiSpringboot style={{color: '#6db33f'}} />,
    "MySQL": <SiMysql style={{color: '#4479a1'}} />,
    "MongoDB": <SiMongodb style={{color: '#47a248'}} />,
    "PostgreSQL": <SiPostgresql style={{color: '#336791'}} />,
    "Docker": <SiDocker style={{color: '#2496ed'}} />,
    "Git": <SiGit style={{color: '#f05032'}} />,
    "VS Code": <FaCode style={{color: '#007acc'}} />
  };
  return iconMap[name] || <FaCode style={{color: '#a1a1aa'}} />;
};

const filterGitHubData = (contributions) => {
  const firstActiveIndex = contributions.findIndex(d => d.count > 0);
  if (firstActiveIndex === -1) return contributions.slice(-150); // Fallback if no contributions
  
  const firstDate = new Date(contributions[firstActiveIndex].date);
  const startMonth = firstDate.getMonth();
  const startYear = firstDate.getFullYear();
  
  return contributions.filter(d => {
    const date = new Date(d.date);
    return date.getFullYear() > startYear || (date.getFullYear() === startYear && date.getMonth() >= startMonth);
  });
};

const SkillsSection = ({ stacks }) => (
  <section id="skills" className="skills-section-target">
    <div className="section-label-target">Featured</div>
    <h2 className="section-title-target">Skills</h2>
    
    <div className="skills-container-target">
      {stacks.map((stack, i) => (
        <motion.div 
          key={stack.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="skill-group-target"
        >
          <h3 className="skill-category-title">{stack.name}</h3>
          <div className="skill-tags-group">
            {stack.items.map(item => (
              <span key={item} className="skill-tag-target">
                {getSkillIcon(item)}
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const AboutSection = ({ data }) => (
  <section id="about" className="about-section-target">
    <div className="section-label-target">About</div>
    <h2 className="section-title-target">Me</h2>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="about-content-target"
    >
      <p>{data.bio}</p>
      <p>My expertise lies in bridging the gap between modern web development and scalable backends. I focus on building responsive, high-performance web applications using robust logic and clean code architecture. </p>
    </motion.div>
  </section>
);

const App = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [selectedImage, setSelectedImage] = useState(null);
  
  const tabs = [
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "about", label: "About" },
  ];

  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check locally saved theme, default to dark
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "hero") return;
    const element = document.getElementById(tabId);
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "projects", "skills", "about"].map((id) => document.getElementById(id));
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
           // map hero to projects for nav
          setActiveTab(section.id === "hero" ? "projects" : section.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="portfolio-target-root">
      <Navbar activeTab={activeTab} onTabClick={handleTabClick} tabs={tabs} toggleTheme={toggleTheme} isDark={isDark} />

      <main className="main-container-target">
        <Hero data={portfolioData.about} />

        <section id="projects" className="projects-section-target">
          <div className="section-label-target">Featured</div>
          <h2 className="section-title-target">Projects</h2>
          <div className="projects-grid-target">
            {portfolioData.projects
              .filter(project => project.title !== "Booking System")
              .map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} onImageClick={setSelectedImage} />
              ))}
          </div>
        </section>

        <section id="github" className="github-activity-target">
          <div className="section-label-target">Featured</div>
          <h2 className="section-title-target">GitHub Activity</h2>
          <div className="github-calendar-wrapper">
            <GitHubCalendar 
              username="Jayronj0616" 
              colorScheme={isDark ? "dark" : "light"}
              blockSize={14}
              blockMargin={6}
              fontSize={12}
              transformData={filterGitHubData}
            />
          </div>
        </section>

        <SkillsSection stacks={portfolioData.stacks} />
        
        <AboutSection data={portfolioData.about} />
      </main>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="image-modal-overlay"
            onClick={() => setSelectedImage(null)}
          >
            <button className="image-modal-close" onClick={() => setSelectedImage(null)}>
              <X size={24} />
            </button>
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="image-modal-content"
              onClick={e => e.stopPropagation()}
            >
              <img src={selectedImage} alt="Expanded Preview" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="footer-target">
        <div className="footer-content-target">
          <div className="footer-left">
            <span className="footer-logo">
              <img src="/images/pogi.jpg" alt="Avatar" className="footer-avatar" />
              {portfolioData.about.name}
            </span>
          </div>
          <div className="footer-socials-target">
            <a href={portfolioData.about.socials.github} target="_blank" rel="noreferrer">
              <Github size={20} />
            </a>
            <a href={portfolioData.about.socials.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={20} />
            </a>
            <a href={portfolioData.about.socials.email}>
              <Mail size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
