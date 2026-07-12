"use client";

import type { ReactNode } from "react";

/**
 * Card with a mouse-tracking radial highlight (see .spotlight in globals.css).
 * Writes CSS vars directly on the element — no state, no re-renders.
 */
export default function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`spotlight ${className}`}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
      }}
    >
      {children}
    </div>
  );
}
