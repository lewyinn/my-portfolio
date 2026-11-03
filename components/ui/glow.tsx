/**
 * Soft white light blob. Drawn with a radial gradient rather than `filter: blur()`, which is
 * far cheaper to paint and keeps scrolling smooth. Position and size it with `className`.
 */
export function GlowOrb({
  className = "",
  strength = 0.06,
}: {
  className?: string;
  strength?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        background: `radial-gradient(closest-side, rgba(255,255,255,${strength}), transparent)`,
      }}
    />
  );
}

/** Gradient hairline used as the divider at the top of each section (not a glow). */
export function SectionGlow() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
    </>
  );
}
