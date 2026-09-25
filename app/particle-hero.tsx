"use client";

import { useEffect, useRef } from "react";
import { waitForBootDone } from "./boot-signal";

const VIDEO_SRC = "/portfolio/bad-apple.d2adb797.mp4";
const OFFSCREEN_RATIO = 16 / 9;
const REPEL_RADIUS = 110;
const SHOCK_RADIUS = 240;

type Palette = { foreground: string; accent: string };
type PerformanceNavigator = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};
type Particle = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  brightness: number;
};

function readPalette(): Palette {
  const styles = getComputedStyle(document.documentElement);
  return {
    foreground: styles.getPropertyValue("--foreground").trim() || "#edf1ed",
    accent: styles.getPropertyValue("--accent").trim() || "#d4a85c",
  };
}

/**
 * Samples a looping video into the original spring-based particle field.
 * The video updates each particle's destination; its velocity, cursor heat,
 * and shockwave behaviour are intentionally persistent between video frames.
 */
export default function ParticleHero({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const context = canvas.getContext("2d");
    const sampler = document.createElement("canvas");
    const sampleContext = sampler.getContext("2d", { willReadFrequently: true });
    if (!context || !sampleContext) return;
    const supportsVideoFrameCallback = typeof video.requestVideoFrameCallback === "function";

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const performanceNavigator = navigator as PerformanceNavigator;
    const constrainedDevice =
      (performanceNavigator.hardwareConcurrency || 8) <= 4 ||
      (performanceNavigator.deviceMemory || 8) <= 4 ||
      performanceNavigator.connection?.saveData === true;
    const frameInterval = 1000 / (constrainedDevice ? 30 : 60);
    const minSampleWidth = constrainedDevice ? 96 : 112;
    const maxSampleWidth = constrainedDevice ? 160 : 240;
    const pointer = { x: -10000, y: -10000 };
    let palette = readPalette();
    let raf = 0;
    let visible = true;
    let ready = false;
    let disposed = false;
    let lastDrawTime = 0;
    let videoFrameDirty = true;
    let videoFrameCallback = 0;
    let lastVideoTime = -1;
    let sampleWidth = 140;
    let sampleHeight = 79;
    let particles: Particle[] = [];
    let touchStart: { pointerId: number; x: number; y: number } | null = null;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(bounds.width * dpr);
      canvas.height = Math.round(bounds.height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Denser frame sampling makes Bad Apple read as a detailed moving image
      // instead of a coarse dot pattern, without removing the physical motion.
      sampleWidth = Math.max(minSampleWidth, Math.min(maxSampleWidth, Math.round(bounds.width / 4.6)));
      sampleHeight = Math.round(sampleWidth / OFFSCREEN_RATIO);
      sampler.width = sampleWidth;
      sampler.height = sampleHeight;
      // Keep the compact hero field legible on phones: a two-pixel sampling
      // stride yields roughly four times the prior mobile particle count.
      const stride = 2;
      const next: Particle[] = [];
      for (let y = 0; y < sampleHeight; y += stride) {
        for (let x = 0; x < sampleWidth; x += stride) {
          const tx = ((x + 0.5) / sampleWidth) * bounds.width;
          const ty = ((y + 0.5) / sampleHeight) * bounds.height;
          next.push({
            tx,
            ty,
            x: particles.length ? tx : Math.random() * bounds.width,
            y: particles.length ? ty : Math.random() * bounds.height,
            vx: 0,
            vy: 0,
            brightness: 0,
          });
        }
      }
      particles = next;
      videoFrameDirty = true;
    };

    const updateVideoFrame = () => {
      sampleContext.drawImage(video, 0, 0, sampleWidth, sampleHeight);
      const pixels = sampleContext.getImageData(0, 0, sampleWidth, sampleHeight).data;
      const stride = 2;
      let particleIndex = 0;
      for (let y = 0; y < sampleHeight; y += stride) {
        for (let x = 0; x < sampleWidth; x += stride) {
          const offset = (y * sampleWidth + x) * 4;
          const luminance = (pixels[offset] * 0.2126 + pixels[offset + 1] * 0.7152 + pixels[offset + 2] * 0.0722) / 255;
          const particle = particles[particleIndex++];
          particle.brightness = luminance;
        }
      }
      videoFrameDirty = false;
    };

    const draw = (time: number) => {
      raf = 0;
      if (disposed || !visible || !ready) return;
      if (time - lastDrawTime < frameInterval) {
        if (!reduceMotion) raf = requestAnimationFrame(draw);
        return;
      }
      lastDrawTime = time;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
        if (!reduceMotion) raf = requestAnimationFrame(draw);
        return;
      }

      if (!supportsVideoFrameCallback && video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;
        videoFrameDirty = true;
      }
      if (videoFrameDirty) updateVideoFrame();
      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        // The original hero's spring + drag model, now chasing moving video targets.
        particle.vx += (particle.tx - particle.x) * 0.03;
        particle.vy += (particle.ty - particle.y) * 0.03;
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distanceSquared = dx * dx + dy * dy;
        if (distanceSquared < REPEL_RADIUS * REPEL_RADIUS) {
          const distance = Math.sqrt(distanceSquared) || 1;
          const force = ((REPEL_RADIUS - distance) / REPEL_RADIUS) * 5;
          particle.vx += (dx / distance) * force;
          particle.vy += (dy / distance) * force;
        }
        particle.vx *= 0.86;
        particle.vy *= 0.86;
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.brightness < 0.24) continue;
        const offsetX = particle.x - particle.tx;
        const offsetY = particle.y - particle.ty;
        const heat = Math.min(Math.sqrt(offsetX * offsetX + offsetY * offsetY) / 60, 1);
        const size = 0.8 + particle.brightness * 2.2 + heat * 0.8;
        context.fillStyle = heat > 0.15 ? palette.accent : palette.foreground;
        context.globalAlpha = Math.min(0.92, 0.15 + particle.brightness * 0.78);
        context.fillRect(particle.x - size / 2, particle.y - size / 2, size, size);
      }
      context.globalAlpha = 1;
      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };

    const queueDraw = () => {
      if (!raf && visible && ready) raf = requestAnimationFrame(draw);
    };
    const onVideoFrame = () => {
      if (disposed) return;
      videoFrameDirty = true;
      queueDraw();
      videoFrameCallback = video.requestVideoFrameCallback(onVideoFrame);
    };
    const begin = async () => {
      if (disposed) return;
      ready = true;
      if (supportsVideoFrameCallback && !videoFrameCallback) {
        videoFrameCallback = video.requestVideoFrameCallback(onVideoFrame);
      }
      if (!reduceMotion) {
        try { await video.play(); } catch { /* A decoded first frame remains useful if autoplay is blocked. */ }
      }
      queueDraw();
    };
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      const visual = canvas.closest<HTMLElement>(".hero-visual");
      visual?.style.setProperty("--pointer-x", `${(pointer.x / rect.width) * 100}%`);
      visual?.style.setProperty("--pointer-y", `${(pointer.y / rect.height) * 100}%`);
    };
    const onPointerLeave = () => { pointer.x = -10000; pointer.y = -10000; };
    const createShockwave = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const clickY = clientY - rect.top;
      for (const particle of particles) {
        const dx = particle.x - clickX;
        const dy = particle.y - clickY;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        if (distance >= SHOCK_RADIUS) continue;
        const force = ((SHOCK_RADIUS - distance) / SHOCK_RADIUS) * 22;
        particle.vx += (dx / distance) * force;
        particle.vy += (dy / distance) * force;
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      createShockwave(event.clientX, event.clientY);
    };
    const onTouchPointerDown = (event: PointerEvent) => {
      touchStart = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
    };
    const onTouchPointerUp = (event: PointerEvent) => {
      const start = touchStart;
      touchStart = null;
      if (!start || start.pointerId !== event.pointerId) return;
      // Let swipes remain scroll gestures; only a stationary touch creates a wave.
      if (Math.hypot(event.clientX - start.x, event.clientY - start.y) <= 12) {
        createShockwave(event.clientX, event.clientY);
      }
    };
    const onTouchPointerCancel = () => { touchStart = null; };

    resize();
    // Decode behind the fallback plate, then begin the live field as the
    // archive curtain completes its handoff.
    Promise.all([document.fonts.ready, waitForBootDone()]).then(begin);
    video.addEventListener("loadeddata", queueDraw);
    if (finePointer) {
      canvas.addEventListener("pointermove", onPointerMove, { passive: true });
      canvas.addEventListener("pointerleave", onPointerLeave);
      canvas.addEventListener("pointerdown", onPointerDown, { passive: true });
    } else {
      canvas.addEventListener("pointerdown", onTouchPointerDown, { passive: true });
      canvas.addEventListener("pointerup", onTouchPointerUp, { passive: true });
      canvas.addEventListener("pointercancel", onTouchPointerCancel, { passive: true });
    }

    const resizeObserver = new ResizeObserver(() => { resize(); queueDraw(); });
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        if (!reduceMotion) video.play().catch(() => undefined);
        queueDraw();
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
        video.pause();
      }
    }, { threshold: 0.02 });
    intersectionObserver.observe(canvas);
    const onVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (visible && !reduceMotion) {
        video.play().catch(() => undefined);
        queueDraw();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    const themeObserver = new MutationObserver(() => { palette = readPalette(); queueDraw(); });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      if (videoFrameCallback && supportsVideoFrameCallback) {
        video.cancelVideoFrameCallback(videoFrameCallback);
      }
      video.pause();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      video.removeEventListener("loadeddata", queueDraw);
      if (finePointer) {
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerleave", onPointerLeave);
        canvas.removeEventListener("pointerdown", onPointerDown);
      } else {
        canvas.removeEventListener("pointerdown", onTouchPointerDown);
        canvas.removeEventListener("pointerup", onTouchPointerUp);
        canvas.removeEventListener("pointercancel", onTouchPointerCancel);
      }
    };
  }, []);

  return <div className={className}>
    <canvas ref={canvasRef} className="particle-hero-canvas" aria-hidden />
    <video ref={videoRef} className="particle-hero-source" src={VIDEO_SRC} muted loop playsInline preload="auto" aria-hidden />
  </div>;
}
