import { GlowOrb } from "@/components/ui/glow";
import { RevealScale } from "@/components/ui/reveal";
import type { Dictionary } from "@/lib/dictionary";

/** Big "LET'S CONNECT." band that settles into place when scrolled into view. */
export function LetsBuild({ t }: { t: Dictionary["letsBuild"] }) {
  return (
    <section
      id="lets-build"
      aria-label={`${t.lead} ${t.accent}`}
      className="relative flex min-h-[340px] items-center justify-center overflow-hidden px-5 md:min-h-[480px]"
    >
      <GlowOrb
        strength={0.08}
        className="top-1/2 left-1/2 h-80 w-[820px] -translate-x-1/2 -translate-y-1/2"
      />
      <RevealScale className="relative text-center font-display text-[clamp(80px,12vw,180px)] leading-[0.9]">
        {t.lead} <span className="text-accent">{t.accent}</span>
      </RevealScale>
    </section>
  );
}
