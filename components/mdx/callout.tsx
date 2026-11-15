import type { ReactNode } from "react";

/** Highlighted note or key takeaway inside an article or case study. */
export function Callout({
  title,
  tone = "accent",
  children,
}: {
  title?: string;
  tone?: "accent" | "blue";
  children: ReactNode;
}) {
  const accentStyle =
    tone === "blue"
      ? "border-deco-blue/25 border-l-deco-blue text-deco-blue"
      : "border-accent/25 border-l-accent text-accent";

  return (
    <aside
      className={`my-6 rounded-xl border border-l-2 border-line bg-surface px-5 py-4 text-[15px] leading-relaxed text-fg [&>p]:m-0 ${
        tone === "blue" ? "border-l-deco-blue" : "border-l-accent"
      }`}
    >
      {title ? (
        <p
          className={`mb-2 font-mono text-[11px] font-semibold tracking-[0.2em] uppercase ${
            accentStyle.split(" ").pop() ?? "text-accent"
          }`}
        >
          {title}
        </p>
      ) : null}
      <div className="text-fg/90 [&>p]:m-0">{children}</div>
    </aside>
  );
}
