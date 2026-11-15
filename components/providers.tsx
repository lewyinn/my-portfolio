"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { recordNavigation } from "@/lib/navigation-origin";
import { IntroPreloader } from "./layout/intro-preloader";

const ReactLenis = dynamic(() => import("lenis/react").then((m) => m.ReactLenis), { ssr: false });

const REVEAL_SELECTOR = "[data-reveal],[data-reveal-group],[data-reveal-text],[data-reveal-scale]";

function markRevealed(el: Element) {
  if (el.hasAttribute("data-reveal")) el.setAttribute("data-reveal", "in");
  if (el.hasAttribute("data-reveal-text")) el.setAttribute("data-reveal-text", "in");
  if (el.hasAttribute("data-reveal-scale")) el.setAttribute("data-reveal-scale", "in");
  if (el.hasAttribute("data-reveal-group")) {
    const stagger = Number(el.getAttribute("data-stagger") || "0.08");
    const items = el.querySelectorAll(":scope > [data-reveal-item]");
    items.forEach((child, idx) => {
      if (child instanceof HTMLElement && idx > 0) {
        child.style.setProperty("--item-d", `${idx * stagger}s`);
      }
    });
    el.setAttribute("data-reveal-group", "in");
  }
}

function RouteAndRevealManager() {
  const pathname = usePathname();

  useEffect(() => {
    recordNavigation(pathname);
  }, [pathname]);

  useEffect(() => {
    const targets = document.querySelectorAll(REVEAL_SELECTOR);
    if (!targets.length) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      targets.forEach(markRevealed);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          markRevealed(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.01 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

/**
 * Smooth inertia scrolling (Lenis, loaded after idle/first interaction), scroll reveals,
 * and route origin tracking. Smooth scrolling steps aside when the visitor prefers reduced motion.
 */
export function Providers({ children }: { children: ReactNode }) {
  const [lenisReady, setLenisReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const enable = () => setLenisReady(true);
    const timer = window.setTimeout(enable, 4500);
    window.addEventListener("wheel", enable, { passive: true, once: true });
    window.addEventListener("touchstart", enable, { passive: true, once: true });
    window.addEventListener("pointerdown", enable, { passive: true, once: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("wheel", enable);
      window.removeEventListener("touchstart", enable);
      window.removeEventListener("pointerdown", enable);
    };
  }, []);

  return (
    <>
      <IntroPreloader />
      <RouteAndRevealManager />
      {lenisReady ? (
        <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, anchors: { offset: -88 } }}>
          {children}
        </ReactLenis>
      ) : (
        children
      )}
    </>
  );
}
