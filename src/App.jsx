import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Download,
  Menu,
  X,
  Layout,
  Server,
  Wrench,
  Database,
  MessageCircle,
} from "lucide-react";
import { portfolioData } from "./data/portfolioData";

const Navbar = ({ activeTab, onTabClick, tabs }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="nav-container">
      <div className="pill-nav">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`nav-link ${activeTab === tab ? "active" : ""}`}
            onClick={() => onTabClick(tab)}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="active-pill"
                className="active-pill-bg"
                transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
              />
            )}
            <span className="nav-text">{tab}</span>
          </button>
        ))}
      </div>
      <div
        className="mobile-menu-btn"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X /> : <Menu />}
      </div>
    </nav>
  );
};

const Hero = ({ data }) => (
  <section id="about" className="hero-section container">
    <div className="hero-content">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h1 className="hero-greeting">
          Hey! I am <br />
          <span className="name-highlight">{data.name}</span>
          <span className="accent-dot">.</span>
        </h1>
        <p className="hero-bio">{data.bio}</p>

        <div className="hero-cta">
          <a href={data.cvLink} className="btn-primary" download>
            Download CV <Download size={18} />
          </a>
          <div className="social-links">
            <a href={data.socials.github}>
              <Github size={22} />
            </a>
            <a href={data.socials.linkedin}>
              <Linkedin size={22} />
            </a>
            <a href={data.socials.email}>
              <Mail size={22} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>

    <div className="hero-visual">
      <motion.div
        className="image-stack"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="stack-card card-left"></div>
        <div className="stack-card card-right"></div>
        <div className="main-photo">
          <img src="/images/pogi.jpg" alt="Profile" />
        </div>
      </motion.div>
    </div>
  </section>
);

const ProjectCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="project-card"
  >
    <div className="project-header">
      <div className="project-title-group">
        <h3>{project.title}</h3>
        {project.role && (
          <p className="project-role">
            {project.role} @ {project.company}
          </p>
        )}
      </div>
      <a href={project.link} className="arrow-link">
        <ArrowUpRight className="arrow-icon" size={28} />
      </a>
    </div>
    <p className="project-desc">{project.description}</p>
    <div className="project-tags">
      {project.tags.map((tag) => (
        <span key={tag} className="tag-pill">
          {tag}
        </span>
      ))}
    </div>
    <span className="project-number">{project.id}</span>
  </motion.div>
);

const InfiniteMarquee = ({ images, onImageClick }) => {
  // Duplicate images to ensure seamless scrolling
  // If we don't have enough images to fill screen, duplicate more
  const marqueeImages = [...images, ...images, ...images, ...images];

  // Calculate duration based on image count to keep speed consistent
  // If 2 images take 30s (speed user likes), then duration = images.length * 15
  const duration = Math.max(images.length * 15, 20);

  return (
    <div className="marquee-container">
      <div
        className="marquee-track"
        style={{ animationDuration: `${duration}s` }}
      >
        {marqueeImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="Project Screenshot"
            className="marquee-image"
            onClick={() => onImageClick(src)}
            style={{ cursor: "zoom-in" }}
            title="Click to view full image"
          />
        ))}
      </div>
    </div>
  );
};

const ImageModal = ({ src, onClose }) => {
  if (!src) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div
        className="lightbox-image-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="lightbox-close" onClick={onClose}>
          <X size={24} />
        </button>
        <img src={src} alt="Full View" className="lightbox-image" />
      </div>
    </div>
  );
};

