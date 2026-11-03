import type { ReactNode } from "react";

/** Small uppercase label above a section heading, e.g. "( The story )". */
export function SectionLabel({
  children,
  bracketed = true,
  className = "",
}: {
  children: ReactNode;
  bracketed?: boolean;
  className?: string;
}) {
  return (
    <p className={`text-[11px] tracking-[0.32em] text-muted uppercase ${className}`}>
      {bracketed ? <>( {children} )</> : children}
    </p>
  );
}
