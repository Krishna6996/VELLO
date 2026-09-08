import Link from "next/link";
import { cx } from "@/lib/cx";

interface GuideCardProps {
  title: string;
  href: string;
  /** One line. Omitted for stubs. */
  excerpt?: string;
  /** "Dr. Achal, MBBS" */
  byline: string;
  /** Minutes. Omitted when unknown. */
  readingMinutes?: number;
  className?: string;
}

/** Fraunces title, one-line excerpt, byline and reading time. No image, ever. */
export function GuideCard({
  title,
  href,
  excerpt,
  byline,
  readingMinutes,
  className,
}: GuideCardProps) {
  return (
    <Link
      href={href}
      className={cx(
        "flex flex-col gap-3 rounded-card border border-hairline bg-surface p-4 text-ink hover:border-primary md:p-5",
        className,
      )}
    >
      <span className="font-editorial text-article-subhead text-ink">{title}</span>
      {excerpt ? <span className="text-body text-ink-secondary">{excerpt}</span> : null}
      <span className="mt-auto text-legal text-ink-muted">
        {byline}
        {readingMinutes ? ` · ${readingMinutes} min read` : ""}
      </span>
    </Link>
  );
}
