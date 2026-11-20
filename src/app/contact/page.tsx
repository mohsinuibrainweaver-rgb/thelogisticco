import Image from "next/image";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaskLines } from "@/components/motion/MaskLines";
import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { Crumbs } from "@/components/sections/PageIntro";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { contact, offices } from "@/content/site";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact & Get a Quote — Lahore and Dubai Offices",
  description:
    "Request a freight or customs clearance quote. Contact The Logistic Company in Lahore (+92 300 849 3977) or Dubai (+971 4 266 6476), or email sajid@thelogisticco.com.",
  path: "/contact/",
  image: { src: "/images/contact/hero.webp", alt: "Truck light trails at a port road at night" },
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Contact", href: "/contact/" }])} />

      {/* Split hero: type + offices / image */}
      <section className="grid lg:min-h-[100svh] lg:grid-cols-12">
        <div className="shell flex flex-col justify-between gap-14 pb-14 pt-32 lg:col-span-7 lg:pb-16 lg:pt-48">
          <div>
            <Reveal immediate delay={0.1}>
              <Crumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />
            </Reveal>
            <MaskLines
              as="h1"
              immediate
              delay={0.2}
              lines={["Let's talk", <span key="f" className="text-stone">freight.</span>]}
              className="font-display text-mega mt-8"
            />
            <Reveal immediate delay={0.6} className="mt-8 max-w-lg text-lg text-stone">
              Get in touch and we&rsquo;ll help your business move. Request a quote, book an appointment or ask our team anything.
            </Reveal>
          </div>

          <Reveal immediate delay={0.75} className="grid gap-10 border-t border-line pt-8 sm:grid-cols-2" stagger={0.1}>
            {offices.map((o) => (
              <address key={o.city} className="not-italic">
                <p className="label-mono text-stone">
                  ({o.code}) — {o.country}
                </p>
                <p className="font-display mt-3 text-5xl">{o.city}</p>
                <p className="mt-3 text-stone">
                  {o.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </p>
                <a href={o.phone.href} className="link-line mt-4 inline-block text-lg font-medium">
                  {o.phone.display}
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-mono mt-3 flex items-center gap-1 text-stone hover:text-ink"
                >
                  Open in Maps <ArrowUpRight aria-hidden className="size-3.5" />
                </a>
              </address>
            ))}
          </Reveal>
        </div>
        <div className="relative min-h-[60svh] lg:col-span-5 lg:min-h-0">
          <RevealImage immediate delay={0.2} className="absolute inset-0">
            <Image src="/images/contact/hero.webp" alt="Truck light trails on a port road at night with cranes beyond" fill priority sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover object-[30%_50%]" />
          </RevealImage>
        </div>
      </section>

      {/* Form + direct channels */}
      <section aria-labelledby="quote-heading" className="bg-paper-2 section-y" id="quote">
        <div className="shell grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel index="01">Get a quote</SectionLabel>
            <h2 id="quote-heading" className="font-display text-big mt-8">
              Book an appointment
            </h2>
            <p className="mt-6 text-lg text-stone">Share your shipment details and the right team member will respond with a quote.</p>

            <ul className="mt-12 divide-y divide-line border-y border-line">
              <li>
                <a href={`mailto:${contact.email}`} className="group flex items-center justify-between gap-4 py-5">
                  <span className="flex items-center gap-4">
                    <Mail aria-hidden className="size-5 text-stone" strokeWidth={1.5} />
                    <span>
                      <span className="label-mono block text-stone">Email</span>
                      <span className="font-medium">{contact.email}</span>
                    </span>
                  </span>
                  <ArrowUpRight aria-hidden className="size-5 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.5} />
                </a>
              </li>
              <li>
                <a href={contact.whatsapp.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-5">
                  <span className="flex items-center gap-4">
                    <MessageCircle aria-hidden className="size-5 text-stone" strokeWidth={1.5} />
                    <span>
                      <span className="label-mono block text-stone">WhatsApp</span>
                      <span className="font-medium">{contact.whatsapp.display}</span>
                    </span>
                  </span>
                  <ArrowUpRight aria-hidden className="size-5 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.5} />
                </a>
              </li>
            </ul>
          </div>
          <div className="relative lg:col-span-7 lg:col-start-6">
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
