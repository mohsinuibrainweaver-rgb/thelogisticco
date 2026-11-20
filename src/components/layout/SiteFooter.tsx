import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { MaskLines } from "@/components/motion/MaskLines";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollZoom } from "@/components/motion/ScrollZoom";
import { company, contact, offices, nav } from "@/content/site";
import { services } from "@/content/services";

/** Closing CTA and footer set over one full-bleed photograph (Go Uncharted pattern). */
export function SiteFooter() {
  return (
    <footer className="on-ink relative isolate overflow-hidden bg-ink text-paper">
      <ScrollZoom className="!absolute inset-0 -z-20" from={1.12}>
        <Image src="/images/home/cta.webp" alt="" fill sizes="100vw" className="object-cover" />
      </ScrollZoom>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/55 via-ink/45 to-ink/95" />

      <div className="shell flex min-h-[78svh] flex-col items-center justify-center py-28 text-center sm:min-h-[86svh]">
        <p className="label-mono text-paper/75">Request a quote</p>
        <MaskLines as="h2" lines={["Your next shipment", "starts here"]} className="font-title mt-6 text-[clamp(2.6rem,6vw,6rem)]" />
        <Reveal as="p" className="mt-6 max-w-lg text-lg text-paper/80">
          Tell us what you&rsquo;re moving, from where and roughly when. Our team in Lahore or Dubai will reply with a route and a quote.
        </Reveal>
        <Reveal className="mt-9 flex flex-wrap justify-center gap-3" delay={0.1}>
          <ButtonLink href="/contact/" variant="light">
            Request a quote
          </ButtonLink>
          <ButtonLink href={contact.whatsapp.href} variant="outline" className="text-paper">
            WhatsApp us
          </ButtonLink>
        </Reveal>
      </div>

      <div className="shell pb-8">
        <div className="grid gap-12 border-t border-white/15 pt-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo tone="white" className="h-12" />
            <p className="mt-5 max-w-sm text-paper/75">{company.summary}</p>
            <p className="label-mono mt-6 flex flex-wrap gap-x-5 gap-y-2 text-paper/85">
              <a href={`mailto:${contact.email}`} className="link-line">
                Email
              </a>
              <a href={contact.whatsapp.href} target="_blank" rel="noopener noreferrer" className="link-line">
                WhatsApp
              </a>
              {offices.map((o) => (
                <a key={o.city} href={o.phone.href} className="link-line">
                  Call {o.city}
                </a>
              ))}
            </p>
          </div>
          <nav aria-label="Footer — navigation" className="md:col-span-2">
            <p className="label-mono mb-4 text-paper/60">Navigation</p>
            <ul className="space-y-2">
              {nav.primary.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="link-line text-paper/85 hover:text-paper">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Footer — services" className="md:col-span-3">
            <p className="label-mono mb-4 text-paper/60">Services</p>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={s.href} className="link-line text-paper/85 hover:text-paper">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-2">
            <p className="label-mono mb-4 text-paper/60">Offices</p>
            <ul className="space-y-3 text-paper/85">
              {offices.map((o) => (
                <li key={o.city}>
                  <span className="block">
                    {o.city}, {o.code}
                  </span>
                  <a href={o.phone.href} className="link-line text-sm text-paper/70">
                    {o.phone.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="label-mono mt-12 flex flex-col gap-2 text-paper/60 sm:flex-row sm:justify-between">
          <p>© {company.name} — Lahore · Dubai</p>
          <p>Freight forwarding · Customs clearance · Logistics</p>
        </div>
      </div>
    </footer>
  );
}
