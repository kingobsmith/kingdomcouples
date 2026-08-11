import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/brand";

export const runtime = "edge";
export const alt = `${BRAND.name} — ${BRAND.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%)",
          padding: 60,
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 800, color: "#faf7f2", marginBottom: 16 }}>
          Kingdom <span style={{ color: "#d4a853" }}>Folk</span>
        </div>
        <div style={{ fontSize: 36, color: "#d4a853", marginBottom: 24 }}>{BRAND.tagline}</div>
        <div style={{ fontSize: 24, color: "#c5d0dc", textAlign: "center", maxWidth: 800 }}>
          Family Side · Couples Corner · Singles Ministry
        </div>
        <div style={{ fontSize: 20, color: "#9ab", marginTop: 32 }}>kingdomfolk.co · $9.99/month</div>
      </div>
    ),
    { ...size }
  );
}
