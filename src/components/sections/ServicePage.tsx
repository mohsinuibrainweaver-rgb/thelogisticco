import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ActiveList } from "@/components/sections/ActiveList";
import { CtaBand, SectionHead, ServiceTile } from "@/components/sections/inner";
import { PageHero } from "@/components/sections/PageHero";
import { StatementReveal } from "@/components/sections/StatementReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { services, type Service } from "@/content/services";
import { contact } from "@/content/site";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

export function ServicePage({ service: s }: { service: Service }) {
  const others = services.filter((x) => x.slug !== s.slug);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/our-services/" },
    { name: s.name, href: s.href },
  ];
  const doorToDoor = s.subServices.some((x) => x.title === "Door to Door");

  return (
    <>
      <JsonLd data={serviceSchema(s)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHero
        layout="split"
        crumbs={[...crumbs.slice(0, 2), { name: s.name }]}
        label={`Service ${s.index} / 05 · ${s.mode}`}
        lines={s.headline.map((l) => l)}
        description={<p>{s.tagline} {s.short}</p>}
        actions={
          <>
            <ButtonLink href="/contact/">Request a quote</ButtonLink>
            <ButtonLink href={contact.whatsapp.href} variant="outline">
              WhatsApp our team
            </ButtonLink>
          </>
        }
        photo={s.photo}
        chips={[`${s.subServices.length} services`, "Pakistan ⇄ UAE", doorToDoor ? "Door to door available" : "Door to door on request"]}
      />

      {/* Overview */}
      <section aria-labelledby="svc-intro" className="py-12 sm:py-16">
        <div className="shell">
          <p className="label-mono text-center text-signal-strong">Overview</p>
          <StatementReveal id="svc-intro" text={s.intro} className="mx-auto mt-6 max-w-[56rem] text-center text-[clamp(1.7rem,3vw,2.7rem)]" />
        </div>
      </section>

      {/* What we offer */}
      <section aria-labelledby="offer-heading" className="bg-paper-2 py-20 sm:py-28">
        <div className="shell">
          <div className="mb-10 grid gap-6 lg:grid-cols-12">
            <p className="label-mono text-signal-strong lg:col-span-4">What we offer</p>
            <h2 id="offer-heading" className="font-title text-big lg:col-span-8">
              {s.subServices.length} ways to ship with us.
            </h2>
          </div>
          <ActiveList
            label={s.name}
            showCaption={false}
            dividers={false}
            marker="none"
            sharedRule
            items={s.subServices.map((x) => ({ title: x.title, body: x.body }))}
            images={[{ src: s.detailImage.src, alt: s.detailImage.alt }]}
          />
        </div>
      </section>

      {/* How it works — closing statement (no unverified process steps) */}
      <CtaBand
        label="How it works"
        lines={["Tell us what you’re moving."]}
        text={
          <>
            We’ll come back with the route and a quote. {s.closing}
          </>
        }
        actions={
          <>
            <ButtonLink href="/contact/" variant="light">
              Request a quote
            </ButtonLink>
            <ButtonLink href={contact.whatsapp.href} variant="outline" className="text-paper">
              WhatsApp our team
            </ButtonLink>
          </>
        }
      />

      {/* Other services */}
      <section aria-labelledby="more-heading" className="py-12 sm:py-16">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead label="Explore more" id="more-heading" lines={["More ways to move cargo"]} />
            <ButtonLink href="/our-services/">All services</ButtonLink>
          </div>
          <Reveal as="ul" stagger={0.1} y={50} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <li key={o.slug}>
                <ServiceTile service={o} />
              </li>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
