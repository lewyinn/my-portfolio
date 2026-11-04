"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { ArrowUpIcon } from "@/components/ui/icons";

export function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 800));

  const toTop = () => {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          aria-label={label}
          onClick={toTop}
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.3 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          className="fixed right-5 bottom-5 z-40 flex size-12 items-center justify-center rounded-full bg-fg text-ink md:right-6 md:bottom-6"
        >
          <ArrowUpIcon className="size-[18px]" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
