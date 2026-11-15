import type { CSSProperties, ReactNode } from "react";

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
  return (
    <div
      data-reveal=""
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
  return (
    <TagName data-reveal-group="" data-stagger={stagger} className={className}>
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
