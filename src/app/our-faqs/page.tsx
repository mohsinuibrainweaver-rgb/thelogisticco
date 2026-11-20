import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { MaskLines } from "@/components/motion/MaskLines";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollZoom } from "@/components/motion/ScrollZoom";
import { Accordion } from "@/components/sections/Accordion";
import { Crumbs } from "@/components/sections/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqs } from "@/content/faqs";
import { contact, offices } from "@/content/site";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FAQ — Shipping, Customs Clearance & Quotes",
  description:
    "Answers to common questions about delivery times, documentation, tracking, door-to-door delivery, project cargo, insurance, customs clearance and rates.",
  path: "/our-faqs/",
  image: { src: "/images/faq/hero.webp", alt: "Close-up of weathered shipping container doors" },
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "FAQ", href: "/our-faqs/" }])} />

      {/* Centred type hero (Go Uncharted "Questions, answered") */}
      <section className="shell pb-16 pt-36 text-center sm:pt-44 lg:pt-52">
        <Reveal immediate delay={0.1} className="flex justify-center">
          <Crumbs items={[{ name: "Home", href: "/" }, { name: "FAQ" }]} />
        </Reveal>
        <p className="label-mono mt-12 flex items-center justify-center gap-3 text-stone">
          <span aria-hidden className="h-px w-6 bg-ink" /> Before you ship
        </p>
        <MaskLines as="h1" immediate delay={0.2} lines={["Questions, answered"]} className="font-editorial mt-6 text-[clamp(3rem,8vw,8rem)]" />
        <Reveal immediate delay={0.5} as="p" className="mx-auto mt-6 max-w-xl text-lg text-stone">
          Frequently asked questions from our support team on shipping, documentation, customs and quotes.
        </Reveal>
      </section>

      <ScrollZoom className="mx-[clamp(1rem,2.4vw,2.25rem)] aspect-[2/1] rounded-[8px] sm:aspect-[21/6]">
        <Image src="/images/faq/hero.webp" alt="Close-up of weathered container doors in muted red, blue and grey" fill priority sizes="100vw" className="object-cover" />
      </ScrollZoom>

      <section aria-label="All questions" className="section-y">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Accordion items={faqs} />
          </div>
          <aside className="lg:col-span-4">
            <div className="rounded-[8px] bg-paper-2 p-8 lg:sticky lg:top-40">
              <p className="label-mono text-stone">— Still unsure?</p>
              <h2 className="font-title mt-5 text-[clamp(2rem,3vw,2.75rem)]">Ask our team directly.</h2>
              <p className="mt-4 text-stone">We answer by phone, email or WhatsApp.</p>
              <ul className="mt-6 space-y-2 border-t border-line pt-6">
                <li>
                  <a href={`mailto:${contact.email}`} className="link-line font-medium">
                    {contact.email}
                  </a>
                </li>
                {offices.map((o) => (
                  <li key={o.city}>
                    <a href={o.phone.href} className="link-line">
                      {o.city} · {o.phone.display}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-2.5">
                <ButtonLink href="/contact/">Request a quote</ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
