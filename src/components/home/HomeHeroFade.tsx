"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/components/motion/gsap";

/**
 * the seam right after the hero. Whatever follows the hero (here: the Memberships strip) sits in
 * this wrapper. As it scrolls in, the finished hero dissolves into the page colour (scroll-scrubbed fade) and a
 * soft gradient rises over the hero's lower edge, so there is no hard cut between the hero and the next section.
 */
export function HomeHeroFade({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const hero = document.querySelector<HTMLElement>("[data-lab-hero]");
      const veil = el.querySelector<HTMLElement>("[data-fade='veil']");
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        if (hero) {
          gsap.fromTo(
            hero,
            { opacity: 1 },
            { opacity: 0, ease: "power1.inOut", scrollTrigger: { trigger: el, start: "top 92%", end: "top 38%", scrub: 0.4 } },
          );
        }
        if (veil) {
          gsap.fromTo(veil, { opacity: 0 }, { opacity: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 98%", end: "top 55%", scrub: 0.4 } });
        }
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative z-20 bg-paper">
      <div aria-hidden data-fade="veil" className="pointer-events-none absolute inset-x-0 -top-44 z-0 h-44 bg-gradient-to-b from-transparent via-paper/70 to-paper opacity-0" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
