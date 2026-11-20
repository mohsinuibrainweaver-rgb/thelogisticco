"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "@/components/motion/gsap";
import type { Service } from "@/content/services";
import { cn } from "@/lib/cn";

/**
 * Folvex-style interactive list. On fine pointers a preview image follows the cursor;
 * on touch devices each row shows its image inline, so nothing depends on hover.
 */
export function ServiceRows({ items }: { items: Service[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const preview = previewRef.current;
      if (!wrap || !preview) return;
      const mm = gsap.matchMedia();
      mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const xTo = gsap.quickTo(preview, "x", { duration: 0.7, ease: "power3.out" });
        const yTo = gsap.quickTo(preview, "y", { duration: 0.7, ease: "power3.out" });
        const onMove = (e: PointerEvent) => {
          const r = wrap.getBoundingClientRect();
          xTo(e.clientX - r.left);
          yTo(e.clientY - r.top);
        };
        wrap.addEventListener("pointermove", onMove);
        return () => wrap.removeEventListener("pointermove", onMove);
      });
      return () => mm.revert();
    },
    { scope: wrapRef },
  );

  return (
    <div ref={wrapRef} className="relative" onPointerLeave={() => setActive(null)}>
      <ul className="border-t border-line">
        {items.map((s, i) => (
          <li key={s.slug} className="border-b border-line">
            <Link
              href={s.href}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="group relative grid grid-cols-12 items-center gap-x-4 gap-y-5 py-7 sm:py-9 lg:py-10"
            >
              {/* Inline image for touch / small screens */}
              <span className="relative col-span-12 block aspect-[16/9] overflow-hidden bg-paper-2 lg:fine:hidden">
                <Image src={s.image.src} alt="" fill sizes="100vw" className="object-cover" />
              </span>
              <span className="label-mono col-span-2 self-start pt-3 text-stone sm:col-span-1 lg:self-center lg:pt-0">{s.index}</span>
              <span className="col-span-10 sm:col-span-11 lg:col-span-6">
                <span className="font-display block text-[clamp(2.6rem,6.2vw,6rem)] transition-[transform,color] duration-700 ease-[var(--ease-expo)] group-hover:translate-x-4 group-hover:text-signal-deep">
                  {s.name}
                </span>
              </span>
              <span className="col-span-12 text-stone sm:col-span-11 sm:col-start-2 lg:col-span-3 lg:col-start-auto">{s.short}</span>
              <span className="col-span-12 flex items-center justify-between gap-3 sm:col-span-11 sm:col-start-2 lg:col-span-2 lg:col-start-auto lg:justify-end">
                <span className="label-mono rounded-full border border-line px-3 py-1.5 text-stone">{s.subServices.length} services</span>
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-ink/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-signal group-hover:bg-signal group-hover:text-white">
                  <ArrowUpRight aria-hidden className="size-5" strokeWidth={1.5} />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Cursor-following preview (fine pointers only) */}
      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:fine:block"
      >
        <div
          className={cn(
            "relative -translate-x-1/2 -translate-y-1/2 overflow-hidden transition-[opacity,scale] duration-500 ease-[var(--ease-expo)]",
            "h-[17rem] w-[24rem] xl:h-[20rem] xl:w-[28rem]",
            active === null ? "scale-75 opacity-0" : "scale-100 opacity-100",
          )}
        >
          {items.map((s, i) => (
            <Image
              key={s.slug}
              src={s.image.src}
              alt=""
              fill
              sizes="28rem"
              className={cn("object-cover transition-opacity duration-500", active === i ? "opacity-100" : "opacity-0")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
