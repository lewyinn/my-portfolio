import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRightIcon } from "./icons";

type Variant = "primary" | "outline" | "solid";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent/85",
  outline: "border border-white/15 bg-white/[0.03] text-fg hover:border-white/40",
  solid: "bg-fg text-ink hover:bg-fg/85",
};

/** Pill-shaped link. `arrow` adds an up-right arrow that nudges on hover. */
export function ButtonLink({
  href,
  children,
  variant = "outline",
  arrow = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-xs font-bold tracking-[0.14em] uppercase transition-[background-color,border-color,scale] duration-300 active:scale-[0.97] ${variants[variant]} ${className}`}
    >
      {children}
      {arrow ? (
        <ArrowUpRightIcon
          strokeWidth={2.2}
          className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      ) : null}
    </Link>
  );
}
