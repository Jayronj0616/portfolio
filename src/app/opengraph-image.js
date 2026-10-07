import { ImageResponse } from "next/og";
import { portfolioData } from "@/data/portfolioData";

export const alt = `${portfolioData.about.name} — ${portfolioData.about.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const { name, role } = portfolioData.about;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 40, opacity: 0.8 }}>Portfolio</div>
        <div style={{ fontSize: 120, fontWeight: 700, marginTop: 16 }}>
          {name}
        </div>
        <div style={{ fontSize: 56, marginTop: 8 }}>{role}</div>
      </div>
    ),
    { ...size }
  );
}
