"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK, claim } from "./gsap";
import { cn } from "@/lib/cn";

/**
 * Image wrapper: the frame wipes open from the bottom while the image settles from a slight zoom.
 * Optional scroll-linked parallax on the inner layer. Children should be a `fill` next/image.
 */
export function RevealImage({
  children,
  className,
  parallax = 0,
  immediate,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  /** Max vertical drift as a percentage of the frame (e.g. 8). 0 disables parallax. */
  parallax?: number;
  immediate?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      claim(el);
      const inner = el.querySelector<HTMLElement>("[data-reveal-image-inner]");
      const media = el.querySelector<HTMLElement>("[data-reveal-image-media]");
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({
          delay,
          ...(immediate ? {} : { scrollTrigger: { trigger: el, start: "top 85%", once: true } }),
        });
        tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut", clearProps: "clipPath" });
        tl.from(inner, { scale: 1.18, duration: 1.8, ease: "expo.out" }, 0.1);
        if (parallax && media) {
          gsap.fromTo(
            media,
            { yPercent: -parallax },
            { yPercent: parallax, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
          );
        }
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      data-reveal-image=""
      // Only default to `relative` when the caller hasn't positioned it (Tailwind's `relative` would beat `absolute`).
      className={cn(/\b(absolute|fixed|sticky)\b/.test(className ?? "") ? null : "relative", "overflow-hidden bg-paper-2", className)}
    >
      <div data-reveal-image-inner="" className="absolute inset-0">
        <div data-reveal-image-media="" className={cn("absolute inset-x-0", parallax ? "-inset-y-[10%]" : "inset-y-0")}>
          {children}
        </div>
      </div>
    </div>
  );
}
