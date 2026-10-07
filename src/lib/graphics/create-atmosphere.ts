import {
  Renderer,
  Program,
  Mesh,
  Triangle,
  RenderTarget,
  Texture,
  Vec2,
} from "ogl";
import { vertex, fieldFragment, flowFragment } from "./shaders";

export type AtmosphereInput = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  active: number;
  radius: number;
  scene: number;
};

export function createAtmosphere(canvas: HTMLCanvasElement) {
  const renderer = new Renderer({
    canvas,
    dpr: 1,
    alpha: false,
    depth: false,
    antialias: false,
    powerPreference: "low-power",
    webgl: 1,
  });
  const gl = renderer.gl;
  if (!gl || gl.isContextLost()) throw new Error("Graphics unavailable");
  let geometry: Triangle | undefined;
  let neutral: Texture | undefined;
  const targets: RenderTarget[] = [];
  const programs: Program[] = [];
  let disposed = false;
  function dispose() {
    if (disposed) return;
    disposed = true;
    for (const p of programs) {
      p.remove();
      gl.deleteShader(p.vertexShader);
      gl.deleteShader(p.fragmentShader);
    }
    geometry?.remove();
    if (neutral) gl.deleteTexture(neutral.texture);
    for (const target of targets) {
      for (const texture of target.textures) gl.deleteTexture(texture.texture);
      gl.deleteFramebuffer(target.buffer);
    }
  }
  try {
    geometry = new Triangle(gl);
    const texture = (options: ConstructorParameters<typeof Texture>[1]) => {
      const value = new Texture(gl, options);
      // OGL 1.0.11 also caches 3D wrap-R on a 2D WebGL1 texture.
      // Seed that unused cache entry so it never sends an unsupported enum.
      Object.assign(value.state, { wrapR: value.wrapR });
      return value;
    };
    neutral = texture({
      image: new Uint8Array([128, 128, 0, 255]),
      width: 1,
      height: 1,
      generateMipmaps: false,
      minFilter: gl.NEAREST,
      magFilter: gl.NEAREST,
      flipY: false,
    });
    for (let i = 0; i < 2; i++) {
      const target = new RenderTarget(gl, {
        width: 128,
        height: 128,
        depth: false,
        color: 0,
      });
      targets.push(target);
      const attachment = texture({
        width: 128,
        height: 128,
        type: gl.UNSIGNED_BYTE,
        minFilter: gl.LINEAR,
        magFilter: gl.LINEAR,
        generateMipmaps: false,
        flipY: false,
      });
      target.textures.push(attachment);
      target.texture = attachment;
      attachment.update();
      renderer.bindFramebuffer(target);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        attachment.texture,
        0,
      );
    }
    let feedback = true;
    for (const target of targets) {
      renderer.bindFramebuffer(target);
      if (
        gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE
      ) {
        feedback = false;
        continue;
      }
      gl.clearColor(0.5, 0.5, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
    renderer.bindFramebuffer();
    gl.clearColor(0, 0, 0, 1);
    const flowUniforms = {
      tPrevious: { value: targets[0].texture },
      uMouse: { value: new Vec2(-10, -10) },
      uVelocity: { value: new Vec2() },
      uAspect: { value: 1 },
      uDecay: { value: 0.98 },
      uStamp: { value: 0 },
    };
    const flowProgram = new Program(gl, {
      vertex,
      fragment: flowFragment,
      uniforms: flowUniforms,
      depthTest: false,
      depthWrite: false,
    });
    programs.push(flowProgram);
    const flowMesh = new Mesh(gl, { geometry, program: flowProgram });
    const uniforms = {
      uResolution: { value: new Vec2(1, 1) },
      uTime: { value: 0 },
      uScene: { value: 0 },
      tFlow: { value: feedback ? targets[0].texture : neutral },
      uLens: { value: [0, 0, 1, 0] },
      uVelocity: { value: new Vec2() },
      uHasFlow: { value: feedback ? 1 : 0 },
    };
    const program = new Program(gl, {
      vertex,
      fragment: fieldFragment,
      uniforms,
      depthTest: false,
      depthWrite: false,
    });
    programs.push(program);
    const mesh = new Mesh(gl, { geometry, program });
    if (
      ![program, flowProgram].every((p) =>
        gl.getProgramParameter(p.program, gl.LINK_STATUS),
      )
    ) {
      throw new Error("Artwork unavailable");
    }
    let index = 0;
    let pixelScale = 1;
    function resize(width: number, height: number, quality = 1) {
      const dpr = Math.min(devicePixelRatio || 1, 1.5) * quality;
      pixelScale = Math.min(
        dpr,
        Math.sqrt(2_100_000 / Math.max(1, width * height)),
      );
      renderer.setSize(
        Math.max(1, Math.round(width * pixelScale)),
        Math.max(1, Math.round(height * pixelScale)),
      );
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      uniforms.uResolution.value.set(canvas.width, canvas.height);
      flowUniforms.uAspect.value = width / Math.max(1, height);
    }
    function render(time: number, dt: number, input: AtmosphereInput) {
      if (gl.isContextLost()) return false;
      if (feedback) {
        flowUniforms.tPrevious.value = targets[index].texture;
        flowUniforms.uMouse.value.set(input.x, input.y);
        flowUniforms.uVelocity.value.set(input.vx, input.vy);
        flowUniforms.uDecay.value = Math.exp(-dt / 0.6);
        flowUniforms.uStamp.value =
          Math.min(1, Math.hypot(input.vx, input.vy) * 1.6) * input.active;
        index = 1 - index;
        renderer.render({ scene: flowMesh, target: targets[index] });
        uniforms.tFlow.value = targets[index].texture;
      }
      uniforms.uTime.value = time;
      uniforms.uScene.value = input.scene;
      uniforms.uVelocity.value.set(input.vx, input.vy);
      uniforms.uLens.value = [
        input.x,
        input.y,
        input.radius * pixelScale * input.active,
        input.active,
      ];
      renderer.render({ scene: mesh });
      return true;
    }
    return { resize, render, dispose, feedback };
  } catch (error) {
    dispose();
    throw error;
  }
}
