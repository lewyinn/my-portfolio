"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type CSSProperties, type ReactNode } from "react";
import { cardClass, sheenClass } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { services } from "@/lib/data";

const spring = { type: "spring", stiffness: 260, damping: 18 } as const;

type Slot = { style: CSSProperties; rotate: number };

type Scene = {
  /** Dashed flow line, in a 1200×440 viewBox. */
  path: string;
  /** Background blobs: color classes and organic shapes. */
  blobA: string;
  blobB: string;
  /** Pill border tint. */
  pill: string;
  /** Where the tool pills sit around the title (desktop). */
  slots: Slot[];
  /** Service-specific decorations. */
  decor: ReactNode;
};

/** Small bounce-in wrapper for decorations; re-mounts (and replays) on service change. */
function Pop({
  className,
  children,
  delay = 0,
  from = { scale: 0.5, rotate: -20 },
  to = { scale: 1, rotate: 0 },
}: {
  className: string;
  children?: ReactNode;
  delay?: number;
  from?: Record<string, number>;
  to?: Record<string, number>;
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={from}
      animate={to}
      transition={{ ...spring, delay }}
    >
      {children}
    </motion.div>
  );
}

const scenes: Record<string, Scene> = {
  // Business websites: browser window and cursor, calm wave, blue.
  business: {
    path: "M230 300 C 300 170, 420 190, 520 250 S 700 70, 880 110 S 1000 200, 1010 230",
    blobA: "bg-deco-blue/20 [border-radius:58%_42%_55%_45%/48%_56%_44%_52%]",
    blobB: "bg-deco-blue/35 [border-radius:46%_54%_40%_60%/55%_45%_58%_42%]",
    pill: "border-deco-blue/40",
    slots: [
      { style: { left: "7%", top: "16%" }, rotate: -5 },
      { style: { left: "4%", top: "46%" }, rotate: 4 },
      { style: { left: "11%", top: "74%" }, rotate: -3 },
      { style: { right: "8%", top: "14%" }, rotate: 4 },
      { style: { right: "4%", top: "46%" }, rotate: -6 },
      { style: { right: "12%", top: "74%" }, rotate: 3 },
    ],
    decor: (
      <>
        <Pop
          className="top-[24%] left-[17%] hidden md:block"
          from={{ scale: 0.6, rotate: -14 }}
          to={{ scale: 1, rotate: -6 }}
        >
          <div className="h-16 w-24 overflow-hidden rounded-lg border-2 border-deco-blue bg-deco-blue/15">
            <div className="flex gap-1 border-b-2 border-deco-blue px-1.5 py-1">
              <span className="size-1.5 rounded-full bg-deco-pink" />
              <span className="size-1.5 rounded-full bg-deco-yellow" />
              <span className="size-1.5 rounded-full bg-accent" />
            </div>
          </div>
        </Pop>
        <Pop
          className="right-[22%] bottom-[20%] size-7"
          from={{ x: 20, y: 20 }}
          to={{ x: 0, y: 0 }}
        >
          <svg viewBox="0 0 24 24" className="size-full fill-fg">
            <path d="M4 2l16 9-7 2-3 7z" />
          </svg>
        </Pop>
        <Pop className="top-[16%] right-[18%] size-4 rounded-full bg-deco-yellow" delay={0.05} />
      </>
    ),
  },

  // Mobile apps: phone, notification badge, signal rings, looping path, pink.
  mobile: {
    path: "M200 120 C 320 40, 440 140, 360 220 S 220 330, 380 340 S 760 300, 900 340 S 1050 260, 1000 170",
    blobA: "bg-deco-pink/20 [border-radius:40%_60%_62%_38%/52%_40%_60%_48%]",
    blobB: "bg-deco-pink/35 [border-radius:62%_38%_46%_54%/40%_58%_42%_60%]",
    pill: "border-deco-pink/40",
    slots: [
      { style: { left: "5%", top: "22%" }, rotate: 6 },
      { style: { left: "10%", top: "52%" }, rotate: -4 },
      { style: { left: "4%", top: "78%" }, rotate: 3 },
      { style: { right: "6%", top: "24%" }, rotate: -5 },
      { style: { right: "11%", top: "54%" }, rotate: 5 },
      { style: { right: "5%", top: "80%" }, rotate: -3 },
    ],
    decor: (
      <>
        <Pop
          className="top-[14%] right-[19%] hidden md:block"
          from={{ y: -30, rotate: 20 }}
          to={{ y: 0, rotate: 8 }}
        >
          <div className="relative h-20 w-12 rounded-xl border-2 border-deco-pink bg-deco-pink/15">
            <span className="absolute top-1.5 left-1/2 h-1 w-4 -translate-x-1/2 rounded-full bg-deco-pink" />
            <span className="absolute bottom-2 left-1/2 size-2 -translate-x-1/2 rounded-full border border-deco-pink" />
          </div>
        </Pop>
        <Pop className="top-[20%] left-[19%]" delay={0.08}>
          <span className="flex size-7 items-center justify-center rounded-full bg-deco-pink text-xs font-bold text-ink">
            3
          </span>
        </Pop>
        <Pop className="bottom-[16%] left-[24%] size-10" from={{ scale: 0.3 }} to={{ scale: 1 }}>
          <svg
            viewBox="0 0 40 40"
            fill="none"
            className="size-full stroke-deco-blue"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <path d="M8 30a16 16 0 0 1 24 0" />
            <path d="M13 24a9 9 0 0 1 14 0" />
            <circle cx="20" cy="31" r="1.5" className="fill-deco-blue" />
          </svg>
        </Pop>
      </>
    ),
  },

  // Landing pages: target, arrow up, sparkle, rising path, mint.
  landing: {
    path: "M160 360 C 360 360, 420 300, 560 260 S 820 150, 1040 80",
    blobA: "bg-accent/15 [border-radius:50%_50%_42%_58%/60%_46%_54%_40%]",
    blobB: "bg-accent/30 [border-radius:55%_45%_60%_40%/45%_55%_45%_55%]",
    pill: "border-accent/40",
    slots: [
      { style: { left: "8%", top: "12%" }, rotate: -3 },
      { style: { left: "3%", top: "40%" }, rotate: 5 },
      { style: { left: "9%", top: "68%" }, rotate: -6 },
      { style: { right: "6%", top: "34%" }, rotate: 3 },
      { style: { right: "10%", top: "62%" }, rotate: -4 },
      { style: { right: "4%", top: "84%" }, rotate: 5 },
    ],
    decor: (
      <>
        <Pop
          className="top-[12%] right-[17%] size-16"
          from={{ scale: 0.4, rotate: 90 }}
          to={{ scale: 1, rotate: 0 }}
        >
          <svg viewBox="0 0 64 64" fill="none" className="size-full" strokeWidth="3">
            <circle cx="32" cy="32" r="28" className="stroke-accent" />
            <circle cx="32" cy="32" r="18" className="stroke-accent/70" />
            <circle cx="32" cy="32" r="7" className="fill-accent" />
          </svg>
        </Pop>
        <Pop className="bottom-[18%] left-[20%] size-9" from={{ y: 30 }} to={{ y: 0 }}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="size-full stroke-deco-yellow"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20V5" />
            <path d="m5 11 7-7 7 7" />
          </svg>
        </Pop>
        <Pop className="top-[22%] left-[20%] hidden size-8 md:block" delay={0.06}>
          <svg viewBox="0 0 24 24" className="size-full fill-fg">
            <path d="M12 0c.8 6.4 5.6 11.2 12 12-6.4.8-11.2 5.6-12 12-.8-6.4-5.6-11.2-12-12C6.4 11.2 11.2 6.4 12 0z" />
          </svg>
        </Pop>
      </>
    ),
  },

  // Web apps: bar chart, dashboard grid, code brackets, zigzag path, yellow.
  webapp: {
    path: "M180 200 L 320 280 L 460 180 L 600 300 L 760 160 L 900 260 L 1040 200",
    blobA: "bg-deco-yellow/15 [border-radius:30%_70%_40%_60%/50%_35%_65%_50%]",
    blobB: "bg-deco-yellow/30 [border-radius:60%_40%_30%_70%/40%_60%_40%_60%]",
    pill: "border-deco-yellow/40",
    slots: [
      { style: { left: "6%", top: "28%" }, rotate: 4 },
      { style: { left: "12%", top: "56%" }, rotate: -5 },
      { style: { left: "5%", top: "82%" }, rotate: 3 },
      { style: { right: "9%", top: "12%" }, rotate: -4 },
      { style: { right: "4%", top: "40%" }, rotate: 6 },
      { style: { right: "8%", top: "66%" }, rotate: -3 },
    ],
    decor: (
      <>
        <Pop
          className="top-[14%] left-[16%] hidden md:flex"
          from={{ scaleY: 0 }}
          to={{ scaleY: 1 }}
        >
          <div className="flex h-14 items-end gap-1.5">
            <span className="h-[45%] w-3 rounded-sm bg-deco-yellow/60" />
            <span className="h-[80%] w-3 rounded-sm bg-deco-yellow" />
            <span className="h-[60%] w-3 rounded-sm bg-deco-yellow/80" />
          </div>
        </Pop>
        <Pop
          className="right-[20%] bottom-[16%]"
          from={{ rotate: -45, scale: 0.6 }}
          to={{ rotate: 0, scale: 1 }}
        >
          <div className="grid grid-cols-2 gap-1">
            <span className="size-4 rounded-[4px] bg-deco-yellow" />
            <span className="size-4 rounded-[4px] border-2 border-deco-yellow" />
            <span className="size-4 rounded-[4px] border-2 border-deco-yellow" />
            <span className="size-4 rounded-[4px] bg-deco-blue" />
          </div>
        </Pop>
        <Pop
          className="top-[22%] right-[24%] hidden md:block"
          delay={0.06}
          from={{ y: -20 }}
          to={{ y: 0 }}
        >
          <span className="font-mono text-2xl font-bold text-deco-yellow">&lt;/&gt;</span>
        </Pop>
      </>
    ),
  },
};

