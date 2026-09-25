import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../print-button";

export const metadata: Metadata = {
  title: "General Resume - Michael Fernandez",
  description:
    "General professional resume of Michael Fernandez, focused on transferable technical, operations, and administrative strengths.",
};

const EMAIL = "michaelfernandezskie@gmail.com";
const PHONE = "0924 481 6674";
const GITHUB = "https://github.com/haruhadj";
const SITE = "https://haruhadj.org/portfolio";

const strengths = [
  {
    label: "Digital tools",
    items: "Barcode scanning, data encoding, web applications, databases, and structured information",
  },
  {
    label: "Information work",
    items: "Inventory preparation, record handling, reporting workflows, reconciliation, and careful quality checks",
  },
  {
    label: "Technical support",
    items: "Linux systems, Docker, local infrastructure, hardware configuration, and deployment troubleshooting",
  },
  {
    label: "AI & automation",
    items: "n8n automations, Claude Code, Codex, AI tools, and prompt engineering",
  },
];

const projects = [
  {
    name: "Faculty Evaluation System",
    focus: "Structured workflows and reporting",
    summary:
      "Role-aware student, faculty, and administrator workflows with report exports.",
  },
  {
    name: "Payroll System",
    focus: "Records and document generation",
    summary: "Employee records, payroll computations, and payslip generation.",
  },
  {
    name: "Tsugi",
    focus: "Recommendation sharing and user workflows",
    summary: "Scored anime and manga recommendations shared through public links.",
  },
  {
    name: "SkillForge",
    focus: "Learning tools and progression",
    summary: "Learning modules sharing scoring and progression features.",
  },
  {
    name: "Secure QR Attendance",
    focus: "Classroom attendance workflow",
    summary: "Secure QR-based check-ins that replace manual roll calls.",
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

export default function GeneralResume() {
  return (
    <div className="resume-page mx-auto w-full max-w-3xl px-5 py-12 sm:px-8">
      <div className="no-print mb-10 flex flex-wrap items-center gap-4 font-mono text-sm">
        <Link href="/" className="text-muted transition-colors hover:text-accent">
          ← back to portfolio
        </Link>
        <Link href="/resume" className="text-muted transition-colors hover:text-accent">
          technical resume
        </Link>
        <span className="flex-1" />
        <PrintButton />
      </div>

      <header>
        <h1 className="font-mono text-4xl font-bold tracking-tighter text-foreground sm:text-5xl">
          Michael G. Fernandez
        </h1>
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

      <SectionTitle>Profile</SectionTitle>
      <p className="mt-3 text-sm leading-relaxed text-foreground/90">
        Computer Science graduate with hands-on experience in software projects and day-to-day business operations. Detail-oriented when working with data, records, documentation, and technical tools. Interested in entry-level technology support, operations, administrative support, and other roles where dependable digital skills are useful.
      </p>

      <SectionTitle>Internship Experience</SectionTitle>
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
            Supported annual inventory and audit readiness through warehouse-label verification, barcode scanning, data encoding, stock organization, counts, and reconciliation.
          </Bullet>
        </ul>
      </article>

      <SectionTitle>Transferable Strengths</SectionTitle>
      <dl className="mt-3 space-y-3 text-sm">
        {strengths.map((strength) => (
          <div
            key={strength.label}
            className="flex flex-col gap-0.5 sm:flex-row sm:gap-3"
          >
            <dt className="shrink-0 font-mono text-xs uppercase tracking-wider text-muted sm:w-36 sm:pt-0.5">
              {strength.label}
            </dt>
            <dd className="text-foreground/90">{strength.items}</dd>
          </div>
        ))}
      </dl>

      <SectionTitle>Selected Project Work</SectionTitle>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/90">
        {projects.map((project) => (
          <li key={project.name} className="resume-item">
            <span className="font-mono font-bold text-foreground">
              {project.name}
            </span>{" "}
            <span className="text-muted">- {project.focus}:</span>{" "}
            {project.summary}
          </li>
        ))}
      </ul>

      <SectionTitle>Education</SectionTitle>
      <p className="resume-item mt-3 text-sm text-foreground/90">
        <span className="font-mono font-bold text-foreground">
          Our Lady of Assumption College
        </span>{" "}
        - BS Computer Science
        <span className="text-muted"> · 2022 - 2026 · Graduated July 2026</span>
      </p>
      <p className="resume-item mt-1.5 text-sm text-foreground/90">
        <span className="font-mono font-bold text-foreground">
          San Pedro Relocation Center National HS
        </span>{" "}
        - Senior High, TVL Broadband Installation
        <span className="text-muted"> · Graduated 2020</span>
      </p>
    </div>
  );
}
