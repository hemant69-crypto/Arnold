"use client";

import { useEffect, useRef } from "react";
import {
  readVisitPreference,
  subscribeVisitPreference,
} from "@/lib/visit-preference";
import { MotionControl } from "./SignatureExperience";

export type SceneVariant =
  "talent" | "workforce" | "verification" | "advisory" | "founder";

/** A small decorative island; the surrounding content remains server-rendered. */
export function SceneAtmosphere({ variant }: { variant: SceneVariant }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const surface = canvas.current;
    const zone = surface?.closest<HTMLElement>("[data-scene]");
    if (!surface || !zone) return;
    zone.dataset.sceneEnhanced = "true";
    const eligible = matchMedia(
      "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const connection = (
      navigator as Navigator & {
        connection?: EventTarget & { saveData?: boolean };
      }
    ).connection;
    let visible = false;
    let pending = false;
    let disposed = false;
    let failed = false;
    let generation = 0;
    let stop: (() => void) | undefined;
    const sync = () => {
      const allowed =
        visible &&
        eligible.matches &&
        !connection?.saveData &&
        !document.hidden &&
        !readVisitPreference("arnold-motion-paused") &&
        document.documentElement.dataset.menuOpen !== "true";
      if (!allowed) {
        generation++;
        pending = false;
        stop?.();
        stop = undefined;
        zone.dataset.fieldStatus = "static";
      } else if (!stop && !pending && !failed) {
        const ticket = ++generation;
        pending = true;
        import("@/lib/motion/pillar-field")
          .then(({ mountPillarField }) => {
            if (disposed || ticket !== generation) return;
            pending = false;
            stop = mountPillarField(zone, surface, variant);
          })
          .catch(() => {
            if (disposed || ticket !== generation) return;
            pending = false;
            failed = true;
            zone.dataset.fieldStatus = "failed";
          });
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    observer.observe(zone);
    eligible.addEventListener("change", sync);
    connection?.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("arnold-menu", sync);
    const unsubscribe = subscribeVisitPreference(sync);
    return () => {
      disposed = true;
      generation++;
      stop?.();
      observer.disconnect();
      unsubscribe();
      eligible.removeEventListener("change", sync);
      connection?.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("arnold-menu", sync);
      delete zone.dataset.sceneEnhanced;
    };
  }, [variant]);
  return (
    <>
      <div className="scene-atmosphere" aria-hidden="true">
        <canvas ref={canvas} />
      </div>
      <div className="scene-motion-control">
        <MotionControl />
      </div>
    </>
  );
}
