import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  /** One line under the title describing the rule being shown. */
  note?: string;
  children: ReactNode;
}

export function Section({ id, title, note, children }: SectionProps) {
  return (
    <section id={id} className="flex scroll-mt-20 flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-section text-ink">{title}</h2>
        {note ? <p className="max-w-measure text-body text-ink-muted">{note}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function Example({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-label text-ink-muted">{label}</p>
      {children}
    </div>
  );
}
