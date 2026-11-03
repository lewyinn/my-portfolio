import type { ReactNode } from "react";

export function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs transition-colors duration-300 hover:border-white/25 ${className}`}
    >
      {children}
    </span>
  );
}
