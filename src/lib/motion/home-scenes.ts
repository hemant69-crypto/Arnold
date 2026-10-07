import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function animateHomeScenes(zone: HTMLElement) {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  media.add(
    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    () => {
      const context = gsap.context(() => {
        zone
          .querySelectorAll<HTMLElement>(".capability-scene")
          .forEach((scene) => {
            const image = scene.querySelector("img");
            gsap.fromTo(
              image,
              { yPercent: -4, scale: 1.08 },
              {
                yPercent: 4,
                ease: "none",
                scrollTrigger: {
                  trigger: scene,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.6,
                },
              },
            );
          });
      }, zone);
      return () => context.revert();
    },
  );
  return () => media.revert();
}
