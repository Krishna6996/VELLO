import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";

/** The one sage pull quote an article may carry. */
export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-8 rounded-card bg-sage px-6 py-5 font-editorial text-article-subhead text-ink [&_p]:m-0">
      {children}
    </blockquote>
  );
}

/** MDX elements mapped to the editorial type scale. Tables use hairlines, never stripes. */
export const mdxComponents: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mt-10 mb-3 font-editorial text-article-subhead text-ink">{children}</h2>
  ),
  h3: ({ children }) => <h3 className="mt-8 mb-2 text-card text-ink">{children}</h3>,
  p: ({ children }) => <p className="my-4 text-article text-ink">{children}</p>,
  ul: ({ children }) => (
    <ul className="my-4 list-disc pl-6 text-article text-ink marker:text-ink-muted">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 list-decimal pl-6 text-article text-ink marker:text-ink-muted">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="my-1">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  em: ({ children }) => <em>{children}</em>,
  a: ({ children, href }) => (
    <a href={href} className="text-primary underline underline-offset-2 hover:text-primary-pressed">
      {children}
    </a>
  ),
  hr: () => <hr className="my-8 border-hairline" />,
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-row text-ink">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-hairline py-2 pr-4 text-left text-label text-ink-muted">
      {children}
    </th>
  ),
  td: ({ children }) => <td className="border-b border-divider py-2 pr-4 align-top">{children}</td>,
  PullQuote,
};
