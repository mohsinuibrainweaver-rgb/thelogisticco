"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK, claim } from "@/components/motion/gsap";
import { cn } from "@/lib/cn";

/**
 * A large statement that starts grey and turns to full ink one wrapped line at a time as you scroll (the same effect as
 * the homepage About section). Lines are measured from the real wrapped text and rebuilt if the width changes. Without
 * JS or with reduced motion the text is simply full ink.
 */
export function StatementReveal({
  text,
  id,
  as: Tag = "h2",
  className,
}: {
  text: string;
  id?: string;
  as?: "h1" | "h2" | "p";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      claim(el);
      const words = Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        let tl: gsap.core.Timeline | null = null;
        const build = () => {
          tl?.scrollTrigger?.kill();
          tl?.kill();
          gsap.set(words, { clearProps: "color" });
          const lines: HTMLElement[][] = [];
          let lastTop = -999;
          words.forEach((w) => {
            const t = w.offsetTop;
            if (Math.abs(t - lastTop) > 6) {
              lines.push([]);
              lastTop = t;
            }
            lines[lines.length - 1].push(w);
          });
          tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 45%", scrub: 0.5 } });
          lines.forEach((ws, i) => tl!.fromTo(ws, { color: "rgba(18,21,29,0.2)" }, { color: "#12151d", ease: "none", duration: 1 }, i));
        };
        build();
        let lastW = el.clientWidth;
        let timer = 0;
        const ro = new ResizeObserver(() => {
          if (el.clientWidth === lastW) return;
          lastW = el.clientWidth;
          window.clearTimeout(timer);
          timer = window.setTimeout(build, 150);
        });
        ro.observe(el);
        return () => {
          ro.disconnect();
          window.clearTimeout(timer);
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref as never} id={id} className={cn("font-medium leading-[1.1] tracking-[-0.045em]", className)}>
      {text.split(" ").map((w, i) => (
        <span key={i} data-word="">
          {w}{" "}
        </span>
      ))}
    </Tag>
  );
}
