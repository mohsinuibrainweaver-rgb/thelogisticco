import { ButtonLink } from "@/components/ui/Button";
import { MaskLines } from "@/components/motion/MaskLines";
import { ActiveList } from "@/components/sections/ActiveList";
import { Accordion } from "@/components/sections/Accordion";
import { MembershipMarquee } from "@/components/sections/Shared";
import { strengths } from "@/content/site";
import { faqs } from "@/content/faqs";
import type { Metadata } from "next";
import { LabHero } from "./_components/LabHero";
import { LabAbout } from "./_components/LabAbout";
import { LabHeroFade } from "./_components/LabHeroFade";
import { LabServices } from "./_components/LabServices";
import { LabCrossing } from "./_components/LabCrossing";
import { LabFocus } from "./_components/LabFocus";
import { LabIndustries } from "./_components/LabIndustries";
import { LabKpis } from "./_components/LabKpis";

/**
 * DESIGN LAB — a working copy of the landing page (src/app/page.tsx) for trying new designs.
 * URL: /home-lab/ . It is hidden from search engines (noindex + robots.txt), absent from the
 * sitemap and navigation, and its canonical points at the real homepage.
 *
 * Edit freely here. Note: shared components (ServiceCard, ActiveList, Accordion, header,
 * footer…) are used by both pages. To change one only for the lab, copy it into
 * src/app/home-lab/_components/ and import the copy from this file.
 * When a design is approved, port the changes back into src/app/page.tsx.
 */
export const metadata: Metadata = {
  title: { absolute: "Design Lab — Landing page | The Logistic Co" },
  description: "Internal working copy of the landing page for design experiments.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: "/" },
};

export default function HomeLabPage() {
  return (
    <>
      {/* Lab badge — remove when porting a design back to the live homepage */}
      <div className="pointer-events-none fixed bottom-4 left-1/2 z-40 -translate-x-1/2 sm:bottom-6">
        <p className="label-mono rounded-[6px] bg-signal-strong px-3 py-2 text-white shadow-lg">Design lab · not live</p>
      </div>
      {/* ───────────── Hero (lab variant — see _components/LabHero.tsx) ───────────── */}
      <LabHero />

      {/* ───────────── Memberships: right after the hero; the hero fades into it (see _components/LabHeroFade.tsx) ───────────── */}
      <LabHeroFade>
        <MembershipMarquee className="py-12 sm:py-16" />
      </LabHeroFade>

      {/* ───────────── About us / Our story (lab variant — see _components/LabAbout.tsx) ───────────── */}
      <LabAbout />

      {/* ───────────── Services (stacked cards — see _components/LabServices.tsx) ───────────── */}
      <LabServices />

      {/* ───────────── Shipping worldwide (ship crossing + offices — see _components/LabCrossing.tsx) ───────────── */}
      <LabCrossing />

      {/* ───────────── In focus: custom clearance (see _components/LabFocus.tsx) ───────────── */}
      <LabFocus />

      {/* ───────────── Specialized industries (original images, hover reveal — see _components/LabIndustries.tsx) ───────────── */}
      <LabIndustries />

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

      {/* ───────────── Numbers (KPI strip with hover photos — see _components/LabKpis.tsx) ───────────── */}
      <LabKpis />

      {/* ───────────── FAQ ───────────── */}
      <section aria-labelledby="faq-heading" className="pb-28 pt-12 sm:pb-40 sm:pt-16">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="label-mono text-signal-strong">Before you ship</p>
            <MaskLines as="h2" id="faq-heading" lines={["Questions, answered"]} className="font-editorial mt-5 text-[clamp(2.6rem,5.6vw,5.4rem)]" />
            <p className="mt-4 text-stone">Still not sure? Our team answers by phone, email or WhatsApp.</p>
          </div>
          <div className="mt-14">
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
