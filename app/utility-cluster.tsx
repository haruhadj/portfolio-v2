"use client";

import Link from "next/link";
import { SiGithub } from "react-icons/si";
import ThemeToggle from "./theme-toggle";

/**
 * Persistent utilities, pinned to a corner and kept deliberately quieter than
 * the section rail so the two never read as one bar.
 */
export default function UtilityCluster({ github }: { github: string }) {
  return (
    <div className="utility-cluster">
      <Link href="/resume" className="utility-link">
        résumé
      </Link>
      <a
        href={github}
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub profile"
        className="utility-link"
      >
        <SiGithub className="size-4" aria-hidden />
      </a>
      <ThemeToggle />
    </div>
  );
}
