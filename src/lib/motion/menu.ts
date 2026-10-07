import { gsap } from "gsap";

export function createMenuMotion(
  panel: HTMLElement,
  scrim: HTMLElement,
  closed: () => void,
) {
  const context = gsap.context(() => {});
  let timeline: gsap.core.Timeline;
  context.add(() => {
    timeline = gsap
      .timeline({ paused: true, onReverseComplete: closed })
      .fromTo(scrim, { opacity: 0 }, { opacity: 1, duration: 0.35 }, 0)
      .fromTo(
        panel,
        { yPercent: -105 },
        { yPercent: 0, duration: 0.5, ease: "power3.inOut" },
        0,
      )
      .fromTo(
        panel.querySelectorAll(".expanded-nav a, .menu-services a"),
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          stagger: 0.018,
          ease: "power2.out",
        },
        0.16,
      );
  });
  panel.style.visibility = "";
  return {
    open: () => timeline.play(),
    close: () => {
      if (timeline.progress() === 0) closed();
      else timeline.reverse();
    },
    dispose: () => context.revert(),
  };
}
