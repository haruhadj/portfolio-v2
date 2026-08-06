import BootCurtain from "./boot-curtain";
import CountUp from "./count-up";
import CustomCursor from "./custom-cursor";
import HeroParallax from "./hero-parallax";
import Magnetic from "./magnetic";
import Parallax from "./parallax";
import ParticleHero from "./particle-hero";
import Reveal from "./reveal";
import SectionRail from "./section-rail";
import SplitText from "./split-text";
import StickyHeader from "./sticky-header";
import ScrambleText from "./scramble-text";
import ScrollProgress from "./scroll-progress";
import SpotlightCard from "./spotlight-card";
import TechIcon from "./tech-icon";
import ThemeToggle from "./theme-toggle";
import TiltCard from "./tilt-card";
import TypedPrompt from "./typed-prompt";
import Image from "next/image";
import Link from "next/link";
import { SiGithub } from "react-icons/si";

const NAME = "Michael Fernandez";
const GITHUB = "https://github.com/haruhadj";
const EMAIL = "michaelfernandezskie@gmail.com";

/**
 * next/image does NOT apply basePath to a `src` string, so screenshot paths
 * must carry it explicitly. See docs/PROJECT-NOTES.md.
 */
const BASE = "/portfolio";

type Deployment = {
  name: string;
  summary: string;
  stack: readonly string[];
  /** Public URL, when there is one. Self-hosted builds link to source only. */
  live?: string;
  repo: string;
  /** Filename in public/shots — omit and the card renders text-only. */
  shot?: string;
};

const deployments: readonly Deployment[] = [
  {
    name: "nekostream",
    summary:
      "Self-hosted anime tracker — browse and search via AniList, build episode lists from Nyaa.si RSS, and sync watch progress to AniList and MyAnimeList at once. Dockerized for ARM64.",
    stack: ["Next.js", "TypeScript", "Docker"],
    repo: `${GITHUB}/nekostream`,
    shot: "nekostream-img.png",
  },
  {
    name: "rss2mail",
    summary:
      "RSS feed monitor that pushes new items to Gmail or Facebook Messenger on a configurable interval — full WebUI for feeds, settings, and logs, with Docker Compose deployment.",
    stack: ["TypeScript", "Python", "Docker"],
    repo: `${GITHUB}/rss2mail`,
  },
  {
    name: "skillforge",
    summary:
      "A multi-app web platform — independent learning modules sharing a common scoring and progression layer, served under a single roof.",
    stack: ["Next.js", "TypeScript"],
    live: "https://skillforge.haruhadj.org/",
    repo: `${GITHUB}/skillforge`,
    shot: "skillforge.png",
  },
  {
    name: "secure-qr-attendance",
    summary:
      "QR-code attendance system built for real classrooms — secure check-ins without the roll call.",
    stack: ["Next.js", "TypeScript"],
    live: "https://secure-qr-attendance.vercel.app",
    repo: `${GITHUB}/secure-qr-attendance`,
    shot: "qr-attendance.png",
  },
  {
    name: "payroll-system",
    summary:
      "Payroll management system — employee records, computations, and payslips handled end to end.",
    stack: ["TypeScript"],
    live: "https://payroll-system-fawn.vercel.app",
    repo: `${GITHUB}/payroll-system`,
    shot: "payroll.png",
  },
];

const processes = [
  {
    name: "reddit-ai-summarizer-extension",
    summary: "Browser extension (Chrome + Firefox) that adds a `Summarize with AI` button to Reddit post threads. Summarizes the post plus top comments using your own API key.",
    lang: "TS",
  },
  {
    name: "trace-dsa-study",
    summary:
      "DSA study companion — 17-topic roadmap, 21 interactive visualizers, 52 curated problems",
    lang: "TS",
  },
  {
    name: "webdav-server",
    summary: "Tiny self-hosted WebDAV server — single static Go binary in a ~20MB Docker image",
    lang: "GO",
  },
  {
    name: "streamsync-yt",
    summary: "YouTube music request system for streamers — live queue sync and OBS overlay",
    lang: "TS",
  },
  {
    name: "grandmaster-chess",
    summary: "Responsive chess with single-player AI and real-time multiplayer via WebSockets",
    lang: "TS",
  },
  {
    name: "core-dsa",
    summary: "Data structures & algorithms, implemented from scratch in TypeScript",
    lang: "TS",
  },
] as const;

const specs = [
  { label: "frontend", items: ["Next.js", "React", "Tailwind CSS"] },
  { label: "backend", items: ["Hono", "TypeScript", "Zod", "better-auth"] },
  { label: "database", items: ["PostgreSQL", "Drizzle ORM"] },
  { label: "deploy", items: ["Vercel", "Cloudflare", "Docker", "CI/CD"] },
  { label: "workflow", items: ["Claude Code", "agentic pipelines", "local LLM infra"] },
  { label: "learning", items: ["React Native", "Python"] },
] as const;

