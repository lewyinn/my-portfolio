import { SectionHeading } from "@/components/ui/animated-text";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { services } from "@/lib/data";
import { t } from "@/lib/dictionary";
import { ServicesPanel } from "./services-panel";

export function Services() {
  const items = services.map((service) => ({ ...service, ...t.services.items[service.cmd] }));

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <SectionLabel>{t.services.label}</SectionLabel>
        <SectionHeading
          lead={t.services.lead}
          accent={t.services.accent}
          className="font-display text-[clamp(48px,5.6vw,80px)] leading-[0.9]"
        />
        <Reveal>
          <p className="max-w-[560px] text-[15px] leading-relaxed text-muted">{t.services.intro}</p>
        </Reveal>
      </div>
      <ServicesPanel
        services={items}
        labels={{ service: t.services.service, group: t.services.group }}
      />
    </div>
  );
}
