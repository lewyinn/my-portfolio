import { AnimatedText } from "@/components/ui/animated-text";
import { cardClass, sheenClass } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import { GlowOrb, SectionGlow } from "@/components/ui/glow";
import { Marquee } from "@/components/ui/marquee";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { t } from "@/lib/dictionary";

export function Perspective() {
  return (
    <section id="perspective" aria-label={t.perspective.label} className="relative overflow-hidden">
      <SectionGlow />
      <GlowOrb strength={0.05} className="top-1/4 -left-32 size-[480px]" />
      <FloatingShapes />

      <Container className="flex flex-col gap-10 py-24 md:py-32">
        <div className="flex flex-col gap-6">
          <SectionLabel>{t.perspective.label}</SectionLabel>
          <AnimatedText
            as="p"
            className="font-display text-[clamp(54px,8.2vw,120px)] leading-[0.9]"
            lines={[
              [{ text: t.perspective.line1 }],
              [
                { text: t.perspective.line2Lead, tone: "muted" },
                { text: t.perspective.line2Accent, tone: "accent" },
              ],
            ]}
          />
          <Reveal>
            <p className="max-w-[600px] leading-relaxed text-muted md:text-[17px]">
              {t.perspective.body}
            </p>
          </Reveal>
        </div>

        {/* 3 Working Principle Pillars (Option B Manifesto) */}
        <Stagger className="grid gap-4 md:grid-cols-3" stagger={0.1}>
          {t.perspective.pillars.map((pillar) => (
            <StaggerItem key={pillar.num} className={`${cardClass} flex flex-col gap-3 p-6 md:p-7`}>
              <div className={sheenClass} />
              <div className="relative flex items-center justify-between gap-2 font-mono text-[11px] tracking-[0.18em] uppercase">
                <span className="text-accent">{pillar.num}</span>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[10px] text-muted">
                  {pillar.badge}
                </span>
              </div>
              <h3 className="relative mt-1 font-display text-[28px] leading-[0.98] uppercase md:text-[32px]">
                {pillar.title}
              </h3>
              <p className="relative text-sm leading-relaxed text-muted">{pillar.desc}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>

      <Marquee items={t.perspective.marquee} />
    </section>
  );
}
