import { ImageResponse } from "next/og";
import { colourTokens } from "@/app/styleguide/tokens";

const hex = Object.fromEntries(colourTokens.map((token) => [token.name, token.hex])) as Record<
  string,
  string
>;

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: hex.canvas,
      }}
    >
      <svg
        width="124"
        height="124"
        viewBox="0 0 24 24"
        fill="none"
        stroke={hex.primary}
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="8.25" fill={hex.surface} />
        <path d="M4.5 12h15" />
      </svg>
    </div>,
    size,
  );
}
