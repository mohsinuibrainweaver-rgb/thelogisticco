"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUpRight, Car, Cog, Container, Factory, Fuel, HardHat, LayoutGrid, Pill, Shirt, Stethoscope, Store, UtensilsCrossed, Weight, Wrench, Zap, type LucideIcon } from "lucide-react";
import { gsap, useGSAP } from "@/components/motion/gsap";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { industries, industriesIntro } from "@/content/industries";
import { cn } from "@/lib/cn";

/**
 * DESIGN LAB — "Specialized Industries" with the original website's 15 tile images
 * (scripts/fetch-industry-images.mjs). On a mouse the picture is hidden until you hover a row: it wipes in
 * beside the cursor (clip-path reveal + zoom settle), follows the pointer with a little tilt and swaps with a
 * wipe when you move to another row. Touch devices have no hover, so every row shows a small thumbnail instead.
 */

/** Same order as `industries` (the original site's order). */
const SLUGS = [
  "textile",
  "engineering",
  "steel-industry",
  "ceramic-tiles",
  "oil-gas",
  "medical-equipment",
  "heavy-lifts",
  "soc-handling",
  "food-beverages",
  "automobile",
  "power-energy",
  "wholesale-retail",
  "repair-return",
  "construction",
  "pharmaceutical",
];
const src = (i: number) => `/images/industries/original-${SLUGS[i]}.webp`;

/** One icon per industry (matched by name, so it follows the list's order and wording). */
const ICONS: Record<string, LucideIcon> = {
  Textile: Shirt,
  Engineering: Cog,
  "Steel Industry": Factory,
  "Ceramic & Tiles": LayoutGrid,
  "Oil & Gas": Fuel,
  "Medical Equipment": Stethoscope,
  "Heavy Lifts": Weight,
  "SOC Handling": Container,
  "Food & Beverages": UtensilsCrossed,
  Automobile: Car,
  "Power & Energy": Zap,
  "Wholesale & Retail": Store,
  "Repair & Return": Wrench,
  "Construction & Infrastructure": HardHat,
  Pharmaceutical: Pill,
};

/** Round ink tile with the industry's icon; turns signal red when the row is hovered. */
function IndustryIcon({ name }: { name: string }) {
  const Icon = ICONS[name] ?? Container;
  return (
    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink/[0.06] text-ink transition-colors duration-500 ease-[var(--ease-expo)] group-hover:bg-signal group-hover:text-white sm:size-12">
      <Icon aria-hidden className="size-5" strokeWidth={1.5} />
    </span>
  );
}

const PREVIEW_W = 288;
const PREVIEW_H = Math.round((PREVIEW_W * 342) / 500); // images are 500×342

