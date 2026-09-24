import Image from "next/image";
import Link from "next/link";
import ArchiveMotion from "./archive-motion";
import BootCurtain from "./boot-curtain";
import Galaxy from "./galaxy";
import ParticleHero from "./particle-hero";
import Reveal from "./reveal";
import TechIcon from "./tech-icon";
import { FiArrowUpRight, FiFileText, FiGithub, FiMail } from "react-icons/fi";

const GITHUB = "https://github.com/haruhadj";
const EMAIL = "michaelfernandezskie@gmail.com";
const BASE = "/portfolio";

type Deployment = {
  name: string;
  summary: string;
  stack: readonly string[];
  live?: string;
  repo: string;
  shot?: string;
};

const deployments: readonly Deployment[] = [
  { name: "tsugi", summary: "Fast anime and manga recommendation sharing. Choose one title or several, score them, and get a rich shareable link in under 10 seconds.", stack: ["Next.js", "TypeScript", "Supabase"], live: "https://tsugi.haruhadj.org/feed", repo: `${GITHUB}/tsugi`, shot: "tsugi-showcase.png" },
  { name: "nekostream", summary: "Self-hosted anime tracker with AniList search, Nyaa.si RSS episode lists, and synced AniList and MyAnimeList progress.", stack: ["Next.js", "TypeScript", "Docker"], repo: `${GITHUB}/nekostream`, shot: "nekostream-img.png" },
  { name: "rss2mail", summary: "RSS feed monitor that sends new items to Gmail or Facebook Messenger, with a WebUI for feeds, settings, and logs.", stack: ["TypeScript", "Python", "Docker"], repo: `${GITHUB}/rss2mail` },
  { name: "skillforge", summary: "A multi-app learning platform with independent modules sharing one scoring and progression layer.", stack: ["Next.js", "TypeScript"], live: "https://skillforge.haruhadj.org/", repo: `${GITHUB}/skillforge`, shot: "skillforge.png" },
  { name: "secure-qr-attendance", summary: "QR-code attendance system for real classrooms, with secure check-ins that remove the roll call.", stack: ["Next.js", "TypeScript"], live: "https://secure-qr-attendance.vercel.app", repo: `${GITHUB}/secure-qr-attendance`, shot: "qr-attendance.png" },
  { name: "payroll-system", summary: "Payroll management for employee records, computations, and payslips from start to finish.", stack: ["TypeScript"], live: "https://payroll-system-fawn.vercel.app", repo: `${GITHUB}/payroll-system`, shot: "payroll.png" },
  { name: "faculty-evaluation-system", summary: "Role-aware academic evaluation for Our Lady of Assumption College, including secure student workflows, period management, and reporting.", stack: ["Next.js", "Hono", "Supabase", "Drizzle ORM"], live: "https://faculty-evaluation-system-zeta.vercel.app/", repo: `${GITHUB}/faculty-evaluation-system`, shot: "faculty-demo.png" },
];

const processes = [
  { name: "reddit-ai-summarizer-extension", summary: "Browser extension that summarizes a Reddit post and its top comments with the visitor's own API key.", lang: "TypeScript" },
  { name: "trace-dsa-study", summary: "DSA study companion with 17 topics, 21 interactive visualizers, and 52 curated problems.", lang: "TypeScript" },
  { name: "webdav-server", summary: "Tiny self-hosted WebDAV server, packaged as one static Go binary in a small Docker image.", lang: "Go" },
  { name: "streamsync-yt", summary: "YouTube music requests for streamers, with a live queue and OBS overlay.", lang: "TypeScript" },
  { name: "grandmaster-chess", summary: "Responsive chess with single-player AI and real-time multiplayer over WebSockets.", lang: "TypeScript" },
  { name: "core-dsa", summary: "Data structures and algorithms implemented from scratch in TypeScript.", lang: "TypeScript" },
] as const;

