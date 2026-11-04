import { GlobeIcon } from "@/components/ui/icons";

/**
 * Small vertical label on the left edge (desktop only, PLAN.md §3). The right edge is
 * kept free for the homepage section index.
 */
export function SideLabels({ label }: { label: string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none hidden min-[960px]:block">
      <p className="fixed top-1/2 left-[18px] z-30 flex -translate-y-1/2 rotate-180 items-center gap-2 text-[11px] font-medium [writing-mode:vertical-rl]">
        <GlobeIcon className="size-3 rotate-180" />
        {label}
        <span className="text-muted">·</span>© 2026
      </p>
    </div>
  );
}
