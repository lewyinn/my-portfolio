"use client";

import { useState, type CSSProperties } from "react";
import { cardClass, sheenClass } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { TechBrandIcon } from "@/components/ui/icons";
import type { StackGroup, StackKey } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";

/** Channel colors matching Figma 04 Portfolio — Stack Channels States. */
const tones = [
  {
    bar: "bg-deco-blue",
    text: "text-deco-blue",
    border: "border-deco-blue/35",
    badge: "border-deco-blue/25 bg-deco-blue/10 text-deco-blue",
    glow: "radial-gradient(ellipse at center, rgb(76 194 255 / 0.14), transparent 70%)",
  },
  {
    bar: "bg-accent",
    text: "text-accent",
    border: "border-accent/35",
    badge: "border-accent/25 bg-accent/10 text-accent",
    glow: "radial-gradient(ellipse at center, rgb(94 242 176 / 0.14), transparent 70%)",
  },
  {
    bar: "bg-deco-teal",
    text: "text-deco-teal",
    border: "border-deco-teal/35",
    badge: "border-deco-teal/25 bg-deco-teal/10 text-deco-teal",
    glow: "radial-gradient(ellipse at center, rgb(45 212 191 / 0.14), transparent 70%)",
  },
  {
    bar: "bg-deco-yellow",
    text: "text-deco-yellow",
    border: "border-deco-yellow/35",
    badge: "border-deco-yellow/25 bg-deco-yellow/10 text-deco-yellow",
    glow: "radial-gradient(ellipse at center, rgb(242 193 78 / 0.14), transparent 70%)",
  },
];

type FloatingLogo = {
  name: string;
  posClass: string;
  rotate: number;
  tiltX: number;
  tiltY: number;
  driftX: number;
  driftY: number;
  mobileCorner?: "left" | "right";
};

const floatingLogos: Record<StackKey, FloatingLogo[]> = {
  frontend: [
    {
      name: "TypeScript",
      posClass: "left-[5%] top-[12%] size-14",
      rotate: -14,
      tiltX: 12,
      tiltY: 16,
      driftX: 4,
      driftY: -8,
      mobileCorner: "left",
    },
    {
      name: "Vue.js",
      posClass: "left-[16%] top-[41%] size-12",
      rotate: 11,
      tiltX: -10,
      tiltY: 14,
      driftX: -5,
      driftY: 7,
    },
    {
      name: "Vite",
      posClass: "left-[8%] bottom-[11%] size-11",
      rotate: -20,
      tiltX: 14,
      tiltY: -12,
      driftX: 6,
      driftY: 6,
    },
    {
      name: "Next.js",
      posClass: "right-[14%] top-[10%] size-13",
      rotate: 16,
      tiltX: -12,
      tiltY: -14,
      driftX: -4,
      driftY: -7,
      mobileCorner: "right",
    },
    {
      name: "React",
      posClass: "right-[5%] top-[45%] size-14",
      rotate: -11,
      tiltX: 10,
      tiltY: -18,
      driftX: 5,
      driftY: 8,
    },
    {
      name: "Tailwind CSS",
      posClass: "right-[15%] bottom-[13%] size-12",
      rotate: 19,
      tiltX: -14,
      tiltY: 12,
      driftX: -6,
      driftY: -6,
    },
  ],
  backend: [
    {
      name: "Golang",
      posClass: "left-[13%] top-[11%] size-13",
      rotate: 13,
      tiltX: -10,
      tiltY: 16,
      driftX: 5,
      driftY: -7,
    },
    {
      name: "Laravel",
      posClass: "left-[5%] top-[44%] size-14",
      rotate: -16,
      tiltX: 14,
      tiltY: 12,
      driftX: -4,
      driftY: 8,
      mobileCorner: "left",
    },
    {
      name: "Python",
      posClass: "left-[15%] bottom-[12%] size-11",
      rotate: 9,
      tiltX: -12,
      tiltY: -14,
      driftX: 6,
      driftY: 6,
    },
    {
      name: "Node.js",
      posClass: "right-[6%] top-[13%] size-14",
      rotate: -13,
      tiltX: 12,
      tiltY: -16,
      driftX: -5,
      driftY: -8,
      mobileCorner: "right",
    },
    {
      name: "PostgreSQL",
      posClass: "right-[16%] top-[40%] size-12",
      rotate: 18,
      tiltX: -14,
      tiltY: -10,
      driftX: 4,
      driftY: 7,
    },
    {
      name: "Redis",
      posClass: "right-[8%] bottom-[12%] size-11",
      rotate: -18,
      tiltX: 10,
      tiltY: 15,
      driftX: -5,
      driftY: -6,
    },
  ],
  mobile: [
    {
      name: "React Native",
      posClass: "left-[8%] top-[16%] size-14",
      rotate: -15,
      tiltX: 12,
      tiltY: 16,
      driftX: 5,
      driftY: -8,
      mobileCorner: "left",
    },
    {
      name: "NativeWind",
      posClass: "left-[15%] bottom-[14%] size-12",
      rotate: 14,
      tiltX: -12,
      tiltY: 14,
      driftX: -5,
      driftY: 7,
    },
    {
      name: "Flutter",
      posClass: "right-[9%] top-[15%] size-14",
      rotate: 17,
      tiltX: -14,
      tiltY: -16,
      driftX: -5,
      driftY: -7,
      mobileCorner: "right",
    },
    {
      name: "React Native",
      posClass: "right-[15%] bottom-[15%] size-12",
      rotate: -12,
      tiltX: 12,
      tiltY: -12,
      driftX: 5,
      driftY: 8,
    },
  ],
  tools: [
    {
      name: "Git & GitHub",
      posClass: "left-[6%] top-[14%] size-13",
      rotate: -15,
      tiltX: 12,
      tiltY: 14,
      driftX: 4,
      driftY: -8,
      mobileCorner: "left",
    },
    {
      name: "Docker",
      posClass: "left-[16%] top-[46%] size-14",
      rotate: 12,
      tiltX: -12,
      tiltY: 16,
      driftX: -5,
      driftY: 7,
      mobileCorner: "right",
    },
    {
      name: "Linux",
      posClass: "left-[7%] bottom-[11%] size-11",
      rotate: -19,
      tiltX: 14,
      tiltY: -12,
      driftX: 6,
      driftY: 6,
    },
    {
      name: "Figma",
      posClass: "right-[14%] top-[12%] size-14",
      rotate: 15,
      tiltX: -12,
      tiltY: -16,
      driftX: -4,
      driftY: -7,
    },
    {
      name: "MQTT",
      posClass: "right-[15%] top-[47%] size-12",
      rotate: 16,
      tiltX: -10,
      tiltY: -14,
      driftX: -5,
      driftY: 6,
    },
    {
      name: "ThingsBoard",
      posClass: "right-[6%] bottom-[18%] size-13",
      rotate: -11,
      tiltX: 10,
      tiltY: -14,
      driftX: 5,
      driftY: 8,
    },
  ],
};

