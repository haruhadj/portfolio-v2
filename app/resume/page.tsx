import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PrintButton from "./print-button";

export const metadata: Metadata = {
  title: "Résumé — Michael Fernandez",
  description:
    "Résumé of Michael Fernandez — full-stack developer. TypeScript, Next.js, PostgreSQL, Docker, Go.",
};

const EMAIL = "michaelfernandezskie@gmail.com";
const GITHUB = "https://github.com/haruhadj";
const SITE = "https://haruhadj.org/portfolio";

/**
 * next/image does NOT apply basePath to a `src` string. See docs/PROJECT-NOTES.md.
 */
const BASE = "/portfolio";

const skills = [
  { label: "Languages", items: "TypeScript, JavaScript (ES6+), Python, Go, SQL" },
  { label: "Frontend", items: "Next.js, React, Tailwind CSS, HTML, CSS" },
  { label: "Backend", items: "Node.js, Hono, Express.js, better-auth, Zod" },
  { label: "Databases", items: "PostgreSQL, SQLite, Drizzle ORM" },
  {
    label: "Infrastructure",
    items: "Docker & Docker Compose, Linux, Cloudflare (DNS, Tunnels), Vercel, Git & GitHub, CI/CD",
  },
  {
    label: "Practices",
    items:
      "REST and OAuth 2.0 integration, schema-first validation, self-hosting, agentic AI workflows",
  },
];

const projects = [
  {
    name: "NekoStream",
    tagline: "Self-hosted anime tracker",
    stack: "TypeScript · Next.js · PostgreSQL · Docker",
    bullets: [
      "Integrated two third-party OAuth providers (AniList and MyAnimeList), synchronizing watch progress to both services simultaneously and reconciling state between their differing APIs.",
      "Built episode discovery on top of saved Nyaa.si RSS searches, parsing and normalizing feed data into structured episode lists.",
      "Packaged with Docker Compose and deployed to ARM64 hardware; secrets and OAuth redirects fully environment-driven for reproducible setup.",
    ],
  },
  {
    name: "RSS2Mail",
    tagline: "Multi-channel feed notifier",
    stack: "TypeScript · Python · Docker",
    bullets: [
      "Monitors any standard RSS/Atom feed on a configurable interval and delivers new items through two independent channels: Gmail SMTP and Facebook Messenger.",
      "Built a full web dashboard for feed management, settings, and log inspection, with dark mode and sorting.",
      "Ships as a single Docker Compose command that builds the frontend, installs Python dependencies, and persists the database to a volume.",
    ],
  },
  {
    name: "Trace",
    tagline: "DSA study companion",
    stack: "TypeScript · React",
    bullets: [
      "Built 21 interactive algorithm visualizers (sorting, binary search, two pointers, sliding window, linked lists, tree traversals, BST, heaps, graph BFS/DFS) that record each algorithm as replayable steps.",
      "Authored lessons and 52 curated problems with solutions in three languages, switchable globally via a single toggle.",
      "Local-first architecture: progress persists to localStorage with JSON export/import, so the app requires no backend.",
    ],
  },
  {
    name: "WebDAV Server",
    tagline: "Self-hosted file server",
    stack: "Go · Docker",
    bullets: [
      "Single static Go binary built on golang.org/x/net/webdav, packaged into a ~20 MB Docker image.",
      "Configured entirely through environment variables — directory, credentials, and PUID/PGID — so it runs against any host path without code changes.",
    ],
  },
];

