# Michael G. Fernandez

**Full-Stack Developer**
San Pedro, Laguna, Philippines · [michaelfernandezskie@gmail.com](mailto:michaelfernandezskie@gmail.com)
[github.com/haruhadj](https://github.com/haruhadj) · [haruhadj.org/portfolio](https://haruhadj.org/portfolio)

---

## Summary

Full-stack developer specializing in type-safe TypeScript web applications, from
PostgreSQL schema through to Docker deployment. I build and self-host production
systems on my own ARM64 infrastructure — integrating third-party OAuth APIs,
managing DNS and tunnels, and running services I maintain daily. BS Computer Science
graduate (July 2026), self-taught across the modern stack, seeking a junior or
entry-level developer role where I can ship real software.

---

## Technical Skills

| | |
| --- | --- |
| **Languages** | TypeScript, JavaScript (ES6+), Python, Go, SQL |
| **Frontend** | Next.js, React, Tailwind CSS, HTML, CSS |
| **Backend** | Node.js, Hono, Express.js, better-auth, Zod |
| **Databases** | PostgreSQL, SQLite, Drizzle ORM |
| **Infrastructure** | Docker & Docker Compose, Linux, Cloudflare (DNS, Tunnels), Vercel, Git & GitHub, CI/CD |
| **Practices** | REST and OAuth 2.0 integration, schema-first validation, self-hosting, agentic AI workflows |

---

## Projects

Full source for all projects: **[github.com/haruhadj](https://github.com/haruhadj)**

### NekoStream — Self-hosted anime tracker
*TypeScript · Next.js · PostgreSQL · Docker*

- Integrated **two third-party OAuth providers** (AniList and MyAnimeList),
  synchronizing watch progress to both services simultaneously and reconciling
  state between their differing APIs.
- Built episode discovery on top of saved Nyaa.si RSS searches, parsing and
  normalizing feed data into structured episode lists.
- Packaged with Docker Compose and deployed to **ARM64** hardware; secrets and
  OAuth redirects fully environment-driven for reproducible setup.

### RSS2Mail — Multi-channel feed notifier
*TypeScript · Python · Docker*

- Monitors any standard RSS/Atom feed on a configurable interval and delivers new
  items through **two independent channels**: Gmail SMTP and Facebook Messenger.
- Built a full web dashboard for feed management, settings, and log inspection,
  with dark mode and sorting.
- Ships as a single Docker Compose command that builds the frontend, installs
  Python dependencies, and persists the database to a volume.

### Trace — DSA study companion
*TypeScript · React*

- Built **21 interactive algorithm visualizers** (sorting, binary search, two
  pointers, sliding window, linked lists, tree traversals, BST, heaps, graph
  BFS/DFS) that record each algorithm as replayable steps — play, pause, scrub,
  and step frame by frame.
- Authored lessons and **52 curated problems** with solutions in three languages,
  switchable globally via a single toggle.
- Local-first architecture: progress persists to `localStorage` with JSON
  export/import, so the app requires no backend.

### WebDAV Server — Self-hosted file server
*Go · Docker*

- Single **static Go binary** built on `golang.org/x/net/webdav`, packaged into a
  ~20 MB Docker image.
- Configured entirely through environment variables — directory, credentials, and
  PUID/PGID — so it runs against any host path without code changes.

### Deployed web applications

- **SkillForge** — educational game library with shared scoring and progression.
  *Next.js, TypeScript.* [skillforge.haruhadj.org](https://skillforge.haruhadj.org/)
- **Secure QR Attendance** — QR-based classroom attendance system.
  *Next.js, TypeScript.* [secure-qr-attendance.vercel.app](https://secure-qr-attendance.vercel.app)
- **Payroll System** — employee records, computation, and payslip generation.
  *TypeScript.* [payroll-system-fawn.vercel.app](https://payroll-system-fawn.vercel.app)

Additionally shipped **20+ browser games and learning tools** (chess with AI and
WebSocket multiplayer, real-time multiplayer Tic Tac Toe via Socket.IO, geography
and vocabulary games) — all open source.

---

## Education

**Our Lady of Assumption College** — *San Pedro, Laguna*
Bachelor of Science in Computer Science · 2022 – 2026 · **Graduated July 2026**

**San Pedro Relocation Center National High School**
Senior High School, Broadband Installation (TVL) · Graduated 2020

---

## Additional

- **Systems & hardware:** PC hardware tuning and undervolting, network
  configuration, hardware troubleshooting.
- **Local LLM infrastructure:** self-hosted models for offline, low-latency
  development workflows.
