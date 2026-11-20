"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "./gsap";
import { cn } from "@/lib/cn";

/** Scroll-scrubbed drift for decorative layers. No effect with reduced motion. */
export function Parallax({ children, className, amount = 10 }: { children: React.ReactNode; className?: string; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          el,
          { yPercent: amount },
          { yPercent: -amount, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
