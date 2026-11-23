import Image from "next/image";
import { MaskLines } from "@/components/motion/MaskLines";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollZoom } from "@/components/motion/ScrollZoom";
import { Crumbs } from "@/components/sections/PageIntro";
import { cn } from "@/lib/cn";

type Photo = { src: string; alt: string; position?: string };

/**
 * Inner-page opener in the homepage's language: paper background, a red mono label, a large Archivo headline,
 * a short paragraph and pill buttons, then a rounded photograph.
 *  - "wide":   centred text, then a wide photo card with frosted-glass chips along its bottom edge
 *  - "split":  text on the left, a portrait photo card on the right (service pages)
 *  - "text":   text only, centred (FAQ)
 */
export function PageHero({
  crumbs,
  label,
  lines,
  description,
  actions,
  photo,
  chips,
  layout = "wide",
}: {
  crumbs: Array<{ name: string; href?: string }>;
  label: string;
  lines: React.ReactNode[];
  description?: React.ReactNode;
  actions?: React.ReactNode;
  photo?: Photo;
  chips?: string[];
  layout?: "wide" | "split" | "text";
}) {
  const centred = layout !== "split";
  const text = (
    <div className={cn(centred && "mx-auto max-w-4xl text-center")}>
      <Reveal immediate delay={0.1} className={cn(centred && "flex justify-center")}>
        <Crumbs items={crumbs} />
      </Reveal>
      <Reveal immediate delay={0.2} as="p" className="label-mono mt-8 text-signal-strong">
        {label}
      </Reveal>
      <MaskLines
        as="h1"
        immediate
        delay={0.25}
        stagger={0.1}
        lines={lines}
        className="font-title mt-5 text-[clamp(2.7rem,6.4vw,6rem)] leading-[0.98]"
      />
      {description && (
        <Reveal immediate delay={0.6} as="div" className={cn("mt-7 max-w-xl text-[1.1rem] leading-relaxed text-stone", centred && "mx-auto")}>
          {description}
        </Reveal>
      )}
      {actions && (
        <Reveal immediate delay={0.75} className={cn("mt-9 flex flex-wrap gap-3", centred && "justify-center")}>
          {actions}
        </Reveal>
      )}
    </div>
  );

  if (layout === "split") {
    return (
      <section className="shell pb-12 pt-36 sm:pb-16 sm:pt-44">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            {text}
            {chips && (
              <Reveal immediate delay={0.9} as="ul" className="mt-10 flex flex-wrap gap-2">
                {chips.map((c) => (
                  <li key={c} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink/75 ring-1 ring-ink/10">
                    {c}
                  </li>
                ))}
              </Reveal>
            )}
          </div>
          {photo && (
            <Reveal immediate delay={0.35} className="lg:col-span-5">
              <ScrollZoom className="aspect-[4/5] rounded-[22px] shadow-[0_40px_80px_-40px_rgba(18,21,29,0.5)] sm:rounded-[28px]" from={1.08}>
                <Image src={photo.src} alt={photo.alt} fill priority quality={85} sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover" style={{ objectPosition: photo.position }} />
              </ScrollZoom>
            </Reveal>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="shell pb-12 pt-36 sm:pb-16 sm:pt-44">
      {text}
      {photo && (
        <Reveal immediate delay={0.5} className="relative mt-14 sm:mt-16">
          <ScrollZoom className="aspect-[4/3] rounded-[22px] shadow-[0_40px_80px_-40px_rgba(18,21,29,0.5)] sm:aspect-[21/9] sm:rounded-[28px]" from={1.08}>
            <Image src={photo.src} alt={photo.alt} fill priority quality={85} sizes="(min-width: 1600px) 1500px, 96vw" className="object-cover" style={{ objectPosition: photo.position }} />
          </ScrollZoom>
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[22px] bg-gradient-to-t from-ink/55 via-transparent to-transparent sm:rounded-[28px]" />
          {chips && (
            <ul className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 sm:bottom-6 sm:left-6">
              {chips.map((c) => (
                <li key={c} className="chip-glass">
                  {c}
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      )}
    </section>
  );
}