const capabilityGroups = [
  { title: "Application", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { title: "Systems", items: ["Hono", "Zod", "PostgreSQL", "Drizzle ORM"] },
  { title: "AI workflow", items: ["Claude Code", "Codex"] },
  { title: "Delivery", items: ["Docker", "Vercel", "Cloudflare", "CI/CD"] },
] as const;

const featuredNames = ["tsugi", "skillforge", "faculty-evaluation-system", "nekostream"] as const;
const featured = featuredNames.flatMap((name) => deployments.filter((project) => project.name === name));
const projectIndex = deployments.filter((project) => !featuredNames.includes(project.name as (typeof featuredNames)[number]));

function ProjectLinks({ project }: { project: Deployment }) {
  return <div className="orbit-project-links">
    {project.live && <a href={project.live} target="_blank" rel="noreferrer">View site <FiArrowUpRight aria-hidden /></a>}
    <a href={project.repo} target="_blank" rel="noreferrer">Source <FiGithub aria-hidden /></a>
  </div>;
}

export default function Home() {
  return <div id="top" className="portfolio-shell portfolio-v3">
    <BootCurtain />
    <Galaxy focal={[0.52, 0.42]} density={0.82} hueShift={205} glowIntensity={0.28} saturation={0.42} starSpeed={0.22} twinkleIntensity={0.18} rotationSpeed={0.018} repulsionStrength={0.9} />
    <div className="orbit-atmosphere" aria-hidden />
    <ArchiveMotion />
    <header className="orbit-header">
      <nav className="orbit-nav" aria-label="Main navigation">
        <a href="#work" className="is-active">Work</a>
        <a href="#about">About</a>
        <a href="#stack">Stack</a>
        <a href="#contact">Contact</a>
      </nav>
      <Link href="/resume" className="orbit-resume">Résumé <FiArrowUpRight aria-hidden /></Link>
    </header>
    <main>
      <section className="orbit-hero" aria-labelledby="hero-title">
        <div className="orbit-hero-copy">
          <h1 id="hero-title">Michael Fernandez.</h1>
          <p className="orbit-summary">I use AI to move faster from idea to working software—while staying accountable for the design, decisions, and systems that ship.</p>
          <div className="orbit-actions">
            <a href="#work" className="orbit-button orbit-button-primary">View work</a>
            <Link href="/resume" className="orbit-button orbit-button-secondary"><FiFileText aria-hidden /> Read résumé</Link>
          </div>
        </div>
        <div className="orbit-particle" role="img" aria-label="Interactive particle study driven by the Bad Apple video">
          <ParticleHero className="orbit-particle-field" />
        </div>
      </section>
      <section id="work" className="orbit-section orbit-work" aria-labelledby="work-title">
        <Reveal><div className="orbit-section-heading"><h2 id="work-title">Selected work</h2><p>Real products with live deployments, source, and concrete interface evidence.</p></div></Reveal>
        <div className="orbit-project-grid">
          {featured.map((project, index) => <Reveal key={project.name} delay={index * 70} className={`orbit-project-wrap orbit-project-${index + 1}`}>
            <article className="orbit-project">
              {project.shot && <div className="orbit-project-media"><Image src={`${BASE}/shots/${project.shot}`} alt={`${project.name} interface`} fill sizes="(min-width: 1024px) 58vw, 100vw" /></div>}
              <div className="orbit-project-copy">
                <h3>{project.name}</h3><p>{project.summary}</p>
                <ul className="tech-list" aria-label={`${project.name} technology`}>
                  {project.stack.map((item) => <li key={item}><TechIcon name={item} />{item}</li>)}
                </ul>
                <ProjectLinks project={project} />
              </div>
            </article>
          </Reveal>)}
        </div>
        <Reveal><div className="orbit-more-work" aria-label="More projects"><h3>More builds</h3>
          {projectIndex.map((project) => <article key={project.name}>
            <div><h4>{project.name}</h4><p>{project.summary}</p></div><ProjectLinks project={project} />
          </article>)}
        </div></Reveal>
      </section>
      <section id="about" className="orbit-section orbit-about" aria-labelledby="about-title">
        <Reveal><div className="orbit-about-copy"><h2 id="about-title">I care about the seams.</h2><p>I build type-safe applications with careful attention to contracts, data, deployment, and the failures that show up after launch. AI helps me explore and iterate faster, while I stay accountable for the architecture, decisions, and what ships.</p></div></Reveal>
        <div className="orbit-principles" aria-label="Engineering focus"><span>Typed contracts</span><span>Production workflows</span><span>AI-assisted building</span><span>Measured infrastructure</span></div>
      </section>
      <section id="stack" className="orbit-section orbit-stack" aria-labelledby="stack-title">
        <Reveal><div className="orbit-section-heading"><h2 id="stack-title">Across the stack</h2><p>Product surfaces, backend boundaries, data models, and the delivery path that connects them.</p></div></Reveal>
          <div className="orbit-capabilities">{capabilityGroups.map((group) => <section key={group.title} className="orbit-capability" aria-label={group.title}>
            <h3>{group.title}</h3><div>{group.items.map((item) => <span key={item}><TechIcon name={item} />{item}</span>)}</div>
          </section>)}</div>
      </section>
      <section id="experiments" className="orbit-section orbit-experiments" aria-labelledby="experiments-title">
        <Reveal><div className="orbit-section-heading"><h2 id="experiments-title">Experiments</h2><p>Smaller tools and studies that sharpen the next build.</p></div></Reveal>
        <div className="orbit-experiment-list">{processes.map((project, index) => <Reveal key={project.name} delay={(index % 2) * 60}>
          <a className="orbit-experiment" href={`${GITHUB}/${project.name}`} target="_blank" rel="noreferrer">
            <span>{project.lang}</span><h3>{project.name}</h3><p>{project.summary}</p><FiArrowUpRight aria-hidden />
          </a>
        </Reveal>)}</div>
      </section>
    </main>
    <footer id="contact" className="orbit-contact" aria-labelledby="contact-title">
      <Reveal><h2 id="contact-title">Let&apos;s build something dependable.</h2><p>I&apos;m actively looking for a junior or entry-level full-stack engineering role.</p>
        <a className="orbit-email" href={`mailto:${EMAIL}`}>{EMAIL}<FiArrowUpRight aria-hidden /></a>
        <div className="orbit-contact-actions">
          <a className="orbit-button orbit-button-primary" href={`mailto:${EMAIL}`}><FiMail aria-hidden /> Email Michael</a>
          <a className="orbit-button orbit-button-secondary" href={GITHUB} target="_blank" rel="noreferrer"><FiGithub aria-hidden /> GitHub profile</a>
        </div>
      </Reveal>
      <p className="footer-note">© {new Date().getFullYear()} Michael Fernandez. Built with Next.js.</p>
    </footer>
  </div>;
}
