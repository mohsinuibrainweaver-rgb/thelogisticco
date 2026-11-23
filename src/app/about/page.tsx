import Image from "next/image";
import { Award, Eye } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ActiveList } from "@/components/sections/ActiveList";
import { CtaBand } from "@/components/sections/inner";
import { PageHero } from "@/components/sections/PageHero";
import { MembershipMarquee } from "@/components/sections/Shared";
import { StatementReveal } from "@/components/sections/StatementReveal";
import { HomeKpis } from "@/components/home/HomeKpis";
import { JsonLd } from "@/components/seo/JsonLd";
import { company, strengths } from "@/content/site";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us — 20+ Years in Freight Forwarding & Customs",
  description:
    "Freight forwarding and customs clearance partner with 20+ years of experience, offices in Lahore and Dubai, 30+ operational countries and 80+ global associates.",
  path: "/about/",
  image: { src: "/images/about/hero.webp", alt: "Port cranes and a moored ship silhouetted at dawn" },
});

const EXPERIENCE = "We have more than 20 years of experience, backed by a resilient legacy of customs clearance that has stood the test of time.";

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "About", href: "/about/" }])} />

      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "About" }]}
        label="About us"
        lines={["Twenty years of", "moving what matters."]}
        description="Freight forwarding, customs clearance and logistics: a local team of supply chain experts across Pakistan and the UAE."
        actions={
          <>
            <ButtonLink href="/contact/">Request a quote</ButtonLink>
            <ButtonLink href="/our-services/" variant="outline">
              Our services
            </ButtonLink>
          </>
        }
        photo={{ src: "/images/about/hero.webp", alt: "Port cranes and a moored container ship silhouetted at dawn" }}
        chips={["20+ years", "30+ countries", "80+ global associates", "Lahore · Dubai"]}
      />

      {/* Story */}
      <section aria-labelledby="story-heading" className="py-12 sm:py-16">
        <div className="shell">
          <p className="label-mono text-center text-signal-strong">Our story</p>
          <StatementReveal
            id="story-heading"
            text="Leaders in worldwide freight and logistics, backed by strong customs clearance services and a legacy that has stood the test of time."
            className="mx-auto mt-6 max-w-[56rem] text-center text-[clamp(1.8rem,3.3vw,2.95rem)]"
          />
          <Reveal className="mx-auto mt-12 grid max-w-4xl gap-8 text-[1.05rem] leading-relaxed text-stone md:grid-cols-2" stagger={0.1}>
            <p>
              At The Logistic Company, we play a vital role in shaping the national freight forwarding and logistics industry. At our core lies a straightforward, impactful mission: to deliver unparalleled global freight forwarding services.
            </p>
            <p>
              Our vision goes beyond the conventional: to be your preferred partner through innovative and sustainable solutions, delivered with a customer-centric approach by a team that genuinely cares and owns its commitments.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Vision · Mission · Experience */}
      <section aria-label="Vision, mission and experience" className="py-12 sm:py-16">
        <div className="shell">
          <Reveal as="ul" stagger={0.14} y={80} className="grid gap-4 md:grid-cols-3">
            <li className="group flex min-h-[19rem] flex-col justify-between rounded-[22px] bg-white p-7 shadow-[0_26px_54px_-36px_rgba(18,21,29,0.3)] ring-1 ring-ink/5 sm:min-h-[21rem] sm:p-8">
              <Eye aria-hidden className="size-11 text-indigo transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-110" strokeWidth={1.15} />
              <div>
                <h3 className="font-title text-[clamp(1.7rem,2.4vw,2.15rem)]">Our vision</h3>
                <p className="mt-3 max-w-[34ch] text-[1.02rem] leading-snug text-ink/70">{company.vision}</p>
              </div>
            </li>
            <li className="group relative isolate flex min-h-[19rem] flex-col justify-end overflow-hidden rounded-[22px] p-7 text-white shadow-[0_26px_54px_-36px_rgba(18,21,29,0.4)] sm:min-h-[21rem] sm:p-8">
              <Image src="/images/about/mission-team.webp" alt="Three logistics professionals in hi-vis vests planning a shipment around a tablet at a container terminal at sunset" fill sizes="(min-width: 768px) 34vw, 92vw" className="-z-20 object-cover transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-[1.05]" />
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />
              <h3 className="font-title text-[clamp(1.7rem,2.4vw,2.15rem)]">Our mission</h3>
              <p className="mt-3 max-w-[34ch] text-[1.02rem] leading-snug text-white/90">{company.mission}</p>
            </li>
            <li className="group flex min-h-[19rem] flex-col justify-between rounded-[22px] bg-white p-7 shadow-[0_26px_54px_-36px_rgba(18,21,29,0.3)] ring-1 ring-ink/5 sm:min-h-[21rem] sm:p-8">
              <Award aria-hidden className="size-11 text-signal transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-110" strokeWidth={1.15} />
              <div>
                <h3 className="font-title text-[clamp(1.7rem,2.4vw,2.15rem)]">Our experience</h3>
                <p className="mt-3 max-w-[34ch] text-[1.02rem] leading-snug text-ink/70">{EXPERIENCE}</p>
              </div>
            </li>
          </Reveal>
        </div>
      </section>

      <MembershipMarquee className="py-12 sm:py-16" />

      {/* Values */}
      <section aria-labelledby="values-heading" className="bg-paper-2 py-20 sm:py-28">
        <div className="shell">
          <div className="mb-10 grid gap-6 lg:grid-cols-12">
            <p className="label-mono text-signal-strong lg:col-span-4">What guides us</p>
            <h2 id="values-heading" className="font-title text-big lg:col-span-8">
              Innovation. Integrity. Ownership.
            </h2>
          </div>
          <ActiveList
            label="Values & strengths"
            showCaption={false}
            dividers={false}
            marker="none"
            sharedRule
            items={[
              ...company.values.map((v) => ({ title: v.name, body: v.note })),
              ...strengths.slice(0, 3).map((s) => ({ title: s.title, body: s.body })),
            ]}
            images={[
              { src: "/images/home/intro.webp", alt: "Stacked containers beneath a gantry crane" },
              { src: "/images/home/story-crane.webp", alt: "Gantry crane lifting a container at night" },
              { src: "/images/services/project-cargo.webp", alt: "Transformer on a modular trailer" },
            ]}
          />
        </div>
      </section>

      <HomeKpis />

      <CtaBand />
    </>
  );
}
