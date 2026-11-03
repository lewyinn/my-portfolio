"use client";

import { motion, type Variants } from "motion/react";

type Tone = "fg" | "muted" | "accent";
export type Segment = { text: string; tone?: Tone };

const toneClass: Record<Tone, string> = {
  fg: "",
  muted: "text-muted",
  accent: "text-accent",
};

const word: Variants = {
  hidden: { y: "105%" },
  show: { y: "0%", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

type AnimatedTextProps = {
  /** Each inner array is one line; each segment can have its own tone. */
  lines: Segment[][];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
};

/** Heading whose words slide up from a mask when scrolled into view. */
export function AnimatedText({ lines, as: Tag = "h2", className = "" }: AnimatedTextProps) {
  const label = lines.map((line) => line.map((s) => s.text).join(" ")).join(" ");

  return (
    <Tag className={className}>
      <span className="sr-only">{label}</span>
      <motion.span
        aria-hidden="true"
        className="block"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ staggerChildren: 0.06 }}
      >
        {lines.map((line, lineIndex) => {
          const words = line.flatMap((segment) =>
            segment.text.split(" ").map((text) => ({ text, tone: segment.tone ?? "fg" })),
          );
          return (
            <span key={lineIndex} className="block">
              {words.map((w, i) => (
                <span key={i}>
                  <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <motion.span variants={word} className={`inline-block ${toneClass[w.tone]}`}>
                      {w.text}
                    </motion.span>
                  </span>
                  {i < words.length - 1 ? " " : null}
                </span>
              ))}
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}

/** Section heading with the accent on the last word(s), per the design rules. */
export function SectionHeading({
  lead,
  accent,
  as = "h2",
  className = "font-display text-[clamp(56px,7vw,104px)] leading-[0.9]",
}: {
  lead: string;
  accent: string;
  as?: AnimatedTextProps["as"];
  className?: string;
}) {
  return (
    <AnimatedText
      as={as}
      className={className}
      lines={[[{ text: lead }, { text: accent, tone: "accent" }]]}
    />
  );
}
