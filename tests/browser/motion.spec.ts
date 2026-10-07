import { test, expect } from "@playwright/test";
import { writeFile } from "node:fs/promises";
import { vertex, fieldFragment } from "../../src/lib/graphics/shaders";

test.use({
  viewport: { width: 1440, height: 900 },
  video: { mode: "on", size: { width: 1440, height: 900 } },
});

test("pointer input changes the original artwork at identical scene time", async ({
  page,
}) => {
  await page.setContent('<canvas width="384" height="240"></canvas>');
  const result = await page.evaluate(
    ({ vertex, fragment }) => {
      const canvas = document.querySelector("canvas")!;
      const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true })!;
      if (!gl) throw new Error("WebGL unavailable in the test browser");
      const compile = (type: number, source: string) => {
        const shader = gl.createShader(type)!;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
          throw new Error(gl.getShaderInfoLog(shader)!);
        return shader;
      };
      const program = gl.createProgram()!;
      gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        throw new Error(gl.getProgramInfoLog(program)!);
      gl.useProgram(program);
      for (const [name, values] of [
        ["position", [-1, -1, 3, -1, -1, 3]],
        ["uv", [0, 0, 2, 0, 0, 2]],
      ] as const) {
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array(values),
          gl.STATIC_DRAW,
        );
        const index = gl.getAttribLocation(program, name);
        gl.enableVertexAttribArray(index);
        gl.vertexAttribPointer(index, 2, gl.FLOAT, false, 0, 0);
      }
      gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array([128, 128, 0, 255]),
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      const uniform = (name: string) => gl.getUniformLocation(program, name);
      gl.uniform2f(uniform("uResolution"), 384, 240);
      gl.uniform1f(uniform("uTime"), 4.2);
      gl.uniform1f(uniform("uScene"), 0);
      gl.uniform1f(uniform("uHasFlow"), 0);
      const render = (active: number) => {
        gl.uniform4f(uniform("uLens"), 0.5, 0.32, 60, active);
        gl.uniform2f(uniform("uVelocity"), 0.7, 0.4);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        const pixels = new Uint8Array(384 * 240 * 4);
        gl.readPixels(0, 0, 384, 240, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        return pixels;
      };
      const baseline = render(0),
        repeat = render(0),
        pointer = render(1);
      let repeatDelta = 0,
        changedPixels = 0,
        near = 0,
        far = 0,
        nearCount = 0,
        farCount = 0;
      for (let y = 0; y < 240; y++)
        for (let x = 0; x < 384; x++) {
          let delta = 0;
          for (let c = 0; c < 3; c++) {
            const i = (y * 384 + x) * 4 + c;
            repeatDelta += Math.abs(baseline[i] - repeat[i]);
            delta += Math.abs(baseline[i] - pointer[i]);
          }
          if (delta > 3) changedPixels++;
          if (Math.hypot(x - 192, y - 76.8) < 65) {
            near += delta;
            nearCount++;
          } else if (Math.hypot(x - 192, y - 76.8) > 140) {
            far += delta;
            farCount++;
          }
        }
      return {
        repeatDelta,
        changedPixels,
        nearMean: near / nearCount,
        farMean: far / farCount,
        error: gl.getError(),
      };
    },
    { vertex, fragment: fieldFragment },
  );
  expect(result.repeatDelta).toBe(0);
  expect(result.changedPixels).toBeGreaterThan(200);
  expect(result.nearMean).toBeGreaterThan(result.farMean * 3);
  expect(result.error).toBe(0);
  await writeFile(
    "output/pointer-artwork-proof.json",
    JSON.stringify(result, null, 2),
  );
});

