"use client";

import { Color, Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef } from "react";
import { waitForBootDone, waitForBootRelease } from "./boot-signal";

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position, 0, 1); }
`;

const fragmentShader = `
precision highp float;
uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform vec2 uMouse;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform bool uMouseRepulsion;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uRepulsionStrength;
uniform float uMouseActiveFactor;
uniform bool uTransparent;
varying vec2 vUv;
#define NUM_LAYER 4.0
#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
#define PERIOD 3.0
float Hash21(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float tri(float x) { return abs(fract(x) * 2.0 - 1.0); }
float tris(float x) { float t = fract(x); return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0)); }
float trisn(float x) { float t = fract(x); return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0; }
vec3 hsv2rgb(vec3 c) { vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0); vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www); return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y); }
float Star(vec2 uv, float flare) {
  float d = length(uv); float m = (0.05 * uGlowIntensity) / d;
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * flare * uGlowIntensity; uv *= MAT45;
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * 0.3 * flare * uGlowIntensity; return m * smoothstep(1.0, 0.2, d);
}
vec3 StarLayer(vec2 uv) {
  vec3 col = vec3(0.0); vec2 gv = fract(uv) - 0.5; vec2 id = floor(uv);
  for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
    vec2 offset = vec2(float(x), float(y)); vec2 si = id + offset; float seed = Hash21(si);
    float size = fract(seed * 345.32); float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
    float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;
    float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;
    float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;
    float grn = min(red, blu) * seed; vec3 base = vec3(red, grn, blu);
    float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
    hue = fract(hue + uHueShift / 360.0);
    float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
    base = hsv2rgb(vec3(hue, sat, max(max(base.r, base.g), base.b)));
    vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;
    float star = Star(gv - offset - pad, flareSize);
    float twinkle = mix(1.0, trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0, uTwinkleIntensity);
    col += star * size * base * twinkle;
  }
  return col;
}
void main() {
  vec2 focalPx = uFocal * uResolution.xy;
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;
  vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
  if (uMouseRepulsion) {
    float mouseDist = length(uv - mousePosUV);
    vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));
    uv += repulsion * 0.05 * uMouseActiveFactor;
  }
  float autoRotAngle = uTime * uRotationSpeed;
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
  uv = autoRot * uv;
  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;
  vec3 col = vec3(0.0);
  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
    float depth = fract(i + uStarSpeed * uSpeed);
    col += StarLayer(uv * mix(20.0 * uDensity, 0.5 * uDensity, depth) + i * 453.32) * (depth * smoothstep(1.0, 0.9, depth));
  }
  float alpha = min(smoothstep(0.0, 0.3, length(col)), 1.0);
  gl_FragColor = uTransparent ? vec4(col, alpha) : vec4(col, 1.0);
}
`;

type GalaxyProps = {
  focal?: [number, number]; rotation?: [number, number]; starSpeed?: number; density?: number;
  hueShift?: number; disableAnimation?: boolean; speed?: number; mouseInteraction?: boolean;
  glowIntensity?: number; saturation?: number; mouseRepulsion?: boolean; twinkleIntensity?: number;
  rotationSpeed?: number; repulsionStrength?: number; transparent?: boolean; className?: string;
};

export default function Galaxy({
  focal = [0.5, 0.5], rotation = [1, 0], starSpeed = 0.5, density = 1, hueShift = 140,
  disableAnimation = false, speed = 1, mouseInteraction = true, glowIntensity = 0.3,
  saturation = 0, mouseRepulsion = true, twinkleIntensity = 0.3, rotationSpeed = 0.1,
  repulsionStrength = 2, transparent = true, className = "",
}: GalaxyProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new Renderer({ alpha: transparent, premultipliedAlpha: false });
    const gl = renderer.gl;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, transparent ? 0 : 1);

    const targetMouse = { x: 0.5, y: 0.5, active: 0 };
    const smoothMouse = { x: 0.5, y: 0.5, active: 0 };
    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 }, uResolution: { value: new Color(1, 1, 1) },
        uFocal: { value: new Float32Array(focal) }, uRotation: { value: new Float32Array(rotation) },
        uStarSpeed: { value: starSpeed }, uDensity: { value: density }, uHueShift: { value: hueShift }, uSpeed: { value: speed },
        uMouse: { value: new Float32Array([0.5, 0.5]) }, uGlowIntensity: { value: glowIntensity }, uSaturation: { value: saturation },
        uMouseRepulsion: { value: mouseRepulsion }, uTwinkleIntensity: { value: twinkleIntensity }, uRotationSpeed: { value: rotationSpeed },
        uRepulsionStrength: { value: repulsionStrength }, uMouseActiveFactor: { value: 0 }, uTransparent: { value: transparent },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });
    const resize = () => {
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      program.uniforms.uResolution.value = new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const onMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouse.x = (event.clientX - rect.left) / rect.width;
      targetMouse.y = 1 - (event.clientY - rect.top) / rect.height;
      targetMouse.active = 1;
    };
    const onLeave = () => { targetMouse.active = 0; };
    if (mouseInteraction && !reduceMotion) {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseleave", onLeave);
    }

    let frame = 0;
    let ready = false;
    let cancelled = false;
    let hidden = document.hidden;
    const onVisibility = () => {
      hidden = document.hidden;
      if (!hidden && ready && !frame) frame = requestAnimationFrame(render);
    };
    const render = (time: number) => {
      frame = 0;
      if (hidden) return;
      if (!disableAnimation && !reduceMotion) {
        program.uniforms.uTime.value = time * 0.001;
        program.uniforms.uStarSpeed.value = (time * 0.001 * starSpeed) / 10;
      }
      smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.05;
      smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.05;
      smoothMouse.active += (targetMouse.active - smoothMouse.active) * 0.05;
      program.uniforms.uMouse.value[0] = smoothMouse.x;
      program.uniforms.uMouse.value[1] = smoothMouse.y;
      program.uniforms.uMouseActiveFactor.value = smoothMouse.active;
      renderer.render({ scene: mesh });
      if (!reduceMotion) frame = requestAnimationFrame(render);
    };
    container.appendChild(gl.canvas);
    waitForBootRelease().then(() => {
      if (!cancelled) renderer.render({ scene: mesh });
    });
    waitForBootDone().then(() => {
      ready = true;
      if (!cancelled && !hidden && !reduceMotion && !frame) {
        frame = requestAnimationFrame(render);
      }
    });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (mouseInteraction && !reduceMotion) {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseleave", onLeave);
      }
      gl.canvas.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [focal, rotation, starSpeed, density, hueShift, disableAnimation, speed, mouseInteraction, glowIntensity, saturation, mouseRepulsion, twinkleIntensity, rotationSpeed, repulsionStrength, transparent]);

  return <div ref={containerRef} className={`galaxy-background ${className}`} aria-hidden />;
}
