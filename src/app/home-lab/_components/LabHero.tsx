"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, MOTION_OK, claim, ScrollTrigger } from "@/components/motion/gsap";
import { CountUp } from "@/components/motion/CountUp";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/Logo";

/** Hanging-container artwork: full image height / width, and the container body's height / width. */
const IMG_RATIO = 545 / 1600;
const BODY_RATIO = 445 / 1600; // spreader occupies the top 100 of 545 px rows
const SLING = 0.26; // sling height as a share of the container width
const GROUND = 22; // quay strip under the stack, px
const GAP = 3; // gap between neighbouring stacks, px

/** Hanging pose: turned 45° in depth (about the vertical axis under the hook). Straightens to 0 before it lands. */
const TURN = 45;
/** Door-end width as a share of the container length (keeps the box in proportion with the side artwork). */
const DEPTH = 0.26;

/** CSS geometry of the 3D hanging container (all relative to the hook at the top of the tilt box). */
const W = "var(--rig-w)";
const SL = `calc(${W} * ${SLING})`; // sling height
const SP = `calc(${W} * 0.0625)`; // spreader height
const H = `calc(${W} * ${BODY_RATIO})`; // container body height
const BODY_TOP = `calc(${W} * ${SLING} + ${W} * 0.0625)`;
const HD = `calc(${W} * ${DEPTH / 2} * var(--hdk))`; // half depth (eases to 0 as it straightens)
const FD = `calc(${W} * ${DEPTH} * var(--hdk))`; // full depth
const FACE = "absolute [backface-visibility:hidden]";

type Box = "blue" | "teal" | "grey" | "white" | "red";
/** Container wall along the bottom of the hero (bottom → top per column). Middle column = landing slot. */
const STACK: Box[][] = [
  ["blue", "white"],
  ["grey", "red", "white"],
  ["white", "blue"],
  ["teal"], // ← landing slot: the hanging container completes this column
  ["grey", "white"],
  ["blue", "grey", "red"],
  ["white", "teal"],
];
const BOX: Record<Box, { src: string; filter?: string }> = {
  blue: { src: "/images/home/stack-blue.webp" },
  teal: { src: "/images/home/stack-blue.webp", filter: "hue-rotate(-38deg) saturate(0.85) brightness(1.04)" },
  grey: { src: "/images/home/stack-grey.webp" },
  white: { src: "/images/home/stack-white.webp" },
  red: { src: "/images/home/stack-red.webp", filter: "saturate(0.85) brightness(0.95)" },
};

/**
 * DESIGN LAB hero — adapted from the "Avenlo" reference: light striped canvas, centred sentence
 * headline with an italic phrase, bracketed CTA, portrait circle + 20+ stat, rotating badge +
 * two-tone paragraph, a giant word sliding in behind a wall of stacked containers, and a tilted container
 * hanging from a crane that straightens and is lowered on scroll until it lands in the gap on the stack.
 * Lab-only: imported by src/app/home-lab/page.tsx, not by the live homepage.
 */
