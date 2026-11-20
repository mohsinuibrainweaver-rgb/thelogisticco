"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "./gsap";

/** Keeps ScrollTrigger measurements fresh after fonts load and on client navigation. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    document.fonts?.ready.then(() => !cancelled && ScrollTrigger.refresh());
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return <>{children}</>;
}
