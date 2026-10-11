import { Renderer, Program, Mesh, Triangle, Vec2, Vec4 } from "ogl";
import type { SceneVariant } from "@/components/SceneAtmosphere";
import { allowsPointerLens, pointerLensRadius } from "./pointer-lens";

const patterns: Record<SceneVariant, number> = {
  talent: 0,
  workforce: 1,
  verification: 2,
  advisory: 3,
  founder: 4,
};

const vertex = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }
`;

// Original contour fields: a focus aperture, crossing streams, evidence rings,
// a rising fold and a quiet portrait halo. No reference artwork is reused.
const fragment = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform vec2 uSize;
uniform vec2 uPointer;
uniform vec4 uLens;
uniform float uCssHeight;
uniform float uTime;
uniform float uPattern;
float band(float d, float width) { return exp(-abs(d) * width); }
vec3 artwork(vec2 uv) {
  float aspect = uSize.x / max(uSize.y, 1.0);
  vec2 p = (uv - vec2(0.72, 0.49)) * vec2(aspect, 1.0);
  p -= uPointer * 0.085;
  float t = uTime * 0.13;
  float ripple = sin(p.x * 3.0 + t) * 0.025 + cos(p.y * 4.0 - t) * 0.035;
  float d = length(p * vec2(0.82, 1.0)) - 0.34 + ripple;
  float line = band(d, 150.0);
  float wash = band(d, 13.0);
  float second = 0.0;
  vec3 blue = vec3(0.20, 0.33, 0.90);
  vec3 ember = vec3(0.95, 0.39, 0.23);
  if (uPattern > 0.5 && uPattern < 1.5) {
    d = p.y - sin(p.x * 2.3 + t) * 0.18;
    float crossing = p.y + sin(p.x * 1.7 - t * 0.8) * 0.22 + 0.12;
    line = band(d, 160.0) + band(crossing, 180.0) * 0.5;
    wash = band(d, 16.0);
    second = band(crossing, 18.0) * 0.6;
  } else if (uPattern > 1.5 && uPattern < 2.5) {
    float r = length(p * vec2(0.9, 1.0));
    d = r - 0.31 + ripple * 0.35;
    line = band(d, 180.0) + band(d - 0.085, 200.0) * 0.45 + band(d + 0.085, 200.0) * 0.28;
    wash = band(d, 24.0);
    ember = vec3(0.66, 0.72, 1.0);
  } else if (uPattern > 2.5 && uPattern < 3.5) {
    d = p.y + p.x * 0.55 + sin(p.x * 3.8 - t) * 0.11;
    line = band(d, 170.0) + band(d - 0.15, 180.0) * 0.38;
    wash = band(d, 11.0);
    second = band(d - 0.15, 18.0) * 0.55;
    blue = vec3(0.50, 0.28, 0.73);
  } else if (uPattern > 3.5) {
    p = (uv - vec2(0.25, 0.51)) * vec2(aspect, 1.0);
    p -= uPointer * 0.055;
    d = length(p * vec2(0.78, 0.92)) - 0.37 + ripple * 0.35;
    line = band(d, 160.0) * 0.65;
    wash = band(d, 12.0);
    second = band(d + 0.16, 14.0) * 0.25;
  }
  float hue = smoothstep(-0.3, 0.4, p.y + sin(t * 0.7) * 0.12);
  vec3 colour = mix(blue, ember, hue) * (wash * 0.46 + line * 0.72);
  colour += ember * second * 0.22;
  colour += blue * exp(-dot(p, p) * 2.8) * 0.025;
  float edges = smoothstep(0.0, 0.13, uv.y) * smoothstep(0.0, 0.13, 1.0 - uv.y);
  return colour * edges;
}
void main() {
  // Same circular refraction and rim as Home/Consulting, on this page's artwork.
  float aspect = uSize.x / max(uSize.y, 1.0);
  vec2 delta = (vUv - uLens.xy) * vec2(aspect, 1.0);
  float distancePx = length(delta) * uCssHeight;
  float radius = max(uLens.z, 1.0);
  float inside = (1.0 - smoothstep(radius - 2.0, radius + 2.0, distancePx)) * uLens.w;
  float radial = 1.0 - clamp(distancePx / radius, 0.0, 1.0);
  vec2 ray = delta / vec2(aspect, 1.0);
  vec2 uv = vUv - ray * radial * 0.20 * inside;
  vec3 colour = artwork(uv);
  if (inside > 0.001) {
    colour.r = artwork(uv + ray * 0.009 * inside).r;
    colour.b = artwork(uv - ray * 0.009 * inside).b;
    colour *= 1.0 + 0.10 * inside;
  }
  float rim = exp(-pow((distancePx - radius) / 1.25, 2.0)) * uLens.w;
  colour += vec3(0.35, 0.39, 0.48) * rim;
  gl_FragColor = vec4(colour, 1.0);
}
`;

