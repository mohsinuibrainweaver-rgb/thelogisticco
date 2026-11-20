import { cn } from "@/lib/cn";

/** CSS-only infinite marquee. Pauses on hover; stops under prefers-reduced-motion. */
export function Marquee({
  items,
  className,
  itemClassName,
  reverse,
  duration = 40,
  separator = "✦",
}: {
  items: readonly string[];
  className?: string;
  itemClassName?: string;
  reverse?: boolean;
  duration?: number;
  separator?: string;
}) {
  const row = (hidden: boolean) => (
    <div className="marquee-track" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={i} className={cn("flex shrink-0 items-center", itemClassName)}>
          <span className="whitespace-nowrap">{item}</span>
          <span aria-hidden className="mx-[0.35em] text-signal text-[0.4em]">
            {separator}
          </span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={cn("marquee", className)} data-reverse={reverse ? "true" : undefined} style={{ ["--marquee-duration" as string]: `${duration}s` }}>
      {row(false)}
      {row(true)}
    </div>
  );
}