const stream = [
  "typescript",
  "next.js",
  "react",
  "hono",
  "drizzle",
  "postgresql",
  "zod",
  "better-auth",
  "tailwind",
  "vercel",
  "cloudflare",
  "docker",
  "claude code",
] as const;

const mantra = ["build", "tune", "ship"] as const;

/** Left-edge rail — ids must match the section headings they point at. */
const railLinks = [
  { id: "about", label: "about" },
  { id: "deployments", label: "work" },
  { id: "processes", label: "tools" },
  { id: "stack", label: "stack" },
  { id: "contact", label: "contact" },
] as const;

function AmbientBackground() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-25" />
      <div className="glow-blob absolute -top-40 left-1/4 size-[36rem] rounded-full bg-accent/10 blur-3xl" />
      <div
        className="glow-blob absolute top-1/2 -right-40 size-[30rem] rounded-full bg-ember/5 blur-3xl"
        style={{ animationDelay: "-11s" }}
      />
      <div className="scanline" />
    </div>
  );
}

function SectionHeader({
  id,
  eyebrow,
  title,
}: {
  id: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <Reveal>
      <p className="font-mono text-xs sm:text-sm text-accent">
        <span className="text-muted">──</span> {eyebrow}
      </p>
      <h2
        id={id}
        aria-label={title}
        className="mt-2 scroll-mt-28 font-mono text-4xl sm:text-6xl font-bold uppercase tracking-tighter text-foreground"
      >
        <SplitText text={title} />
      </h2>
    </Reveal>
  );
}

