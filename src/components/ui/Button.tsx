import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "dark" | "light" | "signal" | "outline";

const styles: Record<Variant, string> = {
  dark: "btn btn-dark",
  light: "btn btn-light",
  signal: "btn btn-signal",
  outline: "btn btn-outline",
};

/** Rectangular button with a square arrow tile whose arrow slides out/in on hover. */
export function ButtonLink({
  href,
  children,
  variant = "dark",
  className,
  arrow = true,
  icon,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  icon?: React.ReactNode;
}) {
  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <span className="btn-icon" aria-hidden>
          {icon ?? (
            <>
              <ArrowUpRight className="size-4" strokeWidth={1.75} />
              <ArrowUpRight className="size-4" strokeWidth={1.75} />
            </>
          )}
        </span>
      ) : null}
    </>
  );
  const cls = cn(styles[variant], !arrow && "btn-plain", className);
  const external = /^(https?:|mailto:|tel:)/.test(href);
  if (external) {
    return (
      <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
