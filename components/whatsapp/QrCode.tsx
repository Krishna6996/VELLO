import { encode } from "uqr";
import { cx } from "@/lib/cx";

interface QrCodeProps {
  value: string;
  /** Rendered size in px. */
  size?: number;
  /** Read to screen readers. */
  label: string;
  className?: string;
}

/** A QR code drawn as one SVG path: Primary modules on Surface, nothing else. */
export function QrCode({ value, size = 120, label, className }: QrCodeProps) {
  const qr = encode(value, { ecc: "L", border: 1 });
  let d = "";
  qr.data.forEach((row, y) => {
    row.forEach((dark, x) => {
      if (dark) d += `M${x} ${y}h1v1h-1z`;
    });
  });

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`0 0 ${qr.size} ${qr.size}`}
      width={size}
      height={size}
      shapeRendering="crispEdges"
      className={cx("block rounded-well bg-surface", className)}
    >
      <path d={d} className="fill-primary" />
    </svg>
  );
}
