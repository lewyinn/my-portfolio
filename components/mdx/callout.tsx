import type { ReactNode } from "react";

/** Highlighted note inside an article. */
export function Callout({ children }: { children: ReactNode }) {
  return (
    <aside className="rounded-xl border border-line bg-surface px-5 py-4 text-[15px] text-fg [&>p]:m-0">
      {children}
    </aside>
  );
}
