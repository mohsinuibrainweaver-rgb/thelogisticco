import Link from "next/link";
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
