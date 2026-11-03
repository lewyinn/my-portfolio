import { AnimatedText } from "@/components/ui/animated-text";
import { Container } from "@/components/ui/container";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import { GlowOrb, SectionGlow } from "@/components/ui/glow";
import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { marqueeItems } from "@/lib/data";

export function Perspective() {
  return (
    <section id="perspective" aria-label="Perspective" className="relative overflow-hidden">
      <SectionGlow />
      <GlowOrb strength={0.05} className="top-1/4 -left-32 size-[480px]" />
      <FloatingShapes />

      <Container className="flex flex-col gap-7 py-24 md:py-36">
        <SectionLabel>The perspective</SectionLabel>
        <AnimatedText
          as="p"
          className="font-display text-[clamp(56px,9vw,136px)] leading-[0.9]"
          lines={[
            [{ text: "PRETTY IS EASY." }],
            [
              { text: "I BUILD WHAT", tone: "muted" },
              { text: "WORKS.", tone: "accent" },
            ],
          ]}
        />
        <Reveal>
          <p className="max-w-[560px] leading-relaxed text-muted md:text-[17px]">
            Anyone can make a screen look good in a screenshot. What matters is what happens after
            launch: pages and apps that load fast, are easy to use, and help your business grow.
            That is what every design choice and every line of code is for.
          </p>
        </Reveal>
      </Container>
      <Marquee items={marqueeItems} />
    </section>
  );
}
