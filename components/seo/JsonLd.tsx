interface JsonLdProps {
  data: Record<string, unknown>;
}

/** One script tag of structured data. Serialised safely for inline HTML. */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
