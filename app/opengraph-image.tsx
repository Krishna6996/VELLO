import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Vello. Medicine, exactly as prescribed.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    title: "Medicine, exactly as prescribed.",
    line: "Delivered in hours from a licensed pharmacy. A registered pharmacist checks every order.",
  });
}
