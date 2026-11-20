import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { MaskLines } from "@/components/motion/MaskLines";
import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { WordReveal } from "@/components/motion/WordReveal";
import { ImageHero } from "@/components/sections/ImageHero";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { services, type Service } from "@/content/services";
import { contact } from "@/content/site";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

export function ServicePage({ service: s }: { service: Service }) {
  const others = services.filter((x) => x.slug !== s.slug);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/our-services/" },
    { name: s.name, href: s.href },
  ];
  const doorToDoor = s.subServices.some((x) => x.title === "Door to Door");

  return (
    <>
      <JsonLd data={serviceSchema(s)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <ImageHero
        image={s.image}
        crumbs={[...crumbs.slice(0, 2), { name: s.name }]}
        label={`Service ${s.index} / 05 — ${s.mode}`}
        lines={s.headline.map((l) => l)}
        aside={
          <>
            <p className="font-editorial text-sub text-paper">{s.tagline}</p>
            <div className="mt-6">
              <ButtonLink href="/contact/" variant="light">
                Request a quote
              </ButtonLink>
            </div>
          </>
        }
        meta={[
          { k: "Mode", v: s.mode },
          { k: "Services", v: String(s.subServices.length).padStart(2, "0") },
          { k: "Markets", v: "PK · UAE" },
          { k: "Door to door", v: doorToDoor ? "Available" : "On request" },
          { k: "In short", v: s.short, wide: true },
        ]}
      />

      {/* Intro sentence */}
      <section aria-labelledby="svc-intro" className="section-y">
        <div className="shell">
          <p className="label-mono mb-8 text-stone">— Overview</p>
          <WordReveal as="h2" id="svc-intro" text={s.intro} className="font-editorial text-lead max-w-[28ch]" />
        </div>
      </section>

      {/* Sub-service index with sticky image */}
      <section aria-labelledby="offer-heading" className="pb-24 sm:pb-36">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-40">
              <p className="label-mono text-stone">— What we offer</p>
              <MaskLines as="h2" id="offer-heading" lines={[`${s.subServices.length} ways to`, "ship with us."]} className="font-title text-big mt-5" />
              <RevealImage className="mt-10 aspect-[4/5] w-full max-w-md" parallax={5}>
                <Image src={s.detailImage.src} alt={s.detailImage.alt} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
              </RevealImage>
            </div>
          </div>
          <Reveal as="ol" stagger={0.06} className="border-t border-line lg:col-span-7">
            {s.subServices.map((x, i) => (
              <li key={x.title} className="group grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-line py-9 sm:grid-cols-[3.5rem_1fr]">
                <span className="label-mono pt-2.5 text-stone transition-colors group-hover:text-signal-deep">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-editorial text-[clamp(1.6rem,2.6vw,2.4rem)] transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1.5">{x.title}</h3>
                  <p className="mt-3 max-w-xl text-lg text-stone">{x.body}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* How it works — closing statement (no unverified process steps) */}
      <section aria-labelledby="how-heading" className="bg-paper-2 section-y">
        <div className="shell mx-auto max-w-4xl text-center">
          <p className="label-mono flex items-center justify-center gap-3 text-stone">
            <span aria-hidden className="h-px w-6 bg-ink" /> How it works
          </p>
          <h2 id="how-heading" className="font-editorial mt-6 text-[clamp(2rem,4vw,3.75rem)] text-balance">
            Tell us what you&rsquo;re moving. <span className="text-stone">We&rsquo;ll come back with the route and a quote.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-stone">{s.closing}</p>
          <Reveal className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact/">Request a quote</ButtonLink>
            <ButtonLink href={contact.whatsapp.href} variant="outline">
              WhatsApp our team
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* Other services */}
      <section aria-labelledby="more-heading" className="section-y">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="more-heading" className="font-title text-big">
              More ways to move cargo
            </h2>
            <ButtonLink href="/our-services/">All services</ButtonLink>
          </div>
          <div className="mt-14 grid gap-x-6 gap-y-16 md:grid-cols-2">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={(i % 2) * 0.08} className={i % 2 ? "md:mt-24" : ""}>
                <ServiceCard service={o} ratio="aspect-[4/3]" sizes="(min-width: 768px) 50vw, 100vw" chipsAlign={i % 2 ? "left" : "right"} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
