import { ButtonLink } from "@/components/ui/button-link";
import { GlowOrb } from "@/components/ui/glow";
import { PixelR } from "@/components/ui/pixel-r";
import type { Dictionary } from "@/lib/dictionary";

const letters = "PORTFOLIO".split("");

type HeroProps = { t: Dictionary["hero"] };

export function Hero({ t }: HeroProps) {
  return (
    <section
      id="top"
      className="relative flex min-h-[max(640px,calc(100svh-72px))] flex-col items-center justify-center overflow-hidden px-5 pt-16 pb-28 text-center md:px-12"
    >
      {/* One soft background glow per section. */}
      <GlowOrb
        strength={0.07}
        className="top-1/2 left-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 md:size-[820px]"
      />

      <div className="relative flex flex-col items-center gap-6 md:gap-7">
        <p className="max-w-[90vw] animate-hero-rise text-[11px] leading-relaxed tracking-[0.2em] text-muted uppercase motion-reduce:animate-none sm:tracking-[0.32em]">
          {t.eyebrow}
        </p>

        <div className="relative animate-hero-rise motion-reduce:animate-none">
          <PixelR className="relative" />
        </div>

        <h1
          aria-label="Portfolio"
          className="flex animate-hero-rise overflow-hidden font-display text-[clamp(84px,17vw,240px)] leading-[0.86] motion-reduce:animate-none"
        >
          {letters.map((letter, i) => (
            <span key={i} aria-hidden="true" className="inline-block">
              {letter}
            </span>
          ))}
        </h1>

        <p className="max-w-xl animate-hero-rise text-base leading-relaxed motion-reduce:animate-none md:text-lg">
          {t.intro}
        </p>

        <p className="animate-hero-rise text-[13px] text-muted motion-reduce:animate-none md:text-sm">
          <span className="text-accent">{t.status}</span>
        </p>

        <div className="mt-2 flex w-full animate-hero-rise flex-col gap-2.5 motion-reduce:animate-none sm:w-auto sm:flex-row sm:gap-3">
          <ButtonLink href="#contact" variant="primary" arrow>
            {t.contactCta}
          </ButtonLink>
          <ButtonLink href="#work">{t.viewWork}</ButtonLink>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5 font-mono text-[10px] tracking-[0.3em] text-muted"
      >
        <span>{t.scroll}</span>
        <span className="h-7 w-px bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  );
}
