import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [text, setText] = useState("");
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
              <a href="#about">ABOUT</a>
            </li>
            <li>
              <a href="#skills">SKILLS</a>
            </li>
            <li>
              <a href="#certs">CERTS</a>
            </li>
            <li>
              <a href="#projects">PROJECTS</a>
            </li>
            <li>
              <a href="#contact">CONTACT</a>
            </li>
          </ul>
        </nav>

        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </header>

      <main className="intro">
        <h1>Hi, I'm Shubham</h1>
        <p className="typing">{text}</p>
        <p>
          Student & aspiring FUll Stack engineer from India — learning by doing,
          building and deploying real infrastructure.
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
      </main>

      <section id="about">
        <h2>About Me</h2>
        <p>
          I'm Shubham Yadav, a Computer Science student passionate about
          building projects that matter. I believe in taking initiative —
          experimenting with ideas, creating solutions, and making contributions
          that create an impact and can bring change. Along the way, I value
          collaboration as a way to strengthen creativity and broaden
          perspectives. My focus is on doing, learning, and delivering projects
          that go beyond code to inspire meaningful outcomes.
        </p>
      </section>

      <section id="skills">
        <h2>💻 Tech Stack</h2>

        <h3>🧠 Languages</h3>
        <div className="badges">
          <img
            src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"
            alt="JavaScript"
          />
          <img
            src="https://img.shields.io/badge/C-A8B9CC?style=for-the-badge&logo=c&logoColor=black"
            alt="C"
          />
          <img
            src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white"
            alt="Java"
          />
          <img
            src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white"
            alt="Python"
          />
        </div>

        <h3>🌐 Frontend</h3>
        <div className="badges">
          <img
            src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"
            alt="React"
          />
          <img
            src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"
            alt="HTML5"
          />
          <img
            src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"
            alt="CSS3"
          />
          <img
            src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"
            alt="TailwindCSS"
          />
          <img
            src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white"
            alt="Bootstrap"
          />
        </div>

        <h3>⚙️ Backend</h3>
        <div className="badges">
          <img
            src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white"
            alt="Django"
          />
          <img
            src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white"
            alt="Flask"
          />
          <img
            src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node-dot-js&logoColor=white"
            alt="NodeJS"
          />
          <img
            src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"
            alt="ExpressJS"
          />
          <img
            src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white"
            alt="JWT"
          />
        </div>

        <h3>🗄️ Databases</h3>
        <div className="badges">
          <img
            src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white"
            alt="MySQL"
          />
          <img
            src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"
            alt="MongoDB"
          />
          <img
            src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"
            alt="PostgreSQL"
          />
        </div>

        <h3>🛠️ Tools & DevOps</h3>
        <div className="badges">
          <img
            src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white"
            alt="Git"
          />
          <img
            src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"
            alt="GitHub"
          />
          <img
            src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white"
            alt="Postman"
          />
          <img
            src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"
            alt="Docker"
          />
          <img
            src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"
            alt="Vercel"
          />
          <img
            src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white"
            alt="Render"
          />
          <img
            src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black"
            alt="Linux"
          />
        </div>
      </section>

      <section className="terminal">
        <pre>
          {`> whoami
name : Shubham Yadav
role : Full Stack Developer
status : open_to_opportunities
→ Full Stack Development | AI/ML | cloud fundamentalss | MERN | 
"Do it now"`}
        </pre>
      </section>
    </div>
  );
}

export default App;
