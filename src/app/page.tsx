import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { HeroMedia } from "@/components/motion/HeroMedia";
import { MaskLines } from "@/components/motion/MaskLines";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { ScrollZoom } from "@/components/motion/ScrollZoom";
import { ShipCrossing } from "@/components/motion/ShipCrossing";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { ActiveList } from "@/components/sections/ActiveList";
import { Accordion } from "@/components/sections/Accordion";
import { MembershipMarquee, StatsBand } from "@/components/sections/Shared";
import { company, contact, offices, strengths } from "@/content/site";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { faqs } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "The Logistic Company — Freight Forwarding & Customs | Pakistan & UAE",
  absoluteTitle: true,
  description:
    "Freight forwarding, customs clearance and logistics across Pakistan and the UAE. Air freight, sea freight, road transport and project cargo from offices in Lahore and Dubai.",
  path: "/",
  image: { src: "/images/home/hero.webp", alt: "Container ship entering a commercial port at dusk" },
});

const [air, sea, road, project, customs] = services;

export default function HomePage() {
  return (
    <>
      {/* ───────────── Hero ───────────── */}
      <section className="on-ink relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-paper">
        <HeroMedia>
          <Image
            src="/images/home/hero.webp"
            alt="Loaded container ship entering a commercial port at dusk"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_50%]"
          />
        </HeroMedia>
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/15 to-ink/35" />

        <div className="shell mt-auto grid items-end gap-8 pb-10 pt-40 lg:grid-cols-12 lg:pb-12">
          <div className="lg:col-span-9">
            <Reveal immediate delay={0.45} as="p" className="mb-5 text-paper/85">
              We are The Logistic Company
            </Reveal>
            <MaskLines
              as="h1"
              immediate
              delay={0.3}
              stagger={0.1}
              lines={["Global freight,", "cleared and", "delivered."]}
              className="font-display text-mega"
            />
          </div>
          <Reveal immediate delay={0.85} className="max-w-sm lg:col-span-3 lg:justify-self-end lg:pb-2">
            <p className="text-[1.05rem] leading-relaxed text-paper/85">
              Air, sea and road freight, project cargo and customs clearance, from our offices in Lahore and Dubai, backed by more than twenty years in the trade.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <ButtonLink href="/contact/" variant="light">
                Request a quote
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal immediate delay={1.05}>
          <div className="shell">
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/25 py-5 text-sm">
              <p className="text-paper/80">{offices.map((o) => o.city).join(" · ")} — Pakistan &amp; UAE</p>
              <p className="flex items-center gap-6">
                <span className="label-mono hidden text-paper/70 sm:inline">Talk to us</span>
                <a href={contact.whatsapp.href} target="_blank" rel="noopener noreferrer" className="label-mono link-line">
                  WhatsApp
                </a>
                <a href={`mailto:${contact.email}`} className="label-mono link-line">
                  Email
                </a>
                <a href={offices[0].phone.href} className="label-mono link-line">
                  Call
                </a>
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ───────────── Manifesto ───────────── */}
      <section aria-labelledby="manifesto" className="section-y">
        <div className="shell">
          <WordReveal
            as="h2"
            id="manifesto"
            text="Freight forwarding, customs clearance and logistics, handled by one local team of supply chain experts across Pakistan and the United Arab Emirates."
            muted="For more than twenty years."
            className="font-editorial text-lead max-w-[22ch] sm:max-w-[26ch] lg:max-w-[30ch]"
          />
          <div className="mt-14 grid items-end gap-8 sm:grid-cols-2">
            <Reveal as="p" className="max-w-md font-mono text-[0.82rem] leading-relaxed text-stone">
              {company.mission} Our values (innovation, integrity and ownership) guide every shipment we plan.
            </Reveal>
            <Reveal className="sm:justify-self-end">
              <ButtonLink href="/about/" variant="outline">
                Read our story
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>

      <MembershipMarquee className="pb-24 sm:pb-32" />

      {/* ───────────── Services (destination-card grid) ───────────── */}
      <section aria-labelledby="services-heading" className="pb-24 sm:pb-36">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <MaskLines as="h2" id="services-heading" lines={["Five ways to move cargo"]} className="font-title text-big" />
            <Reveal>
              <ButtonLink href="/our-services/">All services</ButtonLink>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-x-6 gap-y-16 lg:grid-cols-12 lg:gap-y-24">
            <Reveal className="lg:col-span-7">
              <ServiceCard service={air} ratio="aspect-[4/3]" sizes="(min-width: 1024px) 58vw, 100vw" />
            </Reveal>
            <Reveal className="lg:col-span-5 lg:mt-32" delay={0.1}>
              <ServiceCard service={sea} ratio="aspect-[4/5]" sizes="(min-width: 1024px) 42vw, 100vw" />
            </Reveal>
            <Reveal className="lg:col-span-12">
              <ServiceCard service={project} ratio="aspect-[4/3] sm:aspect-[21/9]" sizes="100vw" chipsAlign="left" />
            </Reveal>
            <Reveal className="lg:col-span-5">
              <ServiceCard service={road} ratio="aspect-[4/5]" sizes="(min-width: 1024px) 42vw, 100vw" />
            </Reveal>
            <Reveal className="lg:col-span-7 lg:mt-40" delay={0.1}>
              <ServiceCard service={customs} ratio="aspect-[4/3]" sizes="(min-width: 1024px) 58vw, 100vw" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── Getting there (signature scroll moment) ───────────── */}
      <ShipCrossing label="— Getting there" title={<>Moving cargo across 30+ countries.</>} />

      {/* ───────────── In focus ───────────── */}
      <section aria-labelledby="focus-heading" className="on-ink relative isolate overflow-hidden bg-ink text-paper">
        <ScrollZoom className="!absolute inset-0 -z-20" from={1.15}>
          <Image src="/images/services/customs-clearance.webp" alt="" fill sizes="100vw" className="object-cover" />
        </ScrollZoom>
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/20 to-ink/30" />
        <div className="shell flex min-h-[85svh] flex-col justify-end pb-10 pt-32">
          <p className="label-mono text-paper/80">In focus — No. 01 · Custom clearance, Pakistan &amp; UAE</p>
          <MaskLines as="h2" id="focus-heading" lines={["Cleared the same day,", "when it matters."]} className="font-editorial mt-5 text-[clamp(2.4rem,5.6vw,5.6rem)]" />
        </div>
        <dl className="grid grid-cols-2 border-t border-white/20 bg-ink/40 backdrop-blur-md sm:grid-cols-3 lg:grid-cols-6">
          {[
            { k: "Declarations", v: "Import · Export" },
            { k: "Bonded", v: "Stocks handled" },
            { k: "Warehousing", v: "SRO benefits" },
            { k: "Fast track", v: "Same-day option" },
            {
              k: "Why it matters",
              v: "A legacy in customs clearance that has stood the test of time: documentation, inspections and fees handled by people who know the process.",
              wide: true,
            },
          ].map((m) => (
            <div key={m.k} className={`border-b border-r border-white/15 px-[clamp(1rem,2.4vw,2.25rem)] py-5 lg:border-b-0 ${m.wide ? "col-span-2" : ""}`}>
              <dt className="label-mono text-paper/65">{m.k}</dt>
              <dd className={m.wide ? "mt-2 text-sm text-paper/85" : "mt-2 font-mono text-lg tracking-tight"}>{m.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ───────────── Industries (journal-style numbered list) ───────────── */}
      <section aria-labelledby="industries-heading" className="section-y">
        <div className="shell">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label-mono text-stone">— Specialised industries</p>
              <h2 id="industries-heading" className="font-editorial text-lead mt-5 max-w-[20ch]">
                Expertise for your industry&rsquo;s cargo, compliance and timing.
              </h2>
            </div>
            <Reveal>
              <ButtonLink href="/specialized-industries/">All industries</ButtonLink>
            </Reveal>
          </div>
          <Reveal as="ol" stagger={0.03} y={20} className="grid gap-x-12 border-t border-line lg:grid-cols-2">
            {industries.map((ind, i) => (
              <li key={ind.name} className="border-b border-line">
                <Link href="/specialized-industries/" className="group flex items-center justify-between gap-4 py-5">
                  <span className="text-sub tracking-[-0.03em] transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-2">{ind.name}</span>
                  <span className="label-mono text-stone transition-colors group-hover:text-signal-deep">{String(i + 1).padStart(2, "0")}</span>
                </Link>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ───────────── Why TLC (active-on-scroll list) ───────────── */}
      <section aria-labelledby="why-heading" className="bg-paper-2 section-y">
        <div className="shell">
          <div className="mb-10 grid gap-6 lg:grid-cols-12">
            <p className="label-mono text-stone lg:col-span-4">— Why TLC</p>
            <MaskLines as="h2" id="why-heading" lines={["Built on ownership."]} className="font-title text-big lg:col-span-8" />
          </div>
          <ActiveList
            label="Why TLC"
            items={strengths.map((s) => ({ title: s.title, body: s.body }))}
            images={[
              { src: "/images/home/story-sea.webp", alt: "Container vessel crossing open ocean" },
              { src: "/images/home/story-crane.webp", alt: "Gantry crane lifting a container at night" },
              { src: "/images/services/road-transport.webp", alt: "Truck hauling a container at sunrise" },
              { src: "/images/services/customs-clearance-detail.webp", alt: "Bonded warehouse aisle" },
            ]}
          />
        </div>
      </section>

      {/* ───────────── Numbers ───────────── */}
      <section aria-labelledby="numbers-heading" className="section-y">
        <div className="shell">
          <div className="mb-14">
            <p className="label-mono text-stone">— In numbers</p>
            <h2 id="numbers-heading" className="font-title text-big mt-5">
              Two decades, measured in partners.
            </h2>
          </div>
          <StatsBand />
        </div>
      </section>

      {/* ───────────── FAQ ───────────── */}
      <section aria-labelledby="faq-heading" className="pb-28 sm:pb-40">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="label-mono flex items-center justify-center gap-3 text-stone">
              <span aria-hidden className="h-px w-6 bg-ink" /> Before you ship
            </p>
            <MaskLines as="h2" id="faq-heading" lines={["Questions, answered"]} className="font-editorial mt-5 text-[clamp(2.6rem,5.6vw,5.4rem)]" />
            <p className="mt-4 text-stone">Still not sure? Our team answers by phone, email or WhatsApp.</p>
          </div>
          <div className="mx-auto mt-14 max-w-5xl">
            <Accordion items={faqs.slice(0, 5)} />
            <div className="mt-10 text-center">
              <ButtonLink href="/our-faqs/" variant="outline">
                All questions
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
