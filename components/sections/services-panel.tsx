"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type CSSProperties, type ReactNode } from "react";
import { cardClass, sheenClass } from "@/components/ui/card";
import type { Service } from "@/lib/data";

const spring = { type: "spring", stiffness: 260, damping: 18 } as const;

/** Line icons (24×24, stroke) shown around each service title. */
const icons = {
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  growth: <path d="m3 17 6-6 4 4 8-8M15 7h6v6" />,
  edit: <path d="M4 20h4L19 9l-4-4L4 16zM13 7l4 4" />,
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M10 21v-4h4v4" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  bell: <path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4zM10 21h4" />,
  download: <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />,
  pin: (
    <>
      <path d="M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  camera: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="m8 7 2-3h4l2 3" />
      <circle cx="12" cy="13.5" r="3.5" />
    </>
  ),
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  rocket: (
    <>
      <path d="M12 2c4 3 6 7 5 12l-3 3h-4l-3-3c-1-5 1-9 5-12zM9 21h6" />
      <circle cx="12" cy="9" r="2" />
    </>
  ),
  megaphone: <path d="M3 10v4h4l8 5V5l-8 5zM18 9a4 4 0 0 1 0 6" />,
  click: <path d="m5 3 14 7-6 2-2 6z" />,
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  sparkle: <path d="m12 3 2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />,
  dashboard: (
    <>
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="5" rx="1.5" />
      <rect x="13" y="10" width="8" height="11" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20a6 6 0 0 1 12 0M16 4.5a3.5 3.5 0 0 1 0 7M21 20a6 6 0 0 0-4-5.6" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" />
    </>
  ),
  code: <path d="m8 8-5 4 5 4M16 8l5 4-5 4M13.5 5l-3 14" />,
} satisfies Record<string, ReactNode>;

type IconName = keyof typeof icons;

function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {icons[name]}
    </svg>
  );
}

type Slot = { style: CSSProperties; rotate: number; icon: IconName };

type Scene = {
  /** Dashed flow line, in a 1200×440 viewBox. */
  path: string;
  /** Background blobs: color classes and organic shapes. */
  blobA: string;
  blobB: string;
  /** Icon tile border tint, icon color, and the dot that travels along the path. */
  pill: string;
  tone: string;
  dot: string;
  /** Where the icon tiles sit around the title (desktop). */
  slots: Slot[];
  /** Service-specific decorations. */
  decor: ReactNode;
};

/**
 * Decoration that bounces in (re-mounts and replays on service change), then keeps
 * floating up and down so the scene never sits still.
 */
