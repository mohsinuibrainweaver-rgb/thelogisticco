"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { gsap, useGSAP, MOTION_OK, claim } from "@/components/motion/gsap";
import { offices, stats, strengths } from "@/content/site";

/**
 * DESIGN LAB — "Shipping worldwide": the signature ship crossing, in the same visual language as the hero,
 * About, Memberships and Services sections (paper background, Archivo titles, mono labels, round ink icon tiles,
 * white rounded cards). Copy is from the original website: the "Shipping Worldwide" strength, the
 * "30+ operational countries / 80+ global business associates" counters and the two office addresses.
 */
/** Five-pointed star as an SVG polygon `points` string. */
function star(cx: number, cy: number, R: number, r: number) {
  return Array.from({ length: 10 }, (_, i) => {
    const a = ((-90 + i * 36) * Math.PI) / 180;
    const rad = i % 2 === 0 ? R : r;
    return `${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
}

/** National flags for the two offices (drawn as SVG so they look the same on every OS — emoji flags don't render on Windows). */
function Flag({ code }: { code: string }) {
  const common = "h-[1.05rem] w-[1.55rem] shrink-0 rounded-[3px] shadow-[0_0_0_1px_rgba(18,21,29,0.14)]";
  if (code === "PK") {
    return (
      <svg viewBox="0 0 60 40" role="img" aria-label="Flag of Pakistan" className={common}>
        <rect width="60" height="40" fill="#01411C" />
        <rect width="15" height="40" fill="#fff" />
        {/* crescent: a white disc with a green disc cut out of it, opening up and to the right */}
        <circle cx="37.5" cy="20" r="11" fill="#fff" />
        <circle cx="41" cy="17" r="9.4" fill="#01411C" />
        <polygon points={star(44.5, 14.2, 4.2, 1.7)} fill="#fff" />
      </svg>
    );
  }
  // United Arab Emirates
  return (
    <svg viewBox="0 0 60 40" role="img" aria-label="Flag of the United Arab Emirates" className={common}>
      <rect width="60" height="40" fill="#fff" />
      <rect width="60" height="13.4" fill="#00732F" />
      <rect y="26.6" width="60" height="13.4" fill="#000" />
      <rect width="15" height="40" fill="#EF3340" />
    </svg>
  );
}

/** Where each office sits inside its 1024×512 map mosaic (pixels), so the map can be centred on it. */
const MAP_POINT: Record<string, { x: number; y: number }> = {
  Lahore: { x: 279, y: 125 },
  Dubai: { x: 326, y: 167 },
};

const worldwide = strengths[0];
const countries = stats[1];
const associates = stats[2];

export function LabCrossing() {
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

        {/* Where we are: the two offices from the original website */}
        <ul data-cx="cards" className="mx-auto mt-12 grid max-w-4xl gap-4 sm:mt-14 md:grid-cols-2">
          {offices.map((o) => (
            <li
              key={o.city}
              data-cx="card"
              className="group overflow-hidden rounded-[22px] bg-white shadow-[0_30px_60px_-34px_rgba(18,21,29,0.3)] ring-1 ring-ink/5 transition-shadow duration-500 ease-[var(--ease-expo)] hover:shadow-[0_36px_70px_-32px_rgba(18,21,29,0.38)]"
            >
              {/* Faded street map of the office's neighbourhood (OpenStreetMap), centred on the office */}
              <div className="relative h-40 overflow-hidden bg-paper-2 sm:h-44">
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    maskImage: "linear-gradient(to bottom, #000 25%, transparent 96%)",
                    WebkitMaskImage: "linear-gradient(to bottom, #000 25%, transparent 96%)",
                  }}
                >
                  <Image
                    src={`/images/maps/${o.city.toLowerCase()}.webp`}
                    alt=""
                    width={1024}
                    height={512}
                    sizes="1024px"
                    className="absolute max-w-none opacity-80 transition-transform duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-[1.04]"
                    style={{ left: `calc(50% - ${MAP_POINT[o.city].x}px)`, top: `calc(50% - ${MAP_POINT[o.city].y}px)`, width: 1024, height: 512 }}
                  />
                </div>
                {/* the office itself */}
                <span aria-hidden className="absolute left-1/2 top-1/2 grid size-4 -translate-x-1/2 -translate-y-1/2 place-items-center">
                  <span className="absolute inset-0 animate-ping rounded-full bg-signal/40 [animation-duration:2.6s] motion-reduce:hidden" />
                  <span className="relative size-2.5 rounded-full bg-signal ring-2 ring-white" />
                </span>
                <span className="label-mono absolute left-5 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 py-1 pl-1.5 pr-3 text-ink/70 ring-1 ring-ink/5 backdrop-blur-sm sm:left-6">
                  <Flag code={o.code} />
                  {o.country} · {o.code}
                </span>
                <a
                  href="https://www.openstreetmap.org/copyright"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-1.5 right-3 text-[0.62rem] tracking-wide text-ink/45 hover:text-ink/70"
                >
                  © OpenStreetMap contributors
                </a>
              </div>

              <div className="relative px-6 pb-6 sm:px-8 sm:pb-8">
                {/* location pin sits right above the city name, overlapping the map edge */}
                <span className="-mt-7 mb-5 grid size-14 place-items-center rounded-full bg-gradient-to-br from-ink-3 to-ink text-paper shadow-[0_18px_30px_-12px_rgba(18,21,29,0.6),inset_0_1px_0_rgba(255,255,255,0.14)] ring-4 ring-white transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-1">
                  <MapPin aria-hidden className="size-6" strokeWidth={1.5} />
                </span>
                <h3 className="font-title text-[clamp(1.9rem,3vw,2.6rem)]">{o.city}</h3>
                <address className="mt-3 text-[1.02rem] not-italic leading-snug text-stone">
                  {o.lines.slice(0, 2).map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <div className="mt-7 flex flex-wrap gap-2.5">
                  <a href={o.phone.href} className="btn btn-dark !h-11 !gap-2.5 !px-4 text-sm hover:!bg-signal">
                    <Phone aria-hidden className="size-4" strokeWidth={1.75} />
                    {o.phone.display}
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline !h-11 !gap-2 !px-4 text-sm hover:!text-signal-strong hover:!shadow-[inset_0_0_0_1.5px_var(--color-signal)]"
                  >
                    Directions
                    <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.75} />
                    <span className="sr-only"> to the {o.city} office (opens in a new tab)</span>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
