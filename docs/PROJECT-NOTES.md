# Project notes

Context that isn't obvious from the code. Read before touching deployment,
DNS, or the project lists.

## Deployment

Live at **https://haruhadj.org/portfolio**.

- Hosted on Vercel — scope `haruhadjs-projects`, project `portfolio-v2`.
- The GitHub repo is connected, so **pushing to `main` auto-deploys to production**.
  Don't run `vercel --prod` by hand; just push.
- CLI commands need the scope flag: `vercel <cmd> --scope haruhadjs-projects`.

## The `/portfolio` base path

`next.config.ts` sets `basePath: "/portfolio"` plus a redirect sending `/` there.

Two things to know:

1. **The root redirect needs `basePath: false`.** Without it Next prefixes the
   source and you get `/portfolio` → `/portfolio`, an infinite loop.
2. **`basePath` is inlined at build time.** Changing it requires a rebuild — it is
   not a runtime setting.

**Asset gotcha:** `next/link` and `next/image` apply the base path automatically,
but raw `<img src="/x.png">` and CSS `url(/x.png)` do **not** — those 404 unless
written as `/portfolio/x.png`. No current code does this; it only bites new additions.

When a landing page eventually lives at the domain root, delete the redirect block.

## DNS — Cloudflare, shared with self-hosted services

`haruhadj.org` is registered and DNS-hosted on Cloudflare. **The domain also runs
unrelated self-hosted services** on a home server: cloudflared tunnels
(`auth`, `fb`, `nyaa`, `pcfb`, `rss`, …), plus `vpn`, `db`, a wildcard
`*.haruhadj.org` pointing at the home IP, and Firebase/Resend/SES mail records.

Only two records belong to this project:

| Type    | Name  | Content                 | Proxy status          |
| ------- | ----- | ----------------------- | --------------------- |
| `A`     | `@`   | `76.76.21.21`           | **DNS only** (grey)   |
| `CNAME` | `www` | `cname.vercel-dns.com`  | **DNS only** (grey)   |

**Never enable Cloudflare's proxy (orange cloud) on these.** Proxying causes
error 525: Cloudflare can't complete the TLS handshake to Vercel and blocks the
ACME challenge, so the certificate never issues.

Also: when *any* record on a name is proxied, Cloudflare returns only its own edge
IPs and a grey-clouded sibling record on that name is ignored entirely. A stale
proxied `A @ <home-ip>` alongside the correct record broke the apex this way.

**Never touch** the wildcard, tunnel, `vpn`, `db`, MX, or TXT records — they serve
live services and email/domain verification.

If DNS is correct but HTTPS still fails, Vercel may not reissue the cert on its own:

```sh
vercel certs issue haruhadj.org www.haruhadj.org --scope haruhadjs-projects
```

## Content model — `app/page.tsx`

Projects live in two arrays at the top of the file.

**`deployments`** — featured cards. `live` is **optional**:

- With `live`: green pulsing dot + `live` badge, `open ↗` button, secondary `source` link.
- Without `live`: muted hollow dot + `self-hosted` badge, `source ↗` as the primary
  action, no dead secondary link.

**`processes`** — the compact list below; each entry links to its GitHub repo.

Keep a project in **one** array, not both.

The section eyebrow count is derived from `deployments.length`, so it doesn't need
updating by hand.

### Policy: don't link self-hosted instances

Several projects (`nekostream`, `rss2mail`) are reachable at `nyaa.haruhadj.org`,
`rss.haruhadj.org`, etc., but those point at the owner's **home network** through
Cloudflare tunnels, and some are auth-gated (visitors would hit a login wall).

Deliberate decision: **feature them without a live link.** Promoting a self-hosted
project means a source-only card, not a link to the personal instance. If a real
demo is ever wanted, deploy a separate public instance with throwaway credentials.

## Conventions

- Project summaries are written from each repo's **README**, not the one-line GitHub
  description — they end up specific rather than generic.
- Verify a deploy landed using a string **unique to the new build** (e.g. the derived
  count). Grepping for a generic word can match older content and report success early.
- `npm install` on this machine rewrites `package-lock.json` to strip `libc` fields.
  That's a local npm quirk, not a real change — `git checkout package-lock.json` it.
