"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight, Award, Eye } from "lucide-react";
import { gsap, useGSAP, MOTION_OK, claim } from "@/components/motion/gsap";
import { company, memberships } from "@/content/site";

/**
 * "About us", laid out like the About section of the reference (travelo.framer.media):
 * a centred label with hairlines and tiny arrows, a large centred statement, a row with a white pill button and a
 * small "trusted by" avatar cluster, line illustrations on either side of the statement, then three rounded cards —
 * white · photo with overlaid text · white. All copy is the original website's About content (statement built from the
 * About Company paragraph, Vision, Mission, 20+ years of experience). The hero fades out into the page colour as this
 * section arrives (see HomeHeroFade).
 */

/** Built only from the original About Company paragraph. */
const STATEMENT =
  "The Logistic Company brings together strong customs clearance services, a resilient legacy and a local team of supply chain experts across Pakistan and the UAE.";

const EXPERIENCE = "We have more than 20 years of experience, backed by a resilient legacy of customs clearance that has stood the test of time.";

/** Three logos from the original Memberships strip, shown as the little overlapping "trusted by" circles. */
const CIRCLES = ["fiata", "wca-world", "piffa"].map((slug) => {
  const m = memberships.find((x) => x.logo.endsWith(`/${slug}.webp`))!;
  return { name: m.name, logo: m.logo };
});

/** Faint line drawings flanking the statement (container ship on the left, gantry crane on the right). */
function ShipArt(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 170 120" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M8 80h154l-14 22H26z" />
      <path d="M118 80V52h18v28M124 58h6M124 66h6" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={`a${i}`} x={28 + i * 17} y="66" width="15" height="14" />
      ))}
      {[1, 2, 3].map((i) => (
        <rect key={`b${i}`} x={28 + i * 17} y="52" width="15" height="14" />
      ))}
      <rect x="62" y="38" width="15" height="14" />
      <path d="M0 112q10-7 20 0t20 0 20 0 20 0 20 0 20 0 20 0 20 0 10-3" />
    </svg>
  );
}

function CraneArt(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 170 130" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M40 122V28M112 122V28M40 28h72M40 28 112 122M112 28 40 122" />
      <path d="M8 28h146M154 28v8M8 28v8" />
      <path d="M124 28v34" />
      <rect x="112" y="62" width="24" height="16" />
      <path d="M112 62l12-10 12 10" />
      <path d="M20 122h130" />
      <path d="M52 28v-12h48v12" />
    </svg>
  );
}