function Pop({
  className,
  children,
  delay = 0,
  from = { scale: 0.5, rotate: -20 },
  to = { scale: 1, rotate: 0 },
  float = 10,
  duration = 4,
}: {
  className: string;
  children?: ReactNode;
  delay?: number;
  from?: Record<string, number>;
  to?: Record<string, number>;
  /** Float distance in px. */
  float?: number;
  /** Seconds per float cycle. */
  duration?: number;
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={from}
      animate={to}
      transition={{ ...spring, delay }}
    >
      <motion.div
        className="size-full"
        animate={{ y: [0, -float, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut", delay: delay + 0.6 }}
      >
        {children}
      </motion.div>
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
    tone: "text-deco-blue",
    dot: "stroke-deco-blue",
    slots: [
      { style: { left: "7%", top: "16%" }, rotate: -5, icon: "globe" },
      { style: { left: "4%", top: "46%" }, rotate: 4, icon: "search" },
      { style: { left: "11%", top: "74%" }, rotate: -3, icon: "building" },
      { style: { right: "8%", top: "14%" }, rotate: 4, icon: "growth" },
      { style: { right: "4%", top: "46%" }, rotate: -6, icon: "edit" },
      { style: { right: "12%", top: "74%" }, rotate: 3, icon: "mail" },
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
        <Pop className="top-[16%] right-[18%] size-4" delay={0.05} float={14} duration={3}>
          <span className="block size-full rounded-full bg-deco-yellow" />
        </Pop>
      </>
    ),
  },

  // Mobile apps: phone, notification badge, signal rings, looping path, pink.
  mobile: {
    path: "M200 120 C 320 40, 440 140, 360 220 S 220 330, 380 340 S 760 300, 900 340 S 1050 260, 1000 170",
    blobA: "bg-deco-pink/20 [border-radius:40%_60%_62%_38%/52%_40%_60%_48%]",
    blobB: "bg-deco-pink/35 [border-radius:62%_38%_46%_54%/40%_58%_42%_60%]",
    pill: "border-deco-pink/40",
    tone: "text-deco-pink",
    dot: "stroke-deco-pink",
    slots: [
      { style: { left: "5%", top: "22%" }, rotate: 6, icon: "phone" },
      { style: { left: "10%", top: "52%" }, rotate: -4, icon: "bell" },
      { style: { left: "4%", top: "78%" }, rotate: 3, icon: "pin" },
      { style: { right: "6%", top: "24%" }, rotate: -5, icon: "download" },
      { style: { right: "11%", top: "54%" }, rotate: 5, icon: "chat" },
      { style: { right: "5%", top: "80%" }, rotate: -3, icon: "camera" },
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
    tone: "text-accent",
    dot: "stroke-accent",
    slots: [
      { style: { left: "8%", top: "12%" }, rotate: -3, icon: "target" },
      { style: { left: "3%", top: "40%" }, rotate: 5, icon: "megaphone" },
      { style: { left: "9%", top: "68%" }, rotate: -6, icon: "click" },
      { style: { right: "6%", top: "34%" }, rotate: 3, icon: "rocket" },
      { style: { right: "10%", top: "62%" }, rotate: -4, icon: "growth" },
      { style: { right: "4%", top: "84%" }, rotate: 5, icon: "sparkle" },
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
    tone: "text-deco-yellow",
    dot: "stroke-deco-yellow",
    slots: [
      { style: { left: "6%", top: "28%" }, rotate: 4, icon: "dashboard" },
      { style: { left: "12%", top: "56%" }, rotate: -5, icon: "database" },
      { style: { left: "5%", top: "82%" }, rotate: 3, icon: "code" },
      { style: { right: "9%", top: "12%" }, rotate: -4, icon: "lock" },
      { style: { right: "4%", top: "40%" }, rotate: 6, icon: "users" },
      { style: { right: "8%", top: "66%" }, rotate: -3, icon: "gear" },
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
 * dashed path that flows, icon tiles for what the service covers, and decorations. Each
 * service has its own colors, path, layout, icons, and motifs; picking another service
 * makes the scene bounce over. Everything keeps drifting (transform and dash offset only).
 */
type ServicesPanelProps = {
  /** Services with name and description already in the current language. */
  services: (Service & { name: string; desc: string })[];
  labels: { service: string; group: string };
};

export function ServicesPanel({ services, labels }: ServicesPanelProps) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const current = services[active];
  const scene = scenes[current.cmd];

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <div
        aria-live="polite"
        className="relative min-h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] md:min-h-[440px]"
      >
        {/* Dashed flow line: the dashes march along it and a colored dot travels its length. */}
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
          <motion.path
            d={scene.path}
            fill="none"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="3"
            strokeDasharray="10 12"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            animate={reduceMotion ? undefined : { strokeDashoffset: [0, -44] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          />
          {reduceMotion ? null : (
            // A zero-length dash with round caps draws a dot that stays round even though
            // the SVG stretches; moving the dash offset moves the dot along the path.
            <motion.path
              d={scene.path}
              fill="none"
              pathLength={100}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="0 100"
              vectorEffect="non-scaling-stroke"
              className={scene.dot}
              animate={{ strokeDashoffset: [0, -100] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
          )}
        </motion.svg>

        {/* Two soft blobs behind the title, tinted per service; they slowly turn and breathe. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <motion.span
            key={`blob-a-${current.cmd}`}
            className="absolute top-1/2 left-1/2 -mt-36 -ml-40 size-64 md:-mt-44 md:-ml-48 md:size-80"
            initial={{ scale: 0.85, rotate: -12 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 14 }}
          >
            <motion.span
              className={`block size-full ${scene.blobA}`}
              animate={{ rotate: 360, scale: [1, 1.06, 1] }}
              transition={{
                rotate: { duration: 40, repeat: Infinity, ease: "linear" },
                scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          </motion.span>
          <motion.span
            key={`blob-b-${current.cmd}`}
            className="absolute top-1/2 left-1/2 -mt-16 -ml-6 size-48 md:-mt-20 md:size-60"
            initial={{ scale: 0.8, rotate: 16 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 14, delay: 0.05 }}
          >
            <motion.span
              className={`block size-full ${scene.blobB}`}
              animate={{ rotate: -360, scale: [1, 0.94, 1] }}
              transition={{
                rotate: { duration: 32, repeat: Infinity, ease: "linear" },
                scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          </motion.span>
        </div>

        {/* Service-specific decorations */}
        <div
          key={`decor-${current.cmd}`}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          {scene.decor}
        </div>

        {/* Icon tiles (desktop): pop in, then bob at their own pace. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
          <AnimatePresence initial={false}>
            {scene.slots.map((slot, i) => (
              <motion.span
                key={`${current.cmd}-${slot.icon}-${i}`}
                className="absolute"
                style={slot.style}
                initial={{ opacity: 0, scale: 0.6, y: 12, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: slot.rotate }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ ...spring, delay: 0.04 * i }}
              >
                <motion.span
                  className={`flex size-14 items-center justify-center rounded-2xl border bg-ink shadow-[0_10px_24px_-8px_rgba(0,0,0,0.8)] ${scene.pill} ${scene.tone}`}
                  animate={{ y: [0, i % 2 ? 8 : -8, 0], rotate: [0, i % 2 ? -4 : 4, 0] }}
                  transition={{
                    duration: 3.2 + (i % 3) * 0.7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5 + i * 0.15,
                  }}
                >
                  <Icon name={slot.icon} className="size-6" />
                </motion.span>
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
                {labels.service} {current.num}
              </p>
              <p className="max-w-[12ch] font-display text-[clamp(52px,7.5vw,108px)] leading-[0.88] uppercase">
                {current.name}
              </p>
              <p className="max-w-sm text-sm leading-relaxed text-fg/80 md:text-[15px]">
                {current.desc}
              </p>
              {/* On phones the icons sit in a row under the text instead of around it. */}
              <ul aria-hidden="true" className="mt-1 flex flex-wrap justify-center gap-2 md:hidden">
                {scene.slots.map((slot, i) => (
                  <li
                    key={`${slot.icon}-${i}`}
                    className={`flex size-11 items-center justify-center rounded-xl border bg-ink ${scene.pill} ${scene.tone}`}
                  >
                    <Icon name={slot.icon} className="size-5" />
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div
        role="group"
        aria-label={labels.group}
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
