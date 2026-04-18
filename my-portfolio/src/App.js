import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [text, setText] = useState("");
  const [activeSection, setActiveSection] = useState("home"); // NEW state
  const fullText = "$ student to engineer |";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={darkMode ? "App dark" : "App light"}>
      <header className="navbar">
        <nav>
          <ul>
            <li>
              <button onClick={() => setActiveSection("home")}>HOME</button>
            </li>
            <li>
              <button onClick={() => setActiveSection("about")}>ABOUT</button>
            </li>
            <li>
              <button onClick={() => setActiveSection("skills")}>SKILLS</button>
            </li>
            <li>
              <button onClick={() => setActiveSection("certs")}>CERTS</button>
            </li>
            <li>
              <button onClick={() => setActiveSection("projects")}>
                PROJECTS
              </button>
            </li>
            <li>
              <button onClick={() => setActiveSection("contact")}>
                CONTACT
              </button>
            </li>
          </ul>
        </nav>

        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </header>

      <main>
        {activeSection === "home" && (
          <section className="intro">
            <h1>Hi, I'm Shubham</h1>
            <p className="typing">{text}</p>
            <p>
              Student & aspiring Full Stack engineer from India — learning by
              doing, building and deploying real infrastructure.
            </p>
            <div className="buttons">
              <a
                href="https://github.com/shubhamgit02"
                target="_blank"
                rel="noreferrer"
              >
                GITHUB
              </a>
              <a href="mailto:shubhamyadav34576@gmail.com">CONTACT</a>
            </div>
          </section>
        )}

        {activeSection === "about" && (
          <section id="about">
            <h2>About Me</h2>
            <p>
              I'm Shubham Yadav, a Computer Science student passionate about
              building projects that matter. I believe in taking initiative —
              experimenting with ideas, creating solutions, and making
              contributions that create an impact and can bring change. Along
              the way, I value collaboration as a way to strengthen creativity
              and broaden perspectives. My focus is on doing, learning, and
              delivering projects that go beyond code to inspire meaningful
              outcomes.
            </p>
          </section>
        )}

        {activeSection === "skills" && (
          <section id="skills">
            <h2>💻 Tech Stack</h2>
            {/* keep your badges exactly as before */}
            {/* Languages, Frontend, Backend, Databases, Tools & DevOps */}
          </section>
        )}

        {activeSection === "certs" && (
          <section id="certs">
            <h2>Certifications</h2>
            <ul>
              <li>Azure Fundamentals</li>
              <li>Other certs you want to list…</li>
            </ul>
          </section>
        )}

        {activeSection === "projects" && (
          <section id="projects">
            <h2>Projects</h2>
            <ul>
              <li>Farmer Assistant App</li>
              <li>AI Caller Agent</li>
              <li>ShootX Game</li>
              <li>Metadata Remover</li>
            </ul>
          </section>
        )}

        {activeSection === "contact" && (
          <section id="contact">
            <h2>Contact</h2>
            <p>Email: shubhamyadav34576@gmail.com</p>
            <p>GitHub: shubhamgit02</p>
            <p>LinkedIn: linkedin.com/in/shubham-yadav-27100b2b0</p>
          </section>
        )}

        {activeSection === "home" && (
          <section className="terminal">
            <pre>
              {`> whoami
name : Shubham Yadav
role : Full Stack Developer
status : open_to_opportunities
→ Full Stack Development | AI/ML | cloud fundamentals | MERN | 
"Do it now"`}
            </pre>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
