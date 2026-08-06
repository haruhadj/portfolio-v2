"use client";

import { useEffect } from "react";

type Painter = () => void;

const painters = new Set<Painter>();
let ticking = false;
let listening = false;

function paintAll() {
  ticking = false;
  painters.forEach((paint) => paint());
}

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(paintAll);
}

function listen() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
}

function unlisten() {
  if (!listening || painters.size > 0) return;
  listening = false;
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
}

/**
 * Registers `paint` on one shared, rAF-throttled scroll loop so every
 * scroll-linked effect on the page costs a single listener between them.
 * `paint` must only write styles — never read layout-invalidating state.
 */
export default function useScrollEffect(paint: Painter, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    painters.add(paint);
    listen();
    paint();
    return () => {
      painters.delete(paint);
      unlisten();
    };
  }, [paint, enabled]);
}
