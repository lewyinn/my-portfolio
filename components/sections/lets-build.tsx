"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { GlowOrb } from "@/components/ui/glow";
import type { Dictionary } from "@/lib/dictionaries/en";

/** Big "LET'S BUILD." band that grows into place as it scrolls into view. */
export function LetsBuild({ t }: { t: Dictionary["letsBuild"] }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.78, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);

  return (
    <section
      ref={ref}
      id="lets-build"
      aria-label={`${t.lead} ${t.accent}`}
      className="relative flex min-h-[340px] items-center justify-center overflow-hidden px-5 md:min-h-[480px]"
    >
      <GlowOrb
        strength={0.08}
        className="top-1/2 left-1/2 h-80 w-[820px] -translate-x-1/2 -translate-y-1/2"
      />
      <motion.p
        style={reduceMotion ? undefined : { scale, opacity }}
        className="relative text-center font-display text-[clamp(80px,12vw,180px)] leading-[0.9] will-change-transform"
      >
        {t.lead} <span className="text-accent">{t.accent}</span>
      </motion.p>
    </section>
  );
}
