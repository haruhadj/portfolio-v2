import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "./print-button";

export const metadata: Metadata = {
  title: "Résumé — Michael Fernandez",
  description:
    "Résumé of Michael Fernandez — full-stack developer. TypeScript, Next.js, PostgreSQL, Docker, Go.",
};

const EMAIL = "michaelfernandezskie@gmail.com";
const PHONE = "0924 481 6674";
const GITHUB = "https://github.com/haruhadj";
const SITE = "https://haruhadj.org/portfolio";

const skills = [
  {
    label: "Languages",
    items: "TypeScript, JavaScript (ES6+), Python, Go, SQL",
  },
  {
    label: "Web",
    items: "Next.js, React, Node.js, Hono, Tailwind CSS, Zod, better-auth",
  },
  { label: "Data", items: "PostgreSQL, SQLite, Drizzle ORM" },
  {
    label: "Infrastructure",
    items:
      "Docker, Linux (ARM64), Cloudflare DNS & Tunnels, Vercel, CI/CD, local LLMs",
  },
];

const projects = [
  {
    name: "Faculty Evaluation System",
    tagline: "Role-aware academic evaluation platform",
    stack: "Next.js · Hono · Supabase · Drizzle ORM",
    url: "https://faculty-evaluation-system-zeta.vercel.app/",
    label: "faculty-evaluation-system-zeta.vercel.app",
    bullets: [
      "Built a role-aware faculty evaluation platform for Our Lady of Assumption College, with administrator, faculty, and student workspaces protected by caller-scoped authentication.",
      "Designed typed request contracts and PostgreSQL workflows for evaluation periods, assignments, immutable submissions, and report exports.",
    ],
  },
  {
    name: "NekoStream",
    tagline: "Self-hosted anime tracker",
    stack: "Next.js · PostgreSQL · Docker",
    bullets: [
      "Integrated two third-party OAuth providers (AniList and MyAnimeList), synchronizing watch progress to both simultaneously and reconciling state between their differing APIs.",
      "Packaged with Docker Compose and deployed to ARM64 hardware like Raspberry Pi 5 server; config fully environment-driven.",
    ],
  },
  {
    name: "RSS2Mail",
    tagline: "Multi-channel feed notifier",
    stack: "TypeScript · Python · Docker",
    bullets: [
      "Delivers new items from any RSS/Atom feed through two channels: Gmail SMTP and Messenger.",
      "Built a web dashboard for feed management, settings, and log inspection.",
    ],
  },
  {
    name: "Tsugi",
    tagline: "Fast anime/manga recommendation sharing",
    stack: "Next.js · Typscript · Supabase",
    url: "https://tsugi.haruhadj.org/",
    label: "tsugi.haruhadj.org",
    bullets: [
      "Fast anime/manga recommendation sharing. Sign in, pick one title or several, score them, and get a shareable link with a rich social preview — in under 10 seconds. Anyone can open that link; only creating needs an account.",
    ],
  },
];

const alsoShipped = [
  {
    name: "WebDAV Server",
    desc: "Self-hosted file server; static Go binary in a ~20 MB Docker image.",
  },
  {
    name: "SkillForge",
    desc: "Educational game library.",
    url: "https://skillforge.haruhadj.org/",
    label: "skillforge.haruhadj.org",
  },
  {
    name: "Secure QR Attendance",
    desc: "QR-based classroom attendance.",
    url: "https://secure-qr-attendance.vercel.app",
    label: "secure-qr-attendance.vercel.app",
  },
  {
    name: "Payroll System",
    desc: "Employee records and payslip generation.",
    url: "https://payroll-system-fawn.vercel.app",
    label: "payroll-system-fawn.vercel.app",
  },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="resume-h2 mt-8 border-b border-border-line pb-1 font-mono text-sm font-bold uppercase tracking-widest text-accent">
      {children}
    </h2>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <span className="text-muted" aria-hidden>
        ▸
      </span>
      <span>{children}</span>
    </li>
  );
}

