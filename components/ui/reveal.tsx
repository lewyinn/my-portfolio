"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";

const revealCallbacks = new WeakMap<Element, () => void>();
let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver() {
  if (sharedObserver || typeof IntersectionObserver === "undefined") return sharedObserver;
  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const callback = revealCallbacks.get(entry.target);
        revealCallbacks.delete(entry.target);
        sharedObserver?.unobserve(entry.target);
        callback?.();
      }
    },
    { rootMargin: "0px 0px -20px 0px", threshold: 0 },
  );
  return sharedObserver;
}

/** Triggers `true` once the referenced element has hydrated and enters (or sits above) the viewport. */
export function useReveal(ref: RefObject<Element | null>) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    const triggerNow = () => {
      const frame = window.requestAnimationFrame(() => setShown(true));
      return () => window.cancelAnimationFrame(frame);
    };

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      return triggerNow();
    }

    const viewportH = window.innerHeight || document.documentElement.clientHeight;
    if (el.getBoundingClientRect().top <= viewportH) {
      return triggerNow();
    }

    const observer = getSharedObserver();
    if (!observer) return triggerNow();

    revealCallbacks.set(el, () => setShown(true));
    observer.observe(el);

    return () => {
      revealCallbacks.delete(el);
      observer.unobserve(el);
    };
  }, [ref, shown]);

  return shown;
}

/** Fades and lifts its children into place when they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useReveal(ref);

  return (
    <div
      ref={ref}
      data-reveal={shown ? "in" : ""}
      className={className}
      style={
        {
          "--reveal-y": `${y}px`,
          ...(delay ? { "--reveal-d": `${delay}s` } : {}),
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

/** Scales a headline band smoothly into place on scroll. */
export function RevealScale({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const shown = useReveal(ref);

  return (
    <p ref={ref} data-reveal-scale={shown ? "in" : ""} className={className}>
      {children}
    </p>
  );
}

type Tag = "div" | "ol" | "ul" | "li" | "dl";

/** Reveals each `StaggerItem` child one after another. */
export function Stagger({
  children,
  stagger = 0.08,
  as: TagName = "div",
  className = "",
}: {
  children: ReactNode;
  stagger?: number;
  as?: Tag;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const shown = useReveal(ref);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll(":scope > [data-reveal-item]");
    items.forEach((child, idx) => {
      if (child instanceof HTMLElement && idx > 0) {
        child.style.setProperty("--item-d", `${idx * stagger}s`);
      }
    });
  }, [stagger]);

  return (
    <TagName
      ref={ref as RefObject<never>}
      data-reveal-group={shown ? "in" : ""}
      className={className}
    >
      {children}
    </TagName>
  );
}

export function StaggerItem({
  children,
  as: TagName = "div",
  className = "",
}: {
  children: ReactNode;
  as?: Tag;
  className?: string;
}) {
  return (
    <TagName data-reveal-item="" className={className}>
      {children}
    </TagName>
  );
}
