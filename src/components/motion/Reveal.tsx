"use client";

import { useRef, type ElementType, type ComponentPropsWithoutRef } from "react";
import { gsap, useGSAP, MOTION_OK, claim } from "./gsap";

type RevealProps<T extends ElementType> = {
  as?: T;
  /** Animate direct children one after another instead of the wrapper as a whole. */
  stagger?: number;
  y?: number;
  delay?: number;
  /** Run on mount instead of on scroll (above-the-fold content). */
  immediate?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/** Fade-and-rise reveal. Content is fully visible without JS or with reduced motion. */
export function Reveal<T extends ElementType = "div">({ as, stagger, y = 36, delay = 0, immediate, children, ...rest }: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      claim(el);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const targets = stagger ? Array.from(el.children) : el;
        gsap.from(targets, {
          autoAlpha: 0,
          y,
          duration: 1.1,
          delay,
          stagger: stagger ?? 0,
          clearProps: "transform,opacity,visibility",
          ...(immediate ? {} : { scrollTrigger: { trigger: el, start: "top 88%", once: true } }),
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} data-reveal="" {...rest}>
      {children}
    </Tag>
  );
}
