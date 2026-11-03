"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { GlowOrb } from "@/components/ui/glow";
import { PixelR } from "@/components/ui/pixel-r";

const ease = [0.22, 1, 0.36, 1] as const;
const letters = "PORTFOLIO".split("");

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease, delay },
});

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[max(640px,calc(100svh-72px))] flex-col items-center justify-center overflow-hidden px-5 pt-16 pb-28 text-center md:px-12"
    >
      {/* One soft background glow per section. */}
      <GlowOrb
        strength={0.07}
        className="top-1/2 left-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 md:size-[820px]"
      />

      <motion.div
        style={reduceMotion ? undefined : { y, opacity }}
        className="relative flex flex-col items-center gap-6 md:gap-7"
      >
        <motion.p {...fadeUp(0.1)} className="text-[11px] tracking-[0.32em] text-muted uppercase">
          Software Developer
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.2 }}
          className="relative"
        >
          <PixelR className="relative" />
        </motion.div>

        <h1
          aria-label="Portfolio"
          className="flex overflow-hidden font-display text-[clamp(84px,17vw,240px)] leading-[0.86]"
        >
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="inline-block"
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease, delay: 0.3 + i * 0.05 }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <motion.p {...fadeUp(0.8)} className="max-w-xl text-base leading-relaxed md:text-lg">
          I design and build business websites and mobile apps with Next.js, React, and Flutter —
          from first sketch to launch.
        </motion.p>

        <motion.p {...fadeUp(0.9)} className="text-[13px] text-muted md:text-sm">
          Remote · Indonesia · <span className="text-accent">Open for new projects</span>
        </motion.p>

        <motion.div
          {...fadeUp(1)}
          className="mt-2 flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:gap-3"
        >
          <ButtonLink href="#contact" variant="primary" arrow>
            Start a project
          </ButtonLink>
          <ButtonLink href="#work">View work</ButtonLink>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5 text-[10px] tracking-[0.32em] text-muted"
      >
        <span>SCROLL</span>
        <span className="relative h-8 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-muted"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