const StackCard = ({ stack, index }) => {
  const Icon =
    stack.icon === "Layout"
      ? Layout
      : stack.icon === "Server"
        ? Server
        : stack.icon === "Database"
          ? Database
          : Wrench;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="stack-card-item"
    >
      <div className="stack-header">
        <Icon className="stack-icon" size={32} />
        <h3>{stack.name}</h3>
      </div>
      <div className="stack-tags">
        {stack.items.map((item) => (
          <span key={item} className="stack-pill">
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const PortfolioChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("main"); // 'main' or 'projects'
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Jay-Ron's portfolio assistant. How can I help you today?",
      sender: "bot",
    },
  ]);

  const mainQuestions = [
    { id: "about", text: "Who is Jay-Ron?" },
    { id: "experience", text: "Philosophy & Experience" },
    { id: "projects_menu", text: "Explore Jay-Ron's Projects" },
    { id: "stack", text: "Tech Stack & Tools" },
    { id: "contact", text: "How to connect?" },
  ];

  const projectQuestions = [
    ...portfolioData.projects.map((p) => ({
      id: `project_${p.id}`,
      text: p.title,
      type: "project",
      data: p,
    })),
    { id: "back", text: "← Back to Main Menu" },
  ];

  const handleQuestionClick = (question) => {
    const userMsg = { id: Date.now(), text: question.text, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      let botResponse = "";

      if (question.id === "projects_menu") {
        botResponse =
          "Jay-Ron has built some really cool systems! Which one would you like Jay-Ron to explain to you?";
        setCurrentMenu("projects");
      } else if (question.id === "back") {
        botResponse = "Sure! What else would you like to know about Jay-Ron?";
        setCurrentMenu("main");
      } else if (question.id.startsWith("project_")) {
        const project = question.data;
        switch (project.title) {
          case "Airline System":
            botResponse = `Jay-Ron developed this full-stack system to simulate real-world airline operations. It features demand-based dynamic pricing and concurrency-safe seat inventory. Jay-Ron also implemented automated background jobs to optimize revenue and ensure system-wide data integrity.`;
            break;
          case "QR Pass System":
            botResponse = `Jay-Ron built this system to automate and enhance the security of residential subdivisions. It streamlines the entry and exit process for residents and visitors using dynamic QR codes, replacing manual logs with a faster, digital solution. Jay-Ron also integrated an offline-first scanner using IndexedDB to ensure security checks remain functional even without an internet connection.`;
            break;
          case "Booking System":
            botResponse = `Jay-Ron was responsible for enhancing and maintaining this scheduling platform. Jay-Ron focused on resolving high-priority booking conflicts and improving overall system stability to ensure consistent data across all user sessions.`;
            break;
          default:
            botResponse = `Jay-Ron designed ${project.title} to address specific technical challenges. Jay-Ron utilized ${project.tags.join(", ")} to build a solution that focuses on ${project.description.toLowerCase()}`;
        }
      } else {
        switch (question.id) {
          case "about":
            botResponse = `Jay-Ron is a dedicated Software Engineer who loves building robust, scalable systems. Jay-Ron focuses on making complex things simple and ensuring every system runs perfectly.`;
            break;
          case "experience":
            botResponse = `Jay-Ron has worked with companies like Metro Jobs and Phoenix Publishing. Jay-Ron's philosophy centers on 'System Efficiency'—making sure everything stays organized and safe, even when thousands of people are using it at once!`;
            break;
          case "stack":
            const frontend = portfolioData.stacks
              .find((s) => s.name === "Frontend")
              ?.items.slice(0, 3)
              .join(", ");
            botResponse = `Jay-Ron's toolkit is full of powerful tools! For websites, Jay-Ron uses ${frontend}. Jay-Ron also uses smart AI assistants like Antigravity to build things much faster.`;
            break;
          case "contact":
            botResponse = `Jay-Ron would love to hear from you! You can send an email to jayronxjavier@gmail.com. Jay-Ron is always ready for new challenges!`;
            break;
          default:
            botResponse =
              "Jay-Ron isn't sure about that, but feel free to ask something else!";
        }
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: botResponse, sender: "bot" },
      ]);
    }, 600);
  };

  const currentOptions =
    currentMenu === "main" ? mainQuestions : projectQuestions;

  return (
    <div className="chatbot-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            <div className="chat-header">
              <div className="header-info">
                <div className="header-dot-online"></div>
                <h4>Portfolio Assistant</h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#ccc",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="chat-messages">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message-bubble ${msg.sender === "bot" ? "bot-msg" : "user-msg"}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="chat-options">
              {currentOptions.map((q) => (
                <button
                  key={q.id}
                  className="option-pill"
                  onClick={() => handleQuestionClick(q)}
                >
                  {q.text}
                </button>
              ))}
            </div>

            <div className="chat-window-footer">
              Usually responds in seconds
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="chat-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={28} /> : <span>💬</span>}
      </motion.button>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState("About me");
  const [selectedGalleryProject, setSelectedGalleryProject] = useState(
    portfolioData.projects[0].id,
  );
  const [lightboxImage, setLightboxImage] = useState(null);
  const tabs = ["About me", "Stacks", "Projects", "Education"];

  // Get images for the currently selected project for the gallery
  const selectedProjectImages =
    portfolioData.projects.find((p) => p.id === selectedGalleryProject)
      ?.images || [];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    let id = tab.toLowerCase();
    if (tab === "About me") id = "about";

    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Offset for fixed navbar
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = tabs.map((tab) => {
        let id = tab.toLowerCase();
        if (tab === "About me") id = "about";
        return document.getElementById(id);
      });

      const scrollPosition = window.scrollY + 200; // Offset to trigger earlier

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveTab(tabs[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tabs]);

  return (
    <div className="portfolio-root">
      <Navbar activeTab={activeTab} onTabClick={handleTabClick} tabs={tabs} />

      <main className="main-content-area">
        <Hero data={portfolioData.about} />

        <section id="stacks" className="page-view container section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title heading-dot">tech stack</h2>
            <div className="stacks-grid">
              {portfolioData.stacks.map((stack, index) => (
                <StackCard key={stack.name} stack={stack} index={index} />
              ))}
            </div>
          </motion.div>
        </section>

        <section id="projects" className="page-view container section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title heading-dot">projects</h2>
            <div className="projects-grid">
              {portfolioData.projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>

            {/* Infinite Marquee Gallery */}
            <div style={{ marginTop: "6rem" }}>
              <h3
                className="section-title heading-dot"
                style={{ fontSize: "3rem", marginBottom: "2rem" }}
              >
                project gallery
              </h3>

              {/* Gallery Filter Buttons */}
              <div className="gallery-controls">
                {portfolioData.projects.map((project) => (
                  <button
                    key={project.id}
                    className={`gallery-btn ${selectedGalleryProject === project.id ? "active" : ""}`}
                    onClick={() => setSelectedGalleryProject(project.id)}
                  >
                    {selectedGalleryProject === project.id && (
                      <motion.div
                        layoutId="gallery-pill"
                        className="gallery-pill-bg"
                        transition={{
                          type: "spring",
                          duration: 0.6,
                          bounce: 0.2,
                        }}
                      />
                    )}
                    <span className="btn-text">{project.title}</span>
                  </button>
                ))}
              </div>

              {selectedProjectImages.length > 0 ? (
                <InfiniteMarquee
                  images={selectedProjectImages}
                  onImageClick={(src) => setLightboxImage(src)}
                />
              ) : (
                <div className="empty-gallery">
                  <p>No gallery images available for this project yet.</p>
                </div>
              )}
            </div>
          </motion.div>
        </section>

        <section id="education" className="page-view container section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title heading-dot">education</h2>
            <div className="education-grid">
              {portfolioData.education.map((edu, index) => (
                <motion.div
                  key={edu.title}
                  className="education-card"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="edu-content">
                    <div className="edu-top">
                      <h3>{edu.title}</h3>
                      <p className="edu-degree">{edu.degree}</p>
                    </div>
                    <div className="edu-footer">
                      <span className="edu-period">{edu.period}</span>
                      <span className="edu-tag">Graduate</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="footer container">
        <div className="footer-line"></div>
        <div className="footer-content">
          <p>Built with React by {portfolioData.about.name}</p>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>

      <PortfolioChatbot />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ImageModal
              src={lightboxImage}
              onClose={() => setLightboxImage(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
