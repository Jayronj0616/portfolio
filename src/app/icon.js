import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 7,
          background: "linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)",
          color: "white",
          fontSize: 16,
          fontWeight: 700,
          fontFamily: "sans-serif",
        }}
      >
        JA
      </div>
    ),
    { ...size }
  );
}
