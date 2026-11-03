import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  // `relative` keeps content above absolutely positioned section glows.
  return (
    <div className={`relative mx-auto w-full max-w-7xl px-5 md:px-12 ${className}`}>{children}</div>
  );
}