/** Equalizer bars: deterministic keyframes so SSR and CSR match. */
const bars = Array.from({ length: 24 }, (_, i) => {
  const low = 0.2 + ((i * 37) % 30) / 100;
  const high = 0.56 + ((i * 53) % 44) / 100;
  return { keyframes: [low, high, low + 0.14, low], duration: 1 + (i % 5) * 0.18 };
});

type StackProps = {
  t: Dictionary["stack"];
  groups: (StackGroup & { desc: string })[];
};

export function Stack({ t, groups }: StackProps) {
  const [active, setActive] = useState(0);
  const group = groups[active];
  const tone = tones[active % tones.length];
  const logos = floatingLogos[group.key] ?? [];
  const strip = Array.from(
    { length: Math.ceil(12 / group.tools.length) },
    () => group.tools,
  ).flat();

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <div
        aria-live="polite"
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01]"
      >
        {/* Mixer Header without READY status badge per Figma spec */}
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-5 py-3.5">
          <p className="truncate font-mono text-[10px] tracking-[0.28em] text-muted uppercase">
            {group.num} · {group.name.toUpperCase()} {t.stackWord}
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

        <div
          className="relative flex flex-col items-center gap-6 px-5 py-10 md:gap-7 md:py-14"
          style={{ backgroundImage: tone.glow }}
        >
          {/* Subtle Stage Dot Grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:20px_20px] opacity-55"
          />

          {/* Floating dimensional scattered brand logo tiles (desktop, GPU CSS drift) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden [perspective:900px] md:block"
          >
            <div
              key={`logos-${group.key}`}
              className="relative size-full animate-fade-in [transform-style:preserve-3d] motion-reduce:animate-none"
            >
              {logos.map((logo, i) => (
                <div
                  key={`${logo.name}-${i}`}
                  style={
                    {
                      "--rot": `${logo.rotate}deg`,
                      "--rx": `${logo.tiltX}deg`,
                      "--ry": `${logo.tiltY}deg`,
                      "--dx": `${logo.driftX}px`,
                      "--dy": `${logo.driftY}px`,
                      animationDuration: `${3.8 + (i % 3) * 0.7}s`,
                      animationDelay: `${i * 0.18}s`,
                    } as CSSProperties
                  }
                  className={`absolute flex animate-tile-drift items-center justify-center rounded-2xl border border-b-[3px] border-t-white/25 border-r-white/10 border-b-black/60 border-l-white/15 bg-gradient-to-br from-surface-deep via-surface to-ink motion-reduce:animate-none ${logo.posClass}`}
                >
                  <TechBrandIcon name={logo.name} className="size-[55%]" />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile top corner brand tiles */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-4 top-4 flex justify-between md:hidden"
          >
            {logos
              .filter((l) => l.mobileCorner)
              .map((logo) => (
                <span
                  key={`${logo.name}-${logo.mobileCorner}`}
                  className={`flex size-9 items-center justify-center rounded-xl border border-b-2 border-white/15 bg-surface-deep/90 ${
                    logo.mobileCorner === "left" ? "-rotate-12" : "rotate-12"
                  }`}
                >
                  <TechBrandIcon name={logo.name} className="size-5" />
                </span>
              ))}
          </div>

          {/* EQ Spectrum (GPU CSS animation to keep main-thread TBT minimal) */}
          <div aria-hidden="true" className="relative flex h-20 items-end gap-1 md:h-24 md:gap-1.5">
            {bars.map((bar, i) => (
              <span
                key={i}
                style={
                  {
                    "--eq-low": bar.keyframes[0],
                    "--eq-high": bar.keyframes[1],
                    animationDuration: `${bar.duration}s`,
                  } as CSSProperties
                }
                className={`h-full w-1.5 origin-bottom animate-eq-bar rounded-full transition-colors duration-500 motion-reduce:animate-none md:w-2 ${tone.bar}`}
              />
            ))}
          </div>

          {/* Mechanical Keycaps Row */}
          <p key={group.name} className="relative flex flex-wrap justify-center gap-1.5 md:gap-2">
            <span className="sr-only">{group.name}</span>
            <span aria-hidden="true" className="contents">
              {group.name
                .toUpperCase()
                .split("")
                .map((letter, i) => (
                  <span
                    key={`${letter}-${i}`}
                    style={{ animationDelay: `${i * 0.04}s` }}
                    className="relative flex h-12 w-9 animate-keycap-pop items-center justify-center rounded-lg border border-b-[3px] border-white/15 bg-ink font-display text-3xl uppercase motion-reduce:animate-none md:h-16 md:w-12 md:text-[40px]"
                  >
                    {letter}
                    <span
                      className={`absolute right-1.5 bottom-1.5 size-1 rounded-full ${tone.bar}`}
                    />
                  </span>
                ))}
            </span>
          </p>

          {/* Terminal Pill with unique channel CLI command */}
          <p className="relative inline-flex items-center rounded-full border border-white/10 bg-ink/85 px-4 py-1.5 font-mono text-xs text-muted">
            <span className={`mr-2 ${tone.text}`}>$</span>
            <span>{group.command}</span>
            <span
              aria-hidden="true"
              className="ml-1.5 inline-block h-3.5 w-1.5 animate-blink bg-fg motion-reduce:animate-none"
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
              <Chip key={`${tool}-${i}`} className="shrink-0 gap-1.5 tracking-[0.08em] uppercase">
                <TechBrandIcon name={tool} className="size-3.5 shrink-0" />
                <span>{tool}</span>
              </Chip>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Channel Selector Cards */}
      <div
        role="group"
        aria-label={t.channels}
        className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
      >
        {groups.map((item, i) => {
          const isActive = i === active;
          const cardTone = tones[i % tones.length];
          return (
            <button
              key={item.name}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(i)}
              className={`${cardClass} flex min-h-[118px] flex-col gap-2.5 p-4 text-left md:min-h-[154px] md:p-5`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 rounded-2xl border bg-gradient-to-b from-white/[0.08] to-white/[0.015] transition-opacity duration-200 ${cardTone.border} ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
              <span className={sheenClass} />
              <span className="relative flex w-full items-center justify-between gap-2">
                <span className="font-display text-2xl leading-none">{item.num}</span>
                <span className="flex items-center gap-2">
                  <span
                    className={`rounded-full border px-2 py-0.5 font-mono text-[9px] font-semibold tracking-[0.12em] uppercase ${cardTone.badge}`}
                  >
                    {item.tools.length} {t.toolsUnit}
                  </span>
                  <span className={`font-mono text-sm ${cardTone.text}`}>{item.glyph}</span>
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
    </div>
  );
}
