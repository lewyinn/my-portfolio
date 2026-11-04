import { AnimatedText } from "@/components/ui/animated-text";
import { Container } from "@/components/ui/container";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import { GlowOrb, SectionGlow } from "@/components/ui/glow";
import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { getI18n } from "@/lib/i18n-server";

export async function Perspective() {
  const { t } = await getI18n();

  return (
    <section id="perspective" aria-label={t.perspective.label} className="relative overflow-hidden">
      <SectionGlow />
      <GlowOrb strength={0.05} className="top-1/4 -left-32 size-[480px]" />
      <FloatingShapes />

      <Container className="flex flex-col gap-7 py-24 md:py-36">
        <SectionLabel>{t.perspective.label}</SectionLabel>
        <AnimatedText
          as="p"
          className="font-display text-[clamp(56px,9vw,136px)] leading-[0.9]"
          lines={[
            [{ text: t.perspective.line1 }],
            [
              { text: t.perspective.line2Lead, tone: "muted" },
              { text: t.perspective.line2Accent, tone: "accent" },
            ],
          ]}
        />
        <Reveal>
          <p className="max-w-[560px] leading-relaxed text-muted md:text-[17px]">
            {t.perspective.body}
          </p>
        </Reveal>
      </Container>
      <Marquee items={[t.perspective.marquee]} />
    </section>
  );
}
