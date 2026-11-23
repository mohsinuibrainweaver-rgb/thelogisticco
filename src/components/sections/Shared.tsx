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
 * Global association memberships — the original website's logos (transparent, no card behind them) in a slow
 * marquee. Logos are small and grey; the one under the pointer (or keyboard focus) turns to its full colour.
 * The marquee pauses while the pointer is over it, so a logo can be pointed at.
 */
export function MembershipMarquee({ className }: { className?: string }) {
  const count = String(memberships.length).padStart(2, "0");
  const cards = (hidden: boolean) => (
    <ul className="marquee-track items-center gap-14 py-4 pr-14 sm:gap-20 sm:pr-20" aria-hidden={hidden || undefined}>
      {memberships.map((m) => (
        <li key={m.name} className="shrink-0">
          <Image
            src={m.logo}
            alt={hidden ? "" : `${m.name} logo`}
            width={m.w}
            height={m.h}
            sizes="160px"
            className="h-9 w-auto max-w-[10rem] object-contain opacity-60 grayscale transition-[filter,opacity] duration-500 ease-[var(--ease-expo)] hover:opacity-100 hover:grayscale-0 sm:h-11 sm:max-w-[12rem]"
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
      <div className="marquee" style={{ ["--marquee-duration" as string]: "42s" }}>
        {cards(false)}
        {cards(true)}
      </div>
    </section>
  );
}
