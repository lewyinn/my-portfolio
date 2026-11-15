type CoverVariant = "seo-mdx" | "budget" | "vitals" | "minimal";
type CoverAccent = "accent" | "blue" | "teal" | "yellow";

const accentStyles: Record<
  CoverAccent,
  { pill: string; dot: string; border: string; text: string; glow: string }
> = {
  blue: {
    pill: "border-deco-blue/25 bg-deco-blue/10 text-deco-blue",
    dot: "bg-deco-blue",
    border: "border-deco-blue/25",
    text: "text-deco-blue",
    glow: "radial-gradient(circle at 80% 25%, rgb(76 194 255 / 0.14), transparent 65%)",
  },
  accent: {
    pill: "border-accent/25 bg-accent/10 text-accent",
    dot: "bg-accent",
    border: "border-accent/25",
    text: "text-accent",
    glow: "radial-gradient(circle at 80% 25%, rgb(94 242 176 / 0.14), transparent 65%)",
  },
  yellow: {
    pill: "border-deco-yellow/25 bg-deco-yellow/10 text-deco-yellow",
    dot: "bg-deco-yellow",
    border: "border-deco-yellow/25",
    text: "text-deco-yellow",
    glow: "radial-gradient(circle at 80% 25%, rgb(242 193 78 / 0.14), transparent 65%)",
  },
  teal: {
    pill: "border-deco-teal/25 bg-deco-teal/10 text-deco-teal",
    dot: "bg-deco-teal",
    border: "border-deco-teal/25",
    text: "text-deco-teal",
    glow: "radial-gradient(circle at 80% 25%, rgb(45 212 191 / 0.14), transparent 65%)",
  },
};

export function inferCoverVariant(slug: string, explicit?: CoverVariant): CoverVariant {
  if (explicit) return explicit;
  if (slug.includes("seo") || slug.includes("mdx")) return "seo-mdx";
  if (slug.includes("cost") || slug.includes("biaya") || slug.includes("business")) return "budget";
  if (slug.includes("vital") || slug.includes("performance")) return "vitals";
  return "minimal";
}

export function inferCoverAccent(variant: CoverVariant, explicit?: CoverAccent): CoverAccent {
  if (explicit) return explicit;
  if (variant === "seo-mdx") return "blue";
  if (variant === "budget") return "accent";
  if (variant === "vitals") return "yellow";
  return "accent";
}

export function getCoverTone(slug: string, variant?: CoverVariant, accent?: CoverAccent) {
  return accentStyles[inferCoverAccent(inferCoverVariant(slug, variant), accent)];
}

/**
 * Dark Editorial Cover Graphic for Blog Cards (`mode="card"`) and Article Hero Split (`mode="hero"`).
 * Renders structured technical/editorial artwork instead of generic photo placeholders.
 */
export function EditorialCover({
  slug,
  category,
  indexLabel,
  variant,
  accent,
  mode = "card",
  tags = [],
}: {
  slug: string;
  category: string;
  indexLabel?: string;
  variant?: CoverVariant;
  accent?: CoverAccent;
  mode?: "card" | "hero";
  tags?: string[];
}) {
  const resolvedVariant = inferCoverVariant(slug, variant);
  const resolvedAccent = inferCoverAccent(resolvedVariant, accent);
  const tone = accentStyles[resolvedAccent];

  if (mode === "hero") {
    return (
      <div
        className={`relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-surface-deep p-6 ${tone.border}`}
        style={{ backgroundImage: tone.glow }}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="truncate font-mono text-xs text-muted">
            &lt;Article slug=&quot;{slug}&quot; /&gt;
          </span>
          <span className={`size-2 shrink-0 rounded-full ${tone.dot}`} />
        </div>

        <div className="my-6 flex flex-col gap-3 rounded-xl border border-white/[0.07] bg-ink/70 p-4 font-mono text-xs">
          <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-2.5">
            <span className="text-muted">Render Mode</span>
            <span className="text-fg">Static SSG (App Router)</span>
          </div>
          <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-2.5">
            <span className="text-muted">Category</span>
            <span className={tone.text}>{category}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted">Metadata API</span>
            <span className="text-fg">Dynamic OG + Canonical</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
            SEO READY · BUILD VALIDATED
          </span>
          {tags.length ? (
            <div className="flex gap-1.5">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[10px] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-surface-deep p-4"
      style={{ backgroundImage: tone.glow }}
    >
      {/* Subtle architectural dot matrix */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:18px_18px] opacity-60"
      />

      {/* Top pills row */}
      <div className="relative flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.14em] uppercase ${tone.pill}`}
        >
          <span className={`size-1.5 rounded-full ${tone.dot}`} />
          {category}
        </span>
        {indexLabel ? (
          <span className="rounded-full border border-white/10 bg-ink/80 px-2.5 py-0.5 font-mono text-[10px] text-muted">
            {indexLabel}
          </span>
        ) : null}
      </div>

      {/* Center visual motif matching Figma editorial covers */}
      <div className="relative my-auto py-3">
        {resolvedVariant === "seo-mdx" ? (
          <div className="rounded-xl border border-white/[0.08] bg-ink/85 p-3 font-mono text-[11px]">
            <p className="truncate text-deco-blue">&lt;Article slug=&quot;seo-mdx&quot; /&gt;</p>
            <div className="mt-2.5 flex items-center justify-between text-[10px] text-muted">
              <span>MDX · SSG · METADATA</span>
              <span className="text-accent">SEO READY · 100</span>
            </div>
          </div>
        ) : null}

        {resolvedVariant === "budget" ? (
          <div className="rounded-xl border border-white/[0.08] bg-ink/85 p-3 font-mono text-[11px]">
            <p className="text-[10px] tracking-[0.14em] text-muted uppercase">SCOPE · ESTIMATION</p>
            <div className="mt-2.5 flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="w-7 text-[10px] text-muted">LP</span>
                <span className="h-1.5 w-16 rounded-full bg-accent/60" />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-7 text-[10px] text-muted">APP</span>
                <span className="h-1.5 w-28 rounded-full bg-accent/80" />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-7 text-[10px] text-muted">ERP</span>
                <span className="h-1.5 w-full rounded-full bg-accent" />
              </div>
            </div>
          </div>
        ) : null}

        {resolvedVariant === "vitals" ? (
          <div className="rounded-xl border border-white/[0.08] bg-ink/85 p-3 font-mono">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[10px] tracking-[0.12em] text-muted">
                LCP · INP · CLS TARGET
              </span>
              <span className="font-display text-2xl leading-none text-deco-yellow">99 / 100</span>
            </div>
            <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[92%] rounded-full bg-deco-yellow" />
            </div>
          </div>
        ) : null}

        {resolvedVariant === "minimal" ? (
          <div className="rounded-xl border border-white/[0.08] bg-ink/85 p-3 font-mono text-[11px]">
            <p className="truncate text-fg">&lt;Note slug=&quot;{slug}&quot; /&gt;</p>
            <p className="mt-1.5 truncate text-[10px] text-muted uppercase">
              {tags.slice(0, 3).join(" · ") || "ENGINEERING INSIGHT"}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