test.describe("signature visual proof", () => {
  test("Hindi lens, pause, menu suspension and pointer frame profile", async ({
    page,
  }) => {
    await page.goto("/");
    const zone = page.locator(".signature-zone"),
      heading = page.locator(".hero-headline");
    await expect(zone).toHaveAttribute("data-graphics-status", "running");
    expect(
      await page
        .locator("canvas")
        .evaluate((el) =>
          (el as HTMLCanvasElement).getContext("webgl")!.getError(),
        ),
    ).toBe(0);
    await expect(heading).toHaveAttribute("data-font-ready", "true");
    const box = (await heading.boundingBox())!;
    await page.mouse.move(box.x + box.width * 0.48, box.y + box.height * 0.45);
    await expect(heading).toHaveAttribute("data-lens-active", "true");
    await expect
      .poll(() =>
        heading.evaluate((el) =>
          parseFloat(el.style.getPropertyValue("--lens-radius")),
        ),
      )
      .toBeGreaterThan(125);
    const centre = await heading.evaluate((el) => ({
      x: parseFloat(el.style.getPropertyValue("--lens-x")),
      y: parseFloat(el.style.getPropertyValue("--lens-y")),
    }));
    expect(Math.abs(centre.x - box.width * 0.48)).toBeLessThan(2);
    expect(Math.abs(centre.y - box.height * 0.45)).toBeLessThan(2);
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator(".hero-hindi")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    const mask = await page
      .locator("main h1")
      .evaluate((el) => getComputedStyle(el).maskImage);
    expect(mask).toContain("radial-gradient");
    await page.screenshot({
      path: "output/playwright/signature-hindi-lens.png",
    });
    const [profile] = await Promise.all([
      page.evaluate(
        () =>
          new Promise<{
            frames: number;
            fps: number;
            p95: number;
            max: number;
          }>((resolve) => {
            const durations: number[] = [];
            let start = 0,
              last = 0;
            function sample(now: number) {
              if (!start) start = last = now;
              else {
                durations.push(now - last);
                last = now;
              }
              if (now - start < 6000) requestAnimationFrame(sample);
              else {
                const sorted = [...durations].sort((a, b) => a - b);
                resolve({
                  frames: durations.length,
                  fps: (durations.length * 1000) / (now - start),
                  p95: sorted[Math.floor(sorted.length * 0.95)],
                  max: Math.max(...durations),
                });
              }
            }
            requestAnimationFrame(sample);
          }),
      ),
      (async () => {
        for (let i = 0; i < 12; i++)
          await page.mouse.move(
            box.x + box.width * (i % 2 ? 0.7 : 0.3),
            box.y + box.height * (i % 3 ? 0.65 : 0.25),
            { steps: 30 },
          );
      })(),
    ]);
    await writeFile(
      "output/signature-frame-profile.json",
      JSON.stringify(
        {
          profile:
            "Chrome desktop 1440x900, six seconds, active pointer sweep, recorded video",
          ...profile,
          quality: await zone.getAttribute("data-graphics-quality"),
        },
        null,
        2,
      ),
    );
    expect(profile.fps).toBeGreaterThan(30);
    await page.getByRole("button", { name: "Pause effects" }).click();
    await expect(zone).toHaveAttribute("data-graphics-status", "suspended");
    await expect(heading).not.toHaveAttribute("data-lens-active", "true");
    await expect(page.locator(".hero-hindi")).not.toBeVisible();
    await page.getByRole("button", { name: "Resume effects" }).click();
    await page.locator(".menu-trigger").click();
    await expect(zone).toHaveAttribute("data-graphics-status", "suspended");
    await expect(page.locator("#menu-panel a").first()).toBeFocused();
    await expect
      .poll(async () => (await page.locator("#menu-panel").boundingBox())!.y)
      .toBeGreaterThanOrEqual(-0.5);
    await expect
      .poll(async () =>
        Math.round((await page.locator("#menu-panel").boundingBox())!.x),
      )
      .toBe(0);
    await page.screenshot({ path: "output/playwright/signature-menu.png" });
    await page.keyboard.press("Escape");
    await expect(zone).toHaveAttribute("data-graphics-status", "running");
  });
});

test("resize, runtime reduced motion and context loss recover to readable content", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const zone = page.locator(".signature-zone"),
    canvas = page.locator(".atmosphere canvas");
  await expect(canvas).toHaveClass("is-ready");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(zone).toHaveAttribute("data-graphics-status", "static");
  await expect(canvas).not.toHaveClass("is-ready");
  await page.getByRole("button", { name: "Preview Hindi headline" }).click();
  await expect(page.locator(".headline-language button")).toHaveAccessibleName(
    "Back to English headline",
  );
  await expect(page.locator("main h1")).toHaveAttribute("lang", "hi");
  await page.screenshot({
    path: "output/playwright/signature-mobile-hindi.png",
  });
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(canvas).toHaveClass("is-ready");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(zone).toHaveAttribute("data-graphics-status", "static");
  await expect(canvas).not.toHaveClass("is-ready");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(canvas).toHaveClass("is-ready");
  await canvas.evaluate((el) =>
    (el as HTMLCanvasElement)
      .getContext("webgl")!
      .getExtension("WEBGL_lose_context")!
      .loseContext(),
  );
  await expect(zone).toHaveAttribute("data-graphics-status", "failed");
  await expect(canvas).not.toHaveClass("is-ready");
  await expect(page.locator("main h1")).toBeVisible();
});

test("missing feedback target retains an interactive field without GL errors", async ({
  page,
}) => {
  await page.addInitScript(() => {
    WebGLRenderingContext.prototype.checkFramebufferStatus = function () {
      return this.FRAMEBUFFER_UNSUPPORTED;
    };
  });
  await page.goto("/");
  await expect(page.locator(".atmosphere canvas")).toHaveClass("is-ready");
  expect(
    await page
      .locator("canvas")
      .evaluate((el) =>
        (el as HTMLCanvasElement).getContext("webgl")!.getError(),
      ),
  ).toBe(0);
});

