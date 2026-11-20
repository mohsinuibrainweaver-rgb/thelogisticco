"use client";

import { useRef, type ElementType } from "react";
import { gsap, useGSAP, MOTION_OK, claim } from "./gsap";
import { cn } from "@/lib/cn";

type Line = string | React.ReactNode;

/**
 * Headline whose authored lines rise out of a mask. Line breaks are authored (not measured),
 * so there is no layout shift and the text is complete in the server HTML.
 */
export function MaskLines({
  as,
  id,
  lines,
  className,
  lineClassName,
  immediate,
  delay = 0,
  stagger = 0.09,
}: {
  as?: ElementType;
  id?: string;
  lines: Line[];
  className?: string;
  lineClassName?: string;
  immediate?: boolean;
  delay?: number;
  stagger?: number;
}) {
  const Tag = (as ?? "h2") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      claim(el);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(el.querySelectorAll("[data-line-inner]"), {
          yPercent: 112,
          rotate: 2,
          duration: 1.3,
          delay,
          stagger,
          ease: "expo.out",
          clearProps: "transform",
          ...(immediate ? {} : { scrollTrigger: { trigger: el, start: "top 90%", once: true } }),
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className} data-reveal-lines="">
      {lines.map((line, i) => (
        <span key={i} className={cn("block overflow-hidden pb-[0.06em] -mb-[0.06em]", lineClassName)}>
          <span data-line-inner="" className="block origin-bottom-left">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
