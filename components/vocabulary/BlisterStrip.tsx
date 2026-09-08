import { cx } from "@/lib/cx";

interface BlisterStripProps {
  brand: string;
  molecule: string;
  className?: string;
}

const columns = [27.2, 73.6, 120, 166.4, 212.8];
const rows = [34, 94];

/**
 * The hero object on product and delivered states. A strip in use: one pocket
 * is empty, drawn as a dashed ring. Carries the only shadow on the site.
 */
export function BlisterStrip({ brand, molecule, className }: BlisterStripProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 128"
      width="100%"
      fill="none"
      strokeWidth="1.5"
      className={cx("block stroke-primary drop-shadow-blister", className)}
    >
      <rect x="4" y="4" width="232" height="120" rx="14" className="fill-surface" />
      {rows.map((cy) =>
        columns.map((x, index) => {
          const empty = cy === rows[0] && index === columns.length - 1;
          return empty ? (
            <circle key={`${x}-${cy}`} cx={x} cy={cy} r="15" strokeDasharray="4 3" />
          ) : (
            <g key={`${x}-${cy}`}>
              <circle cx={x} cy={cy} r="15" className="fill-sage" />
              <circle cx={x} cy={cy} r="8.5" className="fill-surface" />
            </g>
          );
        }),
      )}
      <text
        x="120"
        y="66.5"
        textAnchor="middle"
        className="fill-ink-faint font-ui"
        fontSize="6.5"
        fontWeight="600"
        letterSpacing="1"
        stroke="none"
      >
        {`${brand} · ${molecule}`.toUpperCase()}
      </text>
    </svg>
  );
}
