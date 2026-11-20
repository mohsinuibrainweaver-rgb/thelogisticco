import { cn } from "@/lib/cn";

/** Monospace section index, e.g. "01 — (About)". */
export function SectionLabel({ index, children, className, tone = "dark" }: { index?: string; children: React.ReactNode; className?: string; tone?: "dark" | "light" }) {
  return (
    <p className={cn("label-mono flex items-center gap-3", tone === "light" ? "text-paper/70" : "text-stone", className)}>
      {index && (
        <>
          <span className={tone === "light" ? "text-paper" : "text-ink"}>{index}</span>
          <span aria-hidden className="h-px w-8 bg-current opacity-50" />
        </>
      )}
      <span>({children})</span>
    </p>
  );
}
