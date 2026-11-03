import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

// Night Mint tokens (ImageResponse cannot read CSS variables).
const colors = {
  ink: "#0a0a0a",
  line: "#2a2a2a",
  fg: "#f0f0ee",
  muted: "#8c8c8a",
  accent: "#5ef2b0",
};

/** Shared Open Graph card: label, big title, and the "ridho" wordmark. */
export function renderOgImage({ label, title }: { label: string; title: string }) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: colors.ink,
        color: colors.fg,
        border: `1px solid ${colors.line}`,
      }}
    >
      <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: colors.muted }}>
        {label.toUpperCase()}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: title.length > 40 ? 76 : 104,
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: -2,
          textTransform: "uppercase",
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", alignItems: "center", fontSize: 36, fontWeight: 600 }}>
        ridho
        <div style={{ width: 18, height: 34, marginLeft: 8, background: colors.accent }} />
      </div>
    </div>,
    ogSize,
  );
}
