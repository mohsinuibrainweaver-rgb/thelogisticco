import { ButtonLink } from "@/components/ui/Button";
import { MaskLines } from "@/components/motion/MaskLines";
import { ActiveList } from "@/components/sections/ActiveList";
import { Accordion } from "@/components/sections/Accordion";
import { MembershipMarquee } from "@/components/sections/Shared";
import { strengths } from "@/content/site";
import { faqs } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeAbout } from "@/components/home/HomeAbout";
import { HomeHeroFade } from "@/components/home/HomeHeroFade";
import { HomeServices } from "@/components/home/HomeServices";
import { HomeCrossing } from "@/components/home/HomeCrossing";
import { HomeFocus } from "@/components/home/HomeFocus";
import { HomeIndustries } from "@/components/home/HomeIndustries";
import { HomeKpis } from "@/components/home/HomeKpis";

export const metadata = pageMetadata({
  title: "The Logistic Company — Freight Forwarding & Customs | Pakistan & UAE",
  absoluteTitle: true,
  description:
    "Freight forwarding, customs clearance and logistics across Pakistan and the UAE. Air freight, sea freight, road transport and project cargo from offices in Lahore and Dubai.",
  path: "/",
  image: { src: "/images/home/hero.webp", alt: "Container ship entering a commercial port at dusk" },
});

export default function HomePage() {
  return (
    <>
      {/* ───────────── Hero  ───────────── */}
      <HomeHero />

      {/* ───────────── Memberships: right after the hero; the hero fades into it (see components/home/HomeHeroFade.tsx) ───────────── */}
      <HomeHeroFade>
        <MembershipMarquee className="py-12 sm:py-16" />
      </HomeHeroFade>

      {/* ───────────── About us / Our story  ───────────── */}
      <HomeAbout />

      {/* ───────────── Services (stacked cards — see components/home/HomeServices.tsx) ───────────── */}
      <HomeServices />

      {/* ───────────── Shipping worldwide (ship crossing + offices — see components/home/HomeCrossing.tsx) ───────────── */}
      <HomeCrossing />

      {/* ───────────── In focus: custom clearance (see components/home/HomeFocus.tsx) ───────────── */}
      <HomeFocus />

      {/* ───────────── Specialized industries (original images, hover reveal — see components/home/HomeIndustries.tsx) ───────────── */}
      <HomeIndustries />

      {/* ───────────── Why TLC (active-on-scroll list) ───────────── */}
      <section aria-labelledby="why-heading" className="bg-paper-2 section-y">
        <div className="shell">
          <div className="mb-10 grid gap-6 lg:grid-cols-12">
            <p className="label-mono text-signal-strong lg:col-span-4">Why TLC</p>
            <MaskLines as="h2" id="why-heading" lines={["Built on ownership."]} className="font-title text-big lg:col-span-8" />
          </div>
          <ActiveList
            label="Why TLC"
            showCaption={false}
            dividers={false}
            marker="none"
            sharedRule
            items={strengths.map((s) => ({ title: s.title, body: s.body }))}
            images={[
              { src: "/images/home/story-sea.webp", alt: "Container vessel crossing open ocean" },
              { src: "/images/home/story-crane.webp", alt: "Gantry crane lifting a container at night" },
              { src: "/images/services/road-transport.webp", alt: "Truck hauling a container at sunrise" },
              { src: "/images/services/customs-clearance-detail.webp", alt: "Bonded warehouse aisle" },
            ]}
          />
        </div>
      </section>

      {/* ───────────── Numbers (KPI strip with hover photos — see components/home/HomeKpis.tsx) ───────────── */}
      <HomeKpis />

      {/* ───────────── FAQ ───────────── */}
      <section aria-labelledby="faq-heading" className="pb-28 pt-12 sm:pb-40 sm:pt-16">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="label-mono text-signal-strong">Before you ship</p>
            <MaskLines as="h2" id="faq-heading" lines={["Questions, answered"]} className="font-editorial mt-5 text-[clamp(2.6rem,5.6vw,5.4rem)]" />
            <p className="mt-4 text-stone">Still not sure? Our team answers by phone, email or WhatsApp.</p>
          </div>
          <div className="mx-auto mt-14 max-w-4xl">
            <Accordion items={faqs.slice(0, 5)} staircase showNumbers={false} />
            <div className="mt-10 text-center">
              <ButtonLink href="/our-faqs/" variant="outline">
                All questions
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
