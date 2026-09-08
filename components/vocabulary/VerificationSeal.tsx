"use client";

import { useId } from "react";
import { cx } from "@/lib/cx";

interface VerificationSealProps {
  name: string;
  reg: string;
  date: string;
  className?: string;
}

const ring = {
  cx: 100,
  cy: 100,
  fill: "none",
  strokeWidth: 1.5,
  vectorEffect: "non-scaling-stroke",
} as const;
const arcText = {
  className: "font-ui",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: 0.9,
  stroke: "none",
} as const;
const centred = { x: 100, textAnchor: "middle", stroke: "none" } as const;

/**
 * A rubber stamp, the native mark of medical authority: two rings, the
 * pharmacist on the upper arc, registration and date on the lower, ℞ centred,
 * VERIFIED beneath (the one permitted caps), rotated 7°, roughened. Max one per page.
 */
export function VerificationSeal({ name, reg, date, className }: VerificationSealProps) {
  const id = useId();
  const rough = `${id}-rough`;
  const top = `${id}-top`;
  const bottom = `${id}-bottom`;
  const label = `Checked by ${name}, Registered Pharmacist, Reg no. ${reg}, on ${date}.`;

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 200 200"
      width="100%"
      className={cx("block", className)}
    >
      <defs>
        <filter id={rough} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.55"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="1.7"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <path id={top} d="M20 100a80 80 0 0 1 160 0" />
        <path id={bottom} d="M12 100a88 88 0 0 0 176 0" />
      </defs>
      <g
        transform="rotate(7 100 100)"
        filter={`url(#${rough})`}
        className="fill-primary stroke-primary"
      >
        <circle {...ring} r="94" />
        <circle {...ring} r="72" />
        <text {...arcText}>
          <textPath href={`#${top}`} startOffset="50%" textAnchor="middle">
            {name} · Registered Pharmacist
          </textPath>
        </text>
        <text {...arcText}>
          <textPath href={`#${bottom}`} startOffset="50%" textAnchor="middle">
            Reg no. {reg} · {date}
          </textPath>
        </text>
        <text {...centred} y="114" className="font-editorial" fontSize="66" fontWeight="500">
          ℞
        </text>
        <text
          {...centred}
          y="142"
          className="font-ui"
          fontSize="12"
          fontWeight="700"
          letterSpacing="2.8"
        >
          VERIFIED
        </text>
      </g>
    </svg>
  );
}
