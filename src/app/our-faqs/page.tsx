import { ButtonLink } from "@/components/ui/Button";
import { Accordion } from "@/components/sections/Accordion";
import { PageHero } from "@/components/sections/PageHero";
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

      <PageHero
        layout="text"
        crumbs={[{ name: "Home", href: "/" }, { name: "FAQ" }]}
        label="Before you ship"
        lines={["Questions, answered"]}
        description="Frequently asked questions from our support team on shipping, documentation, customs and quotes."
      />

      <section aria-label="All questions" className="py-12 sm:py-16">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Accordion items={faqs} staircase showNumbers={false} />
          </div>
          <aside className="lg:col-span-4">
            <div className="rounded-[22px] bg-white p-7 shadow-[0_26px_54px_-36px_rgba(18,21,29,0.3)] ring-1 ring-ink/5 sm:p-8 lg:sticky lg:top-40">
              <p className="label-mono text-signal-strong">Still unsure?</p>
              <h2 className="font-title mt-5 text-[clamp(2rem,3vw,2.6rem)] leading-[1]">Ask our team directly.</h2>
              <p className="mt-4 text-stone">We answer by phone, email or WhatsApp.</p>
              <ul className="mt-6 space-y-2.5 border-t border-ink/10 pt-6">
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
