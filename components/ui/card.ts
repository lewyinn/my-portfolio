/**
 * Shared card surface: translucent border, subtle top-lit gradient, inner top highlight,
 * and a brighter border on hover. No glow: glow belongs to section backgrounds only.
 */
export const cardClass =
  "group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-[border-color,translate] duration-500 hover:border-white/[0.18]";

/** Diagonal sheen layered over a card, as on the reference site. */
export const sheenClass =
  "pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent";