/**
 * Service "scene", after the design reference: the service name over two soft blobs, a
 * dashed path, its tools as scattered pills, and decorations. Each service has its own
 * colors, path, layout, and motifs; picking another service makes the scene bounce over.
 */
export function ServicesPanel() {
  const [active, setActive] = useState(0);
  const current = services[active];
  const scene = scenes[current.cmd];

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <div
        aria-live="polite"
        className="relative min-h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] md:min-h-[440px]"
      >
        {/* Dashed flow line */}
        <motion.svg
          key={`path-${current.cmd}`}
          aria-hidden="true"
          viewBox="0 0 1200 440"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 hidden size-full md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <path
            d={scene.path}
            fill="none"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="3"
            strokeDasharray="10 12"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </motion.svg>

        {/* Two soft blobs behind the title, tinted per service */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <motion.span
            key={`blob-a-${current.cmd}`}
            className={`absolute top-1/2 left-1/2 -mt-36 -ml-40 size-64 md:-mt-44 md:-ml-48 md:size-80 ${scene.blobA}`}
            initial={{ scale: 0.85, rotate: -12 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 14 }}
          />
          <motion.span
            key={`blob-b-${current.cmd}`}
            className={`absolute top-1/2 left-1/2 -mt-16 -ml-6 size-48 md:-mt-20 md:size-60 ${scene.blobB}`}
            initial={{ scale: 0.8, rotate: 16 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 14, delay: 0.05 }}
          />
        </div>

        {/* Service-specific decorations */}
        <div
          key={`decor-${current.cmd}`}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          {scene.decor}
        </div>

        {/* Tool pills (desktop) */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <AnimatePresence initial={false}>
            {current.tools.slice(0, scene.slots.length).map((tool, i) => (
              <motion.span
                key={`${current.cmd}-${tool}`}
                className={`absolute rounded-full border bg-ink px-4 py-2 text-sm font-medium shadow-[0_10px_24px_-8px_rgba(0,0,0,0.8)] ${scene.pill}`}
                style={scene.slots[i].style}
                initial={{ opacity: 0, scale: 0.6, y: 12, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: scene.slots[i].rotate }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ ...spring, delay: 0.04 * i }}
              >
                {tool}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        {/* Title block */}
        <div className="relative flex min-h-[420px] flex-col items-center justify-center gap-4 px-6 py-12 text-center md:min-h-[440px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.cmd}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-4"
            >
              <p className="text-[10px] tracking-[0.32em] text-muted uppercase md:text-[11px]">
                Service {current.num}
              </p>
              <p className="max-w-[12ch] font-display text-[clamp(52px,7.5vw,108px)] leading-[0.88] uppercase">
                {current.name}
              </p>
              <p className="max-w-sm text-sm leading-relaxed text-fg/80 md:text-[15px]">
                {current.desc}
              </p>
              {/* On phones the pills sit under the text instead of around it. */}
              <ul className="mt-1 flex flex-wrap justify-center gap-2 md:hidden">
                {current.tools.map((tool) => (
                  <li key={tool}>
                    <Chip className={`bg-ink ${scene.pill}`}>{tool}</Chip>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div
        role="group"
        aria-label="Services"
        className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
      >
        {services.map((service, i) => {
          const isActive = i === active;
          return (
            <button
              key={service.cmd}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(i)}
              className={`${cardClass} flex min-h-[112px] flex-col gap-3 p-4 text-left md:min-h-[184px] md:p-6`}
            >
              {isActive ? (
                <motion.span
                  layoutId="service-active"
                  className="absolute inset-0 rounded-2xl border border-white/40 bg-gradient-to-b from-white/[0.09] to-white/[0.02]"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              ) : null}
              <span className={sheenClass} />
              <span className="relative flex w-full items-center justify-between text-[13px] font-semibold">
                <span>{service.num}</span>
                <span className="font-mono text-accent">{service.glyph}</span>
              </span>
              <span className="relative font-display text-2xl leading-none uppercase md:text-[32px]">
                {service.name}
              </span>
              <span className="relative hidden text-sm leading-relaxed text-muted md:block">
                {service.desc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
