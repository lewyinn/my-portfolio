"use client";

import { motion } from "motion/react";
import type { ComponentType } from "react";
import { Capsule3D, Cube3D, Pyramid3D, Ring3D, Sphere3D, type ShapeProps } from "./shapes-3d";

type Item = {
  Shape: ComponentType<ShapeProps>;
  id: string;
  tone: string;
  className: string;
  y: number;
  rotate: number;
  duration: number;
};

const items: Item[] = [
  {
    Shape: Cube3D,
    id: "fs-cube",
    tone: "var(--color-deco-blue)",
    className: "left-[6%] top-[14%] size-20",
    y: -16,
    rotate: 8,
    duration: 8,
  },
  {
    Shape: Sphere3D,
    id: "fs-sphere",
    tone: "var(--color-deco-pink)",
    className: "right-[8%] top-[16%] size-16",
    y: -20,
    rotate: 0,
    duration: 9,
  },
  {
    Shape: Ring3D,
    id: "fs-ring",
    tone: "var(--color-deco-yellow)",
    className: "right-[14%] bottom-[16%] size-24",
    y: -14,
    rotate: -10,
    duration: 10,
  },
  {
    Shape: Pyramid3D,
    id: "fs-pyramid",
    tone: "var(--color-accent)",
    className: "left-[12%] bottom-[14%] size-16",
    y: -18,
    rotate: 6,
    duration: 7,
  },
  {
    Shape: Capsule3D,
    id: "fs-capsule",
    tone: "var(--color-deco-pink)",
    className: "left-[44%] top-[6%] size-14",
    y: -10,
    rotate: -8,
    duration: 11,
  },
];

/**
 * Colorful 3D-looking icons that drift slowly behind a section (desktop only). They
 * animate only `transform` (no blur, no glow), so they stay cheap while scrolling.
 */
export function FloatingShapes() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
      {items.map(({ Shape, id, tone, className, y, rotate, duration }) => (
        <motion.div
          key={id}
          className={`absolute ${className}`}
          animate={{ y: [0, y, 0], rotate: [0, rotate, 0] }}
          transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        >
          <Shape id={id} tone={tone} className="size-full" />
        </motion.div>
      ))}
    </div>
  );
}
