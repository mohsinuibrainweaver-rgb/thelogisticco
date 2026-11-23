"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK, claim } from "@/components/motion/gsap";
import { OfficeCards } from "@/components/sections/OfficeCards";
import { stats, strengths } from "@/content/site";

/**
 * "Shipping worldwide": the signature ship crossing, in the same visual language as the hero,
 * About, Memberships and Services sections (paper background, Archivo titles, mono labels, round ink icon tiles,
 * white rounded cards). Copy is from the original website: the "Shipping Worldwide" strength, the
 * "30+ operational countries / 80+ global business associates" counters and the two office addresses.
 */
const worldwide = strengths[0];
const countries = stats[1];
const associates = stats[2];

export function HomeCrossing() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      el.querySelectorAll("[data-cx]").forEach(claim);
      const q = (s: string) => Array.from(el.querySelectorAll<HTMLElement>(s));
      const band = q("[data-cx='band']")[0];
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        // The ship sails across the headline as the band scrolls through the viewport (scrubbed, no pinning).
        const tl = gsap.timeline({ scrollTrigger: { trigger: band, start: "top bottom", end: "bottom top", scrub: 0.8 } });
        tl.fromTo(q("[data-cx='ship']"), { xPercent: -120, x: "-10vw" }, { xPercent: 20, x: "60vw", ease: "none" }, 0);

        gsap.from(q("[data-cx='text']"), {
          y: 28,
          autoAlpha: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 70%", once: true },
        });
        gsap.from(q("[data-cx='card']"), {
          y: 70,
          autoAlpha: 0,
          duration: 1.2,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: q("[data-cx='cards']")[0], start: "top 90%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-labelledby="lab-crossing-title" className="relative overflow-hidden py-12 sm:py-16">
      {/* Headline band — the ship sails across it */}
      <div data-cx="band" className="relative flex min-h-[var(--sea-h)] items-center justify-center [--sea-h:16rem] sm:[--sea-h:19rem]">
        <div className="relative z-10 px-4 text-center">
          <p data-cx="text" className="label-mono text-signal-strong">
            Shipping worldwide
          </p>
          <h2 id="lab-crossing-title" data-cx="text" className="font-title mx-auto mt-5 max-w-[18ch] text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.98]">
            Moving cargo across {countries.value}
            {countries.suffix} countries.
          </h2>
        </div>
        {/* The sea: a photograph of real water across the full width, two layers drifting slowly (see .sea in globals.css) */}
        <div aria-hidden className="sea pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2" />
        <div
          aria-hidden
          data-cx="ship"
          className="absolute left-0 top-1/2 z-20 w-[min(92vw,1100px)] -translate-y-1/2 motion-reduce:left-1/2 motion-reduce:-translate-x-1/2 motion-reduce:opacity-20"
        >
          {/* foam trail behind the stern (ship sails left → right) and the ship's soft shadow on the water */}
          <span className="ship-wake pointer-events-none absolute right-[93%] top-1/2 h-[46%] w-[88%] -translate-y-1/2" />
          <span className="pointer-events-none absolute inset-x-[5%] top-[66%] h-[30%] rounded-full bg-ink/20 blur-2xl" />
          {/* the ship itself bobs gently on the water; clean transparent cut-out generated with Higgsfield (scripts/process-lab-images.mjs) */}
          <div className="ship-bob drop-shadow-[0_16px_14px_rgba(18,21,29,0.22)]">
            <Image src="/images/home/ship-topdown-clean.webp" alt="" width={2000} height={477} sizes="(min-width: 1200px) 1100px, 92vw" className="h-auto w-full" />
          </div>
        </div>
      </div>

      <div className="shell">
        <p data-cx="text" className="mx-auto max-w-2xl text-center text-[1.05rem] leading-relaxed text-stone">
          {worldwide.body}
        </p>
        <p data-cx="text" className="label-mono mt-6 text-center text-ink/70">
          {countries.value}
          {countries.suffix} {countries.label.toLowerCase()} <span className="mx-2 text-stone-light">•</span> {associates.value}
          {associates.suffix} {associates.label.toLowerCase()}
        </p>

        <OfficeCards className="mt-12 sm:mt-14" />
      </div>
    </section>
  );
}
