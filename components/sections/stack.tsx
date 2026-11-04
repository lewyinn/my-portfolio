"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/animated-text";
import { cardClass, sheenClass } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import type { StackGroup } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionaries/en";

/** One color per channel, in `groups` order. */
const tones = [
  { bar: "bg-deco-blue", text: "text-deco-blue" },
  { bar: "bg-accent", text: "text-accent" },
  { bar: "bg-deco-pink", text: "text-deco-pink" },
  { bar: "bg-deco-yellow", text: "text-deco-yellow" },
];

/** Equalizer bars: fixed (not random) heights so server and client render the same. */
const bars = Array.from({ length: 22 }, (_, i) => {
  const low = 0.18 + ((i * 37) % 30) / 100;
  const high = 0.55 + ((i * 53) % 45) / 100;
  return { keyframes: [low, high, low + 0.15, low], duration: 1 + (i % 5) * 0.18 };
});

/**
 * "Skills & tools", after the design reference: a mixer board whose channel is picked
 * with the cards below. The equalizer bounces, the channel name drops in letter by
 * letter, and the tool list scrolls along the bottom.
 */
type StackProps = {
  t: Dictionary["stack"];
  /** Channels with their description already in the current language. */
  groups: (StackGroup & { desc: string })[];
};

export function Stack({ t, groups }: StackProps) {
  const [active, setActive] = useState(0);
  const group = groups[active];
  const tone = tones[active % tones.length];
  const cmd = group.name.toLowerCase();
  // Enough copies that one half of the strip is always wider than the panel (no empty gap).
  const strip = Array.from(
    { length: Math.ceil(24 / group.tools.length) },
    () => group.tools,
  ).flat();

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <SectionLabel>{t.label}</SectionLabel>
        <SectionHeading
          lead={t.lead}
          accent={t.accent}
          className="font-display text-[clamp(48px,5.6vw,80px)] leading-[0.9]"
        />
        <Reveal>
          <p className="max-w-[460px] text-[15px] leading-relaxed text-muted">{t.intro}</p>
        </Reveal>
      </div>

      <Reveal>
        <div
          aria-live="polite"
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
        >
          <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-5 py-3.5">
            <p className="truncate font-mono text-[10px] tracking-[0.3em] text-muted uppercase">
              {t.mix} / {group.num} · {group.name} {t.stackWord}
            </p>
            <span aria-hidden="true" className="flex shrink-0 gap-1.5">
              {groups.map((item, i) => (
                <span
                  key={item.name}
                  className={`size-1.5 rounded-full transition-colors duration-300 ${
                    i === active ? tone.bar : "bg-white/20"
                  }`}
                />
              ))}
            </span>
          </div>

          <div className="flex flex-col items-center gap-6 px-5 py-10 md:gap-7 md:py-14">
            <div aria-hidden="true" className="flex h-20 items-end gap-1 md:h-24 md:gap-1.5">
              {bars.map((bar, i) => (
                <motion.span
                  key={i}
                  className={`h-full w-1.5 origin-bottom rounded-full transition-colors duration-500 md:w-2 ${tone.bar}`}
                  initial={{ scaleY: bar.keyframes[0] }}
                  animate={{ scaleY: bar.keyframes }}
                  transition={{ duration: bar.duration, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={group.name}
                className="flex gap-1.5 md:gap-2"
                aria-label={group.name}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              >
                {group.name.split("").map((letter, i) => (
                  <motion.span
                    key={`${letter}-${i}`}
                    aria-hidden="true"
                    className="flex h-12 w-9 items-center justify-center rounded-lg border border-white/15 bg-ink font-display text-3xl uppercase shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] md:h-16 md:w-12 md:text-[40px]"
                    initial={{ opacity: 0, y: -18, rotate: -8 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 380, damping: 20, delay: i * 0.04 }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.p>
            </AnimatePresence>

            <p className="font-mono text-xs text-muted">
              <span className={tone.text}>$</span> compile --stack {cmd}
              <span
                aria-hidden="true"
                className="ml-1 inline-block h-3.5 w-2 translate-y-0.5 animate-blink bg-fg motion-reduce:animate-none"
              />
            </p>
          </div>

          <div
            aria-hidden="true"
            className="relative overflow-hidden border-t border-white/[0.08] py-3"
          >
            <div className="absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent" />
            <div className="absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent" />
            <div
              key={group.name}
              className="flex w-max animate-marquee gap-2 motion-reduce:animate-none"
              style={{ animationDuration: `${strip.length * 3}s` }}
            >
              {[...strip, ...strip].map((tool, i) => (
                <Chip key={`${tool}-${i}`} className="shrink-0 tracking-[0.08em] uppercase">
                  {tool}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <div
        role="group"
        aria-label={t.channels}
        className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
      >
        {groups.map((item, i) => {
          const isActive = i === active;
          return (
            <button
              key={item.name}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(i)}
              className={`${cardClass} flex min-h-[112px] flex-col gap-3 p-4 text-left md:min-h-[150px] md:p-5`}
            >
              {isActive ? (
                <motion.span
                  layoutId="stack-active"
                  className="absolute inset-0 rounded-2xl border border-white/40 bg-gradient-to-b from-white/[0.09] to-white/[0.02]"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              ) : null}
              <span className={sheenClass} />
              <span className="relative flex w-full items-center justify-between">
                <span className="font-display text-2xl leading-none">{item.num}</span>
                <span className={`font-mono text-sm ${tones[i % tones.length].text}`}>
                  {item.glyph}
                </span>
              </span>
              <span className="relative font-display text-2xl leading-none uppercase md:text-[28px]">
                {item.name}
              </span>
              <span className="relative hidden text-sm leading-relaxed text-muted md:block">
                {item.desc}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={group.name}
          className="flex flex-col items-center gap-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <ul className="flex flex-wrap justify-center gap-2">
            {group.tools.map((tool) => (
              <li key={tool}>
                <Chip className="px-3.5 py-1.5 text-[13px]">{tool}</Chip>
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
