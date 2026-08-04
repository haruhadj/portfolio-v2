"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
};

const REPEL_RADIUS = 110;
const SHOCK_RADIUS = 240;

/** Parse a #rrggbb custom property into [r, g, b]. */
function cssRgb(name: string, fallback: [number, number, number]) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name);
  const m = v.trim().match(/^#([0-9a-f]{6})$/i);
  if (!m) return fallback;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as [number, number, number];
}

/**
 * Renders `text` as a dot-matrix particle field on a canvas.
 * Particles spring toward their glyph position; the cursor acts as a heat
 * source that scatters them and shifts their color amber → ember until they
 * cool back into place. Pointer-down emits a shockwave.
 */
export default function ParticleHero({
  text = "HARUHADJ",
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Coarse pointers (touch) can't drag over the canvas without the
    // gesture being claimed as a page scroll first — skip the repel
    // interaction there rather than fight it; the field still animates.
    const canInteract = window.matchMedia("(pointer: fine)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -1e4, y: -1e4 };
    let particles: Particle[] = [];
    let raf = 0;
    let disposed = false;
    let AMBER: [number, number, number] = [255, 171, 64];
    let EMBER: [number, number, number] = [255, 92, 51];

    const readColors = () => {
      AMBER = cssRgb("--accent", AMBER);
      EMBER = cssRgb("--ember", EMBER);
    };

    const sample = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // rasterize the word offscreen, then sample filled pixels as targets
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const octx = off.getContext("2d");
      if (!octx) return;
      const family =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--font-jetbrains-mono")
          .trim() || "monospace";
      const size = Math.min((w * 0.94) / (text.length * 0.62), h * 0.42);
      octx.font = `800 ${size}px ${family}`;
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillStyle = "#fff";
      octx.fillText(text, w / 2, h / 2);

      const gap = 4;
      const data = octx.getImageData(0, 0, w, h).data;
      const next: Particle[] = [];
      for (let y = 0; y < h; y += gap) {
        for (let x = 0; x < w; x += gap) {
          if (data[(y * w + x) * 4 + 3] > 128) {
            next.push({
              tx: x,
              ty: y,
              x: Math.random() * w,
              y: Math.random() * h,
              vx: 0,
              vy: 0,
            });
          }
        }
      }
      particles = next;
    };

    const step = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        // spring toward the glyph
        p.vx += (p.tx - p.x) * 0.03;
        p.vy += (p.ty - p.y) * 0.03;
        // cursor = heat source
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < REPEL_RADIUS * REPEL_RADIUS) {
          const d = Math.sqrt(d2) || 1;
          const f = ((REPEL_RADIUS - d) / REPEL_RADIUS) * 5;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;

        // displacement = temperature: amber at rest, ember when agitated
        const ox = p.x - p.tx;
        const oy = p.y - p.ty;
        const heat = Math.min(Math.sqrt(ox * ox + oy * oy) / 60, 1);
        const r = (AMBER[0] + (EMBER[0] - AMBER[0]) * heat) | 0;
        const g = (AMBER[1] + (EMBER[1] - AMBER[1]) * heat) | 0;
        const b = (AMBER[2] + (EMBER[2] - AMBER[2]) * heat) | 0;
        ctx.fillStyle = `rgb(${r} ${g} ${b})`;
        ctx.fillRect(p.x, p.y, 2, 2);
      }
      raf = requestAnimationFrame(step);
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      ctx.fillStyle = `rgb(${AMBER[0]} ${AMBER[1]} ${AMBER[2]})`;
      for (const p of particles) ctx.fillRect(p.tx, p.ty, 2, 2);
    };

    const start = () => {
      if (disposed) return;
      readColors();
      sample();
      cancelAnimationFrame(raf);
      if (reduce) drawStatic();
      else raf = requestAnimationFrame(step);
    };

    // wait for the mono font so the rasterized word matches the page
    document.fonts.ready.then(start);

    // re-color when the theme toggle flips data-theme
    const themeObserver = new MutationObserver(() => {
      readColors();
      if (reduce) drawStatic();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -1e4;
      mouse.y = -1e4;
    };
    const onDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      for (const p of particles) {
        const dx = p.x - cx;
        const dy = p.y - cy;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        if (d < SHOCK_RADIUS) {
          const f = ((SHOCK_RADIUS - d) / SHOCK_RADIUS) * 22;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
      }
    };
    if (canInteract) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      document.documentElement.addEventListener("mouseleave", onLeave);
    }

    let firstResize = true;
    const ro = new ResizeObserver(() => {
      if (firstResize) {
        firstResize = false;
        return;
      }
      start();
    });
    ro.observe(canvas);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      themeObserver.disconnect();
      if (canInteract) {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerdown", onDown);
        document.documentElement.removeEventListener("mouseleave", onLeave);
      }
    };
  }, [text]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
