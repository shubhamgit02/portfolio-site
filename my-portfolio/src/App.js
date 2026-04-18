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
            <li><a href="#about">ABOUT</a></li>
            <li><a href="#skills">SKILLS</a></li>
            <li><a href="#certs">CERTS</a></li>
            <li><a href="#projects">PROJECTS</a></li>
            <li><a href="#contact">CONTACT</a></li>
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
          Student & aspiring FUll Stack engineer from India — learning by
          doing, building and deploying real infrastructure.
        </p>
        <div className="buttons">
          <a href="https://github.com/shubhamgit02" target="_blank" rel="noreferrer">GITHUB</a>
          <a href="mailto:shubhamyadav34576@gmail.com">CONTACT</a>
        </div>
        <a href="#resume" className="resume">↓ RESUME</a>
      </main>

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