const deployed = [
  {
    name: "SkillForge",
    desc: "Educational game library with shared scoring and progression. Next.js, TypeScript.",
    url: "https://skillforge.haruhadj.org/",
    label: "skillforge.haruhadj.org",
  },
  {
    name: "Secure QR Attendance",
    desc: "QR-based classroom attendance system. Next.js, TypeScript.",
    url: "https://secure-qr-attendance.vercel.app",
    label: "secure-qr-attendance.vercel.app",
  },
  {
    name: "Payroll System",
    desc: "Employee records, computation, and payslip generation. TypeScript.",
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

export default function Resume() {
  return (
    <div className="resume-page mx-auto w-full max-w-3xl px-5 py-12 sm:px-8">
      {/* screen-only controls */}
      <div className="no-print mb-10 flex flex-wrap items-center gap-4 font-mono text-sm">
        <Link href="/" className="text-muted transition-colors hover:text-accent">
          ← back to portfolio
        </Link>
        <span className="flex-1" />
        <PrintButton />
      </div>

      <header className="flex flex-col-reverse items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
        <h1 className="font-mono text-4xl font-bold tracking-tighter text-foreground sm:text-5xl">
          Michael G. Fernandez
        </h1>
        <p className="mt-2 font-mono text-base text-accent">Full-Stack Developer</p>
        <p className="resume-contact mt-3 text-sm text-muted">
          San Pedro, Laguna, Philippines
          <span className="mx-2">·</span>
          <a href={`mailto:${EMAIL}`} className="hover:text-accent">
            {EMAIL}
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
        </div>
        <Image
          src={`${BASE}/my-formal-picture.png`}
          alt="Portrait of Michael G. Fernandez"
          width={128}
          height={128}
          priority
          className="resume-photo h-28 w-28 shrink-0 border border-border-line object-cover object-top sm:h-32 sm:w-32"
        />
      </header>

      <SectionTitle>Summary</SectionTitle>
      <p className="mt-3 text-sm leading-relaxed text-foreground/90">
        Full-stack developer specializing in type-safe TypeScript web applications, from
        PostgreSQL schema through to Docker deployment. I build and self-host production
        systems on my own ARM64 infrastructure — integrating third-party OAuth APIs,
        managing DNS and tunnels, and running services I maintain daily. BS Computer
        Science graduate (July 2026), self-taught across the modern stack, seeking a junior
        or entry-level developer role where I can ship real software.
      </p>

      <SectionTitle>Technical Skills</SectionTitle>
      <dl className="mt-3 space-y-1.5 text-sm">
        {skills.map((s) => (
          <div key={s.label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
            <dt className="shrink-0 font-mono text-xs uppercase tracking-wider text-muted sm:w-32 sm:pt-0.5">
              {s.label}
            </dt>
            <dd className="text-foreground/90">{s.items}</dd>
          </div>
        ))}
      </dl>

      <SectionTitle>Projects</SectionTitle>
      <p className="mt-3 text-sm text-muted">
        Full source for all projects:{" "}
        <a href={GITHUB} className="text-accent hover:underline">
          github.com/haruhadj
        </a>
      </p>
      <div className="mt-4 space-y-5">
        {projects.map((p) => (
          <article key={p.name} className="resume-item">
            <h3 className="font-mono text-base font-bold text-foreground">
              {p.name} <span className="font-normal text-muted">— {p.tagline}</span>
            </h3>
            <p className="mt-0.5 font-mono text-xs text-accent">{p.stack}</p>
            <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-foreground/90">
              {p.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-muted" aria-hidden>
                    ▸
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}

        <article className="resume-item">
          <h3 className="font-mono text-base font-bold text-foreground">
            Deployed web applications
          </h3>
          <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-foreground/90">
            {deployed.map((d) => (
              <li key={d.name} className="flex gap-2">
                <span className="text-muted" aria-hidden>
                  ▸
                </span>
                <span>
                  <strong className="font-semibold">{d.name}</strong> — {d.desc}{" "}
                  <a href={d.url} className="text-accent hover:underline">
                    {d.label}
                  </a>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
            Additionally shipped 20+ browser games and learning tools (chess with AI and
            WebSocket multiplayer, real-time multiplayer Tic Tac Toe via Socket.IO,
            geography and vocabulary games) — all open source.
          </p>
        </article>
      </div>

      <SectionTitle>Education</SectionTitle>
      <div className="mt-3 space-y-3 text-sm">
        <div className="resume-item">
          <h3 className="font-mono font-bold text-foreground">Our Lady of Assumption College</h3>
          <p className="text-foreground/90">
            Bachelor of Science in Computer Science
            <span className="text-muted"> · 2022 – 2026 · Graduated July 2026</span>
          </p>
        </div>
        <div className="resume-item">
          <h3 className="font-mono font-bold text-foreground">
            San Pedro Relocation Center National High School
          </h3>
          <p className="text-foreground/90">
            Senior High School, Broadband Installation (TVL)
            <span className="text-muted"> · Graduated 2020</span>
          </p>
        </div>
      </div>

      <SectionTitle>Additional</SectionTitle>
      <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-foreground/90">
        <li className="flex gap-2">
          <span className="text-muted" aria-hidden>
            ▸
          </span>
          <span>
            <strong className="font-semibold">Systems &amp; hardware:</strong> PC hardware
            tuning and undervolting, network configuration, hardware troubleshooting.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted" aria-hidden>
            ▸
          </span>
          <span>
            <strong className="font-semibold">Local LLM infrastructure:</strong> self-hosted
            models for offline, low-latency development workflows.
          </span>
        </li>
      </ul>
    </div>
  );
}
