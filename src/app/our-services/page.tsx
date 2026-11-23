import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand, SectionHead, ServiceTile } from "@/components/sections/inner";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCrossing } from "@/components/home/HomeCrossing";
import { JsonLd } from "@/components/seo/JsonLd";
import { services } from "@/content/services";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Logistics Services — Air, Sea, Road, Project Cargo & Customs",
  description:
    "Explore The Logistic Company's services: air freight, sea freight, road transport, project and heavy lift cargo, and professional customs clearance across Pakistan and the UAE.",
  path: "/our-services/",
  image: services[1].image,
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/our-services/" }])} />

      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Services" }]}
        label="Our services"
        lines={["Every mode.", "One partner."]}
        description="From airport-to-airport air freight to break bulk and same-day customs clearance, planned and documented by one team."
        actions={
          <>
            <ButtonLink href="/contact/">Request a quote</ButtonLink>
            <ButtonLink href="/about/" variant="outline">
              About us
            </ButtonLink>
          </>
        }
        photo={{ src: "/images/home/global.webp", alt: "Aerial view of a container terminal with a ship at the quay" }}
        chips={services.map((s) => `${s.mode} · ${s.subServices.length} services`)}
      />

      <section aria-labelledby="svc-heading" className="py-12 sm:py-16">
        <div className="shell">
          <SectionHead label="What we do" id="svc-heading" lines={["We are optimists who", "love to work together."]} align="center" />
          <Reveal as="ul" stagger={0.1} y={50} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug}>
                <ServiceTile service={s} />
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <HomeCrossing />

      <CtaBand />
    </>
  );
}
