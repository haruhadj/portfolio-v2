import type { IconType } from "react-icons";
import { LuFingerprint } from "react-icons/lu";
import {
  SiClaude,
  SiCloudflare,
  SiDocker,
  SiDrizzle,
  SiGithubactions,
  SiHono,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiZod,
} from "react-icons/si";

type Entry = { icon: IconType; color?: string };

/** Brands whose real mark is monochrome black/white (theme-dependent) go
 *  without a `color` — they inherit currentColor from the caller instead. */
const icons: Record<string, Entry> = {
  typescript: { icon: SiTypescript, color: "#3178c6" },
  "next.js": { icon: SiNextdotjs },
  react: { icon: SiReact, color: "#61dafb" },
  "react native": { icon: SiReact, color: "#61dafb" },
  hono: { icon: SiHono, color: "#e36002" },
  drizzle: { icon: SiDrizzle, color: "#c5f74f" },
  "drizzle orm": { icon: SiDrizzle, color: "#c5f74f" },
  postgresql: { icon: SiPostgresql, color: "#4169e1" },
  zod: { icon: SiZod, color: "#3e67b1" },
  "better-auth": { icon: LuFingerprint, color: "#ffab40" },
  tailwind: { icon: SiTailwindcss, color: "#38bdf8" },
  "tailwind css": { icon: SiTailwindcss, color: "#38bdf8" },
  vercel: { icon: SiVercel },
  cloudflare: { icon: SiCloudflare, color: "#f38020" },
  docker: { icon: SiDocker, color: "#2496ed" },
  "ci/cd": { icon: SiGithubactions, color: "#2088ff" },
  "claude code": { icon: SiClaude, color: "#da7756" },
  python: { icon: SiPython, color: "#ffd43b" },
};

/** Brand icon for a tech name, tinted with its real brand color; renders nothing for unmapped names. */
export default function TechIcon({
  name,
  className = "size-3.5",
}: {
  name: string;
  className?: string;
}) {
  const entry = icons[name.toLowerCase()];
  if (!entry) return null;
  const { icon: Icon, color } = entry;
  return <Icon className={className} style={color ? { color } : undefined} aria-hidden />;
}
