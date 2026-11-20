"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: "expo.out", duration: 1.1 });
  if (process.env.NODE_ENV !== "production") Object.assign(window, { ScrollTrigger, gsap });
}

/** True when the user has not asked for reduced motion. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/** Marks an element as handled by GSAP so the CSS no-JS fallback stops applying. */
export function claim(el: Element | null) {
  el?.setAttribute("data-motion-ready", "");
}

export { gsap, ScrollTrigger, useGSAP };
