import { ImageResponse } from "next/og";

export const alt = "Michael Fernandez — full-stack developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Palette mirrors the dark theme tokens in globals.css.
const BACKGROUND = "#07080c";
const FOREGROUND = "#d4dae4";
const MUTED = "#69727f";
const ACCENT = "#ffab40";
const BORDER = "#1c2029";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BACKGROUND,
          backgroundImage: `linear-gradient(${BORDER} 1px, transparent 1px), linear-gradient(90deg, ${BORDER} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          padding: 72,
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 9999,
              background: ACCENT,
            }}
          />
          <div style={{ fontSize: 26, color: ACCENT }}>haruhadj</div>
          <div style={{ fontSize: 26, color: MUTED }}>— open to work</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              color: FOREGROUND,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            Michael Fernandez
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 36,
              color: MUTED,
              letterSpacing: "-0.01em",
            }}
          >
            Full-stack developer — type-safe web apps &amp; tuned systems
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            borderTop: `1px solid ${BORDER}`,
            paddingTop: 28,
            fontSize: 26,
            color: MUTED,
          }}
        >
          <span style={{ color: FOREGROUND }}>haruhadj.org/portfolio</span>
          <span>·</span>
          <span>Next.js</span>
          <span>·</span>
          <span>TypeScript</span>
          <span>·</span>
          <span>PostgreSQL</span>
          <span>·</span>
          <span>Docker</span>
        </div>
      </div>
    ),
    size
  );
}
