import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function animateConsulting(page: HTMLElement) {
  gsap.registerPlugin(ScrollTrigger);
  const context = gsap.context(() => {
    // Essential copy stays visible. Only its position and decorative relationships move.
    page
      .querySelectorAll<HTMLElement>("[data-consult-reveal]")
      .forEach((heading) => {
        gsap.fromTo(
          heading,
          { y: 22 },
          {
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: heading, start: "top 92%", once: true },
          },
        );
      });
    const film = page.querySelector("[data-consult-film]");
    if (film)
      gsap.fromTo(
        film,
        { "--film-inset": "7%" },
        {
          "--film-inset": "0%",
          ease: "none",
          scrollTrigger: {
            trigger: film,
            start: "top 95%",
            end: "top 12%",
            scrub: 0.5,
          },
        },
      );
    page
      .querySelectorAll<SVGPathElement>("[data-consult-path]")
      .forEach((path) => {
        const length = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: path.closest("figure"),
              start: "top 80%",
              once: true,
            },
          },
        );
      });
    const journey = page.querySelector("[data-consult-journey]");
    if (journey)
      gsap.fromTo(
        journey,
        { "--journey-progress": 0 },
        {
          "--journey-progress": 1,
          ease: "none",
          scrollTrigger: {
            trigger: journey,
            start: "top 65%",
            end: "bottom 60%",
            scrub: 0.3,
          },
        },
      );
  }, page);
  return () => context.revert();
}
