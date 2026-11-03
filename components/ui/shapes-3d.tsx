import type { CSSProperties } from "react";

// Small 3D-looking objects drawn in SVG. Each takes a `tone` (a CSS color, usually a theme
// variable) and shades it: the lit side blends toward white, the shadow side fades toward the
// background. Each also takes a unique `id` so gradient ids never collide on a page.

export type ShapeProps = { id: string; tone?: string; className?: string };

const DEFAULT_TONE = "var(--color-fg)";

const stop = (color: string, opacity = 1): CSSProperties => ({
  stopColor: color,
  stopOpacity: opacity,
});
const white = (opacity: number) => stop("white", opacity);

/** Isometric cube: light top, mid left face, dark right face. */
export function Cube3D({ id, tone = DEFAULT_TONE, className }: ShapeProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={`${id}-top`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={white(0.9)} />
          <stop offset="1" style={stop(tone)} />
        </linearGradient>
        <linearGradient id={`${id}-left`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={stop(tone, 0.95)} />
          <stop offset="1" style={stop(tone, 0.6)} />
        </linearGradient>
        <linearGradient id={`${id}-right`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={stop(tone, 0.5)} />
          <stop offset="1" style={stop(tone, 0.22)} />
        </linearGradient>
      </defs>
      <polygon points="50,8 90,30 50,52 10,30" fill={`url(#${id}-top)`} />
      <polygon points="10,30 50,52 50,94 10,72" fill={`url(#${id}-left)`} />
      <polygon points="90,30 90,72 50,94 50,52" fill={`url(#${id}-right)`} />
      <polyline
        points="10,30 50,52 90,30"
        fill="none"
        stroke="white"
        strokeOpacity="0.55"
        strokeWidth="0.8"
      />
    </svg>
  );
}

/** Glossy sphere with a specular highlight. */
export function Sphere3D({ id, tone = DEFAULT_TONE, className }: ShapeProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id={`${id}-body`} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" style={white(0.95)} />
          <stop offset="0.28" style={stop(tone)} />
          <stop offset="0.75" style={stop(tone, 0.55)} />
          <stop offset="1" style={stop(tone, 0.2)} />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="44" fill={`url(#${id}-body)`} />
      <ellipse
        cx="35"
        cy="28"
        rx="11"
        ry="6"
        fill="white"
        fillOpacity="0.75"
        transform="rotate(-25 35 28)"
      />
    </svg>
  );
}

/** Ring (torus seen at an angle). */
export function Ring3D({ id, tone = DEFAULT_TONE, className }: ShapeProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={`${id}-ring`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={white(0.85)} />
          <stop offset="0.35" style={stop(tone)} />
          <stop offset="1" style={stop(tone, 0.3)} />
        </linearGradient>
      </defs>
      <ellipse
        cx="50"
        cy="50"
        rx="36"
        ry="24"
        fill="none"
        stroke={`url(#${id}-ring)`}
        strokeWidth="14"
      />
      <ellipse
        cx="50"
        cy="45"
        rx="36"
        ry="24"
        fill="none"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="1"
      />
    </svg>
  );
}

/** Square pyramid: lit left face, dark right face. */
export function Pyramid3D({ id, tone = DEFAULT_TONE, className }: ShapeProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={`${id}-left`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={white(0.85)} />
          <stop offset="0.6" style={stop(tone)} />
        </linearGradient>
        <linearGradient id={`${id}-right`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={stop(tone, 0.55)} />
          <stop offset="1" style={stop(tone, 0.2)} />
        </linearGradient>
      </defs>
      <polygon points="50,6 12,80 50,94" fill={`url(#${id}-left)`} />
      <polygon points="50,6 50,94 88,76" fill={`url(#${id}-right)`} />
      <line x1="50" y1="6" x2="50" y2="94" stroke="white" strokeOpacity="0.5" strokeWidth="0.8" />
    </svg>
  );
}

/** Capsule / pill with a highlight stripe. */
export function Capsule3D({ id, tone = DEFAULT_TONE, className }: ShapeProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={white(0.8)} />
          <stop offset="0.4" style={stop(tone)} />
          <stop offset="1" style={stop(tone, 0.35)} />
        </linearGradient>
      </defs>
      <rect
        x="8"
        y="34"
        width="84"
        height="32"
        rx="16"
        fill={`url(#${id}-body)`}
        transform="rotate(-30 50 50)"
      />
      <rect
        x="20"
        y="39"
        width="52"
        height="5"
        rx="2.5"
        fill="white"
        fillOpacity="0.7"
        transform="rotate(-30 50 50)"
      />
    </svg>
  );
}
