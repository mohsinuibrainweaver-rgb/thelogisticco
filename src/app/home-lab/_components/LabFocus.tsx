import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollZoom } from "@/components/motion/ScrollZoom";
import { getService } from "@/content/services";

/**
 * DESIGN LAB — "In focus: Custom clearance", built like the reference's product section (nomia-app.framer.website):
 * one big rounded photograph, a small icon label and a two-line headline bottom-left, and a row of frosted-glass
 * cards over the lower part of the picture. Copy is the original website's: the "resilient legacy of customs
 * clearance" line from the About text, and the Custom Clearance page's five sub-services, grouped into three cards.
 * Photo: Higgsfield (scripts/process-lab-images.mjs).
 */
const customs = getService("custom-clearance");

/**
 * Animated line icons (same drawings as the Lucide "file-check", "warehouse" and "timer" icons). Each shape has
 * pathLength="1" so the CSS in globals.css (.ico-draw) can trace it in and out in a loop; the clock hand sweeps.
 */
const svgProps = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

function FileCheckIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps} className={`ico-draw ${className ?? ""}`}>
      <path pathLength={1} d="M10.5 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v6" />
      <path pathLength={1} d="M14 2v5a1 1 0 0 0 1 1h5" />
      <path pathLength={1} d="m14 20 2 2 4-4" />
    </svg>
  );
}

function WarehouseIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps} className={`ico-draw ${className ?? ""}`}>
      <path pathLength={1} d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z" />
      <path pathLength={1} d="M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11" />
      <path pathLength={1} d="M6 13h12" />
      <path pathLength={1} d="M6 17h12" />
    </svg>
  );
}

function TimerIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps} className={`ico-draw ${className ?? ""}`}>
      <line pathLength={1} x1="10" x2="14" y1="2" y2="2" />
      <circle pathLength={1} cx="12" cy="14" r="8" />
      {/* the hand sweeps around the dial; its outline is drawn in as well */}
      <g className="ico-hand">
        <line pathLength={1} x1="12" x2="15" y1="14" y2="11" />
      </g>
    </svg>
  );
}

/** The five original sub-services (Import / Export declarations, Bonded stocks, Customs warehousing & SRO, Same-day) in three cards. */
const CARDS: Array<{ icon: (p: { className?: string }) => React.JSX.Element; title: string; text: string }> = [
  {
    icon: FileCheckIcon,
    title: "Import & Export Declarations",
    text: "We prepare and submit your declarations and handle the paperwork, so every shipment meets customs requirements.",
  },
  {
    icon: WarehouseIcon,
    title: "Bonded Stocks & SRO Benefits",
    text: "Bonded goods handling and customs warehousing with SRO benefits, including duty deferment.",
  },
  {
    icon: TimerIcon,
    title: "Same Day Clearance and Delivery",
    text: "Urgent shipments are prioritised, so clearance and delivery are fast and delays are kept to a minimum.",
  },
];

export function LabFocus() {
  return (
    <section aria-labelledby="lab-focus-title" className="py-12 sm:py-16">
      <div className="shell">
        <div className="on-ink relative isolate overflow-hidden rounded-[20px] bg-ink text-paper shadow-[0_40px_80px_-40px_rgba(18,21,29,0.55)] sm:rounded-[24px]">
          <ScrollZoom className="!absolute inset-0 -z-20" from={1.08}>
            <Image
              src="/images/services/customs-focus.webp"
              alt="A customs and logistics professional in a hi-vis vest and hard hat, holding a tablet and looking out over a container terminal at sunset"
              fill
              quality={85}
              sizes="(min-width: 1600px) 1500px, 96vw"
              className="object-cover [object-position:68%_50%]"
            />
          </ScrollZoom>
          {/* keeps the headline and the glass cards readable without dulling the photo */}
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/35 via-transparent to-transparent" />

          <div className="flex min-h-[40rem] flex-col justify-end p-5 pt-40 sm:min-h-[43rem] sm:p-8 lg:p-10">
            <div className="mb-8 sm:mb-10">
              <p className="flex items-center gap-2.5 text-[0.95rem] font-medium text-signal">
                <ShieldCheck aria-hidden className="size-5" strokeWidth={1.6} />
                In focus · Custom clearance · Pakistan &amp; UAE
              </p>
              <h2 id="lab-focus-title" className="font-title mt-5 max-w-[18ch] text-[clamp(2.1rem,4vw,3.6rem)] leading-[1.02]">
                A resilient legacy of customs clearance.
              </h2>
            </div>

            <Reveal as="ul" stagger={0.1} y={30} className="grid gap-3 md:grid-cols-3 md:gap-4">
              {CARDS.map(({ icon: Icon, title, text }) => (
                <li key={title}>
                  <Link
                    href={customs.href}
                    className="group flex h-full min-h-[11.5rem] flex-col rounded-2xl bg-white/[0.07] p-5 ring-1 ring-white/25 backdrop-blur-xl transition-[background-color,transform,box-shadow] duration-500 ease-[var(--ease-expo)] hover:-translate-y-1 hover:bg-white/[0.13] hover:ring-white/40 sm:p-6"
                  >
                    <Icon className="size-8 text-paper transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-110" />
                    <span className="mt-auto pt-8 text-[1.2rem] font-semibold tracking-[-0.02em]">{title}</span>
                    <span className="mt-2 max-w-[34ch] text-[0.98rem] leading-snug text-paper/85">{text}</span>
                  </Link>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
