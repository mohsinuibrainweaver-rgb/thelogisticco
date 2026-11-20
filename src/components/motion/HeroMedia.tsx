"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "./gsap";

/**
 * Full-bleed hero background: settles from a slow zoom on load, then drifts and dims as the
 * hero scrolls away. Children: a `fill` next/image (priority).
 */
export function HeroMedia({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const inner = el.firstElementChild as HTMLElement;
      const section = el.closest("section");
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(inner, { scale: 1.16, duration: 2.6, ease: "expo.out" });
        gsap.to(el, {
          yPercent: 14,
          ease: "none",
          scrollTrigger: { trigger: section ?? el, start: "top top", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div ref={ref} aria-hidden={false} className="absolute inset-0 -z-20 overflow-hidden will-change-transform">
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
