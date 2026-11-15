"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@/components/ui/icons";

export function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    const frame = window.requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const toTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label={label}
      onClick={toTop}
      className="fixed right-5 bottom-5 z-40 flex size-12 items-center justify-center rounded-full bg-fg text-ink transition-transform duration-300 hover:-translate-y-0.5 active:scale-95 md:right-6 md:bottom-6"
    >
      <ArrowUpIcon className="size-[18px]" />
    </button>
  );
}
