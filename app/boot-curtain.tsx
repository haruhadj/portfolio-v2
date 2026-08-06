"use client";

import { useEffect, useState } from "react";

const LINES = [
  { label: "mounting /haruhadj", status: "ok" },
  { label: "warming particle field", status: "ok" },
] as const;

const LINE_STEP = 240;
const LIFT_AT = 1050;
const LIFT_DURATION = 900;

/**
 * Full-screen terminal boot sequence that lifts away on first paint.
 * Skipped entirely under prefers-reduced-motion — the page is already
 * visible underneath, so removing the curtain costs nothing.
 */
export default function BootCurtain() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [lifted, setLifted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = setTimeout(() => setDone(true), 0);
      return () => clearTimeout(id);
    }
    const timers = [
      ...LINES.map((_, i) =>
        setTimeout(() => setVisibleLines(i + 1), 180 + i * LINE_STEP)
      ),
      setTimeout(() => setVisibleLines(LINES.length + 1), 180 + LINES.length * LINE_STEP),
      setTimeout(() => setLifted(true), LIFT_AT),
      setTimeout(() => setDone(true), LIFT_AT + LIFT_DURATION + 50),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (done) return null;

  return (
    <div
      aria-hidden
      className={`boot-curtain ${lifted ? "is-lifted" : ""}`}
      data-testid="boot-curtain"
    >
      <div className="flex flex-col gap-1.5 font-mono text-xs sm:text-sm text-muted">
        {LINES.map((line, i) => (
          <span key={line.label} className={visibleLines > i ? "opacity-100" : "opacity-0"}>
            <span className="text-accent-dim">›</span> {line.label} … <span className="text-ok">{line.status}</span>
          </span>
        ))}
        <span className={visibleLines > LINES.length ? "opacity-100" : "opacity-0"}>
          <span className="text-accent-dim">›</span> handing over
          <span className="cursor-block ml-1.5" />
        </span>
      </div>
    </div>
  );
}
