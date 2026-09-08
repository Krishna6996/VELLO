import Link from "next/link";

export function Wordmark() {
  return (
    <Link
      href="/"
      data-pseudo-skip
      className="inline-flex min-h-11 items-center font-ui text-wordmark whitespace-nowrap text-ink"
    >
      Vello
    </Link>
  );
}
