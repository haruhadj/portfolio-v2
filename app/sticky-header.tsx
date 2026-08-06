"use client";

import { useCallback, useRef, type ReactNode } from "react";
import useScrollEffect from "./use-scroll-effect";

const CONDENSE_AT = 40;

/** Site header that condenses once the page has scrolled off the top. */
export default function StickyHeader({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  const paint = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.toggle("is-condensed", window.scrollY > CONDENSE_AT);
  }, []);

  useScrollEffect(paint);

  return (
    <header
      ref={ref}
      className="site-header fixed inset-x-0 top-0 z-20 border-b border-border-line/60 bg-background/60 backdrop-blur-md"
    >
      {children}
    </header>
  );
}
