import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollZoom } from "@/components/motion/ScrollZoom";
import type { Service } from "@/content/services";
import { cn } from "@/lib/cn";

/** Destination-style card: large photograph with glass metadata chips, uppercase title and one line. */
export function ServiceCard({
  service: s,
  ratio = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  chipsAlign = "right",
  className,
  headingLevel: H = "h3",
}: {
  service: Service;
  ratio?: string;
  sizes?: string;
  chipsAlign?: "left" | "right";
  className?: string;
  headingLevel?: "h2" | "h3";
}) {
  const chips = [s.mode, `${s.subServices.length} services`, s.subServices.some((x) => x.title === "Door to Door") ? "Door to door" : "PK ⇄ UAE"];
  return (
    <Link href={s.href} className={cn("zoom-group group block", className)}>
      <div className="relative">
        <ScrollZoom className={cn("zoom-media", ratio)}>
          <Image src={s.image.src} alt={s.image.alt} fill sizes={sizes} className="object-cover" />
        </ScrollZoom>
        <ul className={cn("absolute bottom-3 flex flex-wrap gap-1.5 sm:bottom-4", chipsAlign === "right" ? "right-3 justify-end sm:right-4" : "left-3 sm:left-4")}>
          {chips.map((c) => (
            <li key={c} className="chip-glass">
              {c}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 flex items-start justify-between gap-6">
        <div>
          <H className="font-display text-[clamp(2rem,3.4vw,3.25rem)]">{s.name}</H>
          <p className="mt-3 max-w-md text-lg text-ink/80">{s.short}</p>
        </div>
        <span
          aria-hidden
          className="mt-1 grid size-11 shrink-0 place-items-center rounded-[6px] bg-ink text-paper transition-[background-color,transform] duration-500 ease-[var(--ease-expo)] group-hover:rotate-45 group-hover:bg-signal-strong"
        >
          <ArrowUpRight className="size-5" strokeWidth={1.5} />
        </span>
      </div>
      <span className="label-mono mt-4 inline-block text-stone transition-colors group-hover:text-ink">View service</span>
    </Link>
  );
}
