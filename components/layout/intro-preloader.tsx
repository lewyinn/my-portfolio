"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const WORD = "ridho";

/**
 * Page-session flag kept in memory so the intro plays once when the website is
 * opened or reloaded, and stays hidden across client-side route transitions.
 */
let introDone = false;
const listeners = new Set<() => void>();

function subscribeIntro(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function readIntroDone() {
  return introDone;
}

function finishIntro() {
  if (introDone) return;
  introDone = true;
  for (const listener of listeners) listener();
}

/**
 * Fullscreen terminal-style "ridho█" typing intro shown once per website load,
 * never replaying when switching pages via client-side navigation.
 */
export function IntroPreloader() {
  const done = useSyncExternalStore(subscribeIntro, readIntroDone, () => false);
  const [count, setCount] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (done) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      finishIntro();
      return;
    }

    const timers: number[] = [];
    const startDelay = 180;
    const stepMs = 110;

    for (let i = 1; i <= WORD.length; i++) {
      timers.push(window.setTimeout(() => setCount(i), startDelay + i * stepMs));
    }

    const fadeStart = startDelay + WORD.length * stepMs + 380;
    const endDelay = fadeStart + 320;
    timers.push(window.setTimeout(() => setFading(true), fadeStart));
    timers.push(window.setTimeout(finishIntro, endDelay));

    const dismissNow = () => {
      setFading(true);
      finishIntro();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismissNow();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      for (const id of timers) window.clearTimeout(id);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [done]);

  if (done) return null;

  const typingDone = count >= WORD.length;

  return (
    <div
      aria-hidden="true"
      onClick={finishIntro}
      className={`fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-ink transition-opacity duration-300 ease-out select-none ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="inline-flex items-center font-mono text-4xl leading-none font-medium tracking-[-0.05em] text-fg md:text-6xl">
        <span>{WORD.slice(0, count)}</span>
        <span
          className={`ml-[0.18em] inline-block h-[0.9em] w-[0.45em] bg-accent motion-reduce:animate-none ${
            typingDone ? "animate-blink" : ""
          }`}
        />
      </div>
    </div>
  );
}
