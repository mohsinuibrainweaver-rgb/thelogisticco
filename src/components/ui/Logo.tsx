import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * The Logistic Company's original logo.
 * - tone "color": original artwork (transparent margins trimmed only) — for light backgrounds.
 * - tone "white": white, background-free version of the same artwork (scripts/make-white-logo.mjs) —
 *   for dark backgrounds and photography. No white plate/box is used anywhere.
 */
export function Logo({ className, priority, tone = "color" }: { className?: string; priority?: boolean; tone?: "color" | "white" }) {
  return (
    <Image
      src={tone === "white" ? "/brand/tlc-logo-white.png" : "/brand/tlc-logo.png"}
      alt="The Logistic Company"
      width={821}
      height={351}
      priority={priority}
      sizes="240px"
      // Height comes from the caller (e.g. "h-11"); width follows the logo's aspect ratio.
      className={cn("w-auto max-w-none", className ?? "h-12")}
    />
  );
}
