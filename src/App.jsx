import { useEffect, useState } from "react";
import { personalInfo as info } from "./data/personalInfo.js";
import { skills } from "./data/skills.js";
import { projects } from "./data/projects.js";

const navItems = ["About", "Skills", "Projects", "Contact"];

function ExternalLink({ href, children, className = "text-link" }) {
  if (!href) return null;
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>;
}

function Header({ active, progress }) {
  const [open, setOpen] = useState(false);
  return <>
    <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
    <header className="site-header" id="top">
      <a className="wordmark" href="#top" aria-label="Kaustubh Raj, back to top">KR<span className="wordmark-slash">/</span><span className="wordmark-name">KAUSTUBH RAJ</span></a>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? "CLOSE −" : "MENU +"}</button>
      <nav id="main-nav" className={open ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
        {navItems.map((item) => <a key={item} className={active === item.toLowerCase() ? "nav-link active" : "nav-link"} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>{item}</a>)}
        <span className="availability"><i aria-hidden="true" /> OPEN TO OPPORTUNITIES</span>
      </nav>
    </header>
  </>;
}

function SectionLabel({ number, children }) {
  return <div className="section-label"><span>{number}</span><span>{children}</span></div>;
}

function ProjectRow({ project }) {
  return <article className={`project ${project.featured ? "project-featured" : ""}`}>
    <div className="project-index">/{project.number}</div>
    <div className="project-body">
      <p className="eyebrow">{project.kind}</p>
      <h3>{project.name}</h3>
      <p className="project-summary">{project.summary}</p>
      <p className="project-details">{project.details}</p>
      <ul className="tag-list" aria-label={`${project.name} technologies`}>{project.stack.map((tag) => <li key={tag}>{tag}</li>)}</ul>
      <div className="project-actions">
        {project.demo && <ExternalLink href={project.demo} className="button button-dark">LIVE DEMO <span aria-hidden="true">↗</span></ExternalLink>}
        {project.repo && <ExternalLink href={project.repo} className="button button-light">SOURCE <span aria-hidden="true">↗</span></ExternalLink>}
      </div>
    </div>
    <div className="project-visual" aria-hidden="true"><span>{project.mark}</span><small>BUILD / {project.number}</small></div>
  </article>;
}

function App() {
  const [active, setActive] = useState("about");
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.toLowerCase())).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.2, 0.5] });
    sections.forEach((section) => observer.observe(section));
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  return <>
    <Header active={active} progress={progress} />
    <main>
      <section className="hero page-wrap" aria-labelledby="hero-title">
        <div className="hero-topline"><span>PORTFOLIO / 2026</span><span>STUDY / DELHI</span></div>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">HELLO, WORLD! I’M</p>
            <h1 id="hero-title">KAUSTUBH<br /><span>RAJ<span className="period">.</span></span></h1>
            <div className="hero-bottom">
              <p className="hero-title">Software developer<br />&amp; IT student</p>
              <p className="hero-intro">I build full-stack software, explore how systems work, and turn ideas into useful, working products.</p>
            </div>
            <div className="hero-actions"><a className="button button-dark" href="#projects">EXPLORE MY WORK <span aria-hidden="true">↘</span></a><a className="button button-light" href="#contact">GET IN TOUCH <span aria-hidden="true">↗</span></a></div>
          </div>
          <aside className="hero-note" aria-label="Portfolio note"><div className="note-rule" /><span className="note-index">NOTE / 001</span><p>Curiosity is the starting point.<br />Working software is the answer.</p><div className="note-code"><span>const</span> focus = [<br />&nbsp;&nbsp;“full stack”,<br />&nbsp;&nbsp;“real time”,<br />&nbsp;&nbsp;“the details”<br />];</div><span className="note-coordinates">28°36′ N&nbsp; 77°13′ E</span></aside>
        </div>
        <div className="hero-foot"><span>SCROLL TO EXPLORE</span><span>01 — 04</span></div>
      </section>

      <section className="section page-wrap" id="about">
        <SectionLabel number="01">A LITTLE ABOUT ME</SectionLabel>
        <div className="about-grid"><h2>Learning by<br />building things.</h2><div className="about-copy"><p>{info.intro}</p><div className="about-facts"><div><span className="eyebrow">EDUCATION</span><strong>{info.school}</strong><span>{info.degree} · {info.period}</span></div><div><span className="eyebrow">CURRENT MARK</span><strong>{info.cgpa}</strong><span>Current CGPA</span></div></div><div className="experience-note"><span className="eyebrow">RECENT EXPERIENCE · JUNE—JULY 2026</span><strong>Software Development Intern</strong><span>509 Army Base Workshop (TT Cell), Agra</span><p>Built a vocational training portal with role-based access, attendance and scoring workflows, broadcasts, and progress dashboards.</p></div></div></div>
      </section>

      <section className="section page-wrap" id="skills">
        <SectionLabel number="02">TOOLS OF THE TRADE</SectionLabel>
        <div className="section-heading-row"><h2>What I work with.</h2><p>Technologies used across my coursework, projects, and internship.</p></div>
        <div className="skills-list">{skills.map((group, index) => <div className="skill-row" key={group.label}><span className="skill-number">0{index + 1}</span><h3>{group.label}</h3><ul>{group.values.map((value) => <li key={value}>{value}</li>)}</ul></div>)}</div>
      </section>

      <section className="section projects-section" id="projects">
        <div className="page-wrap"><SectionLabel number="03">SELECTED WORK</SectionLabel><div className="section-heading-row"><h2>Things I’ve built.</h2><p>A collection of things I’ve built, experimented with, and worked on.</p></div>
          <div className="projects-list">{projects.map((project) => <ProjectRow project={project} key={project.number} />)}</div>
        </div>
      </section>

      <section className="section page-wrap exploring">
        <SectionLabel number="04">CURRENTLY EXPLORING</SectionLabel>
        <div className="explore-grid"><h2>Keep asking<br />how it works.</h2><div><p className="explore-caption">Always learning. Always building.</p><ul className="explore-list"><li>Data Structures and Algorithms</li><li>Software Development</li><li>Backend Development</li><li>Full Stack Development</li></ul></div></div>
      </section>

      <section className="contact-section" id="contact"><div className="page-wrap contact-inner"><SectionLabel number="05">LET’S CONNECT</SectionLabel><div className="contact-grid"><div><h2>Have a good<br />problem to solve?</h2><p>Have an interesting idea, opportunity, or just want to talk about technology? Feel free to reach out.</p></div><div className="contact-links"><a className="contact-link" href={`mailto:${info.email}`}><span>EMAIL</span><strong>{info.email}</strong><span aria-hidden="true">↗</span></a><ExternalLink href={info.github} className="contact-link"><span>GITHUB</span><strong>github.com/kaustubhxr</strong><span aria-hidden="true">↗</span></ExternalLink><ExternalLink href={info.linkedin} className="contact-link"><span>LINKEDIN</span><strong>linkedin.com/in/kaustubh-raj</strong><span aria-hidden="true">↗</span></ExternalLink></div></div></div></section>
    </main>
    <footer className="site-footer page-wrap"><a className="footer-name" href="#top">KAUSTUBH RAJ<span>.</span></a><span className="footer-note">DESIGNED &amp; DEVELOPED WITH CURIOSITY.</span><span className="footer-year">© {new Date().getFullYear()}</span><a className="back-top" href="#top">BACK TO TOP ↑</a></footer>
  </>;
}

export default App;