export function LabHero() {
  const ref = useRef<HTMLElement>(null);

  // Size + place the hanging container from the real layout, and work out where it lands.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const place = () => {
      const top = el.querySelector<HTMLElement>("[data-lab='top']");
      const cta = el.querySelector<HTMLElement>("[data-lab='cta']");
      const left = el.querySelector<HTMLElement>("[data-lab='col-left']");
      const right = el.querySelector<HTMLElement>("[data-lab='col-right']");
      if (!top || !cta || !left || !right) return;
      const prev = top.style.transform;
      top.style.transform = "none"; // measure without the scroll parallax offset
      const secTop = el.getBoundingClientRect().top;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const ctaBottom = cta.getBoundingClientRect().bottom - secTop;
      let w: number;
      let y: number;
      if (window.matchMedia("(min-width: 768px)").matches) {
        const l = left.getBoundingClientRect();
        const r = right.getBoundingClientRect();
        const leftEdge = Math.max(...Array.from(left.children).map((c) => c.getBoundingClientRect().right));
        const rightEdge = Math.min(...Array.from(right.children).map((c) => c.getBoundingClientRect().left));
        const desired = Math.min(Math.max(vw * 0.3, 280), 460);
        w = desired;
        const rowTop = Math.min(l.top, r.top) - secTop;
        if (ctaBottom + desired * SLING + 24 < rowTop + Math.max(l.height, r.height)) {
          w = Math.max(220, Math.min(desired, rightEdge - leftEdge - 72));
        }
        y = Math.min(ctaBottom + w * SLING + 30, vh - w * IMG_RATIO - 40); // fully visible on open
      } else {
        w = Math.min(vw * 0.68, 320);
        y = ctaBottom + w * SLING + 26;
      }
      w = Math.round(w);
      top.style.transform = prev;
      el.style.setProperty("--rig-w", `${w}px`);
      el.style.setProperty("--box-h", `${(w * BODY_RATIO).toFixed(2)}px`);
      el.style.setProperty("--rig-y", `${Math.round(y)}px`);
      // Landing: the container body rests on top of the one-high middle column, which stands on the quay.
      const landY = el.offsetHeight - GROUND - w * BODY_RATIO - w * IMG_RATIO;
      el.style.setProperty("--land-y", `${landY.toFixed(2)}px`);
      ScrollTrigger.refresh();
    };
    place();
    document.fonts?.ready.then(place);
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, []);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      el.querySelectorAll("[data-lab]").forEach(claim);
      const q = (s: string) => el.querySelectorAll(s);
      const num = (v: string) => parseFloat(getComputedStyle(el).getPropertyValue(v)) || 0;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(q("[data-lab='eyebrow']"), { y: 14, autoAlpha: 0, duration: 0.9 }, 0.15)
          .from(q("[data-lab='line']"), { yPercent: 110, duration: 1.4, stagger: 0.1 }, 0.2)
          .from(q("[data-lab='cta']"), { y: 18, autoAlpha: 0, duration: 1 }, 0.7)
          .from(q("[data-lab='bracket']"), { scale: 1.6, autoAlpha: 0, duration: 1, stagger: 0.04 }, 0.8)
          .from(q("[data-lab='portrait']"), { scale: 0.6, autoAlpha: 0, duration: 1.4 }, 0.75)
          .from(q("[data-lab='side']"), { y: 24, autoAlpha: 0, duration: 1.1, stagger: 0.08 }, 0.85)
          .from(q("[data-lab='col']"), { y: 80, autoAlpha: 0, duration: 1.3, stagger: { each: 0.06, from: "center" } }, 0.5)
          .from(q("[data-lab='rig']"), { y: -36, autoAlpha: 0, duration: 1.3, ease: "power3.out" }, 0.25);

        // Hanging pose: the whole box (and the sling) is turned 45° in depth about the vertical axis through
        // the hook; the rope stays vertical.
        // Pivot exactly at the hook (top centre, z = 0) so the hook never leaves the end of the rope.
        const tilts = gsap.utils.toArray<HTMLElement>(q("[data-lab='tilt']"));
        gsap.set(tilts, { rotationY: TURN, transformPerspective: 1600, transformOrigin: "50% 0% 0px" });

        // Gentle crane sway + twist that die away as the load is lowered.
        const sways = gsap.utils.toArray<HTMLElement>(q("[data-lab='sway']"));
        const twists = gsap.utils.toArray<HTMLElement>(q("[data-lab='twist']"));
        let calm = 0;
        const idle = () => {
          const t = gsap.ticker.time;
          const k = 1 - calm;
          gsap.set(sways, { rotation: Math.sin(t * 0.8) * 0.6 * k });
          gsap.set(twists, { rotationY: Math.sin(t * 0.55 + 1) * 4 * k, transformPerspective: 1600, transformOrigin: "50% 0%" });
        };
        gsap.ticker.add(idle);

        // One scroll-linked timeline: lower → straighten (done before touchdown) → settle; the word slides in.
        let landed = false;
        const giant = q("[data-lab='giant']");
        const story = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.4,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              calm = gsap.utils.clamp(0, 1, self.progress * 1.5);
              if (self.progress > 0.99 && !landed) {
                landed = true;
                gsap.fromTo(q("[data-lab='stack']"), { y: 0 }, { y: 2, duration: 0.08, yoyo: true, repeat: 1, ease: "sine.out" });
              } else if (self.progress < 0.96) landed = false;
            },
          },
        });
        story
          .to(q("[data-lab='rig-move']"), { y: () => num("--land-y") - num("--rig-y"), ease: "sine.inOut", duration: 1 }, 0)
          .to(tilts, { rotationY: 0, ease: "sine.inOut", duration: 0.78 }, 0)
          .fromTo(q("[data-box]"), { "--hdk": 1 }, { "--hdk": 0, ease: "sine.inOut", duration: 0.78 }, 0)
          .fromTo(giant, { x: () => window.innerWidth * 0.62 }, { x: 0, ease: "sine.out", duration: 1 }, 0);

        gsap.to(q("[data-lab='top']"), {
          yPercent: 10,
          ease: "none",
          // Ends when the hero is pinned as the About section's backdrop (see LabAbout).
          scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: true },
        });
        return () => gsap.ticker.remove(idle);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const tiltBox = { top: "calc(var(--rig-w) * -0.26)" } as const;

  return (
    <section
      ref={ref}
      data-lab-hero=""
      aria-labelledby="lab-hero-title"
      className="relative isolate overflow-clip bg-paper [--box-h:100px] [--land-y:900px] [--rig-w:68vw] [--rig-y:520px] md:[--rig-w:28rem] md:[--rig-y:640px]"
    >
      {/* Vertical pinstripe texture, fading out downward */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-20 h-[78%] [mask-image:linear-gradient(to_bottom,black_35%,transparent)]"
        style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(18,21,29,0.05) 0 1px, transparent 1px 13px)" }}
      />
      {/* Warm haze behind the yard */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-[55%] bg-gradient-to-b from-transparent via-paper-2/60 to-paper-3/80" />

      {/* ── Crane rig: rope + sling sit behind the copy, the container hangs in front ── */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-[12] h-svh">
        <div data-lab="sway" className="absolute inset-0 origin-top">
          <div data-lab="rig" className="absolute left-1/2 top-[var(--rig-y)] w-[var(--rig-w)] -translate-x-1/2">
            <div data-lab="rig-move" className="relative">
              {/* Hoist rope — stays vertical; ends at the hook */}
              <span className="absolute bottom-[calc(var(--rig-w)*0.26-3px)] left-1/2 h-[300vh] w-[2px] -translate-x-1/2 bg-gradient-to-b from-ink/40 to-ink/85" />
              <div data-lab="twist" className="absolute inset-x-0" style={tiltBox}>
                <div data-lab="tilt" className="relative h-[calc(var(--rig-w)*0.26)] w-full">
                  {/* Sling legs from the hook to the spreader lugs (turn with the container) */}
                  <svg viewBox="0 0 100 26" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
                    <line x1="50" y1="5" x2="31" y2="26" stroke="#2a2e38" vectorEffect="non-scaling-stroke" style={{ strokeWidth: 1.75 }} />
                    <line x1="50" y1="5" x2="69" y2="26" stroke="#2a2e38" vectorEffect="non-scaling-stroke" style={{ strokeWidth: 1.75 }} />
                  </svg>
                </div>
              </div>
              {/* Hook block — not turned, so it always sits square under the rope */}
              <svg viewBox="0 0 100 26" preserveAspectRatio="none" className="absolute left-0 h-[calc(var(--rig-w)*0.26)] w-full overflow-visible" style={tiltBox}>
                <rect x="46.2" y="-1.5" width="7.6" height="7.5" rx="1" fill="#2a2e38" />
                <rect x="47.4" y="0" width="5.2" height="1.2" fill="#e0b13a" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-30 h-svh">
        <div data-lab="sway" className="absolute inset-0 origin-top">
          <div data-lab="rig" className="absolute left-1/2 top-[var(--rig-y)] w-[var(--rig-w)] -translate-x-1/2">
            <div data-lab="rig-move" className="relative">
              <div data-lab="twist" className="absolute inset-x-0" style={tiltBox}>
                <div
                  data-lab="tilt"
                  data-box=""
                  className="relative w-full [transform-style:preserve-3d]"
                  style={{ height: "calc(var(--rig-w) * 0.6005)", ["--hdk" as string]: 1 }}
                >
                  {/* ── Full 3D container, centred on the hook axis: roof, long sides, both ends + spreader ── */}
                  {/* Spreader beam on the centre line (z = 0), where the sling legs attach */}
                  <div className="absolute inset-x-0" style={{ top: SL, height: SP }}>
                    <Image src="/images/home/lab-spreader.webp" alt="" fill quality={85} sizes="(min-width: 768px) 28rem, 68vw" className="object-fill" />
                  </div>
                  {/* Roof */}
                  <div className={FACE} style={{ left: 0, width: "100%", top: `calc(${BODY_TOP} + ${H} / 2 - ${HD})`, height: FD, transform: `rotateX(90deg) translateZ(calc(${H} / 2))` }}>
                    <Image src="/images/home/stack-red.webp" alt="" fill quality={80} sizes="28rem" className="object-fill" style={{ filter: "brightness(1.12) saturate(0.85)" }} />
                    <span className="absolute inset-0 bg-gradient-to-b from-white/15 to-black/10" />
                  </div>
                  {/* Back long side */}
                  <div className={FACE} style={{ left: 0, width: "100%", top: BODY_TOP, height: H, transform: `rotateY(180deg) translateZ(${HD})` }}>
                    <Image src="/images/home/stack-red.webp" alt="" fill quality={80} sizes="28rem" className="object-fill" style={{ filter: "brightness(0.7)" }} />
                  </div>
                  {/* Far end */}
                  <div className={FACE} style={{ left: `calc(50% - ${HD})`, width: FD, top: BODY_TOP, height: H, transform: `rotateY(90deg) translateZ(calc(${W} / 2))` }}>
                    <Image src="/images/home/lab-container-end.webp" alt="" fill quality={80} sizes="10rem" className="-scale-x-100 object-fill" style={{ filter: "brightness(0.68)" }} />
                  </div>
                  {/* Door end */}
                  <div className={FACE} style={{ left: `calc(50% - ${HD})`, width: FD, top: BODY_TOP, height: H, transform: `rotateY(-90deg) translateZ(calc(${W} / 2))` }}>
                    <Image src="/images/home/lab-container-end.webp" alt="" fill quality={85} sizes="10rem" className="object-fill" style={{ filter: "brightness(0.84) saturate(0.95)" }} />
                    <span className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/10" />
                  </div>
                  {/* Front long side with the white original logo painted on */}
                  <div className={FACE} style={{ left: 0, width: "100%", top: BODY_TOP, height: H, transform: `translateZ(${HD})` }}>
                    <Image
                      src="/images/home/stack-red.webp"
                      alt=""
                      fill
                      priority
                      quality={85}
                      sizes="(min-width: 768px) 28rem, 68vw"
                      className="object-fill drop-shadow-[0_26px_24px_rgba(18,21,29,0.3)]"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Logo tone="white" className="h-[48%] opacity-95" />
                    </div>
                    {/* Paint on corrugated steel: faint vertical ribs over the logo + weathering */}
                    <span
                      className="pointer-events-none absolute inset-0 mix-blend-multiply"
                      style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(18,21,29,0.08) 0 2px, transparent 2px 10px), linear-gradient(to bottom, transparent 55%, rgba(80,40,20,0.14))" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div data-lab="top" className="shell relative z-20 pt-36 text-center sm:pt-40 lg:pt-48">
        <p data-lab="eyebrow" className="label-mono inline-flex items-center gap-2 text-ink/80">
          <span aria-hidden className="size-1.5 rounded-full bg-ink" />
          Freight forwarding · Customs clearance · Logistics
        </p>

        <h1 id="lab-hero-title" className="mx-auto mt-6 max-w-[16ch] text-[clamp(3.1rem,9.2vw,9.75rem)] font-semibold leading-[0.92] tracking-[-0.055em]">
          <span className="block overflow-hidden pb-[0.08em]">
            <span data-lab="line" className="block">
              Moving <em className="font-light italic tracking-[-0.06em]">your cargo</em>
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span data-lab="line" className="block">
              across borders
            </span>
          </span>
        </h1>

        {/* Bracketed CTA */}
        <div className="mt-8 flex justify-center sm:mt-10">
          <Link href="/contact/" data-lab="cta" className="group relative inline-flex items-center px-3 py-3">
            {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((c) => (
              <span
                key={c}
                data-lab="bracket"
                aria-hidden
                className={`absolute size-3 border-ink/45 transition-all duration-500 ease-[var(--ease-expo)] group-hover:size-4 group-hover:border-ink ${c}`}
              />
            ))}
            <span className="label-mono inline-flex items-center gap-3 bg-paper-2 px-9 py-5 text-[0.78rem] text-ink transition-colors duration-500 group-hover:bg-ink group-hover:text-paper">
              Request a quote
              {/* arrow: slides out to the top-right and a second one slides in from the bottom-left on hover */}
              <span aria-hidden className="relative grid size-4 place-items-center overflow-hidden">
                <ArrowUpRight className="size-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-full group-hover:-translate-y-full" strokeWidth={1.75} />
                <ArrowUpRight className="absolute size-4 -translate-x-full translate-y-full transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0 group-hover:translate-y-0" strokeWidth={1.75} />
              </span>
            </span>
          </Link>
        </div>

        {/* Mobile: room for the hanging container between the button and the portrait row */}
        <div aria-hidden className="h-[calc(var(--rig-w)*0.62+3.5rem)] md:hidden" />

        {/* Portrait + stat / badge + paragraph */}
        <div className="mt-4 grid items-start gap-10 text-left md:mt-12 md:grid-cols-2 lg:mt-6">
          <div data-lab="col-left" className="flex items-center gap-5 sm:gap-7">
            <div data-lab="portrait" className="relative size-28 shrink-0 overflow-hidden rounded-full bg-paper-3 sm:size-40 lg:size-48">
              <Image
                src="/images/home/lab-portrait.webp"
                alt="Logistics operations manager in a hard hat holding a tablet (illustrative)"
                fill
                priority
                sizes="(min-width: 1024px) 12rem, 10rem"
                className="object-cover object-top"
              />
            </div>
            <div data-lab="side">
              <p className="text-[clamp(3rem,5vw,4.75rem)] font-medium leading-none tracking-[-0.05em]">
                <CountUp value={20} start={1} suffix="+" ease="none" replay />
              </p>
              <p className="mt-2 text-ink/80">
                Years of
                <br />
                experience
              </p>
            </div>
          </div>

          <div data-lab="col-right" className="flex flex-col items-start gap-6 md:items-end md:text-left">
            <a data-lab="side" href="#about" aria-label="Scroll to learn more" className="group relative grid size-24 place-items-center rounded-full ring-1 ring-ink/15 transition-colors hover:bg-ink hover:text-paper">
              <svg viewBox="0 0 100 100" aria-hidden className="absolute inset-0 size-full animate-[spin_18s_linear_infinite] motion-reduce:animate-none">
                <defs>
                  <path id="lab-badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                </defs>
                <text className="fill-current font-mono text-[8.4px] uppercase tracking-[0.2em]">
                  <textPath href="#lab-badge-circle">Lahore · Dubai · 30+ countries ·</textPath>
                </text>
              </svg>
              <ArrowDown className="size-5 transition-transform duration-500 group-hover:translate-y-0.5" strokeWidth={1.75} />
            </a>
            <p data-lab="side" className="max-w-sm text-lg leading-snug tracking-[-0.02em]">
              Freight forwarding brings together <span className="text-stone-light">air, sea and road freight,</span> customs clearance{" "}
              <span className="text-stone-light">and project cargo,</span> under one local team.
            </p>
          </div>
        </div>
      </div>

      {/* ── Container yard: giant word behind, stacked wall, quay ── */}
      <div className="relative mt-[26vh] md:mt-[30vh]" style={{ height: `calc(var(--box-h) * 3 + ${GROUND}px)` }}>
        <p
          data-lab="giant"
          aria-hidden
          className="pointer-events-none absolute inset-x-0 z-0 select-none whitespace-nowrap text-center text-[14.5vw] font-semibold leading-[0.85] tracking-[-0.06em] text-ink/[0.1]"
          style={{ bottom: `calc(var(--box-h) * 2.05 + ${GROUND}px)` }}
        >
          The Logistic Co
        </p>

        <div
          data-lab="stack"
          aria-hidden
          className="absolute left-1/2 z-10 flex -translate-x-1/2 items-end"
          style={{ bottom: GROUND, gap: GAP, width: `calc(var(--rig-w) * ${STACK.length} + ${GAP * (STACK.length - 1)}px)` }}
        >
          {STACK.map((col, ci) => (
            <div key={ci} data-lab="col" className="relative flex w-[var(--rig-w)] shrink-0 flex-col-reverse">
              {col.map((c, ri) => {
                const lift = ri / 3; // higher tiers catch more light
                return (
                  <div key={ri} className="relative h-[var(--box-h)] w-full">
                    <Image
                      src={BOX[c].src}
                      alt=""
                      fill
                      quality={85}
                      sizes="(min-width: 768px) 28rem, 68vw"
                      className={cn("object-fill", (ci + ri) % 2 === 1 && "-scale-x-100")}
                      style={{ filter: `${BOX[c].filter ?? ""} brightness(${(0.86 + lift * 0.14).toFixed(3)})` }}
                    />
                    {/* Top-down light + contact shadow at the seam below each box */}
                    <span className="absolute inset-0 bg-gradient-to-b from-white/[0.07] via-transparent to-black/[0.12]" />
                  </div>
                );
              })}
              {/* Shadow cast onto the quay */}
              <span className="absolute -bottom-2 left-[3%] right-[3%] h-3 rounded-[50%] bg-black/25 blur-md" />
            </div>
          ))}
        </div>

        {/* Quay: concrete apron with a yellow safety line */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-[9]" style={{ height: GROUND }}>
          <div className="absolute inset-0 bg-gradient-to-b from-[#5b5e64] to-[#3c3f45]" />
          <div
            className="absolute inset-x-0 top-[38%] h-[3px]"
            style={{ backgroundImage: "repeating-linear-gradient(90deg, #e3b23c 0 36px, transparent 36px 52px)" }}
          />
          <div className="absolute inset-x-0 top-0 h-px bg-white/25" />
        </div>
      </div>
    </section>
  );
}
