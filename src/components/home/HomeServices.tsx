"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, Container, Plane, Ship, Stamp, Truck, type LucideIcon } from "lucide-react";
import { gsap, useGSAP, MOTION_OK, claim } from "@/components/motion/gsap";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/content/services";

/**
 * "What we do" in the Shelta "stacked service cards" style (shelta.framer.website):
 * a pinned heading on the left, and on the right a column of cards that each stick below the header
 * and get covered by the next one as you scroll. Copy and images come from the original website
 * (homepage "What We Do" section + the original service-page banners).
 */

/** Original homepage: "What We Do" → heading, button, and the five service cards (title + one-line text). */
const LABEL = "What we do";
const HEADING = "We are optimists who love to work together.";

/** Card titles and one-liners exactly as on the original homepage (Air Freight's line is cut off there, so the full sentence comes from its service page). */
const COPY: Record<string, { title: string; text: string }> = {
  "air-freight": { title: "Air Freight", text: "Reliable air cargo solutions for swift global delivery." },
  "sea-freight": { title: "Sea Freight", text: "Efficient ocean freight services for secure international shipments." },
  "road-transport": { title: "Road Transport", text: "Seamless road logistics ensuring timely deliveries nationwide." },
  "project-heavy-lift-cargo": { title: "Project Cargo", text: "Tailored solutions for safe handling of specialized shipments." },
  "custom-clearance": { title: "Custom Clearance", text: "Expert services for smooth import and export processes." },
};

/** One clean Higgsfield photograph per service (scripts/process-service-photos.mjs). */
const ART: Record<string, { src: string; position: string; alt: string }> = {
  "air-freight": { src: "/images/services/hf-air.webp", position: "50% 50%", alt: "Cargo aircraft with its nose door raised being loaded with palletised cargo at blue hour" },
  "sea-freight": { src: "/images/services/hf-sea.webp", position: "50% 50%", alt: "Container ship at a quay being worked by gantry cranes in golden light" },
  "road-transport": { src: "/images/services/hf-road.webp", position: "50% 50%", alt: "Freight truck pulling a container along an empty highway at sunrise" },
  "project-heavy-lift-cargo": { src: "/images/services/hf-project.webp", position: "50% 50%", alt: "A turbine being lifted by a heavy-lift crane onto a heavy-haul trailer at a quay at dusk" },
  "custom-clearance": { src: "/images/services/hf-customs.webp", position: "50% 50%", alt: "Customs officer checking documents beside an open shipping container in a bonded warehouse" },
};

const MODE_ICON: Record<string, LucideIcon> = {
  "air-freight": Plane,
  "sea-freight": Ship,
  "road-transport": Truck,
  "project-heavy-lift-cargo": Container,
  "custom-clearance": Stamp,
};

