"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "./gsap";

/**
 * Counts up when scrolled into view. Server HTML contains the final value.
 * By default it plays once; with `replay` it plays again every time the number re-enters the viewport
 * (e.g. when the visitor scrolls away and comes back to it).
 */
export function CountUp({
  value,
  start = 0,
  suffix = "",
  ease = "power3.out",
  replay = false,
  duration = 2,
}: {
  value: number;
  start?: number;
  suffix?: string;
  ease?: string;
  replay?: boolean;
  /** Seconds the count takes. */
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const obj = { n: start };
        const write = () => {
          el.textContent = `${Math.round(obj.n)}${suffix}`;
        };
        el.textContent = `${start}${suffix}`;
        const tween = gsap.to(obj, {
          n: value,
          duration,
          ease,
          paused: replay,
          scrollTrigger: replay ? undefined : { trigger: el, start: "top 90%", once: true },
          onUpdate: write,
        });
        if (replay) {
          // Every time the number comes back into view it starts again from `start`.
          const restart = () => {
            obj.n = start;
            write();
            tween.restart();
          };
          const reset = () => {
            tween.pause(0);
            obj.n = start;
            write();
          };
          gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "bottom 8%",
              onEnter: restart,
              onEnterBack: restart,
              onLeave: reset,
              onLeaveBack: reset,
            },
          });
        }
        return () => {
          el.textContent = `${value}${suffix}`;
        };
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [ease, start, suffix, value, replay, duration] },
  );
  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}
