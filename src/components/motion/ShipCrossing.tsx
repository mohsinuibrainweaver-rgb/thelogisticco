"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "./gsap";

/**
 * Signature interstitial: a top-down container ship sails across the headline as the section scrolls
 * through the viewport (scrubbed, no pinning, no scroll hijack). Static and centred with reduced motion.
 */
export function ShipCrossing({ label, title }: { label: string; title: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const ship = el.querySelector<HTMLElement>("[data-ship]");
      const wake = el.querySelector<HTMLElement>("[data-wake]");
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.8 } });
        tl.fromTo(ship, { xPercent: -120, x: "-10vw" }, { xPercent: 20, x: "60vw", ease: "none" }, 0);
        tl.fromTo(wake, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-labelledby="crossing-heading" className="relative flex min-h-[88svh] items-center justify-center overflow-hidden">
      <div className="relative z-10 px-4 text-center">
        <p className="label-mono text-stone">{label}</p>
        <h2 id="crossing-heading" className="font-editorial mt-5 text-[clamp(2.4rem,6.4vw,6.5rem)]">
          {title}
        </h2>
      </div>
      {/* Wake line */}
      <div aria-hidden data-wake="" className="absolute left-0 top-1/2 h-px w-full origin-left bg-gradient-to-r from-transparent via-ink/15 to-ink/25" />
      {/* Ship */}
      <div aria-hidden data-ship="" className="absolute left-0 top-1/2 z-20 w-[min(92vw,1100px)] -translate-y-1/2 drop-shadow-[0_30px_40px_rgba(18,21,29,0.25)] motion-reduce:left-1/2 motion-reduce:-translate-x-1/2 motion-reduce:opacity-20">
        <Image src="/images/home/ship-topdown.webp" alt="" width={2000} height={502} sizes="(min-width: 1200px) 1100px, 92vw" className="h-auto w-full" />
      </div>
    </section>
  );
}