test("mobile and save-data load no automatic graphics or video", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "connection", {
      value: {
        saveData: true,
        addEventListener() {},
        removeEventListener() {},
      },
    }),
  );
  await page.goto("/");
  await expect(page.locator(".signature-zone")).toHaveAttribute(
    "data-graphics-status",
    "static",
  );
  await page.locator(".section-video").scrollIntoViewIfNeeded();
  await expect(page.locator("video")).not.toHaveAttribute("src", /./);
  expect(requests.filter((url) => url.endsWith(".mp4"))).toEqual([]);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/gcc");
  await page.locator(".section-video").scrollIntoViewIfNeeded();
  await expect(page.locator("video")).not.toHaveAttribute("src", /./);
  await page.getByRole("button", { name: "Play video" }).click();
  await expect(page.getByRole("button", { name: "Pause video" })).toBeVisible();
  await page.locator("main h1").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page.locator("video").evaluate((v) => (v as HTMLVideoElement).paused),
    )
    .toBe(true);
});

test("section videos play only in view and suspend behind the menu", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const [route, stem] of [
    ["/gcc", "technology-team-hands"],
    ["/approach", "team-whiteboard-workshop"],
    ["/capabilities/training", "team-whiteboard-workshop"],
  ]) {
    await page.goto(route);
    const video = page.locator("video");
    await expect(video).not.toHaveAttribute("src", /./);
    await page.locator(".section-video").scrollIntoViewIfNeeded();
    await expect(
      page.getByRole("button", { name: "Pause video" }),
    ).toBeVisible();
    await expect(video).toHaveAttribute("src", `/media/${stem}.mp4`);
    await page.locator(".menu-trigger").click();
    await expect
      .poll(() => video.evaluate((v) => (v as HTMLVideoElement).paused))
      .toBe(true);
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: "Pause video" }),
    ).toBeVisible();
    await page.screenshot({
      path: `output/playwright/video-${stem}-${route.includes("training") ? "training" : "editorial"}.png`,
    });
  }
  // Observe two actual loop wraps; do not infer looping from the HTML attribute alone.
  const wraps = await page.locator("video").evaluate(
    (video) =>
      new Promise<number>((resolve, reject) => {
        let previous = (video as HTMLVideoElement).currentTime,
          count = 0;
        const timer = setTimeout(() => {
          video.removeEventListener("timeupdate", tick);
          reject(new Error("Video did not loop twice"));
        }, 24000);
        function tick() {
          const current = (video as HTMLVideoElement).currentTime;
          if (current < previous - 0.5) count++;
          previous = current;
          if (count === 2) {
            clearTimeout(timer);
            video.removeEventListener("timeupdate", tick);
            resolve(count);
          }
        }
        video.addEventListener("timeupdate", tick);
      }),
  );
  expect(wraps).toBe(2);
});

test("autoplay rejection preserves the poster and truthful manual control", async ({
  page,
}) => {
  await page.addInitScript(() => {
    HTMLMediaElement.prototype.play = () =>
      Promise.reject(new DOMException("Blocked for test", "NotAllowedError"));
  });
  await page.goto("/approach");
  await page.locator(".section-video").scrollIntoViewIfNeeded();
  await expect(page.locator("video")).toHaveAttribute("src", /workshop/);
  await expect(page.getByRole("button", { name: "Play video" })).toBeVisible();
  await expect(page.locator("video")).toHaveCSS("opacity", "0");
  await expect(page.locator(".section-video img")).toBeVisible();
});

test("lower homepage footage completes three loop cycles and pauses offscreen", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator(".section-video").scrollIntoViewIfNeeded();
  const video = page.locator("video");
  await expect(page.getByRole("button", { name: "Pause video" })).toBeVisible();
  expect(
    await video.evaluate((v) => (v as HTMLVideoElement).duration),
  ).toBeCloseTo(9.4, 1);
  await expect(page.locator(".signature-zone")).toHaveAttribute(
    "data-graphics-status",
    "suspended",
  );
  const wraps = await video.evaluate(
    (video) =>
      new Promise<number>((resolve, reject) => {
        let previous = (video as HTMLVideoElement).currentTime,
          count = 0;
        const timer = setTimeout(() => {
          video.removeEventListener("timeupdate", tick);
          reject(new Error("Homepage footage did not loop three times"));
        }, 34000);
        function tick() {
          const current = (video as HTMLVideoElement).currentTime;
          if (current < previous - 0.5) count++;
          previous = current;
          if (count === 3) {
            clearTimeout(timer);
            video.removeEventListener("timeupdate", tick);
            resolve(count);
          }
        }
        video.addEventListener("timeupdate", tick);
      }),
  );
  expect(wraps).toBe(3);
  await page.screenshot({ path: "output/playwright/home-cinema.png" });
  await page.locator("main h1").scrollIntoViewIfNeeded();
  await expect
    .poll(() => video.evaluate((v) => (v as HTMLVideoElement).paused))
    .toBe(true);
});
