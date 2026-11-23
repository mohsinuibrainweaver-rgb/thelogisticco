import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand, SectionHead } from "@/components/sections/inner";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { industries, industriesIntro } from "@/content/industries";
import { strengths } from "@/content/site";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Specialized Industries — Textile to Pharmaceutical",
  description:
    "Freight and customs expertise for 15 specialised industries, including textile, steel, oil & gas, medical equipment, automobile, power & energy and pharmaceutical.",
  path: "/specialized-industries/",
  image: { src: "/images/industries/hero.webp", alt: "Steel coils and pipes staged on a quay for loading" },
});

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Specialized Industries", href: "/specialized-industries/" }])} />

      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Specialized Industries" }]}
        label="Industries we serve"
        lines={["Specialised", "industries."]}
        description={industriesIntro}
        actions={
          <>
            <ButtonLink href="/contact/">Discuss your cargo</ButtonLink>
            <ButtonLink href="/our-services/" variant="outline">
              Our services
            </ButtonLink>
          </>
        }
        photo={{ src: "/images/industries/hero.webp", alt: "Steel coils and bundles of pipes staged on a port quay for loading" }}
        chips={[`${industries.length} sectors`, "General cargo", "Perishable · reefer", "Hazardous · DG handling", "Heavy lift & project cargo"]}
      />

      <section aria-labelledby="ind-heading" className="py-12 sm:py-16">
        <div className="shell">
          <SectionHead label="Sectors we serve" id="ind-heading" lines={["Fifteen sectors, each with", "its own cargo and timing."]} align="center" />
          <Reveal as="ul" stagger={0.05} y={36} className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
            {industries.map((ind) => (
              <li key={ind.name}>
                <div className="group flex h-full flex-col overflow-hidden rounded-[18px] bg-white shadow-[0_22px_44px_-34px_rgba(18,21,29,0.3)] ring-1 ring-ink/5 transition-[transform,box-shadow] duration-500 ease-[var(--ease-expo)] hover:-translate-y-1 hover:shadow-[0_30px_56px_-32px_rgba(18,21,29,0.42)]">
                  <div className="relative aspect-[500/342] overflow-hidden bg-paper-3">
                    <Image
                      src={ind.cover}
                      alt={`${ind.name} cargo`}
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 768px) 32vw, 48vw"
                      className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-[1.08]"
                    />
                  </div>
                  <h3 className="px-4 py-4 text-center text-[1.02rem] font-medium leading-snug tracking-[-0.02em] sm:px-5 sm:py-5">{ind.name}</h3>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="exp-heading" className="bg-paper-2 py-20 sm:py-28">
        <div className="shell">
          <div className="grid gap-6 lg:grid-cols-12">
            <p className="label-mono text-signal-strong lg:col-span-4">Celebrate excellence in logistics</p>
            <h2 id="exp-heading" className="font-title text-big lg:col-span-8">
              Handled with care, worldwide.
            </h2>
          </div>
          <Reveal as="ul" stagger={0.1} y={40} className="mt-14 grid gap-4 md:grid-cols-3">
            {strengths.slice(0, 3).map((s, i) => (
              <li key={s.title} className="flex min-h-[15rem] flex-col justify-between rounded-[22px] bg-white p-7 shadow-[0_26px_54px_-36px_rgba(18,21,29,0.3)] ring-1 ring-ink/5 sm:p-8">
                <p className="label-mono text-signal-strong">{String(i + 1).padStart(2, "0")}</p>
                <div>
                  <h3 className="font-title text-[clamp(1.6rem,2.2vw,2.1rem)]">{s.title}</h3>
                  <p className="mt-3 text-[1.02rem] leading-snug text-stone">{s.body}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand label="Discuss your cargo" lines={["Your industry, our expertise."]} />
    </>
  );
}