export default function Resume() {
  return (
    <div className="resume-page mx-auto w-full max-w-3xl px-5 py-12 sm:px-8">
      {/* screen-only controls */}
      <div className="no-print mb-10 flex flex-wrap items-center gap-4 font-mono text-sm">
        <Link
          href="/"
          className="text-muted transition-colors hover:text-accent"
        >
          ← back to portfolio
        </Link>
        <Link
          href="/resume/general"
          className="text-muted transition-colors hover:text-accent"
        >
          general resume
        </Link>
        <span className="flex-1" />
        <PrintButton />
      </div>

      <header>
        <h1 className="font-mono text-4xl font-bold tracking-tighter text-foreground sm:text-5xl">
          Michael G. Fernandez
        </h1>
        <p className="mt-2 font-mono text-base text-accent">
          Full-Stack Developer
        </p>
        <p className="resume-contact mt-3 text-sm text-muted">
          San Pedro, Laguna, Philippines
          <span className="mx-2">·</span>
          <a href={`mailto:${EMAIL}`} className="hover:text-accent">
            {EMAIL}
          </a>
          <span className="mx-2">·</span>
          <a href="tel:+639244816674" className="hover:text-accent">
            {PHONE}
          </a>
          <br />
          <a href={GITHUB} className="hover:text-accent">
            github.com/haruhadj
          </a>
          <span className="mx-2">·</span>
          <a href={SITE} className="hover:text-accent">
            haruhadj.org/portfolio
          </a>
        </p>
      </header>

      <SectionTitle>Summary</SectionTitle>
      <p className="mt-3 text-sm leading-relaxed text-foreground/90">
        Full-stack developer: type-safe TypeScript from PostgreSQL schema to
        Docker deployment, self-hosted on my own ARM64 infrastructure. BS
        Computer Science (July 2026), seeking a junior developer role.
      </p>

      <SectionTitle>Technical Skills</SectionTitle>
      <dl className="mt-3 space-y-1.5 text-sm">
        {skills.map((s) => (
          <div
            key={s.label}
            className="flex flex-col gap-0.5 sm:flex-row sm:gap-3"
          >
            <dt className="shrink-0 font-mono text-xs uppercase tracking-wider text-muted sm:w-32 sm:pt-0.5">
              {s.label}
            </dt>
            <dd className="text-foreground/90">{s.items}</dd>
          </div>
        ))}
      </dl>

      <SectionTitle>Projects</SectionTitle>
      <div className="mt-3 space-y-5">
        {projects.map((p) => (
          <article key={p.name} className="resume-item">
            <h3 className="font-mono text-base font-bold text-foreground">
              {p.name}{" "}
              <span className="font-normal text-muted">— {p.tagline}</span>{" "}
              <span className="text-xs font-normal text-accent">
                · {p.stack}
              </span>
            </h3>
            <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-foreground/90">
              {p.bullets.map((b, index) => (
                <Bullet key={b}>{b} {p.url && index === 0 && (
                <>
                  <span className="text-muted">· </span>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-normal text-accent hover:underline"
                  >
                    {p.label || p.url}
                  </a>{" "}
                </>
              )}</Bullet>
              ))}
              
            </ul>
          </article>
        ))}

        <article className="resume-item">
          <h3 className="font-mono text-base font-bold text-foreground">
            Also shipped
          </h3>
          <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-foreground/90">
            {alsoShipped.map((d) => (
              <Bullet key={d.name}>
                <strong className="font-semibold">{d.name}</strong> — {d.desc}
                {d.url && (
                  <>
                    {" "}
                    <a href={d.url} className="text-accent hover:underline">
                      {d.label}
                    </a>
                  </>
                )}
              </Bullet>
            ))}
          </ul>
        </article>
      </div>

      <SectionTitle>Education</SectionTitle>
      <p className="resume-item mt-3 text-sm text-foreground/90">
        <span className="font-mono font-bold text-foreground">
          Our Lady of Assumption College
        </span>{" "}
        — BS Computer Science
        <span className="text-muted"> · 2022 – 2026 · Graduated July 2026</span>
      </p>
      <p className="resume-item mt-1.5 text-sm text-foreground/90">
        <span className="font-mono font-bold text-foreground">
          San Pedro Relocation Center National HS
        </span>{" "}
        — Senior High, TVL Broadband Installation
        <span className="text-muted"> · Graduated 2020</span>
      </p>
    </div>
  );
}
