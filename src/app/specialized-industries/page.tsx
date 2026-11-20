import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { ScrollZoom } from "@/components/motion/ScrollZoom";
import { ImageHero } from "@/components/sections/ImageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { industries, industriesIntro } from "@/content/industries";
import { strengths } from "@/content/site";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";

export const metadata = pageMetadata({
  title: "Specialized Industries — Textile to Pharmaceutical",
  description:
    "Freight and customs expertise for 15 specialised industries, including textile, steel, oil & gas, medical equipment, automobile, power & energy and pharmaceutical.",
  path: "/specialized-industries/",
  image: { src: "/images/industries/hero.webp", alt: "Steel coils and pipes staged on a quay for loading" },
});

export default function IndustriesPage() {
  const withImages = industries.filter((i) => i.image);
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Specialized Industries", href: "/specialized-industries/" }])} />

      <ImageHero
        image={{ src: "/images/industries/hero.webp", alt: "Steel coils and bundles of pipes staged on a port quay for loading" }}
        crumbs={[{ name: "Home", href: "/" }, { name: "Specialized Industries" }]}
        label={`Industries — ${industries.length} sectors`}
        lines={["Specialised", "industries."]}
        aside={<p>{industriesIntro}</p>}
        meta={[
          { k: "Sectors", v: String(industries.length) },
          { k: "General", v: "Cargo" },
          { k: "Perishable", v: "Reefer · Temp." },
          { k: "Hazardous", v: "DG handling" },
          { k: "Out of gauge", v: "Heavy lift, break bulk and project cargo, planned from on-site survey to delivery.", wide: true },
        ]}
      />

      <section aria-labelledby="ind-heading" className="section-y">
        <div className="shell">
          <p className="label-mono mb-8 text-stone">— Sectors we serve</p>
          <WordReveal
            as="h2"
            id="ind-heading"
            text="Fifteen sectors, each with its own cargo,"
            muted="compliance and timing."
            className="font-editorial text-lead max-w-[22ch]"
          />

          {/* Feature tiles with photography */}
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {withImages.map((ind, i) => (
              <Reveal key={ind.name} delay={i * 0.06} className="zoom-group group">
                <div className="relative">
                  <ScrollZoom className="zoom-media aspect-[4/5] rounded-[6px]">
                    <Image src={ind.image!.src} alt={ind.image!.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </ScrollZoom>
                  <span className="chip-glass absolute bottom-3 left-3">{String(industries.indexOf(ind) + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="font-display mt-5 text-[clamp(1.6rem,2.2vw,2.1rem)]">{ind.name}</h3>
              </Reveal>
            ))}
          </div>

          {/* Full index */}
          <Reveal as="ol" stagger={0.03} y={16} className="mt-20 grid gap-x-12 border-t border-line md:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <li key={ind.name} className="group flex items-center justify-between gap-4 border-b border-line py-5">
                <h3 className="text-sub tracking-[-0.03em] transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1.5">{ind.name}</h3>
                <span className={cn("label-mono", ind.image ? "text-signal-deep" : "text-stone")}>{String(i + 1).padStart(2, "0")}</span>
              </li>
            ))}
          </Reveal>
          <p className="label-mono mt-6 text-stone">Photography is illustrative.</p>
        </div>
      </section>

      <section aria-labelledby="exp-heading" className="bg-paper-2 section-y">
        <div className="shell">
          <div className="grid gap-6 lg:grid-cols-12">
            <p className="label-mono text-stone lg:col-span-4">— Celebrate excellence in logistics</p>
            <h2 id="exp-heading" className="font-title text-big lg:col-span-8">
              Handled with care, worldwide.
            </h2>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {strengths.slice(0, 3).map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08} className="rounded-[8px] bg-paper p-8">
                <p className="label-mono text-signal-deep">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-editorial mt-8 text-[clamp(1.6rem,2.2vw,2.1rem)]">{s.title}</h3>
                <p className="mt-3 text-stone">{s.body}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-14">
            <ButtonLink href="/contact/">Discuss your cargo</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
