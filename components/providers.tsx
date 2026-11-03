"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Smooth inertia scrolling (Lenis) and Motion defaults. Both step aside when the
 * visitor prefers reduced motion.
 */
export function Providers({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis
        root
        options={{ lerp: 0.1, smoothWheel: !reduceMotion, anchors: { offset: -88 } }}
      >
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
