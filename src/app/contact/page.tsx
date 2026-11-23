import { ArrowUpRight, Mail } from "lucide-react";
import { OfficeCards } from "@/components/sections/OfficeCards";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";
import { contact } from "@/content/site";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact & Get a Quote — Lahore and Dubai Offices",
  description:
    "Request a freight or customs clearance quote. Contact The Logistic Company in Lahore (+92 300 849 3977) or Dubai (+971 4 266 6476), or email sajid@thelogisticco.com.",
  path: "/contact/",
  image: { src: "/images/contact/hero.webp", alt: "Truck light trails at a port road at night" },
});

const channel =
  "group flex items-center justify-between gap-4 rounded-[18px] bg-white p-5 shadow-[0_22px_44px_-34px_rgba(18,21,29,0.3)] ring-1 ring-ink/[0.06] transition-[transform,box-shadow] duration-500 ease-[var(--ease-expo)] hover:-translate-y-0.5 hover:ring-ink/15";

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Contact", href: "/contact/" }])} />

      <PageHero
        layout="text"
        crumbs={[{ name: "Home", href: "/" }, { name: "Contact" }]}
        label="Get in touch"
        lines={["Let’s talk freight."]}
        description="Get in touch and we’ll help your business move. Request a quote, book an appointment or ask our team anything."
      />

      <section aria-labelledby="quote-heading" id="quote" className="py-12 sm:py-16">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <p className="label-mono text-signal-strong">Get a quote</p>
            <h2 id="quote-heading" className="font-title mt-5 text-[clamp(2.4rem,4.4vw,4rem)] leading-[0.98]">
              Book an appointment
            </h2>
            <p className="mt-6 text-[1.05rem] leading-relaxed text-stone">Share your shipment details and the right team member will respond with a quote.</p>

            <ul className="mt-10 grid gap-3">
              <li>
                <a href={`mailto:${contact.email}`} className={channel}>
                  <span className="flex items-center gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-paper">
                      <Mail aria-hidden className="size-[18px]" strokeWidth={1.6} />
                    </span>
                    <span>
                      <span className="label-mono block text-stone">Email</span>
                      <span className="font-medium">{contact.email}</span>
                    </span>
                  </span>
                  <ArrowUpRight aria-hidden className="size-5 shrink-0 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.5} />
                </a>
              </li>
              <li>
                <a href={contact.whatsapp.href} target="_blank" rel="noopener noreferrer" className={channel}>
                  <span className="flex items-center gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-paper">
                      <WhatsAppGlyph className="size-[18px]" />
                    </span>
                    <span>
                      <span className="label-mono block text-stone">WhatsApp</span>
                      <span className="font-medium">{contact.whatsapp.display}</span>
                    </span>
                  </span>
                  <ArrowUpRight aria-hidden className="size-5 shrink-0 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.5} />
                </a>
              </li>
            </ul>
          </div>
          <div className="relative rounded-[22px] bg-white p-6 shadow-[0_30px_60px_-38px_rgba(18,21,29,0.35)] ring-1 ring-ink/5 sm:p-9 lg:col-span-8">
            <QuoteForm />
          </div>
        </div>
      </section>

      <section aria-label="Our offices" className="pb-12 sm:pb-16">
        <div className="shell">
          <OfficeCards />
        </div>
      </section>
    </>
  );
}
