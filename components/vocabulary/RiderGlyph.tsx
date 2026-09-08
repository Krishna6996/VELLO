import { Glyph } from "@/components/vocabulary/Glyph";

/** A scooter with a delivery box, for the out-for-delivery step. */
export function RiderGlyph({ className }: { className?: string }) {
  return (
    <Glyph viewBox="0 0 32 24" className={className}>
      <rect x="3" y="5" width="8" height="7" rx="1" className="fill-sage" />
      <path d="M7 5v7" />
      <path d="M7 12v2.5h4.5a1 1 0 0 1 1 1V17H4.5v-1.5a1 1 0 0 1 1-1H7" className="fill-surface" />
      <path d="M12.5 17h6l3-7.5h3.5" />
      <path d="M22.5 6.5h5" />
      <path d="M25 6.5l-.5 8" />
      <circle cx="8" cy="18.5" r="3" className="fill-surface" />
      <circle cx="25" cy="18.5" r="3" className="fill-surface" />
    </Glyph>
  );
}
