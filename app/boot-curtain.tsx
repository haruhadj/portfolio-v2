"use client";

import { useEffect, useRef, useState } from "react";
import { signalBootDone, signalBootRelease } from "./boot-signal";

const WARP_DURATION = 1420;
const RELEASE_AT = 1110;
const STAR_COUNT = 420;
const FAR_PLANE = 1.45;
const NEAR_PLANE = 0.075;

const vertexShaderSource = `#version 300 es
precision highp float;

layout(location = 0) in vec2 aCorner;
layout(location = 1) in vec2 aPosition;
layout(location = 2) in float aDepth;
layout(location = 3) in float aSpeed;
layout(location = 4) in float aSize;
layout(location = 5) in float aBrightness;

uniform vec2 uResolution;
uniform float uPixelRatio;
uniform float uTravel;
uniform float uWarp;

out float vAcrossPx;
out float vBaseWidth;
out float vChroma;
out float vAlpha;

const float NEAR = ${NEAR_PLANE};
const float FAR = ${FAR_PLANE};

void main() {
  float range = FAR - NEAR;
  float z = NEAR + mod(aDepth - NEAR - uTravel * aSpeed + range * 8.0, range);
  float stretch = 0.0025 + uWarp * 0.235 * aSpeed;
  float tailZ = min(FAR, z + stretch);
  float depth = 1.0 - (z - NEAR) / range;
  float aspect = uResolution.x / uResolution.y;
  vec2 spread = vec2(0.78 + aspect * 1.12, 1.2);
  vec2 world = aPosition * spread;
  float focal = uResolution.y * 0.62;
  vec2 head = world * focal / z;
  vec2 tail = world * focal / tailZ;
  vec2 trail = head - tail;
  float trailLength = length(trail);
  float maximumTrail = min(max(uResolution.x, uResolution.y) * 0.3, 360.0 * uPixelRatio);
  if (trailLength > maximumTrail) tail = head - normalize(trail) * maximumTrail;

  vec2 direction = normalize(head - tail + vec2(0.0001));
  vec2 normal = vec2(-direction.y, direction.x);
  float baseWidth = aSize * (0.58 + depth * 1.65 + uWarp * 0.72) * uPixelRatio;
  float chroma = uWarp * 8.5 * (0.25 + depth * 0.75) * uPixelRatio;
  float halfWidth = baseWidth * 3.5 + chroma;
  vec2 positionPx = mix(tail, head, (aCorner.x + 1.0) * 0.5) + normal * aCorner.y * halfWidth;
  vec2 clip = vec2(positionPx.x / (uResolution.x * 0.5), -positionPx.y / (uResolution.y * 0.5));

  gl_Position = vec4(clip, 0.0, 1.0);
  vAcrossPx = aCorner.y * halfWidth;
  vBaseWidth = baseWidth;
  vChroma = chroma;
  vAlpha = min(1.0, (0.18 + depth * 0.9) * aBrightness);
}
`;

const fragmentShaderSource = `#version 300 es
precision highp float;

in float vAcrossPx;
in float vBaseWidth;
in float vChroma;
in float vAlpha;
out vec4 outColor;

float lineAt(float position) {
  return 1.0 - smoothstep(vBaseWidth * 0.35, vBaseWidth + 0.8, abs(position));
}

void main() {
  float core = lineAt(vAcrossPx);
  float red = lineAt(vAcrossPx + vChroma);
  float green = lineAt(vAcrossPx - vChroma * 0.45);
  float blue = lineAt(vAcrossPx - vChroma);
  float glow = exp(-abs(vAcrossPx) / max(0.5, vBaseWidth * 2.4)) * 0.2;
  vec3 split = vec3(red, green, blue);
  vec3 color = split * 0.72 + vec3(core) * 0.72 + vec3(0.32, 0.5, 0.95) * glow;
  float alpha = min(1.0, max(max(red, green), max(blue, core)) + glow) * vAlpha;
  if (alpha < 0.008) discard;
  outColor = vec4(color, alpha);
}
`;

function compileShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to create the boot-warp shader.");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) ?? "Unknown shader compilation error.";
    gl.deleteShader(shader);
    throw new Error(message);
  }
  return shader;
}

function createProgram(gl: WebGL2RenderingContext) {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = gl.createProgram();
  if (!program) throw new Error("Unable to create the boot-warp program.");
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) ?? "Unknown shader link error.";
    gl.deleteProgram(program);
    throw new Error(message);
  }
  return program;
}

function easeOutQuint(value: number) {
  return 1 - Math.pow(1 - value, 5);
}

