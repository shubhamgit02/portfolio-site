import React, { useState, useEffect, useRef } from "react";
import "./App.css";

// ─── 3D Particle + Matrix Canvas Background ──────────────────────────────────
function CoderBackground({ darkMode }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const frameRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const symbols = [
      "</>",
      "{}",
      "//",
      "=>",
      "&&",
      "fn",
      "[]",
      "()",
      "++",
      "if",
      "01",
      "λ",
      ">>",
      "::",
    ];
    const accent = darkMode ? "#00ff88" : "#2563eb";
    const faintR = darkMode ? "0,255,136" : "37,99,235";

    const nodes = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      z: Math.random() * 600 + 100,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      vz: (Math.random() - 0.5) * 0.4,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      symbolTimer: Math.random() * 80,
      pulse: Math.random() * Math.PI * 2,
    }));

    const streams = Array.from({ length: 20 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speed: 0.7 + Math.random() * 1.4,
      chars: Array.from({ length: 14 }, () => ({
        val: Math.floor(Math.random() * 2),
        timer: Math.random() * 30,
      })),
      spacing: 17,
      alpha: 0.06 + Math.random() * 0.07,
    }));

    const project = (x, y, z) => {
      const fov = 500;
      const scale = fov / (fov + z);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      return { sx: cx + (x - cx) * scale, sy: cy + (y - cy) * scale, scale };
    };

    const draw = () => {
      timeRef.current += 0.006;
      const t = timeRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Binary rain
      streams.forEach((s) => {
        s.y += s.speed;
        if (s.y > canvas.height + 250) {
          s.y = -250;
          s.x = Math.random() * canvas.width;
        }
        s.chars.forEach((c, i) => {
          c.timer--;
          if (c.timer < 0) {
            c.val = Math.floor(Math.random() * 2);
            c.timer = 18 + Math.random() * 35;
          }
          const yy = s.y - i * s.spacing;
          const fade = (1 - i / s.chars.length) * s.alpha;
          ctx.font = i === 0 ? "bold 11px 'Courier New'" : "11px 'Courier New'";
          ctx.fillStyle =
            i === 0 ? accent : `rgba(${faintR},${fade.toFixed(3)})`;
          ctx.fillText(c.val, s.x, yy);
        });
      });

      // Update nodes
      const { x: mx, y: my } = mouseRef.current;
      nodes.forEach((n) => {
        const { sx, sy } = project(n.x, n.y, n.z);
        const dx = sx - mx,
          dy = sy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160 && dist > 0) {
          n.vx += (dx / dist) * 0.05;
          n.vy += (dy / dist) * 0.05;
        }
        n.x += n.vx;
        n.y += n.vy;
        n.z += n.vz;
        n.vx *= 0.97;
        n.vy *= 0.97;
        n.vz *= 0.97;
        if (n.x < 0) n.x = canvas.width;
        if (n.x > canvas.width) n.x = 0;
        if (n.y < 0) n.y = canvas.height;
        if (n.y > canvas.height) n.y = 0;
        if (n.z < 50) n.z = 700;
        if (n.z > 750) n.z = 50;
        n.pulse += 0.018;
        n.symbolTimer++;
        if (n.symbolTimer > 90) {
          n.symbol = symbols[Math.floor(Math.random() * symbols.length)];
          n.symbolTimer = 0;
        }
      });

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const pa = project(nodes[i].x, nodes[i].y, nodes[i].z);
          const pb = project(nodes[j].x, nodes[j].y, nodes[j].z);
          const dx = pa.sx - pb.sx,
            dy = pa.sy - pb.sy;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 150) {
            const alpha =
              (1 - d / 150) * 0.22 * Math.min(pa.scale, pb.scale) * 2;
            ctx.beginPath();
            ctx.moveTo(pa.sx, pa.sy);
            ctx.lineTo(pb.sx, pb.sy);
            ctx.strokeStyle = `rgba(${faintR},${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw symbols
      nodes.forEach((n) => {
        const { sx, sy, scale } = project(n.x, n.y, n.z);
        const pulse = 0.85 + Math.sin(n.pulse) * 0.15;
        ctx.font = `${Math.round(
          scale * 13 * pulse
        )}px 'Courier New', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = accent;
        ctx.shadowBlur = scale * 8 * pulse;
        ctx.fillStyle = `rgba(${faintR},${(scale * 0.85).toFixed(3)})`;
        ctx.fillText(n.symbol, sx, sy);
        ctx.shadowBlur = 0;
      });

      // Hex grid
      const hexR = 55,
        hexW = hexR * Math.sqrt(3),
        hexH = hexR * 2;
      ctx.strokeStyle = darkMode
        ? "rgba(0,255,136,0.022)"
        : "rgba(37,99,235,0.04)";
      ctx.lineWidth = 0.4;
      const ox = (t * 5) % hexW,
        oy = (t * 2.5) % (hexH * 0.75);
      for (let row = -1; row < canvas.height / (hexH * 0.75) + 2; row++) {
        for (let col = -1; col < canvas.width / hexW + 2; col++) {
          const cx = col * hexW + (row % 2 === 0 ? 0 : hexW / 2) + ox;
          const cy = row * hexH * 0.75 + oy;
          ctx.beginPath();
          for (let s = 0; s < 6; s++) {
            const angle = (Math.PI / 3) * s - Math.PI / 6;
            s === 0
              ? ctx.moveTo(
                  cx + hexR * Math.cos(angle),
                  cy + hexR * Math.sin(angle)
                )
              : ctx.lineTo(
                  cx + hexR * Math.cos(angle),
                  cy + hexR * Math.sin(angle)
                );
          }
          ctx.closePath();
          ctx.stroke();
        }
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    draw();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

// ─── Glitch Text ──────────────────────────────────────────────────────────────
function GlitchText({ children }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setOn(true);
      setTimeout(() => setOn(false), 160);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(id);
  }, []);
  return (
    <h1 className={`glitch${on ? " glitch-active" : ""}`} data-text={children}>
      {children}
    </h1>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [text, setText] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const fullText = "$ student → engineer |";

  useEffect(() => {
    let index = 0,
      isDeleting = false;
    const id = setInterval(() => {
      if (!isDeleting && index <= fullText.length) {
        setText(fullText.slice(0, index));
        index++;
      } else if (isDeleting && index >= 0) {
        setText(fullText.slice(0, index));
        index--;
      }
      if (index === fullText.length) isDeleting = true;
      else if (index === 0 && isDeleting) isDeleting = false;
    }, 100);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handle = () => {
      const h = window.location.hash.replace("#", "");
      setActiveSection(h || "home");
    };
    handle();
    window.addEventListener("hashchange", handle);
    return () => window.removeEventListener("hashchange", handle);
  }, []);

  const nav = (s) => {
    setActiveSection(s);
    window.location.hash = s;
  };

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <CoderBackground darkMode={darkMode} />
      <div className="scanlines" aria-hidden="true" />

      <header className="navbar">
        <div className="nav-logo">
          <span className="bracket">&lt;</span>SY
          <span className="bracket">/&gt;</span>
        </div>
        <nav>
          <ul>
            {["home", "about", "skills", "certs", "projects", "contact"].map(
              (s) => (
                <li key={s}>
                  <button
                    onClick={() => nav(s)}
                    className={activeSection === s ? "active" : ""}
                  >
                    {s.toUpperCase()}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>
        <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </header>

      <main>
        {activeSection === "home" && (
          <div className="fade-in">
            <section className="intro">
              <div className="tag-comment">// hello_world.js</div>
              <GlitchText>Hi, I'm Shubham</GlitchText>
              <p className="typing-wrap">
                <span className="prompt-arrow">▶</span>
                <span className="typing">{text}</span>
                <span className="cursor-blink" />
              </p>
              <p className="bio">
                Student &amp; aspiring Full Stack engineer from India — learning
                by doing, building and deploying real infrastructure.
              </p>
              <div className="buttons">
                <a
                  href="https://github.com/shubhamgit02"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  &lt; GITHUB /&gt;
                </a>
                <a
                  href="mailto:shubhamyadav34576@gmail.com"
                  className="btn-outline"
                >
                  CONTACT_ME()
                </a>
              </div>
            </section>

            <section className="terminal">
              <div className="term-header">
                <span className="dot dot-r" />
                <span className="dot dot-y" />
                <span className="dot dot-g" />
                <span className="term-title">~/shubham — zsh</span>
              </div>
              <pre className="term-body">
                <span className="t-prompt">➜ ~ </span>
                <span className="t-cmd">whoami</span>
                {"\n"}
                <span className="t-key">name </span>
                <span className="t-sep">: </span>
                <span className="t-val">Shubham Yadav</span>
                {"\n"}
                <span className="t-key">role </span>
                <span className="t-sep">: </span>
                <span className="t-val">Full Stack Developer</span>
                {"\n"}
                <span className="t-key">status</span>
                <span className="t-sep">: </span>
                <span className="t-val">open_to_opportunities</span>
                {"\n"}
                <span className="t-key">stack </span>
                <span className="t-sep">: </span>
                <span className="t-val">MERN | AI/ML | Cloud | DevOps</span>
                {"\n"}
                <span className="t-key">motto </span>
                <span className="t-sep">: </span>
                <span className="t-val">"Do it now."</span>
                {"\n"}
                <span className="t-prompt">➜ ~ </span>
                <span className="t-cursor">█</span>
              </pre>
            </section>
          </div>
        )}

        {activeSection === "about" && (
          <section id="about" className="fade-in content-card">
            <div className="tag-comment">// about.md</div>
            <h2>About Me</h2>
            <p>
              I'm <strong>Shubham Yadav</strong>, a Computer Science student
              passionate about building projects that matter. I believe in
              taking initiative — experimenting with ideas, creating solutions,
              and making contributions that create an impact and can bring
              change. Along the way, I value collaboration as a way to
              strengthen creativity and broaden perspectives. My focus is on
              doing, learning, and delivering projects that go beyond code to
              inspire meaningful outcomes.
            </p>
          </section>
        )}

        {activeSection === "skills" && (
          <section id="skills" className="fade-in content-card">
            <div className="tag-comment">// tech_stack.json</div>
            <h2>💻 Tech Stack</h2>
            {[
              {
                label: "🧠 Languages",
                badges: [
                  [
                    "JavaScript",
                    "https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black",
                  ],
                  [
                    "C",
                    "https://img.shields.io/badge/C-A8B9CC?style=for-the-badge&logo=c&logoColor=black",
                  ],
                  [
                    "Java",
                    "https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white",
                  ],
                  [
                    "Python",
                    "https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white",
                  ],
                ],
              },
              {
                label: "🌐 Frontend",
                badges: [
                  [
                    "React",
                    "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB",
                  ],
                  [
                    "HTML5",
                    "https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white",
                  ],
                  [
                    "CSS3",
                    "https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white",
                  ],
                  [
                    "TailwindCSS",
                    "https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white",
                  ],
                  [
                    "Bootstrap",
                    "https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white",
                  ],
                ],
              },
              {
                label: "⚙️ Backend",
                badges: [
                  [
                    "Django",
                    "https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white",
                  ],
                  [
                    "Flask",
                    "https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white",
                  ],
                  [
                    "Node.js",
                    "https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node-dot-js&logoColor=white",
                  ],
                  [
                    "Express.js",
                    "https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white",
                  ],
                  [
                    "JWT",
                    "https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white",
                  ],
                ],
              },
              {
                label: "🗄️ Databases",
                badges: [
                  [
                    "MySQL",
                    "https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white",
                  ],
                  [
                    "MongoDB",
                    "https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white",
                  ],
                  [
                    "PostgreSQL",
                    "https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white",
                  ],
                ],
              },
              {
                label: "🛠️ Tools & DevOps",
                badges: [
                  [
                    "Git",
                    "https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white",
                  ],
                  [
                    "GitHub",
                    "https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white",
                  ],
                  [
                    "Docker",
                    "https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white",
                  ],
                  [
                    "Linux",
                    "https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black",
                  ],
                  [
                    "Vercel",
                    "https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white",
                  ],
                  [
                    "Postman",
                    "https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white",
                  ],
                ],
              },
            ].map(({ label, badges }) => (
              <div key={label}>
                <h3>{label}</h3>
                <div className="badges">
                  {badges.map(([alt, src]) => (
                    <img key={alt} src={src} alt={alt} />
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {activeSection === "certs" && (
          <section id="certs" className="fade-in content-card">
            <div className="tag-comment">// certifications.txt</div>
            <h2>Certifications</h2>
            <ul className="cert-list">
              <li>
                <span className="cert-icon">☁️</span>Azure Fundamentals
              </li>
              <li>
                <span className="cert-icon">🐍</span>Python FullStack
                Development Course
              </li>
              <li>
                <span className="cert-icon">☕</span>Object Oriented Programming
                with Java
              </li>
            </ul>
          </section>
        )}

        {activeSection === "projects" && (
          <section id="projects" className="fade-in content-card">
            <div className="tag-comment">// projects/</div>
            <h2>Projects</h2>
            <div className="project-grid">
              {[
                {
                  name: "Farmer Assistant App",
                  icon: "🌾",
                  desc: "AI-powered assistant for farmers",
                },
                {
                  name: "AI Caller Agent",
                  icon: "🤖",
                  desc: "Automated voice calling with AI",
                },
                {
                  name: "ShootX Game",
                  icon: "🎮",
                  desc: "Browser-based shooting game",
                },
                {
                  name: "Metadata Remover",
                  icon: "🔒",
                  desc: "Strip metadata from files privately",
                },
              ].map((p) => (
                <div className="project-card" key={p.name}>
                  <div className="project-icon">{p.icon}</div>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <span className="project-tag">// view project</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === "contact" && (
          <section id="contact" className="fade-in content-card">
            <div className="tag-comment">// contact.json</div>
            <h2>Contact</h2>
            <div className="contact-list">
              <div className="contact-item">
                <span className="contact-label">📧 email</span>
                <a href="mailto:shubhamyadav34576@gmail.com">
                  shubhamyadav34576@gmail.com
                </a>
              </div>
              <div className="contact-item">
                <span className="contact-label">🐙 github</span>
                <a
                  href="https://github.com/shubhamgit02"
                  target="_blank"
                  rel="noreferrer"
                >
                  shubhamgit02
                </a>
              </div>
              <div className="contact-item">
                <span className="contact-label">💼 linkedin</span>
                <a
                  href="https://linkedin.com/in/shubham-yadav-27100b2b0"
                  target="_blank"
                  rel="noreferrer"
                >
                  shubham-yadav-27100b2b0
                </a>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