export function LabIndustries() {
  const zone = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const move = useRef<{ x: (v: number) => void; y: (v: number) => void; r: (v: number) => void } | null>(null);
  const settle = useRef(0);
  const [armed, setArmed] = useState(false); // images are only fetched once the mouse enters the list
  const [open, setOpen] = useState(false);
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useGSAP(
    () => {
      const el = preview.current;
      if (!el) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const d = reduce ? 0 : 0.55;
      move.current = {
        x: gsap.quickTo(el, "x", { duration: d, ease: "power3" }),
        y: gsap.quickTo(el, "y", { duration: d, ease: "power3" }),
        r: gsap.quickTo(el, "rotation", { duration: reduce ? 0 : 0.7, ease: "power3" }),
      };
    },
    { scope: zone },
  );

  const show = (i: number) => {
    setArmed(true);
    setOpen(true);
    setCur((c) => {
      if (c !== i) setPrev(c);
      return i;
    });
  };

  const follow = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !move.current) return;
    const flip = e.clientX + 36 + PREVIEW_W > window.innerWidth - 16;
    // Sit above-right of the cursor so the row being read stays uncovered (below it when near the top edge).
    const below = e.clientY < PREVIEW_H + 150;
    move.current.x(flip ? e.clientX - 28 - PREVIEW_W : e.clientX + 28);
    move.current.y(below ? e.clientY + 30 : e.clientY - PREVIEW_H - 22);
    // tilt with horizontal speed, then settle back to level
    move.current.r(Math.max(-7, Math.min(7, e.movementX * 0.5)));
    window.clearTimeout(settle.current);
    settle.current = window.setTimeout(() => move.current?.r(0), 90);
  };

  // Keyboard focus has no cursor: park the picture beside the focused row.
  const parkBeside = (row: HTMLElement) => {
    if (!move.current) return;
    const r = row.getBoundingClientRect();
    move.current.x(Math.min(r.right - PREVIEW_W - 24, window.innerWidth - PREVIEW_W - 24));
    move.current.y(r.top < PREVIEW_H + 150 ? r.bottom + 12 : r.top - PREVIEW_H - 12);
  };

  return (
    <section aria-labelledby="industries-heading" className="py-12 sm:py-16">
      <div className="shell">
        <div className="mb-12 grid items-end gap-6 sm:mb-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="label-mono text-signal-strong">Industries we serve</p>
            <h2 id="industries-heading" className="font-title mt-5 max-w-[14ch] text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.98]">
              Specialized Industries
            </h2>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-stone">{industriesIntro}</p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <Reveal>
              <ButtonLink href="/specialized-industries/">All industries</ButtonLink>
            </Reveal>
          </div>
        </div>

        <div
          ref={zone}
          onPointerEnter={(e) => e.pointerType === "mouse" && setArmed(true)}
          onPointerMove={follow}
          onPointerLeave={() => setOpen(false)}
        >
          <Reveal
            as="ol"
            stagger={0.03}
            y={20}
            className="grid gap-x-12 border-t border-line lg:grid-cols-2 [&:hover>li:not(:hover)_a]:opacity-45"
          >
            {industries.map((ind, i) => (
              <li key={ind.name} className="border-b border-line">
                <Link
                  href="/specialized-industries/"
                  className="group flex items-center gap-4 py-4 transition-opacity duration-300 sm:py-5"
                  onPointerEnter={(e) => e.pointerType === "mouse" && show(i)}
                  onFocus={(e) => {
                    show(i);
                    parkBeside(e.currentTarget);
                  }}
                  onBlur={() => setOpen(false)}
                >
                  <IndustryIcon name={ind.name} />
                  <span className="text-sub tracking-[-0.03em] transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1.5">{ind.name}</span>
                  {/* Touch screens can't hover, so each row carries a small thumbnail there */}
                  <span className="relative ml-auto size-12 shrink-0 overflow-hidden rounded-xl bg-paper-3 fine:hidden">
                    <Image src={src(i)} alt="" fill sizes="48px" className="object-cover" />
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    strokeWidth={1.6}
                    className="ml-auto hidden size-5 shrink-0 text-stone transition-[color,transform] duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal-strong fine:block"
                  />
                </Link>
              </li>
            ))}
          </Reveal>

          {/* Hover picture (mouse only) — follows the cursor */}
          <div ref={preview} aria-hidden className="pointer-events-none fixed left-0 top-0 z-30 hidden fine:block">
            <div
              className={cn(
                "relative aspect-[500/342] w-72 overflow-hidden rounded-2xl bg-paper-3 shadow-[0_34px_70px_-26px_rgba(18,21,29,0.55)] ring-1 ring-ink/10 transition-[opacity,scale] duration-500 ease-[var(--ease-expo)]",
                open ? "scale-100 opacity-100" : "scale-75 opacity-0",
              )}
            >
              {armed &&
                industries.map((ind, i) => {
                  const isCur = i === cur;
                  const isPrev = i === prev;
                  return (
                    <Image
                      key={ind.name}
                      src={src(i)}
                      alt=""
                      fill
                      sizes="288px"
                      className={cn(
                        "object-cover transition-[clip-path,scale] duration-[850ms] ease-[var(--ease-expo)]",
                        isCur ? "z-20 scale-100 [clip-path:inset(0_0_0_0)]" : isPrev ? "z-10 scale-100 [clip-path:inset(0_0_0_0)]" : "z-0 scale-[1.3] [clip-path:inset(100%_0_0_0)]",
                      )}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
