// M1 Pixel R mark: 1 = foreground, 2 = accent cursor, 0 = empty. See PLAN.md §3.4.
const ROWS = ["111100", "100010", "100010", "111100", "101000", "100100", "100012"];

type PixelRProps = {
  /** Pixel size in px. */
  size?: number;
  /** Gap between pixels in px. */
  gap?: number;
  className?: string;
};

export function PixelR({ size = 9, gap = 3, className }: PixelRProps) {
  const step = size + gap;
  const width = 6 * step - gap;
  const height = 7 * step - gap;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      className={className}
    >
      {ROWS.flatMap((row, y) =>
        row
          .split("")
          .map((cell, x) =>
            cell === "0" ? null : (
              <rect
                key={`${x}-${y}`}
                x={x * step}
                y={y * step}
                width={size}
                height={size}
                rx={size * 0.17}
                className={cell === "2" ? "fill-accent" : "fill-fg"}
              />
            ),
          ),
      )}
    </svg>
  );
}
