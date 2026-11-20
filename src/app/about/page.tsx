import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { MaskLines } from "@/components/motion/MaskLines";
import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { WordReveal } from "@/components/motion/WordReveal";
import { ImageHero } from "@/components/sections/ImageHero";
import { ActiveList } from "@/components/sections/ActiveList";
import { MembershipMarquee, StatsBand } from "@/components/sections/Shared";
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

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "About", href: "/about/" }])} />

      <ImageHero
        image={{ src: "/images/about/hero.webp", alt: "Port cranes and a moored container ship silhouetted at dawn" }}
        crumbs={[{ name: "Home", href: "/" }, { name: "About" }]}
        label="About — The Logistic Company"
        lines={["Twenty years", "of moving", "what matters."]}
        aside={<p>Freight forwarding, customs clearance and logistics: a local team of supply chain experts across Pakistan and the UAE.</p>}
        meta={[
          { k: "Experience", v: "20+ years" },
          { k: "Countries", v: "30+" },
          { k: "Associates", v: "80+" },
          { k: "Offices", v: "Lahore · Dubai" },
          { k: "Values", v: "Innovation, integrity and ownership: the guiding pillars of our operations.", wide: true },
        ]}
      />

      {/* Manifesto */}
      <section aria-labelledby="story-heading" className="section-y">
        <div className="shell">
          <p className="label-mono mb-8 text-stone">— Our story</p>
          <WordReveal
            as="h2"
            id="story-heading"
            text="Leaders in worldwide freight and logistics, backed by strong customs clearance services"
            muted="and a legacy that has stood the test of time."
            className="font-editorial text-lead max-w-[26ch]"
          />
          <Reveal className="mt-14 grid gap-8 text-lg text-stone md:grid-cols-2" stagger={0.1}>
            <p>
              At The Logistic Company, we play a vital role in shaping the national freight forwarding and logistics industry. At our core lies a straightforward, impactful mission: to deliver unparalleled global freight forwarding services.
            </p>
            <p>
              Our vision goes beyond the conventional: to be your preferred partner through innovative and sustainable solutions, delivered with a customer-centric approach by a team that genuinely cares and owns its commitments.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission / Vision */}
      <section aria-label="Mission and vision" className="pb-24 sm:pb-36">
        <div className="shell grid gap-6 lg:grid-cols-12">
          <RevealImage className="aspect-[4/5] lg:col-span-5" parallax={6}>
            <Image src="/images/about/operations.webp" alt="Logistics professionals reviewing a plan on a container terminal quay (illustrative)" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </RevealImage>
          <div className="flex flex-col justify-end gap-6 lg:col-span-7 lg:pl-10">
            {[
              { k: "Mission", v: company.mission },
              { k: "Vision", v: company.vision },
            ].map((x) => (
              <Reveal key={x.k} className="rounded-[8px] bg-paper-2 p-8 sm:p-10">
                <p className="label-mono text-signal-deep">{x.k}</p>
                <p className="font-editorial mt-5 text-[clamp(1.6rem,2.6vw,2.4rem)]">{x.v}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <MembershipMarquee className="pb-24 sm:pb-32" />

      {/* Values */}
      <section aria-labelledby="values-heading" className="bg-paper-2 section-y">
        <div className="shell">
          <div className="mb-10 grid gap-6 lg:grid-cols-12">
            <p className="label-mono text-stone lg:col-span-4">— What guides us</p>
            <MaskLines as="h2" id="values-heading" lines={["Innovation. Integrity.", "Ownership."]} className="font-title text-big lg:col-span-8" />
          </div>
          <ActiveList
            label="Values & strengths"
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

      {/* Numbers */}
      <section aria-labelledby="numbers-heading" className="section-y">
        <div className="shell">
          <p className="label-mono text-stone">— By the numbers</p>
          <h2 id="numbers-heading" className="font-title text-big mb-14 mt-5">
            Celebrating excellence in logistics.
          </h2>
          <StatsBand />
          <div className="mt-16">
            <ButtonLink href="/our-services/">Explore our services</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
