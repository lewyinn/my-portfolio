"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { cardClass, sheenClass } from "@/components/ui/card";
import type { Service } from "@/lib/data";

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
  path: string;
  blobA: string;
  blobB: string;
  pill: string;
  tag: string;
  cardBorder: string;
  tone: string;
  dot: string;
  slots: Slot[];
  decor: ReactNode;
};

function Pop({
  className,
  children,
  delay = 0,
  to,
  float = 10,
  duration = 4,
}: {
  className: string;
  children?: ReactNode;
  delay?: number;
  from?: Record<string, number>;
  to?: Record<string, number>;
  float?: number;
  duration?: number;
}) {
  return (
    <div
      className={`absolute animate-fade-in motion-reduce:animate-none ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div
        className="size-full animate-bob motion-reduce:animate-none"
        style={
          {
            "--bob-y": `${-float}px`,
            "--bob-r": "0deg",
            "--rot": `${to?.rotate ?? 0}deg`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay + 0.3}s`,
          } as CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
}

const scenes: Record<string, Scene> = {
  web: {
    path: "M230 300 C 300 170, 420 190, 520 250 S 700 70, 880 110 S 1000 200, 1010 230",
    blobA: "bg-deco-blue/20 [border-radius:58%_42%_55%_45%/48%_56%_44%_52%]",
    blobB: "bg-deco-blue/35 [border-radius:46%_54%_40%_60%/55%_45%_58%_42%]",
    pill: "border-deco-blue/40",
    tag: "border-deco-blue/30 bg-deco-blue/10 text-deco-blue",
    cardBorder: "border-deco-blue/40",
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
              <span className="size-1.5 rounded-full bg-deco-teal" />
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

  mobile: {
    path: "M200 120 C 320 40, 440 140, 360 220 S 220 330, 380 340 S 760 300, 900 340 S 1050 260, 1000 170",
    blobA: "bg-deco-teal/20 [border-radius:40%_60%_62%_38%/52%_40%_60%_48%]",
    blobB: "bg-deco-teal/35 [border-radius:62%_38%_46%_54%/40%_58%_42%_60%]",
    pill: "border-deco-teal/40",
    tag: "border-deco-teal/30 bg-deco-teal/10 text-deco-teal",
    cardBorder: "border-deco-teal/40",
    tone: "text-deco-teal",
    dot: "stroke-deco-teal",
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
          <div className="relative h-20 w-12 rounded-xl border-2 border-deco-teal bg-deco-teal/15">
            <span className="absolute top-1.5 left-1/2 h-1 w-4 -translate-x-1/2 rounded-full bg-deco-teal" />
            <span className="absolute bottom-2 left-1/2 size-2 -translate-x-1/2 rounded-full border border-deco-teal" />
          </div>
        </Pop>
        <Pop className="top-[20%] left-[19%]" delay={0.08}>
          <span className="flex size-7 items-center justify-center rounded-full bg-deco-teal text-xs font-bold text-ink">
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

  solutions: {
    path: "M180 200 L 320 280 L 460 180 L 600 300 L 760 160 L 900 260 L 1040 200",
    blobA: "bg-deco-yellow/15 [border-radius:30%_70%_40%_60%/50%_35%_65%_50%]",
    blobB: "bg-deco-yellow/30 [border-radius:60%_40%_30%_70%/40%_60%_40%_60%]",
    pill: "border-deco-yellow/40",
    tag: "border-deco-yellow/30 bg-deco-yellow/10 text-deco-yellow",
    cardBorder: "border-deco-yellow/40",
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

type ServiceItem = Service & {
  name: string;
  stageDesc: string;
  cardDesc: string;
  tags: string[];
};

type ServicesPanelProps = {
  services: ServiceItem[];
  labels: { service: string; group: string };
};

export function ServicesPanel({ services, labels }: ServicesPanelProps) {
  const [active, setActive] = useState(0);
  const current = services[active];
  const scene = scenes[current.cmd] ?? scenes.web;

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {/* Services Stage (holds complete description + Scope Tags) */}
      <div
        aria-live="polite"
        className="relative min-h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] md:min-h-[440px]"
      >
        <svg
          key={`path-${current.cmd}`}
          aria-hidden="true"
          viewBox="0 0 1200 440"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 hidden size-full animate-fade-in motion-reduce:animate-none md:block"
        >
          <path
            d={scene.path}
            fill="none"
            stroke="rgba(255,255,255,0.24)"
            strokeWidth="3"
            strokeDasharray="10 12"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            className="animate-dash-flow motion-reduce:animate-none"
          />
          <path
            d={scene.path}
            fill="none"
            pathLength={100}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="0 100"
            vectorEffect="non-scaling-stroke"
            className={`animate-dot-flow motion-reduce:animate-none ${scene.dot}`}
          />
        </svg>

        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <span
            key={`blob-a-${current.cmd}`}
            className="absolute top-1/2 left-1/2 -mt-36 -ml-40 size-64 animate-fade-in motion-reduce:animate-none md:-mt-44 md:-ml-48 md:size-80"
          >
            <span
              className={`block size-full animate-blob-cw motion-reduce:animate-none ${scene.blobA}`}
            />
          </span>
          <span
            key={`blob-b-${current.cmd}`}
            className="absolute top-1/2 left-1/2 -mt-16 -ml-6 size-48 animate-fade-in motion-reduce:animate-none md:-mt-20 md:size-60"
          >
            <span
              className={`block size-full animate-blob-ccw motion-reduce:animate-none ${scene.blobB}`}
            />
          </span>
        </div>

        <div
          key={`decor-${current.cmd}`}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          {scene.decor}
        </div>

        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
          {scene.slots.map((slot, i) => (
            <span
              key={`${current.cmd}-${slot.icon}-${i}`}
              className="absolute animate-fade-in motion-reduce:animate-none"
              style={{ ...slot.style, animationDelay: `${0.04 * i}s` }}
            >
              <span
                className={`flex size-14 animate-bob items-center justify-center rounded-2xl border bg-ink motion-reduce:animate-none ${scene.pill} ${scene.tone}`}
                style={
                  {
                    "--rot": `${slot.rotate}deg`,
                    "--bob-y": `${i % 2 ? 8 : -8}px`,
                    "--bob-r": `${i % 2 ? -4 : 4}deg`,
                    animationDuration: `${3.2 + (i % 3) * 0.7}s`,
                    animationDelay: `${0.2 + i * 0.15}s`,
                  } as CSSProperties
                }
              >
                <Icon name={slot.icon} className="size-6" />
              </span>
            </span>
          ))}
        </div>

        {/* Stage Centered Title, Complete Description & Scope Tags */}
        <div className="relative flex min-h-[420px] flex-col items-center justify-center gap-4 px-6 py-12 text-center md:min-h-[440px]">
          <div
            key={current.cmd}
            className="flex max-w-2xl animate-fade-rise flex-col items-center gap-4 motion-reduce:animate-none"
          >
            <p className="font-mono text-[10px] tracking-[0.32em] text-muted uppercase md:text-[11px]">
              {labels.service} {current.num}
            </p>
            <p className="max-w-[16ch] font-display text-[clamp(44px,6vw,84px)] leading-[0.9] uppercase">
              {current.name}
            </p>
            <p className="max-w-xl text-sm leading-relaxed text-fg/85 md:text-[15px]">
              {current.stageDesc}
            </p>
            {current.tags.length ? (
              <ul className="mt-2 flex flex-wrap justify-center gap-2">
                {current.tags.map((tag) => (
                  <li
                    key={tag}
                    className={`rounded-full border px-3 py-1 font-mono text-[11px] font-medium ${scene.tag}`}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>

      {/* 3 Concise Service Cards WITHOUT Scope Tags */}
      <div role="group" aria-label={labels.group} className="grid gap-3 md:grid-cols-3 md:gap-4">
        {services.map((service, i) => {
          const isActive = i === active;
          const cardScene = scenes[service.cmd] ?? scenes.web;
          return (
            <button
              key={service.cmd}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(i)}
              className={`${cardClass} flex min-h-[140px] flex-col gap-3 p-5 text-left md:min-h-[172px] md:p-6`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 rounded-2xl border bg-gradient-to-b from-white/[0.08] to-white/[0.015] transition-opacity duration-200 ${cardScene.cardBorder} ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
              <span className={sheenClass} />
              <span className="relative flex w-full items-center justify-between text-[13px] font-semibold">
                <span className="font-mono text-muted">{service.num}</span>
                <span className={`font-mono ${cardScene.tone}`}>{service.glyph}</span>
              </span>
              <span className="relative font-display text-2xl leading-[0.96] uppercase md:text-[30px]">
                {service.name}
              </span>
              <span className="relative text-sm leading-relaxed text-muted">
                {service.cardDesc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
