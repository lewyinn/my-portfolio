function Row({ items, id }: { items: string[]; id: string }) {
  return (
    <>
      {items.map((text, i) => (
        <span key={`${id}-${i}`} className="flex shrink-0 items-center gap-5 md:gap-7">
          <span>{text}</span>
          <span className="text-accent">/</span>
        </span>
      ))}
    </>
  );
}

/** Endless horizontal text band. Pauses on hover and stops for reduced motion. */
export function Marquee({ items, repeat = 4 }: { items: string[]; repeat?: number }) {
  const row = Array.from({ length: repeat }, () => items).flat();

  return (
    <div aria-hidden="true" className="relative overflow-hidden bg-white/[0.015] py-4 md:py-5">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {/* Edge fades as plain overlays (a mask on the moving row would force repaints). */}
      <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <div className="flex w-max animate-marquee gap-5 font-display text-2xl tracking-[0.06em] text-muted hover:[animation-play-state:paused] motion-reduce:animate-none md:gap-7 md:text-[32px]">
        <Row items={row} id="a" />
        <Row items={row} id="b" />
      </div>
    </div>
  );
}
