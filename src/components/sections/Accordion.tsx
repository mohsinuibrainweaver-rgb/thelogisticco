"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

type Item = { q: string; a: string };

/** Numbered accordion (Go Uncharted FAQ pattern) with smooth height transitions and proper ARIA. */
export function Accordion({
  items,
  defaultOpen = 0,
  start = 1,
  staircase = false,
  showNumbers = true,
}: {
  items: Item[];
  defaultOpen?: number | null;
  start?: number;
  /** Lay the questions out as steps: each one is a card shifted a little further right than the one above. */
  staircase?: boolean;
  /** The 01, 02… index at the left of each question. */
  showNumbers?: boolean;
}) {
  const uid = useId();
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className={staircase ? "flex flex-col gap-3" : "border-t border-line"}>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q}
            // Staircase: on wide screens every step is the same width and is moved right by an equal amount, so the
            // steps run diagonally across the whole container (last step flush with the right edge). On small
            // screens the steps are just nudged a little so the stairs still read.
            style={staircase ? ({ "--i": i, "--n": Math.max(1, items.length - 1) } as React.CSSProperties) : undefined}
            className={
              staircase
                ? cn(
                    "rounded-[18px] bg-white px-4 shadow-[0_22px_44px_-34px_rgba(18,21,29,0.3)] ring-1 transition-shadow duration-500 ease-[var(--ease-expo)] sm:px-7",
                    "max-lg:ml-[calc(var(--i)*0.85rem)] sm:max-lg:ml-[calc(var(--i)*2.25rem)] lg:w-[52rem] lg:max-w-full lg:ml-[calc(var(--i)*(100%_-_52rem)/var(--n))]",
                    isOpen ? "ring-signal/40" : "ring-ink/[0.06] hover:ring-ink/15",
                  )
                : "border-b border-line"
            }
          >
            <h3>
              <button
                type="button"
                id={`${uid}-h${i}`}
                aria-expanded={isOpen}
                aria-controls={`${uid}-p${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn(
                  "group grid w-full items-center gap-4 text-left",
                  showNumbers ? "grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[3.5rem_1fr_auto]" : "grid-cols-[1fr_auto]",
                  staircase ? "py-5 sm:py-6" : "py-7",
                )}
              >
                {showNumbers && <span className={cn("label-mono", staircase && isOpen ? "text-signal-strong" : "text-stone")}>{String(i + start).padStart(2, "0")}</span>}
                <span
                  className={cn(
                    "font-editorial transition-colors duration-500",
                    // staircase questions stay on one line on wide screens
                    staircase ? "text-[clamp(1.15rem,1.7vw,1.4rem)] lg:whitespace-nowrap" : "text-[clamp(1.4rem,2.4vw,2.2rem)]",
                    isOpen ? "text-ink" : "text-ink/75 group-hover:text-ink",
                  )}
                >
                  {f.q}
                </span>
                <span aria-hidden className="relative block size-5">
                  <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
                  <span className={cn("absolute left-1/2 top-0 h-full w-px bg-current transition-transform duration-500 ease-[var(--ease-expo)]", isOpen && "scale-y-0")} />
                </span>
              </button>
            </h3>
            <div id={`${uid}-p${i}`} role="region" aria-labelledby={`${uid}-h${i}`} className="accordion-panel" data-open={isOpen}>
              <div>
                <p className={cn("max-w-2xl pb-8 text-lg text-stone", showNumbers ? "pl-[3.5rem] sm:pl-[4.5rem]" : "pr-10")}>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
