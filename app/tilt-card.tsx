"use client";

import type { ReactNode } from "react";

const MAX_TILT = 5; // degrees

/** Perspective tilt that follows the cursor; snaps back on leave. */
export default function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`tilt ${className}`}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        e.currentTarget.style.transform = `perspective(900px) rotateX(${-py * MAX_TILT}deg) rotateY(${px * MAX_TILT}deg)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
      }}
    >
      {children}
    </div>
  );
}
