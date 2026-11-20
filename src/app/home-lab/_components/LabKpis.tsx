import Image from "next/image";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { stats } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * DESIGN LAB — "In numbers" built like the reference's KPI strip (overlands.framer.website): four columns divided
 * by hairlines, a very large number and a two-line label sitting at the bottom of each, with the columns alternately
 * shorter and taller so the numbers step up and down. Hovering a column shows its photograph in the middle of that
 * column's free space above the number (it wipes up from the bottom with a slight zoom settle), shown whole at its own 4:5 shape, and never covers the number or label. Figures are the
 * original website's counters; photographs are illustrative Higgsfield images (scripts/process-kpi-images.mjs).
 */
const KPIS = [
  { stat: stats[0], image: "/images/kpis/years.webp", alt: "An experienced logistics manager reviewing shipping paperwork in a warehouse" },
  { stat: stats[1], image: "/images/kpis/countries.webp", alt: "A container ship leaving port at sunrise" },
  { stat: stats[2], image: "/images/kpis/associates.webp", alt: "Two business partners shaking hands in front of a container yard" },
  { stat: stats[3], image: "/images/kpis/clients.webp", alt: "A delivery being handed over to a client at a warehouse loading dock" },
] as const;

export function LabKpis() {
  return (
    <section aria-labelledby="lab-kpi-title" className="py-12 sm:py-16">
      <div className="shell">
        <div className="mb-12 sm:mb-16">
          <p className="label-mono text-signal-strong">In numbers</p>
          <h2 id="lab-kpi-title" className="font-title mt-5 max-w-[16ch] text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.98]">
            Two decades, measured in partners.
          </h2>
        </div>

        <Reveal as="ul" stagger={0.1} y={30} className="grid grid-cols-2 items-start lg:grid-cols-4">
          {KPIS.map(({ stat, image, alt }, i) => (
            <li
              key={stat.label}
              className={cn(
                // --body ≈ the height of the number + label block, so the photo can fill the free space above it
                "group relative flex flex-col border-l border-ink/15 px-4 pb-6 [--body:9.25rem] sm:px-6 sm:[--body:10rem] lg:[--body:13rem]",
                i % 2 === 0 ? "h-[17rem] sm:h-[21rem] lg:h-[30rem]" : "h-[21rem] sm:h-[26rem] lg:h-[37rem]",
                i === KPIS.length - 1 && "lg:border-r",
                i % 2 === 1 && "max-lg:border-r",
              )}
            >
              <div className="mt-auto">
                <p className="text-[clamp(3rem,8.4vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.06em]">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-4 max-w-[12rem] text-[1.05rem] leading-snug text-ink/75">{stat.label}</p>
              </div>

              {/* Photo: sits in the free space above the number and label (never covering them) and is shown whole —
                  the box keeps the picture's own 4:5 shape, as large as the space allows, so nothing is cropped. */}
              <div aria-hidden className="pointer-events-none absolute inset-x-3 top-3 bottom-[var(--body)] flex justify-center sm:inset-x-4 sm:top-4">
                <div className="relative aspect-[4/5] h-full max-w-full overflow-hidden rounded-xl bg-paper-3 shadow-[0_26px_50px_-28px_rgba(18,21,29,0.5)] transition-[clip-path] duration-[800ms] ease-[var(--ease-expo)] [clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0_0_0_0)]">
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    sizes="(min-width: 1024px) 20vw, 40vw"
                    className="scale-[1.15] object-cover transition-transform duration-[1100ms] ease-[var(--ease-expo)] group-hover:scale-100"
                  />
                </div>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
