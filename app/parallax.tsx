"use client";

import { useCallback, useRef, type ReactNode } from "react";
import useScrollEffect from "./use-scroll-effect";

/**
 * Shifts its child against the scroll direction as it crosses the viewport.
 * The child must be taller than its clipping parent, or the drift exposes an
 * edge — screenshot wells use `-inset-y` for that headroom.
 */
export default function Parallax({
  children,
  distance = 22,
  className = "",
}: {
  children: ReactNode;
  /** Peak travel in px across a full viewport crossing. */
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const paint = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const vh = window.innerHeight;
    const rect = el.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > vh) return;
    const centered = (rect.top + rect.height / 2 - vh / 2) / vh;
    el.style.transform = `translateY(${-centered * distance}px)`;
  }, [distance]);

  useScrollEffect(paint);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
