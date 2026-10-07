"use client";
import { useEffect, useRef, type ReactNode } from "react";
import {
  readVisitPreference,
  subscribeVisitPreference,
  useVisitPreference,
} from "@/lib/visit-preference";

export function SignatureExperience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const zone = root.current;
    const surface = canvas.current;
    if (!zone || !surface) return;
    const eligible = matchMedia(
      "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const connection = (
      navigator as Navigator & {
        connection?: EventTarget & { saveData?: boolean };
      }
    ).connection;
    let stop: (() => void) | undefined;
    let pending = false;
    let disposed = false;
    let generation = 0;
    let failed = false;
    const sync = () => {
      const allowed = eligible.matches && !connection?.saveData;
      if (!allowed) {
        generation++;
        pending = false;
        stop?.();
        stop = undefined;
        zone.dataset.graphicsStatus = "static";
      } else if (
        !stop &&
        !pending &&
        !failed &&
        !readVisitPreference("arnold-motion-paused")
      ) {
        const ticket = ++generation;
        pending = true;
        zone.dataset.graphicsStatus = "starting";
        import("@/lib/motion/signature-controller")
          .then(({ mountSignature }) => {
            if (disposed || ticket !== generation) return;
            pending = false;
            stop = mountSignature(zone, surface);
          })
          .catch(() => {
            if (disposed || ticket !== generation) return;
            failed = true;
            pending = false;
            zone.dataset.graphicsStatus = "failed";
          });
      }
    };
    eligible.addEventListener("change", sync);
    connection?.addEventListener("change", sync);
    const unsubscribe = subscribeVisitPreference(sync);
    sync();
    return () => {
      disposed = true;
      generation++;
      stop?.();
      unsubscribe();
      eligible.removeEventListener("change", sync);
      connection?.removeEventListener("change", sync);
    };
  }, []);
  return (
    <div className="signature-zone" ref={root} data-graphics-status="static">
      <div className="atmosphere" aria-hidden="true">
        <canvas ref={canvas} />
      </div>
      {children}
    </div>
  );
}

export function MotionControl() {
  const [paused, setPaused] = useVisitPreference("arnold-motion-paused");
  return (
    <button
      className="motion-toggle"
      type="button"
      aria-pressed={paused}
      onClick={() => setPaused(!paused)}
    >
      {paused ? "Resume effects" : "Pause effects"}
      <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
    </button>
  );
}
