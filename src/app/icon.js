import { ImageResponse } from "next/og";
import { HookMark } from "@/lib/logoMark";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<HookMark size={size.width} radius={14} />, { ...size });
}
