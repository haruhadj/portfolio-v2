"use client";

import { useCallback, useEffect, useRef } from "react";

const GLYPHS = "▓▒░<>/[]{}#$%&*+=~";

/**
 * Decodes text from random terminal glyphs on mount, and again on hover.
 * Server-renders the final text, so SEO and no-JS both see the real name.
 */
export default function ScrambleText({
  text,
  startDelay = 0,
  className = "",
}: {
  text: string;
  startDelay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);

  const scramble = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(raf.current);
    let iteration = 0;
    const tick = () => {
      iteration += text.length / 30;
      el.textContent = text
        .split("")
        .map((char, i) =>
          i < iteration
            ? char
            : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        )
        .join("");
      if (iteration < text.length) {
        raf.current = requestAnimationFrame(tick);
      } else {
        el.textContent = text;
      }
    };
    raf.current = requestAnimationFrame(tick);
  }, [text]);

  useEffect(() => {
    const start = setTimeout(scramble, startDelay);
    return () => {
      clearTimeout(start);
      cancelAnimationFrame(raf.current);
    };
  }, [scramble, startDelay]);

  return (
    <span
      ref={ref}
      className={className}
      onMouseEnter={scramble}
      aria-label={text}
    >
      {text}
    </span>
  );
}
