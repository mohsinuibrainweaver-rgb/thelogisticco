import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { MaskLines } from "@/components/motion/MaskLines";
import { Reveal } from "@/components/motion/Reveal";
import type { Service } from "@/content/services";
import { cn } from "@/lib/cn";

/** Section opener used on every inner page: red mono label, Archivo headline, optional paragraph. */
export function SectionHead({
  label,
  id,
  lines,
  text,
  align = "left",
  className,
}: {
  label: string;
  id?: string;
  lines: React.ReactNode[];
  text?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-3xl text-center", className)}>
      <p className="label-mono text-signal-strong">{label}</p>
      <MaskLines as="h2" id={id} lines={lines} className="font-title mt-5 text-[clamp(2.4rem,4.8vw,4.4rem)] leading-[0.98]" />
      {text && <div className={cn("mt-6 max-w-xl text-[1.05rem] leading-relaxed text-stone", align === "center" && "mx-auto")}>{text}</div>}
    </div>
  );
}

/** Service card: portrait photograph on top, mode tag, title, one line, three sub-service chips and a round arrow. */
export function ServiceTile({ service: s, className, headingLevel: H = "h3" }: { service: Service; className?: string; headingLevel?: "h2" | "h3" }) {
  return (
    <Link
      href={s.href}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_26px_54px_-36px_rgba(18,21,29,0.35)] ring-1 ring-ink/5 transition-[transform,box-shadow] duration-500 ease-[var(--ease-expo)] hover:-translate-y-1 hover:shadow-[0_34px_64px_-34px_rgba(18,21,29,0.45)]",
        className,
      )}
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-paper-3">
        <Image
          src={s.photo.src}
          alt={s.photo.alt}
          fill
          quality={85}
          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 94vw"
          className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-[1.05]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-ink/75 backdrop-blur-sm">
          ({s.index}) {s.mode}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <H className="font-title text-[clamp(1.7rem,2.4vw,2.2rem)]">{s.name}</H>
        <p className="mt-3 max-w-[34ch] text-[1.02rem] leading-snug text-stone">{s.short}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${s.name} includes`}>
          {s.subServices.slice(0, 3).map((x) => (
            <li key={x.title} className="rounded-full bg-ink/[0.06] px-3 py-1 text-[0.78rem] font-medium text-ink/70">
              {x.title}
            </li>
          ))}
          {s.subServices.length > 3 && <li className="px-1.5 py-1 text-[0.78rem] font-medium text-stone">+{s.subServices.length - 3} more</li>}
        </ul>
        <span className="mt-auto flex items-center justify-between pt-7 text-sm font-medium">
          View service
          <span aria-hidden className="grid size-10 place-items-center rounded-full bg-ink text-paper transition-[background-color,transform] duration-500 ease-[var(--ease-expo)] group-hover:rotate-45 group-hover:bg-signal-strong">
            <ArrowUpRight className="size-4" strokeWidth={1.75} />
          </span>
        </span>
      </div>
    </Link>
  );
}

/** Closing call-to-action: a rounded dark card in the footer's night-port look. */
export function CtaBand({
  label = "Request a quote",
  lines = ["Tell us what you’re moving."],
  text = "Share what you’re moving, from where and roughly when. Our team in Lahore or Dubai will reply with a route and a quote.",
  actions,
}: {
  label?: string;
  lines?: React.ReactNode[];
  text?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <section className="shell py-12 sm:py-16">
      <div className="on-ink relative isolate overflow-hidden rounded-[22px] bg-ink px-6 py-16 text-center text-paper sm:rounded-[28px] sm:px-10 sm:py-24">
        <Image src="/images/home/cta.webp" alt="" fill sizes="(min-width: 1600px) 1500px, 96vw" className="-z-20 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/60 to-ink/90" />
        <p className="label-mono text-signal">{label}</p>
        <MaskLines as="h2" lines={lines} className="font-title mx-auto mt-5 max-w-[16ch] text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.98]" />
        <Reveal as="p" className="mx-auto mt-6 max-w-lg text-lg text-paper/80">
          {text}
        </Reveal>
        <Reveal className="mt-9 flex flex-wrap justify-center gap-3" delay={0.1}>
          {actions ?? (
            <>
              <ButtonLink href="/contact/" variant="light">
                Request a quote
              </ButtonLink>
              <ButtonLink href="/our-services/" variant="outline" className="text-paper">
                Our services
              </ButtonLink>
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}
