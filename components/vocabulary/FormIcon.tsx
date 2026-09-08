import type { ReactNode } from "react";
import { Glyph } from "@/components/vocabulary/Glyph";
import type { PackForm } from "@/lib/format";

const drawings: Record<PackForm, ReactNode> = {
  tablet: (
    <>
      <circle cx="12" cy="12" r="8.25" className="fill-surface" />
      <path d="M4.5 12h15" />
    </>
  ),
  "sr-tablet": (
    <>
      <circle cx="12" cy="12" r="8.25" className="fill-surface" />
      <circle cx="12" cy="12" r="4.25" className="fill-sage" />
    </>
  ),
  capsule: (
    <g transform="rotate(-45 12 12)">
      <rect x="3.5" y="8.5" width="17" height="7" rx="3.5" className="fill-surface" />
      <path d="M7 8.5H12v7H7a3.5 3.5 0 0 1 0-7z" className="fill-sage" />
    </g>
  ),
  syrup: (
    <>
      <rect x="9.5" y="3" width="5" height="3.5" rx="0.75" className="fill-sage" />
      <path
        d="M9.5 6.5h5l2 3.5v9.5a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 7.5 19.5V10z"
        className="fill-surface"
      />
      <rect x="9" y="12.5" width="6" height="4" rx="0.75" className="fill-sage" />
    </>
  ),
  drops: (
    <>
      <rect x="10.5" y="2.5" width="3" height="2.5" rx="1" className="fill-sage" />
      <path d="M12 5v4.5" />
      <path
        d="M8 9.5h8l1 2.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 19.5V12z"
        className="fill-surface"
      />
      <path
        d="M12 12.5c-1.2 1.6-1.8 2.6-1.8 3.4a1.8 1.8 0 0 0 3.6 0c0-.8-.6-1.8-1.8-3.4z"
        className="fill-sage"
      />
    </>
  ),
  cream: (
    <>
      <rect x="9.5" y="2.5" width="5" height="4" rx="1" className="fill-sage" />
      <path
        d="M8.5 8.5h7l1.5 10.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 19z"
        className="fill-surface"
      />
      <path d="M7.5 17h9" />
    </>
  ),
  gel: (
    <>
      <path d="M9 3.5h6l1.5 11.5h-9z" className="fill-surface" />
      <path d="M10 9.5c.7-.7 1.3-.7 2 0s1.3.7 2 0" />
      <rect x="6.5" y="15" width="11" height="5.5" rx="1.5" className="fill-sage" />
    </>
  ),
  inhaler: (
    <>
      <path
        d="M8.5 14.5v4A1.5 1.5 0 0 0 10 20h9.5a1.5 1.5 0 0 0 1.5-1.5V16a1.5 1.5 0 0 0-1.5-1.5h-5"
        className="fill-surface"
      />
      <rect x="8.5" y="2.5" width="6" height="12" rx="1.5" className="fill-sage" />
    </>
  ),
  vial: (
    <>
      <path
        d="M9 6v2l-1.5 1.5v10A1.5 1.5 0 0 0 9 21h6a1.5 1.5 0 0 0 1.5-1.5v-10L15 8V6"
        className="fill-surface"
      />
      <path d="M7.5 14.5h9" />
      <rect x="8" y="2.5" width="8" height="3.5" rx="1" className="fill-sage" />
    </>
  ),
  sachet: (
    <>
      <path
        d="M4 7l1.5 1.25L4 9.5l1.5 1.25L4 12l1.5 1.25L4 14.5l1.5 1.25L4 17h16l-1.5-1.25L20 14.5l-1.5-1.25L20 12l-1.5-1.25L20 9.5l-1.5-1.25L20 7z"
        className="fill-sage"
      />
      <path d="M15.5 9v6" strokeDasharray="1.5 1.5" />
    </>
  ),
  strip: (
    <>
      <rect x="9" y="2.5" width="6" height="19" rx="1.5" className="fill-surface" />
      <rect x="10.5" y="4" width="3" height="4" rx="0.75" className="fill-sage" />
      <path d="M10.5 16h3M10.5 18.5h3" />
    </>
  ),
  device: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="3" className="fill-surface" />
      <rect x="8" y="6" width="8" height="6" rx="1" className="fill-sage" />
      <circle cx="12" cy="16.5" r="1.5" />
    </>
  ),
};

/** The medicine's real physical form, drawn at 24px for a 44px sage well. */
export function FormIcon({ form, className }: { form: PackForm; className?: string }) {
  return <Glyph className={className}>{drawings[form]}</Glyph>;
}

export const packForms: readonly PackForm[] = [
  "tablet",
  "sr-tablet",
  "capsule",
  "syrup",
  "drops",
  "cream",
  "gel",
  "inhaler",
  "vial",
  "sachet",
  "strip",
  "device",
];