export function mountPillarField(
  zone: HTMLElement,
  canvas: HTMLCanvasElement,
  variant: SceneVariant,
) {
  const renderer = new Renderer({
    canvas,
    alpha: false,
    depth: false,
    antialias: false,
    dpr: 1,
    webgl: 1,
    powerPreference: "low-power",
  });
  const gl = renderer.gl;
  if (!gl || gl.isContextLost()) throw new Error("Graphics unavailable");
  const geometry = new Triangle(gl);
  const uniforms = {
    uSize: { value: new Vec2(1, 1) },
    uPointer: { value: new Vec2(0, 0) },
    uLens: { value: new Vec4(0.5, 0.5, 120, 0) },
    uCssHeight: { value: 1 },
    uTime: { value: 0 },
    uPattern: { value: patterns[variant] },
  };
  const program = new Program(gl, {
    vertex,
    fragment,
    uniforms,
    depthTest: false,
    depthWrite: false,
  });
  const mesh = new Mesh(gl, { geometry, program });
  let frame = 0;
  let disposed = false;
  let previous = 0;
  let elapsed = 0;
  const pointer = { x: 0, y: 0 };
  let wantLens = false;
  let selecting = false;
  let targetX = 0,
    targetY = 0,
    smoothX = 0,
    smoothY = 0;
  let rect = zone.getBoundingClientRect();
  function resize() {
    rect = zone.getBoundingClientRect();
    const scale = Math.min(
      devicePixelRatio || 1,
      1.25,
      Math.sqrt(1_100_000 / Math.max(1, rect.width * rect.height)),
    );
    renderer.setSize(
      Math.max(1, Math.round(rect.width * scale)),
      Math.max(1, Math.round(rect.height * scale)),
    );
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    uniforms.uSize.value.set(canvas.width, canvas.height);
    uniforms.uCssHeight.value = rect.height;
    uniforms.uLens.value.z = pointerLensRadius(rect.width);
  }
  function move(event: PointerEvent) {
    if (event.pointerType === "touch") return;
    rect = zone.getBoundingClientRect();
    pointer.x = (event.clientX - rect.left) / Math.max(1, rect.width) - 0.5;
    pointer.y = 0.5 - (event.clientY - rect.top) / Math.max(1, rect.height);
    if (!wantLens) {
      smoothX = event.clientX;
      smoothY = event.clientY;
    }
    targetX = event.clientX;
    targetY = event.clientY;
    wantLens = variant !== "founder" && allowsPointerLens(event);
  }
  function leave() {
    pointer.x = 0;
    pointer.y = 0;
    wantLens = false;
  }
  function down() {
    selecting = true;
  }
  function up() {
    selecting = false;
    if (window.getSelection()?.toString()) wantLens = false;
  }
  function selection() {
    if (window.getSelection()?.toString()) wantLens = false;
  }
  function tick(now: number) {
    if (disposed) return;
    frame = requestAnimationFrame(tick);
    if (now - previous < 32) return;
    const dt = Math.min((now - (previous || now)) / 1000, 0.06);
    previous = now;
    elapsed += dt;
    uniforms.uTime.value = elapsed;
    const smoothing = 1 - Math.exp(-dt / 0.075);
    smoothX += (targetX - smoothX) * smoothing;
    smoothY += (targetY - smoothY) * smoothing;
    const lens = uniforms.uLens.value;
    lens.x = (smoothX - rect.left) / Math.max(1, rect.width);
    lens.y = 1 - (smoothY - rect.top) / Math.max(1, rect.height);
    lens.w +=
      ((wantLens && !selecting ? 1 : 0) - lens.w) * (1 - Math.exp(-dt / 0.1));
    if (lens.w > 0.05) {
      zone.dataset.pointerLens = "true";
      zone.style.setProperty(
        "--lens-x",
        `${(smoothX - rect.left).toFixed(1)}px`,
      );
      zone.style.setProperty(
        "--lens-y",
        `${(smoothY - rect.top).toFixed(1)}px`,
      );
      zone.style.setProperty("--lens-radius", `${lens.z.toFixed(1)}px`);
    } else delete zone.dataset.pointerLens;
    uniforms.uPointer.value.x += (pointer.x - uniforms.uPointer.value.x) * 0.07;
    uniforms.uPointer.value.y += (pointer.y - uniforms.uPointer.value.y) * 0.07;
    if (variant === "founder") {
      zone.style.setProperty(
        "--portrait-x",
        `${uniforms.uPointer.value.x * 7}px`,
      );
      zone.style.setProperty(
        "--portrait-y",
        `${-uniforms.uPointer.value.y * 7}px`,
      );
    }
    renderer.render({ scene: mesh });
  }
  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    observer.disconnect();
    zone.removeEventListener("pointermove", move);
    zone.removeEventListener("pointerleave", leave);
    zone.removeEventListener("pointerdown", down);
    window.removeEventListener("pointerup", up);
    document.removeEventListener("selectionchange", selection);
    window.removeEventListener("scroll", leave);
    canvas.removeEventListener("webglcontextlost", lost);
    zone.style.removeProperty("--portrait-x");
    zone.style.removeProperty("--portrait-y");
    delete zone.dataset.pointerLens;
    for (const key of ["--lens-x", "--lens-y", "--lens-radius"])
      zone.style.removeProperty(key);
    program.remove();
    gl.deleteShader(program.vertexShader);
    gl.deleteShader(program.fragmentShader);
    geometry.remove();
  }
  function lost(event: Event) {
    event.preventDefault();
    zone.dataset.fieldStatus = "failed";
    dispose();
  }
  const observer = new ResizeObserver(resize);
  if (!gl.getProgramParameter(program.program, gl.LINK_STATUS)) {
    dispose();
    throw new Error("Artwork unavailable");
  }
  observer.observe(zone);
  resize();
  zone.addEventListener("pointermove", move, { passive: true });
  zone.addEventListener("pointerleave", leave);
  zone.addEventListener("pointerdown", down);
  window.addEventListener("pointerup", up);
  document.addEventListener("selectionchange", selection);
  window.addEventListener("scroll", leave, { passive: true });
  canvas.addEventListener("webglcontextlost", lost);
  zone.dataset.fieldStatus = "running";
  frame = requestAnimationFrame(tick);
  return dispose;
}