export default function Home() {
  return (
    <div className="flex-1 w-full">
      <BootCurtain />
      <ScrollProgress />
      <CustomCursor />
      <SectionRail links={railLinks} />
      <AmbientBackground />
      <div aria-hidden className="vignette" />
      <div aria-hidden className="noise" />

      {/* status bar */}
      <StickyHeader>
        <nav
          className="mx-auto flex max-w-6xl items-center gap-3 sm:gap-4 px-5 py-3 font-mono text-xs sm:px-8 sm:text-sm"
          aria-label="Main"
        >
          <span className="text-accent whitespace-nowrap">{NAME}</span>
          <span className="hidden sm:inline text-muted">haruhadj</span>
          <span className="flex-1" />
          <a
            href="#about"
            className="hidden sm:inline text-muted hover:text-foreground transition-colors"
          >
            /about
          </a>
          <a
            href="#deployments"
            className="hidden sm:inline text-muted hover:text-foreground transition-colors"
          >
            /projects
          </a>
          <a
            href="#stack"
            className="hidden sm:inline text-muted hover:text-foreground transition-colors"
          >
            /stack
          </a>
          <a
            href="#contact"
            className="hidden sm:inline text-muted hover:text-foreground transition-colors"
          >
            /contact
          </a>
          <Link href="/resume" className="text-accent hover:text-foreground transition-colors">
            /resume
          </Link>
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="text-muted hover:text-accent transition-colors"
          >
            <SiGithub className="size-4 sm:hidden" aria-hidden />
            <span className="hidden sm:inline">github ↗</span>
          </a>
          <ThemeToggle />
        </nav>
      </StickyHeader>

      {/* hero — full-viewport particle field */}
      <HeroParallax className="relative h-[100svh]">
        <div data-hero="field" className="absolute inset-0">
          <ParticleHero className="size-full" />
        </div>

        <div
          data-hero="top"
          className="pointer-events-none absolute inset-x-0 top-[16%] flex justify-center px-5"
        >
          <div className="animate-fade-up">
            <TypedPrompt />
          </div>
        </div>

        <div
          data-hero="bottom"
          className="pointer-events-none absolute inset-x-0 bottom-[14%] flex flex-col items-center gap-4 px-5"
        >
          <h1 className="animate-fade-up text-center font-mono text-3xl sm:text-5xl font-bold tracking-tighter text-foreground [animation-delay:300ms]">
            {NAME}
          </h1>
          <p className="animate-fade-up max-w-xl text-center text-base sm:text-lg text-muted leading-relaxed [animation-delay:500ms]">
            Full-stack developer building{" "}
            <span className="text-foreground">type-safe web apps</span> and{" "}
            <span className="text-foreground">tuned systems</span> — from schema
            to silicon, with agentic AI in the loop.
          </p>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
          <p className="scroll-hint font-mono text-xs text-muted">scroll ↓</p>
        </div>
      </HeroParallax>

      <main className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* about */}
        <section aria-labelledby="about" className="pt-24 pb-16">
          <SectionHeader id="about" eyebrow="who I am" title="about" />
          <Reveal delay={100}>
            <p className="mt-10 max-w-2xl text-sm sm:text-base text-muted leading-relaxed">
              I&apos;m a self-taught full-stack developer specializing in type-safe TypeScript
              applications, from PostgreSQL schema through to Docker deployment. Most of what I
              build, I also run myself — production systems self-hosted on my own ARM64
              infrastructure, integrating third-party OAuth APIs and managing my own DNS and
              tunnels day to day. BS Computer Science graduate (July 2026), looking for a junior
              or entry-level role where I can keep shipping real software.
            </p>
          </Reveal>
        </section>

        {/* readout strip */}
        <Reveal>
          <dl className="grid grid-cols-1 sm:grid-cols-2 border border-border-line divide-y sm:divide-y-0 sm:divide-x divide-border-line font-mono bg-panel-2/60 backdrop-blur-sm">
            <div className="px-5 py-5">
              <dt className="text-[11px] uppercase tracking-widest text-muted">top language</dt>
              <dd className="mt-2 text-3xl sm:text-4xl text-accent">TS</dd>
            </div>
            <div className="px-5 py-5">
              <dt className="text-[11px] uppercase tracking-widest text-muted">status</dt>
              <dd className="mt-2 text-3xl sm:text-4xl text-foreground flex items-center gap-3">
                <span className="pulse-dot inline-block size-2.5 rounded-full bg-ok" aria-hidden />
                <span className="text-xl sm:text-2xl">open to work</span>
              </dd>
            </div>
          </dl>
        </Reveal>

        {/* stack stream */}
        <Reveal className="mx-[calc(50%-50vw)]">
          <div className="marquee mt-14 overflow-hidden border-y border-border-line py-4">
            <div className="marquee-track flex items-center gap-12">
              {[...stream, ...stream].map((item, i) => (
                <span
                  key={`${item}-${i}`}
                  aria-hidden={i >= stream.length}
                  className="flex items-center gap-2.5 font-mono text-sm text-muted whitespace-nowrap"
                >
                  <TechIcon name={item} className="size-6 text-accent-dim" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* deployments — featured apps */}
        <section aria-labelledby="deployments" className="pt-24 pb-24">
          <SectionHeader
            id="deployments"
            eyebrow={`featured · ${deployments.length} builds`}
            title="deployments"
          />
          <div className="mt-10 grid gap-6">
            {deployments.map((d, i) => (
              <Reveal key={d.name} delay={i * 100}>
                <TiltCard>
                  <SpotlightCard className="group relative border border-border-line bg-panel/80 p-6 sm:p-10 transition-colors duration-300 hover:border-accent-dim">
                    <span
                      aria-hidden
                      className="outline-text pointer-events-none absolute right-4 top-2 font-mono text-7xl sm:text-9xl font-bold select-none opacity-60"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <article className="relative">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono">
                        <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
                          {d.name}
                        </h3>
                        {d.live ? (
                          <span className="inline-flex items-center gap-1.5 text-ok text-xs">
                            <span className="pulse-dot size-1.5 rounded-full bg-ok" aria-hidden />
                            live
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-muted text-xs">
                            <span
                              className="size-1.5 rounded-full border border-muted"
                              aria-hidden
                            />
                            self-hosted
                          </span>
                        )}
                      </div>
                      <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-start">
                        <p className="max-w-2xl flex-1 text-sm sm:text-base text-muted leading-relaxed">
                          {d.summary}
                        </p>
                        {d.shot && (
                          <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden border border-border-line bg-panel-2 lg:w-72">
                            {/* extra vertical headroom so the parallax drift never exposes an edge */}
                            <Parallax className="absolute -inset-y-4 inset-x-0">
                              <Image
                                src={`${BASE}/shots/${d.shot}`}
                                alt={`${d.name} interface screenshot`}
                                fill
                                sizes="(min-width: 1024px) 18rem, 100vw"
                                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                              />
                            </Parallax>
                          </div>
                        )}
                      </div>
                      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-sm">
                        <Magnetic>
                          <a
                            href={d.live ?? d.repo}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 border border-accent px-4 py-2 text-accent transition-colors duration-300 hover:bg-accent hover:text-background"
                          >
                            {d.live ? "open" : "source"}{" "}
                            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                              ↗
                            </span>
                          </a>
                        </Magnetic>
                        {d.live && (
                          <a
                            href={d.repo}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted hover:text-foreground transition-colors"
                          >
                            source
                          </a>
                        )}
                        <span className="flex-1" />
                        {d.stack.map((s) => (
                          <span
                            key={s}
                            className="inline-flex items-center gap-2 text-muted text-sm"
                          >
                            <TechIcon name={s} className="size-5" />
                            {s}
                          </span>
                        ))}
                      </div>
                    </article>
                  </SpotlightCard>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* process list — games */}
        <section aria-labelledby="processes" className="pb-24">
          <SectionHeader id="processes" eyebrow="tools · experiments" title="process list" />
          <Reveal delay={100}>
            <ul className="mt-10 border border-border-line divide-y divide-border-line bg-panel-2/40">
              {processes.map((p) => (
                <li key={p.name}>
                  <a
                    href={`${GITHUB}/${p.name}`}
                    target="_blank"
                    rel="noreferrer"
                    className="wipe-row group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 px-5 py-4 transition-all duration-300 hover:pl-8"
                  >
                    <span className="font-mono text-sm text-foreground shrink-0 sm:w-60 transition-colors duration-300 group-hover:text-background">
                      ▸ {p.name}
                    </span>
                    <span className="flex-1 text-sm text-muted transition-colors duration-300 group-hover:text-background/75">
                      {p.summary}
                    </span>
                    <span className="hidden sm:inline font-mono text-xs text-muted transition-colors duration-300 group-hover:text-background/75">
                      {p.lang}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 font-mono text-xs text-muted">
              … and more on{" "}
              <a
                href={`${GITHUB}?tab=repositories`}
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline underline-offset-4"
              >
                github ↗
              </a>
            </p>
          </Reveal>
        </section>

        {/* stack — spec sheet */}
        <section aria-labelledby="stack" className="pb-24">
          <SectionHeader id="stack" eyebrow="tools of the trade" title="spec sheet" />
          <Reveal delay={100}>
            <dl className="mt-10 border border-border-line divide-y divide-border-line font-mono text-sm bg-panel-2/40">
              {specs.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-5 py-4"
                >
                  <dt className="text-[11px] uppercase tracking-widest text-muted sm:w-32 shrink-0">
                    {s.label}
                  </dt>
                  <dd className="flex flex-wrap gap-2 text-foreground">
                    {s.items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-2 border border-border-line bg-panel px-3 py-1.5 text-sm transition-colors hover:border-accent-dim hover:text-accent"
                      >
                        <TechIcon name={item} className="size-5" />
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* beyond code */}
        <section aria-labelledby="tuning" className="pb-24">
          <SectionHeader id="tuning" eyebrow="off the clock" title="beyond code" />
          <Reveal delay={100}>
            <p className="mt-10 max-w-2xl text-sm sm:text-base text-muted leading-relaxed">
              I treat my machines the way I treat my code: measured, tuned, and
              predictable. PC hardware tuning and undervolting; local LLM
              infrastructure for offline, low-latency coding; agentic workflows
              with strict schemas as guardrails — the toolchain catches its own
              errors and self-corrects.
            </p>
          </Reveal>
        </section>
      </main>

      {/* mantra marquee */}
      <Reveal>
        <div className="marquee overflow-hidden border-y border-border-line py-5" aria-hidden>
          <div className="marquee-track-slow flex items-center">
            {Array.from({ length: 4 }, (_, rep) =>
              mantra.map((word, wi) => (
                <span
                  key={`${rep}-${word}`}
                  className={`whitespace-pre font-mono text-6xl sm:text-8xl font-bold uppercase tracking-tighter ${
                    rep % 2 === 0 && wi === 1 ? "outline-text-accent" : "outline-text"
                  }`}
                >
                  {word}{"  ·  "}
                </span>
              ))
            )}
          </div>
        </div>
      </Reveal>

      {/* contact */}
      <footer
        aria-labelledby="contact"
        className="mx-auto w-full max-w-6xl px-5 sm:px-8 pt-24 pb-16"
      >
        <SectionHeader id="contact" eyebrow="say hello" title="open a channel" />
        <Reveal delay={100}>
          <div className="mt-10">
            <a
              href={`mailto:${EMAIL}`}
              className="block break-all font-mono text-xl sm:text-3xl md:text-4xl text-foreground hover:text-accent transition-colors"
            >
              <ScrambleText text={EMAIL} startDelay={400} />
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              className="mt-4 block font-mono text-lg sm:text-2xl text-muted hover:text-accent transition-colors"
            >
              github.com/haruhadj ↗
            </a>
            <Magnetic className="mt-8">
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 border border-accent px-5 py-3 font-mono text-sm text-accent transition-colors duration-300 hover:bg-accent hover:text-background"
              >
                read my résumé →
              </Link>
            </Magnetic>
          </div>
        </Reveal>
        <p className="mt-16 font-mono text-xs text-muted">
          {NAME} © {new Date().getFullYear()} — built with Next.js, styled by
          hand<span className="cursor-block ml-2 w-[0.45em] h-[0.9em]" aria-hidden />
        </p>
      </footer>
    </div>
  );
}
