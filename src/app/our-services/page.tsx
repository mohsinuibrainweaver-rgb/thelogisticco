import { MaskLines } from "@/components/motion/MaskLines";
import { Reveal } from "@/components/motion/Reveal";
import { ShipCrossing } from "@/components/motion/ShipCrossing";
import { ImageHero } from "@/components/sections/ImageHero";
import { ServiceCard } from "@/components/sections/ServiceCard";
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
  const [air, sea, road, project, customs] = services;
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/our-services/" }])} />

      <ImageHero
        image={{ src: "/images/home/global.webp", alt: "Aerial view of a container terminal with a ship at the quay" }}
        crumbs={[{ name: "Home", href: "/" }, { name: "Services" }]}
        label="Services — Five modes, one partner"
        lines={["Every mode.", "One partner."]}
        aside={<p>From airport-to-airport air freight to break bulk and same-day customs clearance, planned and documented by one team.</p>}
        meta={[
          { k: "Air", v: `${air.subServices.length} services` },
          { k: "Sea", v: `${sea.subServices.length} services` },
          { k: "Road", v: `${road.subServices.length} services` },
          { k: "Project", v: `${project.subServices.length} services` },
          { k: "Customs", v: `${customs.subServices.length} services`, wide: true },
        ]}
      />

      <section aria-labelledby="svc-heading" className="section-y">
        <div className="shell">
          <div className="mb-14 grid gap-6 lg:grid-cols-12">
            <p className="label-mono text-stone lg:col-span-4">— Our services</p>
            <MaskLines as="h2" id="svc-heading" lines={["Five ways to move cargo"]} className="font-title text-big lg:col-span-8" />
          </div>
          <div className="grid gap-x-6 gap-y-16 lg:grid-cols-12 lg:gap-y-24">
            <Reveal className="lg:col-span-12">
              <ServiceCard service={air} ratio="aspect-[4/3] sm:aspect-[21/9]" sizes="100vw" chipsAlign="left" headingLevel="h3" />
            </Reveal>
            <Reveal className="lg:col-span-6">
              <ServiceCard service={sea} ratio="aspect-[4/5]" sizes="(min-width: 1024px) 50vw, 100vw" />
            </Reveal>
            <Reveal className="lg:col-span-6 lg:mt-32" delay={0.1}>
              <ServiceCard service={road} ratio="aspect-[4/5]" sizes="(min-width: 1024px) 50vw, 100vw" chipsAlign="left" />
            </Reveal>
            <Reveal className="lg:col-span-7">
              <ServiceCard service={project} ratio="aspect-[4/3]" sizes="(min-width: 1024px) 58vw, 100vw" />
            </Reveal>
            <Reveal className="lg:col-span-5 lg:mt-40" delay={0.1}>
              <ServiceCard service={customs} ratio="aspect-[4/5]" sizes="(min-width: 1024px) 42vw, 100vw" chipsAlign="left" />
            </Reveal>
          </div>
        </div>
      </section>

      <ShipCrossing label="— Door to door" title={<>From quay to door, cleared.</>} />
    </>
  );
}
