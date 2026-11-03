import { cardClass, sheenClass } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { stackGroups } from "@/lib/data";

export function Stack() {
  return (
    <div className="flex flex-col gap-5">
      <SectionLabel>My stack</SectionLabel>
      <Stagger className="grid gap-4 md:grid-cols-2" stagger={0.12}>
        {stackGroups.map((group) => (
          <StaggerItem key={group.name} className={`${cardClass} p-6 md:p-8`}>
            <div className={sheenClass} />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 -bottom-8 font-display text-[160px] leading-none text-white/[0.03] md:text-[220px]"
            >
              {group.num}
            </span>

            <div className="relative flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] tracking-[0.24em] text-muted uppercase">
                  Stack / {group.num}
                </span>
                <span className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] font-mono text-sm text-accent">
                  {group.glyph}
                </span>
              </div>
              <h3 className="bg-gradient-to-b from-fg to-fg/45 bg-clip-text font-display text-[56px] leading-[0.9] tracking-[0.04em] text-transparent uppercase md:text-[80px]">
                {group.name}
              </h3>
              <div className="h-px bg-gradient-to-r from-white/15 to-transparent" />
              <ul className="flex flex-wrap gap-2">
                {group.tools.map((tool) => (
                  <li key={tool}>
                    <Chip className="tracking-[0.06em] uppercase">{tool}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
