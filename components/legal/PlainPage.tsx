interface PlainPageProps {
  title: string;
  /** Short plain paragraphs, one per line of the deck. */
  lines: readonly string[];
}

/** A short, plain legal page: an h1 and a few sentences on a 68ch measure. Nothing else. */
export function PlainPage({ title, lines }: PlainPageProps) {
  return (
    <div className="mx-auto flex w-full max-w-page flex-col gap-8 px-6 py-10 md:px-10 md:py-16 lg:px-12">
      <h1 className="text-h1 text-ink">{title}</h1>
      <div className="flex max-w-measure flex-col gap-4">
        {lines.map((line) => (
          <p key={line} className="text-body text-ink-secondary">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
