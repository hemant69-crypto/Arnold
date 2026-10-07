"use client";
import { useEffect, useRef, type ReactNode } from "react";
import {
  readVisitPreference,
  subscribeVisitPreference,
} from "@/lib/visit-preference";

export function ConsultingMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const page = root.current;
    if (!page) return;
    const eligible = matchMedia(
      "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const connection = (
      navigator as Navigator & {
        connection?: EventTarget & { saveData?: boolean };
      }
    ).connection;
    let stop: (() => void) | undefined;
    let ticket = 0,
      loading = false,
      disposed = false,
      failed = false;
    const sync = () => {
      const allowed =
        eligible.matches &&
        !connection?.saveData &&
        !readVisitPreference("arnold-motion-paused") &&
        !document.hidden &&
        document.documentElement.dataset.menuOpen !== "true";
      if (!allowed) {
        ticket++;
        loading = false;
        stop?.();
        stop = undefined;
        page.dataset.consultMotion = "static";
      } else if (!stop && !loading && !failed) {
        const generation = ++ticket;
        loading = true;
        import("@/lib/motion/consulting-scenes")
          .then(({ animateConsulting }) => {
            if (disposed || generation !== ticket) return;
            loading = false;
            stop = animateConsulting(page);
            page.dataset.consultMotion = "running";
          })
          .catch(() => {
            if (disposed || generation !== ticket) return;
            loading = false;
            failed = true;
            page.dataset.consultMotion = "static";
          });
      }
    };
    const observers: IntersectionObserver[] = [];
    for (const [sectionSelector, linkAttribute] of [
      ["[data-consult-chapter]", "data-consult-contents"],
      ["[data-consult-narrative]", "data-consult-area"],
    ]) {
      const links = [
        ...page.querySelectorAll<HTMLAnchorElement>(`[${linkAttribute}]`),
      ];
      const observer = new IntersectionObserver(
        (entries) => {
          const active = entries.filter((e) => e.isIntersecting).at(-1)
            ?.target.id;
          if (!active) return;
          for (const link of links) {
            if (link.getAttribute(linkAttribute) === active)
              link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          }
        },
        { rootMargin: "-12% 0px -65% 0px", threshold: 0 },
      );
      page
        .querySelectorAll(sectionSelector)
        .forEach((s) => observer.observe(s));
      observers.push(observer);
    }
    const unsubscribe = subscribeVisitPreference(sync);
    eligible.addEventListener("change", sync);
    connection?.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("arnold-menu", sync);
    sync();
    return () => {
      disposed = true;
      ticket++;
      stop?.();
      observers.forEach((o) => o.disconnect());
      unsubscribe();
      eligible.removeEventListener("change", sync);
      connection?.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("arnold-menu", sync);
    };
  }, []);
  return (
    <div className="consulting-page" ref={root} data-consult-motion="static">
      {children}
    </div>
  );
}
