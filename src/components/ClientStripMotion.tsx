"use client";
import { useEffect, useRef } from "react";
import {
  readVisitPreference,
  subscribeVisitPreference,
  useVisitPreference,
} from "@/lib/visit-preference";

export function ClientStripMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const [paused, setPaused] = useVisitPreference("arnold-client-logos-paused");
  useEffect(() => {
    const section = root.current;
    if (!section) return;
    let visible = false;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & {
        connection?: EventTarget & { saveData?: boolean };
      }
    ).connection;
    const sync = () => {
      const staticMode = reduced.matches || connection?.saveData;
      section.dataset.mode = reduced.matches
        ? "static"
        : connection?.saveData
          ? "still"
          : "moving";
      section.dataset.running = String(
        !staticMode &&
          visible &&
          !document.hidden &&
          !readVisitPreference("arnold-client-logos-paused") &&
          !readVisitPreference("arnold-motion-paused") &&
          document.documentElement.dataset.menuOpen !== "true",
      );
    };
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    intersection.observe(section);
    const menu = new MutationObserver(sync);
    menu.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-menu-open"],
    });
    const unsubscribe = subscribeVisitPreference(sync);
    reduced.addEventListener("change", sync);
    connection?.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      intersection.disconnect();
      menu.disconnect();
      unsubscribe();
      reduced.removeEventListener("change", sync);
      connection?.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
  return (
    <section
      ref={root}
      className="client-strip"
      aria-labelledby="client-strip-title"
      data-mode="moving"
      data-running="false"
    >
      <div className="client-strip-heading">
        <h2 id="client-strip-title">Trusted by clients</h2>
        <button
          className="client-strip-control"
          type="button"
          aria-controls="client-logo-track"
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
          <span className="visually-hidden">
            {paused ? "Resume client logos" : "Pause client logos"}
          </span>
        </button>
      </div>
      {children}
      <noscript>
        <span className="client-strip-static" />
      </noscript>
    </section>
  );
}
