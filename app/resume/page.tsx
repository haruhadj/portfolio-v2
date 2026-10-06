import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "./print-button";

export const metadata: Metadata = {
  title: "Résumé — Michael Fernandez",
  description:
    "Résumé of Michael Fernandez — full-stack developer. TypeScript, Next.js, PostgreSQL, Docker, C++.",
};

const EMAIL = "michaelfernandezskie@gmail.com";
const PHONE = "0924 481 6674";
const GITHUB = "https://github.com/haruhadj";
const SITE = "https://haruhadj.org/portfolio";

const skills = [
  {
    label: "Languages",
    items: "TypeScript, JavaScript, Python, C++, SQL",
  },
  {
    label: "Web",
    items: "Next.js, React, Node.js, Hono, REST APIs, Zod",
  },
  { label: "Data", items: "PostgreSQL, SQLite, Drizzle ORM, Prisma" },
  {
    label: "Delivery",
    items: "Docker, Linux, Vercel, Cloudflare, CI/CD, n8n",
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
      "Built role-aware administrator, faculty, and student workflows with typed API contracts, PostgreSQL evaluation periods, immutable submissions, and report exports.",
    ],
  },
  {
    name: "Payroll System",
    tagline: "School staff payroll",
    stack: "Next.js · Hono · PostgreSQL · Drizzle ORM",
    url: "https://github.com/haruhadj/payroll-system",
    label: "source",
    bullets: [
      "Implemented role-based employee records, leave and loan workflows, and payroll calculations with Philippine government deductions and payslip generation.",
    ],
  },
  {
    name: "NekoStream",
    tagline: "Self-hosted anime tracker",
    stack: "Next.js · SQLite · Docker",
    url: "https://github.com/haruhadj/nekostream",
    label: "source",
    bullets: [
      "Integrated AniList and MyAnimeList OAuth and watch-progress sync; deployed the Dockerized app on a Raspberry Pi 5.",
    ],
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
        <Link href="/cv" className="text-muted transition-colors hover:text-accent">
          detailed CV
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
        Full-stack developer building TypeScript applications, PostgreSQL-backed
        systems, and self-hosted software. Seeking a junior developer role.
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

      <SectionTitle>Experience</SectionTitle>
      <article className="resume-item mt-3">
        <h3 className="font-mono text-base font-bold text-foreground">
          Supply Chain Intern{" "}
          <span className="font-normal text-muted">
            — Optodev Inc. (EssilorLuxottica)
          </span>
        </h3>
        <p className="mt-1 text-sm text-muted">
          Lens Warehouse Department · September 2025 – February 2026 · Biñan, Laguna
        </p>
        <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-foreground/90">
          <Bullet>
            Encoded warehouse data, helped troubleshoot software issues, and produced videos documenting supply chain workflows.
          </Bullet>
        </ul>
      </article>

      <SectionTitle>Deployment & Infrastructure</SectionTitle>
      <p className="resume-item mt-3 text-sm leading-relaxed text-foreground/90">
        Configured Cloudflare DNS and custom domains for Vercel-hosted sites;
        run Docker Compose services and Cloudflare Tunnel on a Raspberry Pi 5
        for selected self-hosted applications.
      </p>

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

      </div>

      <SectionTitle>Education</SectionTitle>
      <p className="resume-item mt-3 text-sm text-foreground/90">
        <span className="font-mono font-bold text-foreground">
          Our Lady of Assumption College
        </span>{" "}
        — BS Computer Science
        <span className="text-muted"> · 2022 – 2026 · Graduated July 2026</span>
      </p>
    </div>
  );
}
