"use client";

import { useRef, type ElementType } from "react";
import { gsap, useGSAP, MOTION_OK } from "./gsap";

/**
 * Editorial sentence whose words brighten from faint to full ink as it scrolls through the viewport
 * (scrubbed, reversible). Full contrast without JS or with reduced motion.
 */
export function WordReveal({
  as,
  text,
  muted,
  className,
  id,
}: {
  as?: ElementType;
  /** Main text (ends at full ink). */
  text: string;
  /** Optional trailing text that settles at the muted stone colour. */
  muted?: string;
  className?: string;
  id?: string;
}) {
  const Tag = (as ?? "p") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          el.querySelectorAll("[data-word]"),
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 45%", scrub: 0.6 },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const split = (s: string, cls?: string) =>
    s.split(" ").map((w, i) => (
      <span key={`${cls}-${i}`} data-word="" className={cls}>
        {w}{" "}
      </span>
    ));

  return (
    <Tag ref={ref} id={id} className={className}>
      {split(text)}
      {muted && split(muted, "text-stone")}
    </Tag>
  );
}