export function HomeServices() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      el.querySelectorAll("[data-sv]").forEach(claim);
      const q = (s: string) => Array.from(el.querySelectorAll<HTMLElement>(s));
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        // Heading block
        gsap.from(q("[data-sv='intro']"), {
          y: 36,
          autoAlpha: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 72%", once: true },
        });

        const items = q("[data-sv='item']");
        const cards = q("[data-sv='card']");
        const shades = q("[data-sv='shade']");

        items.forEach((item, i) => {
          const card = cards[i];
          const image = card.querySelector<HTMLElement>("[data-sv='image']");
          const photo = card.querySelector<HTMLElement>("[data-sv='photo']");

          // Photo drifts slowly inside its frame while the card travels up the screen.
          if (photo) {
            gsap.fromTo(photo, { yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: true } });
          }

          // Each card rises into place as it arrives (like the reference: slide up 150px + fade in).
          // (The fade is much quicker than the slide, so a card is solid by the time it overlaps the one below.)
          gsap.from(card, {
            y: 150,
            duration: 1.3,
            ease: "expo.out",
            scrollTrigger: { trigger: item, start: "top 94%", once: true },
          });
          gsap.from(card, { autoAlpha: 0, duration: 0.45, ease: "power1.out", scrollTrigger: { trigger: item, start: "top 94%", once: true } });
          if (image) {
            gsap.from(image, { scale: 1.18, duration: 1.9, ease: "expo.out", scrollTrigger: { trigger: item, start: "top 94%", once: true } });
          }

          // When the next card slides over this one, this one recedes: it shrinks a little and dims.
          const next = items[i + 1];
          if (next) {
            const stickTop = () => parseFloat(getComputedStyle(next).top) || 0;
            const range = { trigger: next, start: "top 96%", end: () => `top ${stickTop()}px`, scrub: true };
            gsap.to(card, { scale: 0.93, ease: "none", scrollTrigger: range });
            gsap.to(shades[i], { opacity: 0.22, ease: "none", scrollTrigger: range });
          }
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="services" aria-labelledby="lab-services-title" className="relative pb-20 pt-16 sm:pb-32 sm:pt-24">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Pinned heading */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-52">
            <p data-sv="intro" className="label-mono text-signal-strong">
              {LABEL}
            </p>
            <h2 id="lab-services-title" data-sv="intro" className="font-title mt-5 max-w-[14ch] text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.98]">
              {HEADING}
            </h2>
            <div data-sv="intro" className="mt-9">
              <ButtonLink href="/our-services/">More services</ButtonLink>
            </div>
          </div>
        </div>

        {/* Stacking cards */}
        <ol className="flex flex-col gap-6 lg:col-span-8 lg:gap-8">
          {services.map((s, i) => {
            const art = ART[s.slug];
            const copy = COPY[s.slug];
            const MIcon = MODE_ICON[s.slug];
            return (
              <li
                key={s.slug}
                data-sv="item"
                // Each card sticks a few pixels lower than the one before, so the edges of the cards underneath
                // stay visible — the stack reads as a deck.
                className="sticky top-[calc(7.75rem+var(--sv-i)*0.55rem)] lg:top-[calc(13rem+var(--sv-i)*0.7rem)]"
                style={{ zIndex: i + 1, ["--sv-i" as string]: i }}
              >
                <article
                  data-sv="card"
                  className="group relative grid origin-top overflow-hidden rounded-[10px] bg-white ring-1 ring-ink/[0.06] shadow-[0_26px_54px_-32px_rgba(18,21,29,0.45)] md:min-h-[28rem] md:grid-cols-[1.08fr_1fr]"
                >
                  <div className="relative order-2 flex flex-col justify-between gap-10 p-6 sm:p-8 md:order-1">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-xl font-medium tracking-[-0.02em]">({s.index})</p>
                      <p className="inline-flex items-center gap-2 rounded-full bg-paper px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-ink/75 ring-1 ring-ink/10">
                        <MIcon aria-hidden className="size-3.5" strokeWidth={1.75} />
                        {s.mode}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-title text-[clamp(1.9rem,3.2vw,3rem)]">{copy.title}</h3>
                      <p className="mt-4 max-w-[30ch] text-[1.02rem] leading-snug text-stone">{copy.text}</p>
                      {/* What's inside — the first sub-services from the original service page */}
                      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${copy.title} includes`}>
                        {s.subServices.slice(0, 3).map((sub) => (
                          <li key={sub.title} className="rounded-full bg-ink/[0.06] px-3 py-1 text-[0.78rem] font-medium text-ink/70">
                            {sub.title}
                          </li>
                        ))}
                        {s.subServices.length > 3 && (
                          <li className="rounded-full px-1.5 py-1 text-[0.78rem] font-medium text-stone">+{s.subServices.length - 3} more</li>
                        )}
                      </ul>
                      <Link href={s.href} className="mt-7 inline-flex items-center gap-3 text-sm font-medium after:absolute after:inset-0 after:content-['']">
                        Get started
                        <span
                          aria-hidden
                          className="grid size-9 place-items-center rounded-full bg-ink text-paper transition-[background-color,transform] duration-500 ease-[var(--ease-expo)] group-hover:rotate-45 group-hover:bg-signal-strong"
                        >
                          <ArrowRight className="size-4" strokeWidth={1.75} />
                        </span>
                        <span className="sr-only"> with {copy.title}</span>
                      </Link>
                    </div>
                  </div>

                  <div className="relative order-1 aspect-[16/10] overflow-hidden md:order-2 md:aspect-auto">
                    <div data-sv="image" className="absolute inset-0 will-change-transform">
                      {/* taller than its frame so it can drift without showing an edge */}
                      <div data-sv="photo" className="absolute -inset-y-[7%] inset-x-0 will-change-transform">
                        <Image
                          src={art.src}
                          alt={art.alt}
                          fill
                          quality={85}
                          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 92vw"
                          className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-[1.06]"
                          style={{ objectPosition: art.position }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dims this card while the next one covers it */}
                  <span aria-hidden data-sv="shade" className="pointer-events-none absolute inset-0 z-10 bg-ink opacity-0" />
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
