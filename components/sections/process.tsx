import { SectionHeading } from "@/components/ui/animated-text";
import { cardClass, sheenClass } from "@/components/ui/card";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { steps } from "@/lib/data";

export function Process() {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end md:gap-8">
        <div className="flex flex-col gap-3">
          <SectionLabel>How I work</SectionLabel>
          <SectionHeading
            lead="BUILT TO"
            accent="FLOW"
            className="font-display text-[clamp(48px,5.6vw,80px)] leading-[0.9]"
          />
        </div>
        <Reveal className="max-w-[420px]">
          <p className="text-[15px] leading-relaxed text-muted">
            Four steps from idea to launch, with clear updates at every stage.
          </p>
        </Reveal>
      </div>

      <div className="relative">
        {/* Connector line through the step badges (desktop) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[52px] right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-transparent via-white/20 to-transparent md:block"
        />
        <Stagger as="ol" className="grid gap-3 md:grid-cols-4 md:gap-4">
          {steps.map((step) => (
            <StaggerItem
              key={step.num}
              as="li"
              className={`${cardClass} flex flex-col gap-4 p-5 md:min-h-[220px] md:p-6 md:hover:-translate-y-1`}
            >
              <div className={sheenClass} />
              <div className="relative flex items-center justify-between">
                <span className="flex size-14 items-center justify-center rounded-full border border-white/15 bg-ink font-display text-2xl">
                  {step.num}
                </span>
                <span className="font-mono text-muted transition-colors duration-300 group-hover:text-accent">
                  {step.glyph}
                </span>
              </div>
              <div className="relative flex flex-col gap-2">
                <span className="font-display text-[30px] leading-none uppercase md:text-[34px]">
                  {step.name}
                </span>
                <span className="text-sm leading-relaxed text-muted">{step.desc}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  );
}