export function HomeAbout() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      el.querySelectorAll("[data-ab]").forEach(claim);
      const q = (s: string) => Array.from(el.querySelectorAll<HTMLElement>(s));
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        // Label: hairlines draw outwards from the text
        gsap.from(q("[data-ab='label']"), { y: 14, autoAlpha: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 75%", once: true } });

        // The statement starts grey and turns to full ink one line at a time as you scroll. Lines are measured from the
        // real wrapped text and rebuilt if the width (and so the line breaks) changes.
        const statement = q("[data-ab='statement']")[0];
        const words = q("[data-ab='word']");
        const GREY = "rgba(18,21,29,0.2)";
        const INK = "#12151d";
        let tl: gsap.core.Timeline | null = null;
        const build = () => {
          tl?.scrollTrigger?.kill();
          tl?.kill();
          gsap.set(words, { clearProps: "color" });
          const lines: HTMLElement[][] = [];
          let lastTop = -999;
          words.forEach((w) => {
            const t = w.offsetTop;
            if (Math.abs(t - lastTop) > 6) {
              lines.push([]);
              lastTop = t;
            }
            lines[lines.length - 1].push(w);
          });
          tl = gsap.timeline({ scrollTrigger: { trigger: statement, start: "top 82%", end: "bottom 45%", scrub: 0.5 } });
          lines.forEach((ws, i) => tl!.fromTo(ws, { color: GREY }, { color: INK, ease: "none", duration: 1 }, i));
        };
        build();
        let lastW = statement.clientWidth;
        let timer = 0;
        const ro = new ResizeObserver(() => {
          if (statement.clientWidth === lastW) return;
          lastW = statement.clientWidth;
          window.clearTimeout(timer);
          timer = window.setTimeout(build, 150);
        });
        ro.observe(statement);

        gsap.from(q("[data-ab='cta']"), { y: 26, autoAlpha: 0, duration: 1.1, stagger: 0.12, ease: "expo.out", scrollTrigger: { trigger: q("[data-ab='cta']")[0], start: "top 90%", once: true } });
        gsap.from(q("[data-ab='art']"), { y: 30, autoAlpha: 0, duration: 1.4, stagger: 0.15, ease: "expo.out", scrollTrigger: { trigger: statement, start: "top 85%", once: true } });
        gsap.from(q("[data-ab='card']"), {
          y: 90,
          autoAlpha: 0,
          duration: 1.3,
          stagger: 0.14,
          ease: "expo.out",
          scrollTrigger: { trigger: q("[data-ab='cards']")[0], start: "top 88%", once: true },
        });
        // photo card: slow zoom settle as it arrives
        gsap.from(q("[data-ab='photo']"), { scale: 1.18, duration: 1.8, ease: "expo.out", scrollTrigger: { trigger: q("[data-ab='cards']")[0], start: "top 88%", once: true } });
        return () => {
          ro.disconnect();
          window.clearTimeout(timer);
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="about" aria-labelledby="lab-about-title" className="relative z-20 overflow-x-clip bg-paper pb-28 pt-12 sm:pb-40 sm:pt-16">
      <div className="shell relative">
        {/* Label */}
        <p data-ab="label" className="label-mono text-center text-signal-strong">
          About us
        </p>

        {/* Statement with a line drawing on each side */}
        <div className="relative mx-auto mt-4 max-w-[56rem]">
          <ShipArt data-ab="art" className="pointer-events-none absolute -left-[11.5rem] top-3 hidden w-36 text-ink/[0.16] xl:block" />
          <CraneArt data-ab="art" className="pointer-events-none absolute -right-[11.5rem] top-0 hidden w-36 text-ink/[0.16] xl:block" />
          <h2
            id="lab-about-title"
            data-ab="statement"
            className="text-center text-[clamp(1.8rem,3.3vw,2.95rem)] font-medium leading-[1.1] tracking-[-0.045em]"
          >
            {STATEMENT.split(" ").map((w, i) => (
              <span key={i} data-ab="word">
                {w}{" "}
              </span>
            ))}
          </h2>
        </div>

        {/* White pill button + "trusted by" cluster */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
          <Link
            data-ab="cta"
            href="/about/"
            className="group inline-flex items-center gap-4 rounded-full bg-white py-1.5 pl-6 pr-1.5 text-[1.02rem] font-medium shadow-[0_18px_40px_-24px_rgba(18,21,29,0.35)] ring-1 ring-ink/5 transition-shadow duration-500 hover:shadow-[0_22px_46px_-22px_rgba(18,21,29,0.45)]"
          >
            More about us
            {/* Two arrows, each filling the whole tile: the visible one slides out to the top-right on hover and the
                second slides in from the bottom-left. At rest the second one is fully outside the tile (clipped). */}
            <span className="relative block size-10 overflow-hidden rounded-full bg-ink text-paper transition-colors duration-500 group-hover:bg-signal-strong">
              <span className="absolute inset-0 grid place-items-center transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-full group-hover:-translate-y-full">
                <ArrowUpRight className="size-4" strokeWidth={1.75} />
              </span>
              <span className="absolute inset-0 grid -translate-x-full translate-y-full place-items-center transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0 group-hover:translate-y-0">
                <ArrowUpRight className="size-4" strokeWidth={1.75} />
              </span>
            </span>
          </Link>
          <div data-ab="cta" className="flex items-center gap-3">
            <div className="flex">
              {CIRCLES.map((c, i) => (
                <span key={c.name} className={`relative grid size-10 place-items-center overflow-hidden rounded-full bg-white ring-2 ring-paper ${i > 0 ? "-ml-3" : ""}`}>
                  <Image src={c.logo} alt="" width={64} height={40} className="h-auto w-7 object-contain" />
                </span>
              ))}
            </div>
            <p className="text-left text-[0.95rem] leading-tight">
              <span className="block text-ink/60">Member of</span>
              <span className="font-medium">{memberships.length} global associations</span>
            </p>
          </div>
        </div>

        {/* Three cards: white · photo · white */}
        <ul data-ab="cards" className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-3">
          <li data-ab="card" className="group flex min-h-[19rem] flex-col justify-between rounded-[22px] bg-white p-7 shadow-[0_26px_54px_-36px_rgba(18,21,29,0.3)] ring-1 ring-ink/5 transition-transform duration-500 ease-[var(--ease-expo)] hover:-translate-y-1 sm:min-h-[21rem] sm:p-8">
            <Eye aria-hidden className="size-11 text-indigo transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-110" strokeWidth={1.15} />
            <div>
              <h3 className="font-title text-[clamp(1.7rem,2.4vw,2.15rem)]">Our vision</h3>
              <p className="mt-3 max-w-[34ch] text-[1.02rem] leading-snug text-ink/70">{company.vision}</p>
            </div>
          </li>

          <li data-ab="card" className="group relative isolate flex min-h-[19rem] flex-col justify-end overflow-hidden rounded-[22px] p-7 text-white shadow-[0_26px_54px_-36px_rgba(18,21,29,0.4)] transition-transform duration-500 ease-[var(--ease-expo)] hover:-translate-y-1 sm:min-h-[21rem] sm:p-8">
            <div data-ab="photo" className="absolute inset-0 -z-20">
              <Image src="/images/about/mission-team.webp" alt="Three logistics professionals in hi-vis vests planning a shipment around a tablet at a container terminal at sunset" fill sizes="(min-width: 768px) 34vw, 92vw" className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-[1.05]" />
            </div>
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />
            <h3 className="font-title text-[clamp(1.7rem,2.4vw,2.15rem)]">Our mission</h3>
            <p className="mt-3 max-w-[34ch] text-[1.02rem] leading-snug text-white/90">{company.mission}</p>
          </li>

          <li data-ab="card" className="group flex min-h-[19rem] flex-col justify-between rounded-[22px] bg-white p-7 shadow-[0_26px_54px_-36px_rgba(18,21,29,0.3)] ring-1 ring-ink/5 transition-transform duration-500 ease-[var(--ease-expo)] hover:-translate-y-1 sm:min-h-[21rem] sm:p-8">
            <Award aria-hidden className="size-11 text-signal transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-110" strokeWidth={1.15} />
            <div>
              <h3 className="font-title text-[clamp(1.7rem,2.4vw,2.15rem)]">Our experience</h3>
              <p className="mt-3 max-w-[34ch] text-[1.02rem] leading-snug text-ink/70">{EXPERIENCE}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
