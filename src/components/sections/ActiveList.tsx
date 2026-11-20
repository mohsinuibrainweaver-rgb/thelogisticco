"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import { cn } from "@/lib/cn";

type Item = { title: string; body: string; meta?: string };

/**
 * "In their words" pattern: a numbered list where the item crossing the middle of the viewport is
 * active (full ink) and the rest recede. A sticky image + pager on the left follows the active item.
 * Every item is fully readable without JS.
 */
export function ActiveList({
  items,
  images,
  label,
  showCaption = true,
  dividers = true,
  marker = "number",
  sharedRule = false,
}: {
  items: Item[];
  images: Array<{ src: string; alt: string }>;
  label: string;
  /** The label + "01 02 03 04" pager row under the picture. */
  showCaption?: boolean;
  /** Horizontal rules between the items (the vertical rule beside each item stays either way). */
  dividers?: boolean;
  /** What sits to the left of each item: its number, an arrow icon, or nothing. */
  marker?: "number" | "arrow" | "none";
  /** One continuous vertical rule beside the whole list (the active item is marked on it in ink) instead of a separate rule per item. */
  sharedRule?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [enhanced, setEnhanced] = useState(false);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      setEnhanced(true);
      const rows = gsap.utils.toArray<HTMLElement>("[data-active-item]", el);
      const triggers = rows.map((row, i) =>
        ScrollTrigger.create({
          trigger: row,
          start: "top 58%",
          end: "bottom 58%",
          onToggle: (self) => self.isActive && setActive(i),
        }),
      );
      // Shared rule: the ink line beside the whole list is a progress bar that fills as the list is scrolled through.
      const bar = el.querySelector<HTMLElement>("[data-progress]");
      const rail = el.querySelector<HTMLElement>("[data-rail]");
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        if (!bar || !rail) return;
        gsap.fromTo(
          bar,
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: rail, start: "top 58%", end: "bottom 58%", scrub: 0.35 } },
        );
      });
      return () => {
        triggers.forEach((t) => t.kill());
        mm.revert();
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="grid gap-12 lg:grid-cols-12">
      <div className="hidden lg:col-span-4 lg:block">
        <div className="sticky top-40">
          <div className="relative aspect-[4/5] overflow-hidden bg-paper-3">
            {images.map((img, i) => (
              <Image
                key={img.src}
                src={img.src}
                alt={i === active % images.length ? img.alt : ""}
                fill
                sizes="(min-width: 1024px) 30vw, 0px"
                className={cn(
                  "object-cover transition-[opacity,transform] duration-[1200ms] ease-[var(--ease-expo)]",
                  i === active % images.length ? "scale-100 opacity-100" : "scale-110 opacity-0",
                )}
              />
            ))}
          </div>
          {showCaption && (
            <div className="mt-4 flex items-center justify-between">
              <p className="label-mono text-stone">{label}</p>
              <p className="label-mono flex gap-2" aria-hidden>
                {items.map((_, i) => (
                  <span key={i} className={cn("transition-colors duration-500", i === active ? "text-ink" : "text-stone-light")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                ))}
              </p>
            </div>
          )}
        </div>
      </div>

      <ol data-rail="" className={cn("relative lg:col-span-7 lg:col-start-6", sharedRule && "border-l border-line")}>
        {sharedRule && <span aria-hidden data-progress="" className="absolute -left-px top-0 h-full w-[2px] origin-top bg-signal-strong" />}
        {items.map((it, i) => (
          <li
            key={it.title}
            data-active-item=""
            className={cn(
              "relative grid gap-x-4 transition-[opacity,border-color] duration-700 ease-[var(--ease-expo)]",
              marker === "none" ? "grid-cols-1" : "grid-cols-[2.5rem_1fr] sm:grid-cols-[3.5rem_1fr]",
              dividers ? "border-t border-line py-12 first:border-t-0 lg:py-16" : "py-8 lg:py-12",
              enhanced && i !== active && "lg:opacity-30",
              dividers && enhanced && i === active && "lg:border-ink",
            )}
          >
            {marker === "arrow" ? (
              <ArrowRight
                aria-hidden
                strokeWidth={1.6}
                className={cn("mt-3 size-6 transition-[color,transform] duration-700 ease-[var(--ease-expo)]", enhanced && i === active ? "translate-x-1 text-signal-strong" : "text-stone")}
              />
            ) : marker === "number" ? (
              <span className="label-mono pt-3 text-stone">{String(i + 1).padStart(2, "0")}</span>
            ) : null}
            <div className={cn(sharedRule ? "pl-6 sm:pl-10" : cn("border-l pl-6 transition-colors duration-700", enhanced && i === active ? "border-ink" : "border-line"))}>
              <h3 className="font-editorial text-[clamp(1.8rem,3vw,2.9rem)]">{it.title}</h3>
              <p className="mt-4 max-w-xl text-lg text-stone">{it.body}</p>
              {it.meta && <p className="label-mono mt-5 text-ink">{it.meta}</p>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
