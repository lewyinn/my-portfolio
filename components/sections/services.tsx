import { SectionHeading } from "@/components/ui/animated-text";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { ServicesPanel } from "./services-panel";

export function Services() {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <SectionLabel>Expertise</SectionLabel>
        <SectionHeading
          lead="WHAT I"
          accent="DO"
          className="font-display text-[clamp(48px,5.6vw,80px)] leading-[0.9]"
        />
        <Reveal>
          <p className="max-w-[460px] text-[15px] leading-relaxed text-muted">
            Four services, from business websites to mobile apps. Pick a service to see the tools
            behind it.
          </p>
        </Reveal>
      </div>
      <Reveal>
        <ServicesPanel />
      </Reveal>
    </div>
  );
}