/** GPU-instanced recreation of o2bomb/space-warp's step-six warp. */
export default function BootCurtain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [departing, setDeparting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const skipCurtain = () => {
      signalBootRelease();
      setDone(true);
      signalBootDone();
    };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      const id = window.setTimeout(() => {
        skipCurtain();
      }, 0);
      return () => window.clearTimeout(id);
    }

    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    });
    if (!canvas || !gl) {
      skipCurtain();
      return;
    }
    const rendererName = String(gl.getParameter(gl.RENDERER)).toLowerCase();
    const constrainedRenderer = /swiftshader|llvmpipe|software|radeon hd [23]|intel.*(?:gma|hd graphics 3000)/.test(rendererName);
    const constrainedCpu = (navigator.hardwareConcurrency || 8) <= 4;
    const lowPowerMode = constrainedRenderer || constrainedCpu;

    let program: WebGLProgram;
    try {
      program = createProgram(gl);
    } catch {
      // The entry animation is decorative; some WebGL2 drivers reject its
      // shader even when a context is available. Let the portfolio continue.
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      skipCurtain();
      return;
    }
    const vertexArray = gl.createVertexArray();
    const quadBuffer = gl.createBuffer();
    const starBuffer = gl.createBuffer();
    if (!vertexArray || !quadBuffer || !starBuffer) {
      gl.deleteBuffer(quadBuffer);
      gl.deleteBuffer(starBuffer);
      gl.deleteVertexArray(vertexArray);
      gl.deleteProgram(program);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      skipCurtain();
      return;
    }

    const quad = new Float32Array([
      -1, -1, 1, -1, 1, 1,
      -1, -1, 1, 1, -1, 1,
    ]);
    const stars = new Float32Array(STAR_COUNT * 6);
    for (let index = 0; index < STAR_COUNT; index += 1) {
      const offset = index * 6;
      stars[offset] = Math.random() - 0.5;
      stars[offset + 1] = Math.random() - 0.5;
      stars[offset + 2] = NEAR_PLANE + Math.random() * (FAR_PLANE - NEAR_PLANE);
      stars[offset + 3] = 0.82 + Math.random() * 0.46;
      stars[offset + 4] = 0.46 + Math.random() * 1.18;
      stars[offset + 5] = 0.42 + Math.random() * 0.58;
    }

    gl.bindVertexArray(vertexArray);
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, starBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, stars, gl.STATIC_DRAW);
    const stride = 6 * Float32Array.BYTES_PER_ELEMENT;
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, stride, 0);
    gl.vertexAttribDivisor(1, 1);
    for (let location = 2; location <= 5; location += 1) {
      gl.enableVertexAttribArray(location);
      gl.vertexAttribPointer(location, 1, gl.FLOAT, false, stride, location * Float32Array.BYTES_PER_ELEMENT);
      gl.vertexAttribDivisor(location, 1);
    }

    gl.useProgram(program);
    gl.bindVertexArray(vertexArray);
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.clearColor(0.008, 0.016, 0.039, 1);

    const resolutionUniform = gl.getUniformLocation(program, "uResolution");
    const pixelRatioUniform = gl.getUniformLocation(program, "uPixelRatio");
    const travelUniform = gl.getUniformLocation(program, "uTravel");
    const warpUniform = gl.getUniformLocation(program, "uWarp");
    let pixelRatio = 1;
    let drawCount = STAR_COUNT;
    let frame = 0;
    let start = 0;
    let previousTime = 0;
    let travel = 0;
    let hidden = document.hidden;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      pixelRatio = Math.min(window.devicePixelRatio || 1, lowPowerMode ? 0.8 : 1);
      drawCount = lowPowerMode ? 180 : bounds.width < 700 ? 280 : STAR_COUNT;
      canvas.width = Math.max(1, Math.round(bounds.width * pixelRatio));
      canvas.height = Math.max(1, Math.round(bounds.height * pixelRatio));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
      gl.uniform1f(pixelRatioUniform, pixelRatio);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const render = (time: number) => {
      frame = 0;
      if (hidden) return;
      if (!start) {
        start = time;
        previousTime = time;
      }
      const elapsed = time - start;
      const delta = Math.min(34, time - previousTime);
      previousTime = time;
      const ignition = easeOutQuint(Math.min(1, elapsed / 240));
      const decay = elapsed < 360 ? 1 : Math.exp(-(elapsed - 360) / 360);
      const warp = Math.max(0.035, ignition * decay);
      const velocity = 0.000055 + warp * 0.00335;
      travel += velocity * delta;

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(travelUniform, travel);
      gl.uniform1f(warpUniform, warp);
      gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, drawCount);
      if (elapsed < WARP_DURATION) frame = requestAnimationFrame(render);
    };

    const onVisibilityChange = () => {
      hidden = document.hidden;
      if (!hidden && !frame) {
        previousTime = performance.now();
        frame = requestAnimationFrame(render);
      }
    };
    const releaseTimer = window.setTimeout(() => {
      signalBootRelease();
      setDeparting(true);
    }, RELEASE_AT);
    const doneTimer = window.setTimeout(() => {
      setDone(true);
      signalBootDone();
    }, WARP_DURATION + 40);
    frame = requestAnimationFrame(render);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.clearTimeout(releaseTimer);
      window.clearTimeout(doneTimer);
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      gl.deleteBuffer(quadBuffer);
      gl.deleteBuffer(starBuffer);
      gl.deleteVertexArray(vertexArray);
      gl.deleteProgram(program);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  if (done) return null;

  return (
    <div aria-hidden className={`boot-curtain boot-warp ${departing ? "is-departing" : ""}`}>
      <canvas ref={canvasRef} className="boot-warp-canvas" />
    </div>
  );
}
