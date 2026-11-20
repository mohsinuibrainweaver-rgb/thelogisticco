"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/components/motion/gsap";

// Skip the transition on the very first load (the hero has its own entrance).
let firstRender = true;

/** Page transition: each client navigation fades the new page up from a short offset. */
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (firstRender) {
        firstRender = false;
        return;
      }
      window.scrollTo(0, 0);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(ref.current, { autoAlpha: 0, y: 24, duration: 0.9, ease: "expo.out", clearProps: "all" });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return <div ref={ref}>{children}</div>;
}
