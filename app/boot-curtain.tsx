"use client";

import { useEffect, useRef, useState } from "react";
import { signalBootDone } from "./boot-signal";

const WARP_DURATION = 1180;
const RELEASE_AT = 930;
const STAR_COUNT = 190;

type WarpStar = {
  angle: number;
  distance: number;
  speed: number;
  width: number;
  tone: "blue" | "white";
};

function createStar(radius: number, immediate = false): WarpStar {
  return {
    angle: Math.random() * Math.PI * 2,
    distance: immediate ? Math.random() * radius : Math.random() * 12,
    speed: 0.38 + Math.random() * 0.9,
    width: 0.45 + Math.random() * 1.15,
    tone: Math.random() > 0.84 ? "white" : "blue",
  };
}

/**
 * One-time canvas warp inspired by o2bomb/space-warp's outward star motion.
 * It deliberately uses no React state inside the render loop.
 */
export default function BootCurtain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [departing, setDeparting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      const id = window.setTimeout(() => {
        setDone(true);
        signalBootDone();
      }, 0);
      return () => window.clearTimeout(id);
    }

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let width = 1;
    let height = 1;
    let radius = 1;
    let frame = 0;
    let start = 0;
    let hidden = document.hidden;
    let stars: WarpStar[] = [];

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      radius = Math.hypot(width, height) * 0.62;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: STAR_COUNT }, () => createStar(radius, true));
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const render = (time: number) => {
      frame = 0;
      if (hidden) return;
      if (!start) start = time;
      const elapsed = time - start;
      const progress = Math.min(elapsed / WARP_DURATION, 1);
      const acceleration = 0.35 + Math.pow(progress, 2.35) * 5.5;
      const trailScale = 0.22 + Math.pow(progress, 2) * 1.36;
      const centerX = width / 2;
      const centerY = height / 2;

      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      for (const star of stars) {
        star.distance += star.speed * acceleration * 15;
        if (star.distance > radius) Object.assign(star, createStar(radius));

        const cosine = Math.cos(star.angle);
        const sine = Math.sin(star.angle);
        const headX = centerX + cosine * star.distance;
        const headY = centerY + sine * star.distance;
        const trail = Math.min(star.distance * trailScale, 190);
        const tailDistance = Math.max(0, star.distance - trail);
        const tailX = centerX + cosine * tailDistance;
        const tailY = centerY + sine * tailDistance;
        const visibility = Math.min(1, star.distance / (radius * 0.18));
        const alpha = visibility * (0.18 + progress * 0.7);
        const color = star.tone === "white" ? "226,235,255" : "130,174,252";
        const gradient = context.createLinearGradient(tailX, tailY, headX, headY);
        gradient.addColorStop(0, `rgba(${color}, 0)`);
        gradient.addColorStop(0.72, `rgba(${color}, ${alpha * 0.28})`);
        gradient.addColorStop(1, `rgba(${color}, ${alpha})`);
        context.strokeStyle = gradient;
        context.lineWidth = star.width * (0.65 + progress * 0.75);
        context.beginPath();
        context.moveTo(tailX, tailY);
        context.lineTo(headX, headY);
        context.stroke();
      }

      context.globalCompositeOperation = "source-over";
      if (elapsed < WARP_DURATION) frame = requestAnimationFrame(render);
    };

    const onVisibilityChange = () => {
      hidden = document.hidden;
      if (!hidden && !frame) frame = requestAnimationFrame(render);
    };
    const releaseTimer = window.setTimeout(() => setDeparting(true), RELEASE_AT);
    const doneTimer = window.setTimeout(() => {
      setDone(true);
      signalBootDone();
    }, WARP_DURATION + 260);
    frame = requestAnimationFrame(render);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.clearTimeout(releaseTimer);
      window.clearTimeout(doneTimer);
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  if (done) return null;

  return <div aria-hidden className={`boot-curtain boot-warp ${departing ? "is-departing" : ""}`}>
    <canvas ref={canvasRef} className="boot-warp-canvas" />
    <p className="boot-warp-label">Entering the field</p>
  </div>;
}
