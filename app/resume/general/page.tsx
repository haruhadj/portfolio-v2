import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../print-button";

export const metadata: Metadata = {
  title: "Resume — Michael Fernandez",
  description:
    "General resume of Michael Fernandez, a recent graduate with experience supporting IT and warehouse operations.",
};

const EMAIL = "michaelfernandezskie@gmail.com";
const PHONE = "0924 481 6674";

const strengths = [
  { label: "Office support", items: "Data entry, record handling, documentation, and report preparation" },
  { label: "Digital tools", items: "Business software, data handling, and video editing" },
  { label: "Operations", items: "Workflow support, information checks, and troubleshooting application issues" },
  { label: "Technical", items: "Computer setup, software support, and basic Linux systems" },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="resume-h2 mt-8 border-b border-border-line pb-1 font-mono text-sm font-bold uppercase tracking-widest text-accent">
      {children}
    </h2>
  );
}

export default function GeneralResume() {
  return (
    <main className="resume-page mx-auto w-full max-w-3xl px-5 py-12 sm:px-8">
      <nav className="no-print mb-10 flex flex-wrap items-center gap-4 font-mono text-sm" aria-label="Resume navigation">
        <Link href="/" className="text-muted transition-colors hover:text-accent">← back to portfolio</Link>
        <Link href="/resume" className="text-muted transition-colors hover:text-accent">technical resume</Link>
        <span className="flex-1" />
        <PrintButton />
      </nav>

      <header>
        <h1 className="font-mono text-4xl font-bold tracking-tighter text-foreground sm:text-5xl">Michael G. Fernandez</h1>
        <p className="mt-2 font-mono text-base text-accent">Recent Graduate | Administrative, Operations & Support Roles</p>
        <p className="resume-contact mt-3 text-sm text-muted">
          San Pedro, Laguna, Philippines <span className="mx-2">·</span>
          <a href={`mailto:${EMAIL}`} className="hover:text-accent">{EMAIL}</a>
          <span className="mx-2">·</span>
          <a href="tel:+639244816674" className="hover:text-accent">{PHONE}</a>
        </p>
      </header>

      <SectionTitle>Professional Profile</SectionTitle>
      <p className="mt-3 text-sm leading-relaxed text-foreground/90">
        Recent Computer Science graduate with hands-on experience supporting IT and warehouse operations. Experienced in entering and organizing information, documenting workflows, editing video materials, and helping resolve software issues. Comfortable learning digital tools and following structured processes. Seeking an entry-level opportunity in administration, operations, customer support, or technology support.
      </p>

      <SectionTitle>Work Experience</SectionTitle>
      <article className="resume-item mt-3">
        <h3 className="font-mono text-base font-bold text-foreground">
          IT Assistant Intern <span className="font-normal text-muted">— Optodev Inc. (EssilorLuxottica)</span>
        </h3>
        <p className="mt-1 text-sm text-muted">Lens Warehouse Department · September 2025 – February 2026 · Biñan, Laguna</p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/90">
          <li>Entered and organized warehouse and supply chain information to support department records.</li>
          <li>Helped troubleshoot software application issues and supported day-to-day IT tasks.</li>
          <li>Edited videos documenting supply chain workflows for internal use.</li>
        </ul>
      </article>

      <SectionTitle>Key Skills</SectionTitle>
      <dl className="mt-3 space-y-2 text-sm">
        {strengths.map((strength) => (
          <div key={strength.label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
            <dt className="shrink-0 font-mono text-xs uppercase tracking-wider text-muted sm:w-36 sm:pt-0.5">{strength.label}</dt>
            <dd className="text-foreground/90">{strength.items}</dd>
          </div>
        ))}
      </dl>

      <SectionTitle>Additional Experience</SectionTitle>
      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/90">
        <li>Created a payroll application project focused on organizing employee records, calculating payroll, and generating payslips.</li>
        <li>Developed an academic evaluation project with structured user workflows and report exports.</li>
      </ul>

      <SectionTitle>Education</SectionTitle>
      <p className="resume-item mt-3 text-sm text-foreground/90">
        <strong className="font-mono text-foreground">Our Lady of Assumption College</strong> — BS Computer Science · 2022–2026 · Graduated July 2026
      </p>
      <p className="resume-item mt-1.5 text-sm text-foreground/90">
        <strong className="font-mono text-foreground">San Pedro Relocation Center National HS</strong> — Senior High, TVL Broadband Installation · Graduated 2020
      </p>
    </main>
  );
}
