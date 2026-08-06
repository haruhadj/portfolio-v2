"use client";

import { useCallback, useRef, type ReactNode } from "react";
import useScrollEffect from "./use-scroll-effect";

/**
 * Scroll-links the hero: the prompt drifts up, the name block drifts down,
 * and the particle field scales past the viewer — all fading out by the time
 * the first section arrives. Layers are marked with `data-hero` on children.
 */
export default function HeroParallax({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  const paint = useCallback(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = Math.min(window.scrollY / window.innerHeight, 1);

    const layer = (name: string) => root.querySelector<HTMLElement>(`[data-hero="${name}"]`);
    const top = layer("top");
    if (top) {
      top.style.opacity = String(Math.max(1 - t * 1.6, 0));
      top.style.transform = `translateY(${-t * 90}px)`;
    }
    const bottom = layer("bottom");
    if (bottom) {
      bottom.style.opacity = String(Math.max(1 - t * 1.4, 0));
      bottom.style.transform = `translateY(${t * 70}px)`;
    }
    const field = layer("field");
    if (field) {
      field.style.opacity = String(Math.max(1 - t * 1.15, 0));
      field.style.transform = `scale(${1 + t * 0.16})`;
    }
  }, []);

  useScrollEffect(paint);

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}
