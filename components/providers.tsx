"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { recordNavigation } from "@/lib/navigation-origin";
import { IntroPreloader } from "./layout/intro-preloader";

function RouteOriginTracker() {
  const pathname = usePathname();

  useEffect(() => {
    recordNavigation(pathname);
  }, [pathname]);

  return null;
}

/**
 * Smooth inertia scrolling (Lenis, loaded after idle/first interaction without remounting children),
 * intro preloader, and route origin tracking.
 */
export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let instance: { destroy: () => void } | null = null;
    let started = false;

    const initLenis = () => {
      if (started || disposed) return;
      started = true;
      void import("lenis").then(({ default: Lenis }) => {
        if (disposed) return;
        instance = new Lenis({
          autoRaf: true,
          lerp: 0.1,
          smoothWheel: true,
          anchors: { offset: -88 },
        });
      });
    };

    const timer = window.setTimeout(initLenis, 4500);
    window.addEventListener("wheel", initLenis, { passive: true, once: true });
    window.addEventListener("touchstart", initLenis, { passive: true, once: true });
    window.addEventListener("pointerdown", initLenis, { passive: true, once: true });

    return () => {
      disposed = true;
      window.clearTimeout(timer);
      window.removeEventListener("wheel", initLenis);
      window.removeEventListener("touchstart", initLenis);
      window.removeEventListener("pointerdown", initLenis);
      instance?.destroy();
    };
  }, []);

  return (
    <>
      <IntroPreloader />
      <RouteOriginTracker />
      {children}
    </>
  );
}
