"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { contact } from "@/content/site";
import { cn } from "@/lib/cn";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";


const DOTS = 32;
const IDLE = "rgba(18,21,29,0.26)";
/** Lit dots are all the brand red (signal). */
const LIT = "#e0523f";
const dotPos = (i: number) => {
  const a = ((-90 + (i * 360) / DOTS) * Math.PI) / 180;
  return { cx: 24 + 21.5 * Math.cos(a), cy: 24 + 21.5 * Math.sin(a) };
};

/** Bottom-right action stack: back-to-top (a dotted ring whose dots turn red, clockwise, as you scroll) above a WhatsApp chat button. */
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const dots = useRef<Array<SVGCircleElement | null>>([]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setShowTop(window.scrollY > 700);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const lit = max > 0 ? Math.round(Math.min(1, window.scrollY / max) * DOTS) : 0;
      dots.current.forEach((d, i) => d?.setAttribute("fill", i < lit ? LIT : IDLE));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={toTop}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        aria-hidden={!showTop}
        className={cn(
          "group pointer-events-auto relative grid size-12 place-items-center rounded-full bg-paper text-ink shadow-[0_10px_30px_-10px_rgba(18,21,29,0.45)] transition-all duration-500 ease-[var(--ease-expo)] hover:bg-white",
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        {/* Dotted ring: grey dots that turn red, clockwise from the top, as the page is scrolled */}
        <svg viewBox="0 0 48 48" aria-hidden className="absolute inset-0 size-full">
          {Array.from({ length: DOTS }, (_, i) => {
            const { cx, cy } = dotPos(i);
            return (
              <circle
                key={i}
                ref={(el) => {
                  dots.current[i] = el;
                }}
                cx={cx}
                cy={cy}
                r="1.35"
                fill={IDLE}
                className="transition-[fill] duration-500"
              />
            );
          })}
        </svg>
        <ArrowUp className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5" strokeWidth={2} />
      </button>

      <a
        href={`${contact.whatsapp.href}?text=${encodeURIComponent("Hello, I'd like a quote for a shipment.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with us on WhatsApp (${contact.whatsapp.display})`}
        className="group pointer-events-auto flex h-14 items-center overflow-hidden rounded-full bg-whatsapp text-white shadow-[0_14px_34px_-12px_rgba(37,211,102,0.75)] transition-transform duration-500 ease-[var(--ease-expo)] hover:-translate-y-0.5"
      >
        <span className="relative grid size-14 shrink-0 place-items-center">
          <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-whatsapp opacity-25 [animation-duration:2.8s] motion-reduce:hidden" />
          <WhatsAppGlyph className="relative size-7" />
        </span>
        <span className="max-w-0 whitespace-nowrap pr-0 text-sm font-medium opacity-0 transition-all duration-500 ease-[var(--ease-expo)] fine:group-hover:max-w-48 fine:group-hover:pr-5 fine:group-hover:opacity-100">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
