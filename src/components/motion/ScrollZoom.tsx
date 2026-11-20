"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "./gsap";
import { cn } from "@/lib/cn";

/**
 * Image frame whose photo settles from a gentle zoom to 1 as it travels up the viewport (scrubbed).
 * Pair with a `fill` next/image child.
 */
export function ScrollZoom({ children, className, from = 1.18 }: { children: React.ReactNode; className?: string; from?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const inner = el.firstElementChild as HTMLElement | null;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(inner, { scale: from }, { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "center 45%", scrub: true } });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={cn(/\b(absolute|fixed|sticky)\b/.test(className ?? "") ? null : "relative", "overflow-hidden bg-paper-3", className)}>
      <div className="absolute inset-0 will-change-transform">{children}</div>
    </div>
  );
}
