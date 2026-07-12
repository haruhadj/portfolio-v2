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

const icons: Record<string, IconType> = {
  typescript: SiTypescript,
  "next.js": SiNextdotjs,
  react: SiReact,
  "react native": SiReact,
  hono: SiHono,
  drizzle: SiDrizzle,
  "drizzle orm": SiDrizzle,
  postgresql: SiPostgresql,
  zod: SiZod,
  "better-auth": LuFingerprint,
  tailwind: SiTailwindcss,
  "tailwind css": SiTailwindcss,
  vercel: SiVercel,
  cloudflare: SiCloudflare,
  docker: SiDocker,
  "ci/cd": SiGithubactions,
  "claude code": SiClaude,
  python: SiPython,
};

/** Brand icon for a tech name; renders nothing for unmapped names. */
export default function TechIcon({
  name,
  className = "size-3.5",
}: {
  name: string;
  className?: string;
}) {
  const Icon = icons[name.toLowerCase()];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden />;
}
