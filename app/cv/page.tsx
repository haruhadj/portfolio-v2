import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../resume/print-button";

export const metadata: Metadata = {
  title: "Curriculum Vitae — Michael Fernandez",
  description:
    "Detailed curriculum vitae of Michael Fernandez, covering software projects, technical skills, experience, and education.",
};

const projects = [
  {
    name: "Faculty Evaluation System",
    focus: "Academic evaluation platform for Our Lady of Assumption College",
    stack: "Next.js · Hono · Supabase · PostgreSQL · Drizzle ORM",
    links: [{ label: "Live application", url: "https://faculty-evaluation-system-zeta.vercel.app/" }],
    details: [
      "Developed separate administrator, faculty, and student workspaces with role checks based on the authenticated caller.",
      "Modeled evaluation periods, assignments, and immutable submissions in PostgreSQL; shared Zod contracts across the interface and Hono API.",
      "Added reporting and export workflows so administrators can review evaluation results.",
    ],
  },
  {
    name: "Payroll System",
    focus: "School staff payroll and employee records",
    stack: "Next.js · Hono · TypeScript · PostgreSQL · Drizzle ORM",
    links: [
      { label: "Source", url: "https://github.com/haruhadj/payroll-system" },
      { label: "Documentation", url: "https://haruhadj.github.io/payroll-system/" },
    ],
    details: [
      "Built role-based workflows for administrators, HR staff, and employees, covering records, leave requests, loans, and per-period payroll.",
      "Implemented exception-based attendance calculations, government contributions, withholding tax, and itemized payslips.",
      "Documented the payroll lifecycle and its current limitations for reviewers and future contributors.",
    ],
  },
  {
    name: "Secure QR Attendance",
    focus: "Classroom attendance and administration",
    stack: "Next.js · TypeScript · PostgreSQL · Prisma",
    links: [
      { label: "Source", url: "https://github.com/haruhadj/secure-qr-attendance" },
      { label: "Documentation", url: "https://haruhadj.github.io/secure-qr-attendance/" },
    ],
    details: [
      "Designed a teacher-scans-student workflow with section-scoped rosters, manual attendance controls, and student QR IDs.",
      "Added student attendance history and evidence-based appeals, plus administrative CSV import and audit logs.",
      "Published architecture, security, database, and role-specific guides alongside the application.",
    ],
  },
  {
    name: "SkillForge",
    focus: "Educational game platform",
    stack: "Next.js · TypeScript · Firebase · Socket.IO · Docker",
    links: [
      { label: "Source", url: "https://github.com/haruhadj/skillforge" },
      { label: "Live site", url: "https://skillforge.haruhadj.org/" },
    ],
    details: [
      "Combined more than 20 learning games into one platform with shared accounts, score history, personal bests, and leaderboards.",
      "Integrated real-time multiplayer for selected games through Socket.IO and an iframe bridge for game modules.",
      "Deployed ARM64 Docker images to a Raspberry Pi 5, with GitHub Actions building images for the server.",
    ],
  },
  {
    name: "NekoStream",
    focus: "Self-hosted anime tracking",
    stack: "Next.js · TypeScript · SQLite · Docker",
    links: [{ label: "Source", url: "https://github.com/haruhadj/nekostream" }],
    details: [
      "Connected AniList and MyAnimeList through OAuth and synchronized watch progress across their APIs.",
      "Stored episode discoveries from repeatable Nyaa RSS searches and exposed the library through a Stremio addon.",
      "Packaged the application for ARM64 deployment with Docker Compose, persistent storage, startup migrations, and configuration checks.",
    ],
  },
  {
    name: "Tsugi",
    focus: "Anime and manga recommendation sharing",
    stack: "Next.js · Hono · TypeScript · PostgreSQL · Drizzle ORM",
    links: [
      { label: "Source", url: "https://github.com/haruhadj/tsugi" },
      { label: "Live site", url: "https://tsugi.haruhadj.org/" },
    ],
    details: [
      "Built a short path from title selection and scoring to a public recommendation link with a rich social preview.",
      "Used AniList and MyAnimeList data, OAuth sign-in, and a validated Hono API backed by PostgreSQL.",
      "Added Redis-backed rate limits and list caching around external data and public sharing workflows.",
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

export default function CV() {
  return (
    <main className="cv-page resume-page mx-auto w-full max-w-3xl px-5 py-12 sm:px-8">
      <nav className="no-print mb-10 flex flex-wrap items-center gap-4 font-mono text-sm" aria-label="Document navigation">
        <Link href="/" className="text-muted hover:text-accent">← portfolio</Link>
        <Link href="/resume" className="text-muted hover:text-accent">one-page résumé</Link>
        <span className="flex-1" />
        <PrintButton />
      </nav>

      <header>
        <h1 className="font-mono text-4xl font-bold tracking-tighter text-foreground sm:text-5xl">
          Michael G. Fernandez
        </h1>
        <p className="mt-2 font-mono text-base text-accent">Full-Stack Developer · Curriculum Vitae</p>
        <p className="resume-contact mt-3 text-sm text-muted">
          San Pedro, Laguna, Philippines · <a href="mailto:michaelfernandezskie@gmail.com" className="hover:text-accent">michaelfernandezskie@gmail.com</a> · <a href="tel:+639244816674" className="hover:text-accent">0924 481 6674</a>
          <br />
          <a href="https://github.com/haruhadj" className="hover:text-accent">github.com/haruhadj</a> · <a href="https://haruhadj.org/portfolio" className="hover:text-accent">haruhadj.org/portfolio</a>
        </p>
      </header>

      <SectionTitle>Profile</SectionTitle>
      <p className="mt-3 text-sm leading-relaxed text-foreground/90">
        Computer Science graduate building full-stack TypeScript applications across product interfaces, APIs, data models, and deployment. Work includes academic systems, public web products, and services hosted on a Raspberry Pi 5. Seeking a junior software development role.
      </p>

      <SectionTitle>Technical Skills</SectionTitle>
      <dl className="mt-3 space-y-1.5 text-sm">
        <div><dt className="inline font-mono font-semibold">Applications · </dt><dd className="inline">TypeScript, JavaScript, React, Next.js, Tailwind CSS, React Native</dd></div>
        <div><dt className="inline font-mono font-semibold">APIs and data · </dt><dd className="inline">Hono, REST APIs, Zod, PostgreSQL, SQLite, Drizzle ORM, Prisma, Supabase, Firebase</dd></div>
        <div><dt className="inline font-mono font-semibold">Delivery · </dt><dd className="inline">Docker, Linux, GitHub Actions, Vercel, Cloudflare, Raspberry Pi</dd></div>
      </dl>

      <SectionTitle>Experience</SectionTitle>
      <article className="resume-item mt-3 text-sm text-foreground/90">
        <h3 className="font-mono text-base font-bold text-foreground">Supply Chain Intern — Optodev Inc. (EssilorLuxottica)</h3>
        <p className="mt-1 text-muted">Lens Warehouse Department · September 2025 – February 2026 · Biñan, Laguna</p>
        <p className="mt-2 leading-relaxed">Encoded warehouse data, helped troubleshoot software application issues, and produced videos documenting supply chain workflows.</p>
      </article>

      <SectionTitle>Deployment & Infrastructure</SectionTitle>
      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/90">
        <li>Configured Cloudflare DNS and custom domains under haruhadj.org for websites deployed to Vercel.</li>
        <li>Run application containers and cloudflared with Docker Compose on a Raspberry Pi 5, exposing selected self-hosted services through Cloudflare Tunnel.</li>
      </ul>

      <SectionTitle>Selected Software Projects</SectionTitle>
      <div className="mt-4 space-y-7">
        {projects.map((project) => (
          <article key={project.name} className="cv-project resume-item">
            <h3 className="font-mono text-base font-bold text-foreground">{project.name}</h3>
            <p className="mt-0.5 text-sm text-muted">{project.focus}</p>
            <p className="mt-1 text-xs text-accent">{project.stack}</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/90">
              {project.details.map((detail) => <li key={detail}>{detail}</li>)}
            </ul>
            <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
              {project.links.map((link) => <a key={link.url} href={link.url} className="text-accent hover:underline">{link.label} ↗</a>)}
            </p>
          </article>
        ))}
      </div>

      <SectionTitle>Education</SectionTitle>
      <p className="resume-item mt-3 text-sm text-foreground/90">
        <strong className="font-mono text-foreground">Our Lady of Assumption College</strong> — BS Computer Science · 2022–2026 · Graduated July 2026
      </p>
    </main>
  );
}
