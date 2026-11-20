import Image from "next/image";
import { CountUp } from "@/components/motion/CountUp";
import { memberships, stats } from "@/content/site";
import { cn } from "@/lib/cn";

/** Verified figures on hairline rules. */
export function StatsBand({ tone = "paper" }: { tone?: "paper" | "ink" }) {
  const dark = tone === "ink";
  return (
    <dl className={cn("grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4", dark && "text-paper")}>
      {stats.map((s) => (
        <div key={s.label} className={cn("flex flex-col border-t pt-5", dark ? "border-line-dark" : "border-ink/20")}>
          <dt className={cn("label-mono order-2 mt-3", dark ? "text-paper/70" : "text-stone")}>{s.label}</dt>
          <dd className="font-title text-[clamp(3.5rem,7vw,6.5rem)] leading-none">
            <CountUp value={s.value} suffix={s.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Global association memberships — the original website's logos (full colour, transparent) on
 * white cards in a slow marquee that pauses on hover. Header follows the editorial section style.
 */
export function MembershipMarquee({ className }: { className?: string }) {
  const count = String(memberships.length).padStart(2, "0");
  // Logo-only cards, like the original website. Generous vertical padding inside the marquee so the soft
  // shadow and the hover lift are never clipped by the marquee's overflow edge.
  const cards = (hidden: boolean) => (
    <ul className="marquee-track gap-4 py-10 pr-4 sm:gap-5 sm:pr-5" aria-hidden={hidden || undefined}>
      {memberships.map((m) => (
        <li
          key={m.name}
          className="group relative grid h-40 w-[15.5rem] shrink-0 place-items-center overflow-hidden rounded-2xl bg-white px-8 shadow-[0_12px_32px_-18px_rgb(18_21_29/0.22)] ring-1 ring-ink/[0.05] transition-shadow duration-500 ease-[var(--ease-expo)] hover:shadow-[0_18px_38px_-18px_rgb(18_21_29/0.3)] sm:h-44 sm:w-[19rem]"
        >
          {/* signal hairline that draws in on hover */}
          <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-signal transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-x-100" />
          <Image
            src={m.logo}
            alt={hidden ? "" : `${m.name} logo`}
            width={m.w}
            height={m.h}
            sizes="(min-width: 640px) 230px, 190px"
            className="max-h-[6.25rem] w-auto max-w-full object-contain transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-[1.1] sm:max-h-28"
          />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-labelledby="memberships-title" className={cn("relative py-6", className)}>
      <div className="shell mb-8 grid items-end gap-6 sm:mb-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="label-mono text-signal-strong">Memberships</p>
          <h2 id="memberships-title" className="font-title mt-4 text-[clamp(2.1rem,4.2vw,3.9rem)]">
            Global association
            <br className="hidden sm:block" /> memberships
          </h2>
        </div>
        <div className="flex items-end gap-5 md:col-span-5 md:justify-end">
          {/* counts 1 → 7 (the leading 0 is fixed) every time the section comes into view */}
          <p className="font-title text-[clamp(3.5rem,6vw,5.5rem)] leading-[0.8] text-signal-strong" aria-label={count}>
            <span aria-hidden>0</span>
            <CountUp value={memberships.length} start={1} ease="power2.out" duration={0.8} replay />
          </p>
          <p className="label-mono max-w-[13rem] pb-1 text-stone">International freight &amp; logistics networks and associations</p>
        </div>
      </div>
      <div className="marquee -my-3" style={{ ["--marquee-duration" as string]: "42s" }}>
        {cards(false)}
        {cards(true)}
      </div>
    </section>
  );
}
