import Link from "next/link";
import { MaskLines } from "@/components/motion/MaskLines";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/** Breadcrumb trail rendered as monospace metadata. */
export function Crumbs({ items, tone = "dark" }: { items: Array<{ name: string; href?: string }>; tone?: "dark" | "light" }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn("label-mono flex flex-wrap items-center gap-2", tone === "light" ? "text-paper/60" : "text-stone")}>
        {items.map((c, i) => (
          <li key={c.name} className="flex items-center gap-2">
            {c.href ? (
              <Link href={c.href} className={cn("link-line", tone === "light" ? "hover:text-paper" : "hover:text-ink")}>
                {c.name}
              </Link>
            ) : (
              <span aria-current="page" className={tone === "light" ? "text-paper" : "text-ink"}>
                {c.name}
              </span>
            )}
            {i < items.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Type-led page opener used by inner pages (Folvex-style oversized condensed title). */
export function TypeHero({
  crumbs,
  lines,
  aside,
  meta,
  className,
}: {
  crumbs: Array<{ name: string; href?: string }>;
  lines: React.ReactNode[];
  aside?: React.ReactNode;
  meta?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("shell pb-14 pt-36 sm:pb-20 sm:pt-44", className)}>
      <Reveal immediate delay={0.1}>
        <Crumbs items={crumbs} />
      </Reveal>
      <div className="mt-10 grid items-end gap-10 lg:grid-cols-12">
        <MaskLines as="h1" immediate delay={0.15} lines={lines} className="font-display text-mega lg:col-span-8" />
        {aside && (
          <Reveal immediate delay={0.6} className="text-lg text-stone lg:col-span-4 lg:pb-4">
            {aside}
          </Reveal>
        )}
      </div>
      {meta && (
        <Reveal immediate delay={0.75} className="mt-12 border-t border-line pt-5">
          {meta}
        </Reveal>
      )}
    </section>
  );
}
