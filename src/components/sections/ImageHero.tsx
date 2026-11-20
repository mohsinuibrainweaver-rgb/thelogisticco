import Image from "next/image";
import { HeroMedia } from "@/components/motion/HeroMedia";
import { MaskLines } from "@/components/motion/MaskLines";
import { Reveal } from "@/components/motion/Reveal";
import { Crumbs } from "@/components/sections/PageIntro";
import { cn } from "@/lib/cn";

/**
 * Inner-page hero in the Go Uncharted "In focus" style: full-bleed photograph, uppercase title anchored
 * bottom-left, optional aside paragraph, and a ruled metadata strip along the bottom edge.
 */
export function ImageHero({
  image,
  crumbs,
  label,
  lines,
  aside,
  meta,
  className,
  imagePosition = "object-center",
}: {
  image: { src: string; alt: string };
  crumbs: Array<{ name: string; href?: string }>;
  label?: string;
  lines: React.ReactNode[];
  aside?: React.ReactNode;
  meta?: Array<{ k: string; v: React.ReactNode; wide?: boolean }>;
  className?: string;
  imagePosition?: string;
}) {
  return (
    <section className={cn("on-ink relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-paper", className)}>
      <HeroMedia>
        <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className={cn("object-cover", imagePosition)} />
      </HeroMedia>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/25 to-ink/45" />

      <div className="shell flex flex-1 flex-col pt-28 sm:pt-32 lg:pt-40">
        <Reveal immediate delay={0.2}>
          <Crumbs tone="light" items={crumbs} />
        </Reveal>
        <div className="mt-auto grid items-end gap-8 pb-10 lg:grid-cols-12 lg:pb-12">
          <div className="lg:col-span-8">
            {label && (
              <Reveal immediate delay={0.3} as="p" className="label-mono mb-5 text-paper/80">
                {label}
              </Reveal>
            )}
            <MaskLines as="h1" immediate delay={0.25} lines={lines} className="font-display text-mega" />
          </div>
          {aside && (
            <Reveal immediate delay={0.7} className="max-w-md text-lg text-paper/85 lg:col-span-4 lg:justify-self-end lg:pb-2">
              {aside}
            </Reveal>
          )}
        </div>
      </div>

      {meta && (
        <Reveal immediate delay={0.85}>
          <dl className="grid grid-cols-2 border-t border-white/20 bg-ink/35 backdrop-blur-md sm:grid-cols-3 lg:grid-cols-6">
            {meta.map((m) => (
              <div key={m.k} className={cn("border-b border-r border-white/15 px-[clamp(1rem,2.4vw,2.25rem)] py-5 lg:border-b-0", m.wide && "col-span-2 lg:col-span-2")}>
                <dt className="label-mono text-paper/65">{m.k}</dt>
                <dd className={cn("mt-2", m.wide ? "text-sm text-paper/85" : "font-mono text-lg tracking-tight")}>{m.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      )}
    </section>
  );
}
