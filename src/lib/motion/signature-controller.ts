import {
  createAtmosphere,
  type AtmosphereInput,
} from "../graphics/create-atmosphere";
import {
  readVisitPreference,
  subscribeVisitPreference,
} from "../visit-preference";

export function mountSignature(zone: HTMLElement, canvas: HTMLCanvasElement) {
  const renderer = createAtmosphere(canvas);
  const heading = zone.querySelector<HTMLElement>(".hero-headline");
  const markers = [
    ...zone.querySelectorAll<HTMLElement>("[data-motion-scene]"),
  ];
  let positions: { top: number; scene: number }[] = [];
  let box = canvas.getBoundingClientRect();
  let headingBox = heading?.getBoundingClientRect();
  let dirty = true;
  let frame = 0;
  let visible = true;
  let disposed = false;
  let failed = false;
  let time = 0;
  let last = performance.now();
  let sampleStart = last;
  let sampleFrames = 0;
  let quality = 1;
  let wantLens = false;
  let selecting = false;
  let targetX = innerWidth / 2;
  let targetY = innerHeight / 2;
  let smoothX = targetX;
  let smoothY = targetY;
  let previousX = targetX;
  let previousY = targetY;
  let previousTime = 0;
  let cleanupScenes: (() => void) | undefined;
  let scenesLoading = false;
  let scenesFailed = false;
  const input: AtmosphereInput = {
    x: 0.5,
    y: 0.5,
    vx: 0,
    vy: 0,
    active: 0,
    radius: 120,
    scene: 0,
  };
  const clearLens = () => {
    input.active = 0;
    wantLens = false;
    if (heading) delete heading.dataset.lensActive;
  };
  const permitted = () =>
    !disposed &&
    !failed &&
    visible &&
    !document.hidden &&
    !readVisitPreference("arnold-motion-paused") &&
    document.documentElement.dataset.menuOpen !== "true";
  const measure = () => {
    box = canvas.getBoundingClientRect();
    headingBox = heading?.getBoundingClientRect();
    dirty = false;
  };
  const resize = () => {
    measure();
    renderer.resize(box.width, box.height, quality);
    input.radius = Math.min(145, Math.max(100, box.width * 0.092));
    positions = markers.map((el) => ({
      top: el.getBoundingClientRect().top + scrollY,
      scene: Number(el.dataset.motionScene),
    }));
  };
  const updateHeading = () => {
    if (!heading || !headingBox) return;
    const x = smoothX - headingBox.left;
    const y = smoothY - headingBox.top;
    const overlap =
      x > -input.radius &&
      x < headingBox.width + input.radius &&
      y > -input.radius &&
      y < headingBox.height + input.radius;
    if (
      overlap &&
      input.active > 0.05 &&
      heading.dataset.fontReady === "true" &&
      heading.dataset.language !== "hi"
    ) {
      heading.style.setProperty("--lens-x", `${x.toFixed(1)}px`);
      heading.style.setProperty("--lens-y", `${y.toFixed(1)}px`);
      heading.style.setProperty(
        "--lens-radius",
        `${(input.radius * input.active).toFixed(1)}px`,
      );
      heading.dataset.lensActive = "true";
    } else delete heading.dataset.lensActive;
  };
  const draw = (now: number) => {
    frame = 0;
    if (!permitted()) return;
    const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
    last = now;
    time += dt;
    if (dirty) measure();
    const smoothing = 1 - Math.exp(-dt / 0.075);
    smoothX += (targetX - smoothX) * smoothing;
    smoothY += (targetY - smoothY) * smoothing;
    input.active +=
      ((wantLens && !selecting ? 1 : 0) - input.active) *
      (1 - Math.exp(-dt / 0.1));
    input.x = (smoothX - box.left) / Math.max(1, box.width);
    input.y = 1 - (smoothY - box.top) / Math.max(1, box.height);
    input.vx *= Math.exp(-dt / 0.08);
    input.vy *= Math.exp(-dt / 0.08);
    const currentScene =
      positions.filter((p) => p.top < scrollY + innerHeight * 0.6).at(-1)
        ?.scene ?? 0;
    input.scene += (currentScene - input.scene) * (1 - Math.exp(-dt / 0.45));
    if (!renderer.render(time, dt, input)) {
      fail();
      return;
    }
    updateHeading();
    sampleFrames++;
    if (now - sampleStart >= 2200) {
      if (sampleFrames / ((now - sampleStart) / 1000) < 45 && quality === 1) {
        quality = 0.75;
        resize();
        zone.dataset.graphicsQuality = "compact";
      }
      sampleStart = now;
      sampleFrames = 0;
    }
    frame = requestAnimationFrame(draw);
  };
  const sync = () => {
    if (permitted()) {
      zone.dataset.graphicsStatus = "running";
      if (!frame) {
        last = sampleStart = performance.now();
        sampleFrames = 0;
        frame = requestAnimationFrame(draw);
      }
      if (!cleanupScenes && !scenesLoading && !scenesFailed) {
        scenesLoading = true;
        import("./home-scenes")
          .then(({ animateHomeScenes }) => {
            scenesLoading = false;
            if (permitted() && !cleanupScenes)
              cleanupScenes = animateHomeScenes(zone);
          })
          .catch(() => {
            scenesLoading = false;
            scenesFailed = true;
          });
      }
    } else {
      cancelAnimationFrame(frame);
      frame = 0;
      clearLens();
      if (!failed && !disposed) renderer.render(time, 0, input);
      cleanupScenes?.();
      cleanupScenes = undefined;
      if (!failed) zone.dataset.graphicsStatus = "suspended";
    }
  };
  const fail = () => {
    failed = true;
    sync();
    canvas.classList.remove("is-ready");
    zone.dataset.graphicsStatus = "failed";
  };
  const move = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    const blocked =
      event.target instanceof Element &&
      !!event.target.closest(
        "a, button, input, textarea, select, summary, [data-no-lens]",
      );
    const selected = !!window.getSelection()?.toString();
    const dt = Math.max(
      0.016,
      Math.min(0.1, (event.timeStamp - previousTime) / 1000),
    );
    if (!wantLens) {
      smoothX = event.clientX;
      smoothY = event.clientY;
    } else {
      input.vx = Math.max(
        -1,
        Math.min(1, (event.clientX - previousX) / dt / 1000),
      );
      input.vy = Math.max(
        -1,
        Math.min(1, -(event.clientY - previousY) / dt / 1000),
      );
    }
    targetX = previousX = event.clientX;
    targetY = previousY = event.clientY;
    previousTime = event.timeStamp;
    wantLens = !blocked && !selected;
  };
  const leave = () => {
    wantLens = false;
  };
  const scroll = () => {
    dirty = true;
  };
  const down = () => {
    selecting = true;
  };
  const up = () => {
    selecting = false;
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });
  const sizeObserver = new ResizeObserver(resize);
  const unsubscribe = subscribeVisitPreference(sync);
  observer.observe(zone);
  sizeObserver.observe(zone);
  window.addEventListener("resize", resize);
  window.addEventListener("scroll", scroll, { passive: true });
  zone.addEventListener("pointermove", move, { passive: true });
  zone.addEventListener("pointerleave", leave);
  zone.addEventListener("pointerdown", down);
  window.addEventListener("pointerup", up);
  document.addEventListener("visibilitychange", sync);
  window.addEventListener("arnold-menu", sync);
  canvas.addEventListener("webglcontextlost", fail);
  resize();
  if (!renderer.render(0, 1 / 60, input)) fail();
  else canvas.classList.add("is-ready");
  sync();
  return () => {
    disposed = true;
    sync();
    observer.disconnect();
    sizeObserver.disconnect();
    unsubscribe();
    window.removeEventListener("resize", resize);
    window.removeEventListener("scroll", scroll);
    zone.removeEventListener("pointermove", move);
    zone.removeEventListener("pointerleave", leave);
    zone.removeEventListener("pointerdown", down);
    window.removeEventListener("pointerup", up);
    document.removeEventListener("visibilitychange", sync);
    window.removeEventListener("arnold-menu", sync);
    canvas.removeEventListener("webglcontextlost", fail);
    canvas.classList.remove("is-ready");
    renderer.dispose();
  };
}
