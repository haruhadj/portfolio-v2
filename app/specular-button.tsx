"use client";

import { Color, Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef, type CSSProperties, type MouseEventHandler, type ReactNode } from "react";

type ButtonSize = "sm" | "md" | "lg";

export type SpecularButtonProps = {
  children: ReactNode;
  size?: ButtonSize;
  radius?: number;
  tint?: string;
  tintOpacity?: number;
  blur?: number;
  textColor?: string;
  lineColor?: string;
  baseColor?: string;
  intensity?: number;
  shineSize?: number;
  shineFade?: number;
  thickness?: number;
  speed?: number;
  followMouse?: boolean;
  proximity?: number;
  autoAnimate?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  className?: string;
  type?: "button" | "submit" | "reset";
  href?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

const vertex = `attribute vec2 position; void main() { gl_Position = vec4(position, 0.0, 1.0); }`;
const fragment = `
precision highp float;
uniform vec2 uCenter, uHalfSize;
uniform float uRadius, uAngle, uPx, uIntensity, uShineSize, uShineFade, uThickness, uBaseWidth;
uniform vec3 uLineColor, uBaseColor;
float sdRoundedRect(vec2 p, vec2 b, float r) { vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
float gaussianLine(float d, float sigma) { float x = d / (sigma + 0.000001); return exp(-1.35 * x * x); }
void main() {
  vec2 p = gl_FragCoord.xy - uCenter; float d = sdRoundedRect(p, uHalfSize, uRadius);
  vec2 light = vec2(cos(uAngle), sin(uAngle));
  float base = (1.0 - smoothstep(0.0, uBaseWidth, abs(d))) * 0.5;
  vec2 normal = normalize(p / (uHalfSize * uHalfSize) + 0.000001);
  float angle = acos(clamp(abs(dot(normal, light)), 0.0, 1.0));
  float rim = 1.0 - smoothstep(uShineSize - uShineFade, uShineSize + uShineFade + 0.0001, angle);
  float edge = 1.0 - smoothstep(0.5 * uPx, 3.0 * uPx, abs(d));
  float shine = gaussianLine(d, uThickness) * rim * edge * uIntensity;
  float alpha = clamp(base + shine, 0.0, 1.0);
  gl_FragColor = vec4(uBaseColor * base + uLineColor * shine, alpha);
}`;

const sizeClass: Record<ButtonSize, string> = { sm: "specular-sm", md: "specular-md", lg: "specular-lg" };

/**
 * React Bits-inspired OGL edge treatment. Renders an anchor when `href` is
 * supplied so page routes and external actions retain correct semantics.
 */
export default function SpecularButton({
  children, size = "md", radius = 10, tint = "#182126", tintOpacity = 0.72, blur = 12,
  textColor = "#edf1ed", lineColor = "#fff1c4", baseColor = "#5f615b", intensity = 1,
  shineSize = 10, shineFade = 40, thickness = 1, speed = 0.35, followMouse = true,
  proximity = 250, autoAnimate = false, disabled = false, onClick, className = "", type = "button",
  href, target, rel, ariaLabel,
}: SpecularButtonProps) {
  const controlRef = useRef<HTMLElement | null>(null);
  const fxRef = useRef<HTMLSpanElement>(null);
  const propsRef = useRef({ radius, lineColor, baseColor, intensity, shineSize, shineFade, thickness, speed, followMouse, proximity, autoAnimate });

  useEffect(() => {
    propsRef.current = { radius, lineColor, baseColor, intensity, shineSize, shineFade, thickness, speed, followMouse, proximity, autoAnimate };
  }, [radius, lineColor, baseColor, intensity, shineSize, shineFade, thickness, speed, followMouse, proximity, autoAnimate]);

  useEffect(() => {
    const control = controlRef.current;
    const fx = fxRef.current;
    if (!control || !fx) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) delete geometry.attributes.uv;
    const program = new Program(gl, { vertex, fragment, uniforms: {
      uCenter: { value: [0, 0] }, uHalfSize: { value: [1, 1] }, uRadius: { value: 0 }, uAngle: { value: 2.4 }, uPx: { value: 1 },
      uLineColor: { value: [1, 1, 1] }, uBaseColor: { value: [0.3, 0.3, 0.3] }, uIntensity: { value: 0 },
      uShineSize: { value: 0.17 }, uShineFade: { value: 0.7 }, uThickness: { value: 1 }, uBaseWidth: { value: 1 },
    } });
    const mesh = new Mesh(gl, { geometry, program });
    fx.appendChild(gl.canvas);
    const size = { width: 1, height: 1 };
    const pad = 14;
    const resize = () => {
      const rect = control.getBoundingClientRect();
      size.width = rect.width; size.height = rect.height;
      renderer.setSize(rect.width + pad * 2, rect.height + pad * 2);
      const dpr = renderer.dpr;
      program.uniforms.uCenter.value = [(pad + rect.width / 2) * dpr, (pad + rect.height / 2) * dpr];
      program.uniforms.uHalfSize.value = [(rect.width / 2) * dpr, (rect.height / 2) * dpr];
      program.uniforms.uPx.value = dpr;
      program.uniforms.uBaseWidth.value = dpr;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(control);
    resize();

    let pointerAngle: number | null = null;
    let proximityAmount = 0;
    const move = (event: PointerEvent) => {
      const rect = control.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = Math.max(rect.left - event.clientX, 0, event.clientX - rect.right);
      const dy = Math.max(rect.top - event.clientY, 0, event.clientY - rect.bottom);
      const distance = Math.hypot(dx, dy);
      pointerAngle = distance === 0 ? Math.atan2(2 / rect.height, -2 / rect.width) : Math.atan2(centerY - event.clientY, event.clientX - centerX);
      const t = Math.max(0, 1 - distance / Math.max(propsRef.current.proximity, 1));
      proximityAmount = t * t * (3 - 2 * t);
    };
    let angle = 2.4;
    let idleAngle = 2.4;
    let brightness = 0;
    let last = performance.now();
    let frame = 0;
    const line = new Color();
    const base = new Color();
    const render = (now: number) => {
      frame = 0;
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      const current = propsRef.current;
      idleAngle += current.speed * delta;
      const target = current.followMouse && pointerAngle !== null && (!current.autoAnimate || proximityAmount > 0) ? pointerAngle : idleAngle;
      const difference = ((target - angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      angle += difference * (1 - Math.exp(-delta * 7));
      const targetBrightness = current.autoAnimate ? 1 : proximityAmount;
      brightness += (targetBrightness - brightness) * (1 - Math.exp(-delta * 8));
      line.set(current.lineColor); base.set(current.baseColor);
      const dpr = renderer.dpr;
      program.uniforms.uAngle.value = angle;
      program.uniforms.uRadius.value = Math.min(current.radius, Math.min(size.width, size.height) / 2) * dpr;
      program.uniforms.uLineColor.value = [line.r, line.g, line.b];
      program.uniforms.uBaseColor.value = [base.r, base.g, base.b];
      program.uniforms.uIntensity.value = current.intensity * brightness;
      program.uniforms.uShineSize.value = current.shineSize * Math.PI / 180;
      program.uniforms.uShineFade.value = current.shineFade * Math.PI / 180;
      program.uniforms.uThickness.value = current.thickness * dpr;
      renderer.render({ scene: mesh });
      if (!reduceMotion && (current.autoAnimate || proximityAmount > 0.001 || brightness > 0.001)) {
        frame = requestAnimationFrame(render);
      }
    };
    const scheduleRender = () => {
      if (!reduceMotion && !frame) frame = requestAnimationFrame(render);
    };
    const onPointerMove = (event: PointerEvent) => {
      move(event);
      scheduleRender();
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("pointermove", onPointerMove);
      gl.canvas.remove(); gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  const style = {
    "--sb-radius": `${radius}px`, "--sb-tint": tint, "--sb-opacity": tintOpacity,
    "--sb-blur": `${blur}px`, "--sb-text": textColor,
  } as CSSProperties;
  const classes = `specular-button ${sizeClass[size]} ${className}`;
  const content = <><span ref={fxRef} className="specular-fx" aria-hidden /><span className="specular-label">{children}</span></>;
  const setControl = (node: HTMLElement | null) => { controlRef.current = node; };
  if (href) return <a ref={setControl} href={href} target={target} rel={rel} aria-label={ariaLabel} className={classes} style={style} onClick={onClick}>{content}</a>;
  return <button ref={setControl} type={type} disabled={disabled} aria-label={ariaLabel} className={classes} style={style} onClick={onClick}>{content}</button>;
}
