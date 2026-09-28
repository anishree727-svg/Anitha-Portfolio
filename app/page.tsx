"use client";

import { useRef, useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState(
    "Hello! I'm Anitha's AI assistant. Ask me about her projects, freelance experience, skills, education or contact details."
  );
  const [isListening, setIsListening] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const recognitionRef = useRef<any>(null);

  const askAI = (input?: string) => {
    const q = (input ?? question).toLowerCase().trim();

    if (!q) {
      setReply("Please type a question first.");
      return;
    }

    if (
      q.includes("freelance") ||
      q.includes("freelancing") ||
      q.includes("client") ||
      q.includes("freelance work")
    ) {
      setReply(
        "Anitha has freelance web development experience through two client projects: Thete Agro Impex, a responsive B2B agro-products export website with product browsing and enquiry workflows, and 22 Constanzaa, a responsive restaurant website MVP with interactive sections deployed using Netlify."
      );
    } else if (
      q.includes("thete") ||
      q.includes("agro") ||
      q.includes("impex")
    ) {
      setReply(
        "Thete Agro Impex is a freelance web development project for an agro-products export business. Anitha developed and deployed a responsive B2B website with structured product categories, customer-facing content, product browsing and enquiry workflows."
      );
    } else if (
      q.includes("constanzaa") ||
      q.includes("restaurant website") ||
      q.includes("restaurant project")
    ) {
      setReply(
        "22 Constanzaa is a freelance restaurant website MVP. Anitha designed and developed a responsive customer-focused interface with structured restaurant and menu presentation, mobile-friendly layouts and interactive sections, and deployed the MVP using Netlify."
      );
    } else if (q.includes("project") || q.includes("projects")) {
      setReply(
        "Anitha has worked on five projects: two freelance web development projects — Thete Agro Impex and 22 Constanzaa — along with three software projects: Agentic AI Smart Campus Incident & Complaint Management System, AI Powered HR Query & Leave Management System, and Phishing Website Detection."
      );
    } else if (
      q.includes("skill") ||
      q.includes("skills") ||
      q.includes("technology") ||
      q.includes("technologies")
    ) {
      setReply(
        "Her technical skills include Python, Java, JavaScript, TypeScript, React.js, Next.js, Spring Boot, Streamlit, MySQL, SQLite, Prisma ORM, REST APIs, LLMs, YOLOv8, Computer Vision, Git and GitHub."
      );
    } else if (
      q.includes("ai") ||
      q.includes("artificial intelligence") ||
      q.includes("llm")
    ) {
      setReply(
        "Anitha has project experience involving Agentic AI and LLMs. Her technical skills also include Streamlit, YOLOv8 and Computer Vision."
      );
    } else if (
      q.includes("campus") ||
      q.includes("incident") ||
      q.includes("complaint")
    ) {
      setReply(
        "The Agentic AI Smart Campus Incident & Complaint Management System is one of Anitha's projects, focused on incident and complaint management using Agentic AI and LLM-based capabilities."
      );
    } else if (q.includes("hr") || q.includes("leave")) {
      setReply(
        "The AI Powered HR Query & Leave Management System is one of Anitha's projects, focused on HR queries and leave management."
      );
    } else if (q.includes("phishing")) {
      setReply(
        "Phishing Website Detection is one of Anitha's projects, focused on detecting phishing websites using machine learning."
      );
    } else if (
      q.includes("education") ||
      q.includes("degree") ||
      q.includes("college") ||
      q.includes("study")
    ) {
      setReply(
        "Anitha completed an Integrated M.Tech in Software Engineering from Vellore Institute of Technology, Vellore, with a CGPA of 7.6/10."
      );
    } else if (
      q.includes("contact") ||
      q.includes("email") ||
      q.includes("phone") ||
      q.includes("mobile") ||
      q.includes("call")
    ) {
      setReply(
        "You can contact Anitha by email at anishree727@gmail.com or call her at +91 96299 91266."
      );
    } else if (
      q.includes("who are you") ||
      q.includes("about anitha") ||
      q.includes("about her")
    ) {
      setReply(
        "Anitha is a Software Developer and Integrated M.Tech Software Engineering graduate from Vellore Institute of Technology. She has hands-on experience through software projects and freelance web development work."
      );
    } else if (q.includes("github")) {
      setReply(
        "You can visit Anitha's GitHub profile from the GitHub link in the Contact section."
      );
    } else if (q.includes("linkedin")) {
      setReply(
        "You can visit Anitha's LinkedIn profile from the LinkedIn link in the Contact section."
      );
    } else {
      setReply(
        "I can tell you about Anitha's projects, freelance experience, skills, education, AI work, Smart Campus project, HR project, phishing detection project, GitHub, LinkedIn or contact details."
      );
    }
  };

  const startVoiceChat = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setReply("Voice input is not supported in this browser. Try Google Chrome or Microsoft Edge.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => {
      setIsListening(false);
      setReply("I couldn't hear that clearly. Please try the voice button again.");
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript ?? "";
      setQuestion(transcript);
      askAI(transcript);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const speakReply = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(reply);
    utterance.lang = "en-IN";
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
    setMenuOpen(false);
  };

  const skills = [
    "Python",
    "Java",
    "JavaScript",
    "TypeScript",
    "React.js",
    "Next.js",
    "Spring Boot",
    "Streamlit",
    "MySQL",
    "SQLite",
    "Prisma ORM",
    "REST APIs",
    "LLMs",
    "YOLOv8",
    "Computer Vision",
    "Git",
    "GitHub",
  ];

  const projects = [
    {
      number: "01",
      category: "FREELANCE",
      title: "Thete Agro Impex",
      description:
        "Developed and deployed a responsive B2B website for an agro-products export business, with structured product categories, customer-facing content, product browsing and enquiry workflows.",
      tech: ["B2B Website", "Product Browsing", "Enquiry Workflow"],
      link: "https://theteagroimpex.in",
      details:
        "Freelance web development project for an agro-products export business. Developed and deployed a responsive B2B website with structured product categories, customer-facing content, product browsing and enquiry workflows.",
    },
    {
      number: "02",
      category: "FREELANCE",
      title: "22 Constanzaa",
      description:
        "Designed and developed a responsive restaurant website MVP with a modern customer-focused interface, structured restaurant and menu presentation, mobile-friendly layouts and interactive sections.",
      tech: ["Restaurant Website", "Responsive Design", "Netlify"],
      link: "https://22constanzaaa.netlify.app/",
      details:
        "Freelance web development project for a restaurant. Designed and developed a responsive restaurant website MVP with structured restaurant and menu presentation, mobile-friendly layouts and interactive sections, then deployed the MVP using Netlify.",
    },
    {
      number: "03",
      category: "AI / SOFTWARE",
      title: "Agentic AI Smart Campus Incident & Complaint Management System",
      description:
        "An Agentic AI based smart campus system focused on incident and complaint management using LLM-based capabilities.",
      tech: ["Agentic AI", "LLMs", "Next.js"],
      details:
        "Individual capstone project focused on incident and complaint management using Agentic AI and LLM-based capabilities. Resume highlights include complaint categorization, prioritization, sentiment analysis, duplicate detection, AI-assisted routing, YOLO-based image analysis, GPS tracking, real-time dashboards, email notifications and feedback management.",
    },
    {
      number: "04",
      category: "AI / SOFTWARE",
      title: "AI Powered HR Query & Leave Management System",
      description:
        "An AI powered system designed for handling HR queries and leave management.",
      tech: ["AI", "LLMs", "Streamlit"],
      details:
        "Individual capstone project focused on AI-powered HR query automation and leave management. Built with Python, Streamlit, REST APIs and LLM integration, including role-based authentication and dashboards for HR queries and leave tracking.",
    },
    {
      number: "05",
      category: "MACHINE LEARNING",
      title: "Phishing Website Detection",
      description:
        "A project focused on detecting phishing websites using machine learning and computer vision related technologies.",
      tech: ["Python", "Machine Learning", "Computer Vision"],
      details:
        "Group project focused on phishing website detection using machine learning. Performed feature engineering on website attributes including URL length and domain age, using Decision Tree, Logistic Regression and SVM approaches; the resume reports 92% accuracy across test datasets.",
    },
  ];

  return (
    <main className="portfolio">
      {/* NAVBAR */}
      <nav className="navbar">
        <button className="brand" onClick={() => scrollTo("home")}>
          ANITHA S
        </button>

        <div className="nav-links">
          {[
            ["home", "Home"],
            ["about", "About"],
            ["ai", "AI"],
            ["projects", "Projects"],
            ["skills", "Skills"],
            ["contact", "Contact"],
          ].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)}>
              {label}
            </button>
          ))}
        </div>

        <button
          className={`mobile-menu-button ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        {menuOpen && (
          <div className="mobile-menu">
            {[
              ["home", "Home"],
              ["about", "About"],
              ["ai", "AI"],
              ["projects", "Projects"],
              ["skills", "Skills"],
              ["contact", "Contact"],
            ].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)}>
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <div className="online-badge">
              <span className="online-dot" />
              AI SYSTEM ONLINE
            </div>

            <p className="eyebrow">SOFTWARE DEVELOPER</p>

            <h1>
              Anitha
              <br />
              S.
            </h1>

            <p className="hero-description">
              Software Developer building software with modern development
              technologies, AI, LLMs and computer vision.
            </p>

            <div className="hero-buttons">
              <button
                className="primary-button"
                onClick={() => scrollTo("ai")}
              >
                Talk to My AI
              </button>

              <button
                className="secondary-button"
                onClick={() => scrollTo("projects")}
              >
                Explore Projects
              </button>

              <a
                href="/resume.pdf"
                download="Anitha_S_Resume.pdf"
                className="resume-button"
              >
                Download Resume ↓
              </a>
            </div>

            <div className="hero-socials">
              <span>CONNECT</span>
              <a
                href="https://github.com/anishree727-svg"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
              <span className="social-separator">•</span>
              <a
                href="https://www.linkedin.com/in/anitha-s-780775353/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
            </div>

            <div className="proof-strip">
              <div><strong>05</strong><span>Projects</span></div>
              <div><strong>02</strong><span>Freelance Builds</span></div>
              <div><strong>AI</strong><span>LLM + Vision</span></div>
            </div>
          </div>

          <div className="profile-wrapper">
            <div className="profile-frame">
              <img
                src="/profile.jpg (1).jpeg"
                alt="Anitha S"
                className="profile-image"
              />
            </div>

            <div className="profile-glow" />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="container">
          <SectionTitle number="01" title="ABOUT ME" />

          <div className="about-grid">
            <AboutCard
              title="Software Developer"
              text="I am a Software Developer and Integrated M.Tech Software Engineering graduate from Vellore Institute of Technology, Vellore. I have hands-on experience with Python, Java, TypeScript, Next.js, REST APIs, databases, LLMs and computer vision through academic projects and practical development."
            />

            <AboutCard
              title="Freelance Experience"
              text="Alongside my software projects, I have worked as a Freelance Web Developer on client projects including Thete Agro Impex and 22 Constanzaa, building responsive business websites and taking projects through development and deployment."
            />
          </div>
        </div>
      </section>

      {/* FREELANCE EXPERIENCE */}
      <section className="section freelance-section">
        <div className="container">
          <SectionTitle number="02" title="FREELANCE EXPERIENCE" />

          <div className="freelance-intro">
            <p>
              Client-facing web development work spanning responsive interfaces,
              business websites and deployment.
            </p>
          </div>

          <div className="freelance-grid">
            {projects.slice(0, 2).map((project) => (
              <div className="freelance-card" key={project.number}>
                <div className="freelance-card-top">
                  <span className="freelance-label">CLIENT PROJECT</span>
                  <span className="freelance-year">2026</span>
                </div>

                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="tech-list">
                  {project.tech.map((item) => (
                    <span className="tech-tag" key={item}>
                      {item}
                    </span>
                  ))}
                </div>

                <div className="freelance-actions">
                  <button
                    className="project-link secondary-link"
                    onClick={() => setSelectedProject(project)}
                    type="button"
                  >
                    VIEW DETAILS
                  </button>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      LIVE WEBSITE ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI CONTROL ROOM */}
      <section id="ai" className="section ai-section">
        <div className="container">
          <SectionTitle number="03" title="AI CONTROL ROOM" />

          <div className="ai-console">
            <div className="console-header">
              <span className="console-dot" />
              <span>ANITHA AI ASSISTANT</span>
              <span className="console-status">ONLINE</span>
            </div>

            <div className="ai-response">{reply}</div>

            <div className="ai-input-row">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") askAI();
                }}
                placeholder="Ask about my projects, skills, freelance work..."
              />

              <button onClick={() => askAI()}>ASK AI</button>
              <button
                className={`voice-button ${isListening ? "listening" : ""}`}
                onClick={startVoiceChat}
                type="button"
              >
                {isListening ? "● LISTENING" : "🎙 VOICE"}
              </button>
              <button className="speak-button" onClick={speakReply} type="button">
                🔊 SPEAK
              </button>
            </div>

            <p className="voice-note">Voice mode uses your browser microphone. No extra package or API key is required.</p>

            <div className="suggested-questions">
              <button
                onClick={() => {
                  setQuestion("What projects has Anitha worked on?");
                  setReply(
                    "Anitha has worked on five projects: Thete Agro Impex, 22 Constanzaa, Agentic AI Smart Campus Incident & Complaint Management System, AI Powered HR Query & Leave Management System, and Phishing Website Detection."
                  );
                }}
              >
                Projects
              </button>

              <button
                onClick={() => {
                  setQuestion("What freelance work has Anitha done?");
                  setReply(
                    "Anitha has worked as a Freelance Web Developer on Thete Agro Impex and 22 Constanzaa."
                  );
                }}
              >
                Freelance
              </button>

              <button
                onClick={() => {
                  setQuestion("What are Anitha's skills?");
                  setReply(
                    "Her technical skills include Python, Java, JavaScript, TypeScript, React.js, Next.js, Spring Boot, Streamlit, MySQL, SQLite, Prisma ORM, REST APIs, LLMs, YOLOv8, Computer Vision, Git and GitHub."
                  );
                }}
              >
                Skills
              </button>

              <button
                onClick={() => {
                  setQuestion("How can I contact Anitha?");
                  setReply(
                    "You can contact Anitha by email at anishree727@gmail.com or call her at +91 96299 91266."
                  );
                }}
              >
                Contact
              </button>
            </div>

            <div className="ai-feature-grid">
              <div className="ai-feature-card">
                <span>01</span>
                <strong>Ask</strong>
                <p>Explore projects, skills and experience.</p>
              </div>
              <div className="ai-feature-card">
                <span>02</span>
                <strong>Speak</strong>
                <p>Use your microphone for a hands-free demo.</p>
              </div>
              <div className="ai-feature-card">
                <span>03</span>
                <strong>Listen</strong>
                <p>Hear the assistant read the response aloud.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <div className="container">
          <SectionTitle number="04" title="PROJECTS" />

          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project.number}
                number={project.number}
                category={project.category}
                title={project.title}
                description={project.description}
                details={project.details}
                tech={project.tech}
                link={project.link}
                onViewDetails={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section skills-section">
        <div className="container">
          <SectionTitle number="05" title="TECHNICAL SKILLS" />

          <div className="skills-grid">
            {skills.map((skill) => (
              <div className="skill-card" key={skill}>
                <span className="skill-icon">◆</span>
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="section">
        <div className="container">
          <SectionTitle number="06" title="EDUCATION" />

          <div className="education-card">
            <div className="education-line" />

            <div>
              <span className="education-year">2021 — 2026</span>

              <h3>Integrated M.Tech — Software Engineering</h3>

              <p>Vellore Institute of Technology, Vellore</p>

              <div className="cgpa">CGPA: 7.6 / 10</div>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="section certifications-section">
        <div className="container">
          <SectionTitle number="07" title="CERTIFICATIONS" />

          <div className="certifications-grid">
            {[
              "Azure AI-900 Fundamentals — Microsoft",
              "React.js Developer Assessment — LearnTube",
              "MySQL and Relational Databases — IBM",
              "Exploratory Data Analysis — Infosys Springboard",
            ].map((cert) => (
              <div className="cert-card" key={cert}>
                <span className="cert-symbol">✓</span>
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section contact-section">
        <div className="container contact-container">
          <p className="contact-eyebrow">LET&apos;S CONNECT</p>

          <h2>Have an opportunity?</h2>

          <p className="contact-description">
            Feel free to reach out for opportunities, collaboration or
            professional discussions.
          </p>

          <div className="contact-buttons">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=anishree727@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-button primary-contact"
            >
              ✉ Email Me
            </a>

            <a
              href="tel:+919629991266"
              className="contact-button"
            >
              ☎ Call Me
            </a>

            <a
              href="https://github.com/anishree727-svg"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-button"
            >
              GitHub ↗
            </a>

            <a
              href="https://www.linkedin.com/in/anitha-s-780775353/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-button"
            >
              LinkedIn ↗
            </a>
          </div>

          <div className="contact-details">
            <a href="mailto:anishree727@gmail.com">
              <span>✉</span>
              anishree727@gmail.com
            </a>

            <a href="tel:+919629991266">
              <span>☎</span>
              +91 96299 91266
            </a>

            <span>
              <span>📍</span>
              Vellore, Tamil Nadu, India
            </span>
          </div>
        </div>
      </section>

      {selectedProject && (
        <div
          className="project-modal-backdrop"
          onClick={() => setSelectedProject(null)}
          role="presentation"
        >
          <div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-topline">
              <span>{selectedProject.category}</span>
              <button
                className="modal-close"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                type="button"
              >
                ×
              </button>
            </div>

            <span className="modal-number">PROJECT {selectedProject.number}</span>
            <h2 id="project-modal-title">{selectedProject.title}</h2>
            <p className="modal-description">{selectedProject.details}</p>

            <div className="modal-tech-list">
              {selectedProject.tech.map((item: string) => (
                <span className="tech-tag" key={item}>
                  {item}
                </span>
              ))}
            </div>

            <div className="modal-actions">
              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  OPEN LIVE PROJECT ↗
                </a>
              )}
              <button
                className="secondary-button modal-secondary"
                onClick={() => setSelectedProject(null)}
                type="button"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div>© {new Date().getFullYear()} Anitha S.</div>
        <div>Software Developer</div>
      </footer>

      {/* DESIGN */}
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #020617;
        }

        button,
        input {
          font-family: inherit;
        }

        .portfolio {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 15% 10%,
              rgba(14, 165, 233, 0.12),
              transparent 30%
            ),
            radial-gradient(
              circle at 85% 20%,
              rgba(37, 99, 235, 0.1),
              transparent 30%
            ),
            #020617;
          color: #e2e8f0;
          font-family: Arial, Helvetica, sans-serif;
          overflow-x: hidden;
        }

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          min-height: 74px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 7%;
          background: rgba(2, 6, 23, 0.82);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(56, 189, 248, 0.12);
        }

        .brand {
          background: none;
          border: none;
          color: #38bdf8;
          font-size: 20px;
          font-weight: 900;
          letter-spacing: 2px;
          cursor: pointer;
        }

        .nav-links {
          display: flex;
          gap: 24px;
          align-items: center;
        }

        .nav-links button {
          border: none;
          background: none;
          color: #94a3b8;
          cursor: pointer;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: 0.2s;
        }

        .nav-links button:hover {
          color: #38bdf8;
        }

        .mobile-menu-button {
          display: none;
          width: 44px;
          height: 44px;
          padding: 10px;
          border-radius: 12px;
          border: 1px solid rgba(56, 189, 248, 0.18);
          background: rgba(15, 23, 42, 0.72);
          cursor: pointer;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
        }

        .mobile-menu-button span {
          display: block;
          width: 100%;
          height: 2px;
          border-radius: 999px;
          background: #7dd3fc;
          transition: 0.2s;
        }

        .mobile-menu-button.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }

        .mobile-menu-button.open span:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-button.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        .mobile-menu {
          display: none;
        }

        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 130px 8% 80px;
        }

        .hero-content {
          width: 100%;
          max-width: 1200px;
          margin: auto;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 60px;
          align-items: center;
        }

        .online-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 9px 16px;
          border: 1px solid rgba(56, 189, 248, 0.4);
          border-radius: 30px;
          color: #38bdf8;
          font-size: 12px;
          letter-spacing: 2px;
          background: rgba(14, 165, 233, 0.05);
          box-shadow: 0 0 25px rgba(14, 165, 233, 0.08);
        }

        .online-dot,
        .console-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #22c55e;
          display: inline-block;
          box-shadow: 0 0 14px #22c55e;
        }

        .eyebrow {
          color: #38bdf8;
          font-size: 14px;
          letter-spacing: 4px;
          margin: 28px 0 15px;
          font-weight: 700;
        }

        .hero h1 {
          margin: 0;
          font-size: clamp(58px, 8vw, 105px);
          line-height: 0.9;
          font-weight: 900;
          letter-spacing: -6px;
          background: linear-gradient(
            90deg,
            #ffffff,
            #e0f2fe,
            #38bdf8,
            #60a5fa
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-description {
          max-width: 700px;
          margin-top: 30px;
          color: #94a3b8;
          font-size: 18px;
          line-height: 1.8;
        }

        .hero-buttons {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 34px;
        }

        .primary-button,
        .secondary-button {
          padding: 14px 23px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 700;
          font-size: 14px;
          transition: 0.25s;
        }

        .primary-button {
          border: 1px solid #38bdf8;
          background: #0284c7;
          color: white;
          box-shadow: 0 0 25px rgba(14, 165, 233, 0.2);
        }

        .primary-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 35px rgba(14, 165, 233, 0.35);
        }

        .secondary-button {
          border: 1px solid rgba(148, 163, 184, 0.3);
          background: rgba(15, 23, 42, 0.6);
          color: #cbd5e1;
        }

        .secondary-button:hover {
          border-color: #38bdf8;
          color: #38bdf8;
        }

        .resume-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 23px;
          border-radius: 10px;
          border: 1px solid rgba(56, 189, 248, 0.4);
          background: rgba(14, 165, 233, 0.07);
          color: #7dd3fc;
          text-decoration: none;
          font-weight: 700;
          font-size: 14px;
          transition: 0.25s;
        }

        .resume-button:hover {
          transform: translateY(-2px);
          border-color: #38bdf8;
          box-shadow: 0 0 28px rgba(14, 165, 233, 0.15);
          color: #ffffff;
        }

        .hero-socials {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 18px;
          color: #64748b;
          font-size: 12px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .hero-socials a {
          color: #94a3b8;
          text-decoration: none;
          font-weight: 700;
          transition: 0.2s;
        }

        .hero-socials a:hover {
          color: #38bdf8;
        }

        .social-separator {
          color: #334155;
        }

        .proof-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 34px;
        }

        .proof-strip div {
          min-width: 120px;
          padding: 12px 14px;
          border: 1px solid rgba(56, 189, 248, 0.12);
          border-radius: 12px;
          background: rgba(15, 23, 42, 0.5);
        }

        .proof-strip strong,
        .proof-strip span {
          display: block;
        }

        .proof-strip strong {
          color: #f8fafc;
          font-size: 17px;
        }

        .proof-strip span {
          margin-top: 4px;
          color: #64748b;
          font-size: 10px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .profile-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .profile-frame {
          position: relative;
          z-index: 2;
          width: 330px;
          height: 400px;
          padding: 5px;
          border-radius: 30px;
          background: linear-gradient(
            145deg,
            #38bdf8,
            #2563eb,
            rgba(37, 99, 235, 0.1)
          );
          box-shadow:
            0 0 70px rgba(14, 165, 233, 0.2),
            inset 0 0 40px rgba(14, 165, 233, 0.08);
        }

        .profile-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 26px;
          display: block;
          background: #0f172a;
        }

        .profile-glow {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: rgba(14, 165, 233, 0.14);
          filter: blur(70px);
        }

        .section {
          padding: 105px 8%;
          border-top: 1px solid rgba(56, 189, 248, 0.07);
        }

        .container {
          width: 100%;
          max-width: 1100px;
          margin: auto;
        }

        .freelance-section {
          background: rgba(15, 23, 42, 0.18);
        }

        .freelance-intro {
          max-width: 720px;
          margin-bottom: 28px;
        }

        .freelance-intro p {
          color: #94a3b8;
          line-height: 1.8;
          margin: 0;
        }

        .freelance-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .freelance-card {
          min-height: 300px;
          padding: 28px;
          border-radius: 18px;
          border: 1px solid rgba(56, 189, 248, 0.16);
          background: linear-gradient(145deg, rgba(15, 23, 42, 0.78), rgba(2, 6, 23, 0.7));
          box-shadow: 0 14px 40px rgba(2, 132, 199, 0.05);
          transition: 0.25s;
        }

        .freelance-card:hover {
          transform: translateY(-5px);
          border-color: rgba(56, 189, 248, 0.4);
          box-shadow: 0 18px 50px rgba(2, 132, 199, 0.1);
        }

        .freelance-card-top {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 18px;
        }

        .freelance-label,
        .freelance-year {
          color: #38bdf8;
          font-size: 10px;
          letter-spacing: 2px;
          font-weight: 700;
        }

        .freelance-year {
          color: #64748b;
        }

        .freelance-card h3 {
          color: #f8fafc;
          font-size: 24px;
          margin: 0 0 14px;
        }

        .freelance-card p {
          color: #94a3b8;
          line-height: 1.8;
          font-size: 14px;
          margin: 0;
        }

        .freelance-actions,
        .project-actions,
        .modal-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 18px;
        }

        .secondary-link {
          background: rgba(15, 23, 42, 0.82);
          color: #cbd5e1;
          cursor: pointer;
        }

        .secondary-link:hover {
          background: rgba(14, 165, 233, 0.08);
          color: #38bdf8;
        }

        .ai-section,
        .skills-section,
        .certifications-section {
          background: rgba(15, 23, 42, 0.38);
        }

        .section-title {
          margin-bottom: 45px;
        }

        .section-number {
          color: #38bdf8;
          font-size: 12px;
          letter-spacing: 3px;
          margin-bottom: 8px;
        }

        .section-title h2 {
          margin: 0;
          color: #f8fafc;
          font-size: clamp(32px, 4vw, 52px);
          letter-spacing: -2px;
        }

        .about-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .about-card {
          padding: 30px;
          border-radius: 18px;
          border: 1px solid rgba(56, 189, 248, 0.13);
          background: rgba(15, 23, 42, 0.52);
          transition: 0.25s;
        }

        .about-card:hover,
        .project-card:hover,
        .cert-card:hover,
        .skill-card:hover {
          transform: translateY(-4px);
          border-color: rgba(56, 189, 248, 0.35);
          box-shadow: 0 15px 45px rgba(2, 132, 199, 0.08);
        }

        .about-card h3 {
          color: #38bdf8;
          margin: 0 0 15px;
          font-size: 20px;
        }

        .about-card p {
          color: #94a3b8;
          line-height: 1.9;
          font-size: 15px;
          margin: 0;
        }

        .ai-console {
          padding: 28px;
          border-radius: 20px;
          border: 1px solid rgba(56, 189, 248, 0.2);
          background: rgba(2, 6, 23, 0.72);
          box-shadow: 0 0 45px rgba(14, 165, 233, 0.06);
        }

        .console-header {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #38bdf8;
          font-size: 13px;
          letter-spacing: 2px;
          margin-bottom: 20px;
        }

        .console-status {
          margin-left: auto;
          color: #22c55e;
          font-size: 10px;
          letter-spacing: 1px;
        }

        .ai-response {
          min-height: 105px;
          padding: 20px;
          border-radius: 12px;
          background: rgba(15, 23, 42, 0.82);
          border: 1px solid rgba(148, 163, 184, 0.08);
          color: #cbd5e1;
          line-height: 1.8;
          margin-bottom: 18px;
        }

        .ai-input-row {
          display: flex;
          gap: 10px;
        }

        .ai-input-row input {
          flex: 1;
          min-width: 0;
          padding: 15px;
          border-radius: 10px;
          border: 1px solid rgba(56, 189, 248, 0.2);
          background: #020617;
          color: white;
          outline: none;
        }

        .ai-input-row input:focus {
          border-color: #38bdf8;
          box-shadow: 0 0 20px rgba(14, 165, 233, 0.08);
        }

        .ai-input-row button {
          padding: 15px 25px;
          border: none;
          border-radius: 10px;
          background: #0284c7;
          color: white;
          cursor: pointer;
          font-weight: 700;
        }

        .voice-button,
        .speak-button {
          padding: 15px 16px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 700;
          border: 1px solid rgba(56, 189, 248, 0.25);
          background: rgba(14, 165, 233, 0.08);
          color: #7dd3fc;
          transition: 0.2s;
        }

        .voice-button:hover,
        .speak-button:hover,
        .voice-button.listening {
          border-color: #38bdf8;
          box-shadow: 0 0 22px rgba(14, 165, 233, 0.15);
        }

        .voice-button.listening {
          color: #f8fafc;
          background: rgba(34, 197, 94, 0.12);
        }

        .voice-note {
          margin: 10px 0 0;
          color: #64748b;
          font-size: 11px;
        }

        .ai-feature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 18px;
        }

        .ai-feature-card {
          padding: 17px;
          border-radius: 12px;
          border: 1px solid rgba(56, 189, 248, 0.09);
          background: rgba(15, 23, 42, 0.42);
        }

        .ai-feature-card span {
          color: #38bdf8;
          font-size: 10px;
          letter-spacing: 2px;
        }

        .ai-feature-card strong {
          display: block;
          color: #f8fafc;
          margin-top: 7px;
          font-size: 15px;
        }

        .ai-feature-card p {
          color: #64748b;
          font-size: 12px;
          line-height: 1.6;
          margin: 7px 0 0;
        }

        .suggested-questions {
          display: flex;
          gap: 9px;
          flex-wrap: wrap;
          margin-top: 15px;
        }

        .suggested-questions button {
          padding: 8px 13px;
          border: 1px solid rgba(56, 189, 248, 0.16);
          background: rgba(14, 165, 233, 0.05);
          color: #7dd3fc;
          border-radius: 8px;
          cursor: pointer;
          font-size: 12px;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .project-card {
          min-height: 350px;
          padding: 28px;
          border-radius: 18px;
          border: 1px solid rgba(56, 189, 248, 0.12);
          background: rgba(15, 23, 42, 0.55);
          transition: 0.25s;
          display: flex;
          flex-direction: column;
        }

        .project-number {
          color: #38bdf8;
          font-size: 12px;
          letter-spacing: 2px;
          margin: 0;
        }

        .project-category {
          color: #64748b;
          font-size: 10px;
          letter-spacing: 2px;
          margin-top: 8px;
        }

        .project-card h3 {
          color: #f8fafc;
          font-size: 19px;
          line-height: 1.45;
          margin: 18px 0 12px;
        }

        .project-card p {
          color: #94a3b8;
          line-height: 1.8;
          font-size: 14px;
        }

        .tech-list {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: auto;
          padding-top: 20px;
        }

        .tech-tag {
          padding: 7px 10px;
          border-radius: 8px;
          background: rgba(14, 165, 233, 0.08);
          border: 1px solid rgba(56, 189, 248, 0.12);
          color: #7dd3fc;
          font-size: 12px;
        }

        .project-link {
          display: inline-block;
          width: fit-content;
          margin-top: 18px;
          padding: 9px 13px;
          border-radius: 8px;
          background: #0284c7;
          border: 1px solid #38bdf8;
          color: white;
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
        }

        .project-link:hover {
          background: #0369a1;
        }

        .project-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(2, 6, 23, 0.78);
          backdrop-filter: blur(10px);
        }

        .project-modal {
          width: min(760px, 100%);
          max-height: min(760px, 90vh);
          overflow-y: auto;
          padding: 30px;
          border-radius: 22px;
          border: 1px solid rgba(56, 189, 248, 0.25);
          background: linear-gradient(160deg, rgba(15, 23, 42, 0.98), rgba(2, 6, 23, 0.98));
          box-shadow: 0 25px 90px rgba(0, 0, 0, 0.45);
        }

        .modal-topline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: #38bdf8;
          font-size: 10px;
          letter-spacing: 2px;
        }

        .modal-close {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid rgba(148, 163, 184, 0.16);
          background: rgba(15, 23, 42, 0.8);
          color: #cbd5e1;
          cursor: pointer;
          font-size: 23px;
          line-height: 1;
        }

        .modal-close:hover {
          border-color: #38bdf8;
          color: #38bdf8;
        }

        .modal-number {
          display: block;
          margin-top: 22px;
          color: #64748b;
          font-size: 10px;
          letter-spacing: 2px;
        }

        .project-modal h2 {
          margin: 10px 0 16px;
          color: #f8fafc;
          font-size: clamp(28px, 4vw, 42px);
          line-height: 1.15;
        }

        .modal-description {
          margin: 0;
          color: #94a3b8;
          font-size: 15px;
          line-height: 1.9;
        }

        .modal-tech-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 24px;
        }

        .modal-secondary {
          cursor: pointer;
        }

        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .skill-card {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 13px 16px;
          border-radius: 10px;
          border: 1px solid rgba(56, 189, 248, 0.14);
          background: rgba(14, 165, 233, 0.04);
          color: #cbd5e1;
          font-size: 14px;
          transition: 0.25s;
        }

        .skill-icon {
          color: #38bdf8;
          font-size: 8px;
        }

        .education-card {
          display: flex;
          gap: 25px;
          padding: 32px;
          border-radius: 18px;
          border: 1px solid rgba(56, 189, 248, 0.15);
          background: rgba(15, 23, 42, 0.5);
        }

        .education-line {
          width: 4px;
          min-height: 130px;
          border-radius: 5px;
          background: linear-gradient(#38bdf8, #2563eb);
          box-shadow: 0 0 18px rgba(56, 189, 248, 0.35);
        }

        .education-year {
          color: #38bdf8;
          font-size: 13px;
          letter-spacing: 2px;
        }

        .education-card h3 {
          color: #f8fafc;
          font-size: 24px;
          margin: 12px 0;
        }

        .education-card p {
          color: #94a3b8;
          line-height: 1.7;
        }

        .cgpa {
          display: inline-block;
          margin-top: 8px;
          padding: 8px 12px;
          border-radius: 8px;
          background: rgba(14, 165, 233, 0.08);
          color: #7dd3fc;
          font-size: 13px;
        }

        .certifications-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }

        .cert-card {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 20px;
          border-radius: 14px;
          border: 1px solid rgba(56, 189, 248, 0.12);
          background: rgba(2, 6, 23, 0.5);
          color: #cbd5e1;
          transition: 0.25s;
        }

        .cert-symbol {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }

        .contact-section {
          text-align: center;
          padding-top: 120px;
          padding-bottom: 120px;
        }

        .contact-container {
          max-width: 900px;
        }

        .contact-eyebrow {
          color: #38bdf8;
          letter-spacing: 4px;
          font-size: 13px;
          margin-bottom: 15px;
        }

        .contact-section h2 {
          color: #f8fafc;
          font-size: clamp(38px, 5vw, 64px);
          margin: 10px 0 20px;
          letter-spacing: -3px;
        }

        .contact-description {
          max-width: 650px;
          margin: 0 auto 35px;
          color: #94a3b8;
          line-height: 1.8;
        }

        .contact-buttons {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .contact-button {
          display: inline-block;
          padding: 14px 21px;
          border-radius: 10px;
          background: rgba(15, 23, 42, 0.8);
          color: #e2e8f0;
          text-decoration: none;
          font-weight: 700;
          border: 1px solid rgba(148, 163, 184, 0.25);
          transition: 0.25s;
        }

        .contact-button:hover {
          transform: translateY(-3px);
          border-color: #38bdf8;
          color: #38bdf8;
          box-shadow: 0 0 25px rgba(14, 165, 233, 0.1);
        }

        .primary-contact {
          background: #0284c7;
          border-color: #38bdf8;
          color: white;
        }

        .primary-contact:hover {
          color: white;
          background: #0369a1;
        }

        .contact-details {
          display: flex;
          justify-content: center;
          gap: 28px;
          flex-wrap: wrap;
          margin-top: 38px;
          color: #94a3b8;
          font-size: 14px;
        }

        .contact-details a {
          color: #94a3b8;
          text-decoration: none;
        }

        .contact-details a:hover {
          color: #38bdf8;
        }

        .contact-details span {
          margin-right: 5px;
        }

        .footer {
          display: flex;
          justify-content: center;
          gap: 10px;
          padding: 25px 8%;
          border-top: 1px solid rgba(148, 163, 184, 0.08);
          color: #64748b;
          font-size: 13px;
          flex-wrap: wrap;
        }

        @keyframes heroReveal {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-text {
          animation: heroReveal 0.7s ease-out both;
        }

        .profile-wrapper {
          animation: heroReveal 0.8s ease-out 0.08s both;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-text,
          .profile-wrapper {
            animation: none;
          }
        }

        @media (max-width: 850px) {
          .navbar {
            padding: 15px 5%;
          }

          .nav-links {
            display: none;
          }

          .mobile-menu-button {
            display: flex;
          }

          .mobile-menu {
            position: absolute;
            top: calc(100% + 8px);
            right: 5%;
            width: min(250px, 88vw);
            display: grid;
            gap: 4px;
            padding: 10px;
            border: 1px solid rgba(56, 189, 248, 0.16);
            border-radius: 16px;
            background: rgba(2, 6, 23, 0.96);
            box-shadow: 0 20px 55px rgba(0, 0, 0, 0.38);
          }

          .mobile-menu button {
            padding: 13px 14px;
            text-align: left;
            border: none;
            border-radius: 10px;
            background: transparent;
            color: #cbd5e1;
            text-transform: uppercase;
            letter-spacing: 1px;
            cursor: pointer;
          }

          .mobile-menu button:hover {
            background: rgba(14, 165, 233, 0.08);
            color: #38bdf8;
          }

          .hero {
            padding: 120px 6% 70px;
          }

          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero-description {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-buttons {
            justify-content: center;
          }

          .proof-strip {
            justify-content: center;
          }

          .ai-feature-grid {
            grid-template-columns: 1fr;
          }

          .profile-wrapper {
            margin-top: 20px;
          }

          .about-grid,
          .projects-grid,
          .certifications-grid,
          .freelance-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .navbar {
            position: absolute;
            align-items: flex-start;
          }

          .brand {
            font-size: 16px;
          }

          .nav-links {
            display: none;
          }

          .hero {
            padding-top: 110px;
          }

          .hero-socials {
            justify-content: center;
          }

          .hero-buttons .resume-button {
            width: 100%;
          }

          .hero h1 {
            font-size: 65px;
            letter-spacing: -4px;
          }

          .profile-frame {
            width: 270px;
            height: 330px;
          }

          .section {
            padding: 80px 6%;
          }

          .ai-console {
            padding: 20px;
          }

          .ai-input-row {
            flex-direction: column;
          }

          .ai-input-row button,
          .voice-button,
          .speak-button {
            width: 100%;
          }

          .proof-strip {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }

          .education-card {
            padding: 22px;
          }

          .education-card h3 {
            font-size: 20px;
          }

          .freelance-card {
            padding: 22px;
          }

          .project-actions,
          .freelance-actions,
          .modal-actions {
            flex-direction: column;
          }

          .project-actions .project-link,
          .freelance-actions .project-link,
          .modal-actions .project-link,
          .modal-actions .secondary-button {
            width: 100%;
            text-align: center;
          }

          .project-modal-backdrop {
            padding: 14px;
          }

          .project-modal {
            padding: 22px;
            border-radius: 18px;
          }

          .contact-details {
            flex-direction: column;
            gap: 15px;
          }
        }
      `}</style>
    </main>
  );
}

function SectionTitle({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="section-title">
      <p className="section-number">{number}</p>
      <h2>{title}</h2>
    </div>
  );
}

function AboutCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="about-card">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function ProjectCard({
  number,
  category,
  title,
  description,
  details,
  tech,
  link,
  onViewDetails,
}: {
  number: string;
  category: string;
  title: string;
  description: string;
  details: string;
  tech: string[];
  link?: string;
  onViewDetails: () => void;
}) {
  return (
    <div className="project-card">
      <p className="project-number">PROJECT {number}</p>

      <div className="project-category">{category}</div>

      <h3>{title}</h3>

      <p>{description}</p>

      <div className="tech-list">
        {tech.map((item) => (
          <span className="tech-tag" key={item}>
            {item}
          </span>
        ))}
      </div>

      <div className="project-actions">
        <button
          className="project-link secondary-link"
          onClick={onViewDetails}
          type="button"
        >
          VIEW DETAILS
        </button>

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            LIVE DEMO ↗
          </a>
        )}
      </div>
    </div>
  );
}