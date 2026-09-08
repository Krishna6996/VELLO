import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import {
  colourTokens,
  desktopSpacingSteps,
  radiusTokens,
  spacingSteps,
  typeTokens,
  type TypeToken,
} from "./tokens";

export const metadata: Metadata = {
  title: "Styleguide",
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-section text-ink">{title}</h2>
      {children}
    </section>
  );
}

function swatchStyle(name: string): CSSProperties {
  return { backgroundColor: `var(--color-${name})` };
}

function radiusStyle(name: string): CSSProperties {
  return { borderRadius: `var(--radius-${name})` };
}

function typeColour(token: TypeToken, onSurface: boolean): string {
  switch (token.utility) {
    case "text-body":
      return onSurface ? "text-ink-secondary" : "text-ink";
    case "text-label":
      return "text-ink-muted";
    case "text-legal":
      return "text-ink-faint";
    default:
      return "text-ink";
  }
}

function TypeSpecimens({ onSurface }: { onSurface: boolean }) {
  return (
    <div className="flex flex-col gap-5">
      {typeTokens.map((token) => (
        <p key={token.utility} className={`${token.utility} ${typeColour(token, onSurface)}`}>
          {token.sample}
        </p>
      ))}
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <div className="mx-auto flex w-full max-w-page flex-col gap-16 px-6 py-12 md:px-10 md:py-16 lg:px-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-h1 text-ink">Styleguide</h1>
        <p className="max-w-measure text-body text-ink-muted">
          Every token declared in app/globals.css, from docs/design-system.md and
          docs/desktop-extension.md. Later work is checked against this page.
        </p>
      </header>

      <Section title="Colour">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {colourTokens.map((token) => (
            <li
              key={token.name}
              className="flex flex-col overflow-hidden rounded-card border border-hairline bg-surface"
            >
              <div className="h-16 border-b border-hairline" style={swatchStyle(token.name)} />
              <div className="flex flex-col gap-1 p-4">
                <p className="text-card text-ink">{token.name}</p>
                <p className="font-mono text-legal text-ink-muted">{token.hex}</p>
                <p className="text-legal text-ink-secondary">{token.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Type families">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-card border border-hairline bg-surface p-5">
            <p className="text-label text-ink-muted">Plus Jakarta Sans · UI · --font-ui</p>
            <p className="font-ui text-section text-ink">Medicine, exactly as prescribed.</p>
            <p className="font-ui text-body text-ink-secondary">
              Weights 400, 500, 600, 700 and 800. Sentence case everywhere.
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-card border border-hairline bg-surface p-5">
            <p className="text-label text-ink-muted">Fraunces · editorial · --font-editorial</p>
            <p className="font-editorial text-section font-medium text-ink">
              Guides, written by doctors, reviewed by doctors
            </p>
            <p className="font-ui text-body text-ink-secondary">
              Weights 500 and 600 with the optical size axis. Article headlines, subheads, pull
              quotes and the ℞ glyph only.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Type scale">
        <ul className="flex flex-col divide-y divide-divider">
          {typeTokens.map((token) => (
            <li key={token.utility} className="grid gap-3 py-5 md:grid-cols-[220px_1fr] md:gap-8">
              <div className="flex flex-col gap-1">
                <p className="text-label text-ink-muted">{token.name}</p>
                <p className="font-mono text-legal text-ink-secondary">{token.utility}</p>
                <p className="text-legal text-ink-muted">
                  {token.desktop} / {token.mobile} · {token.weight} · {token.leading}
                  {token.tracking ? ` · ${token.tracking}` : ""}
                </p>
              </div>
              <p className={`${token.utility} text-ink`}>{token.sample}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Radii">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {radiusTokens.map((token) => (
            <li key={token.name} className="flex flex-col gap-3">
              <div
                className="h-20 border border-hairline bg-surface"
                style={radiusStyle(token.name)}
              />
              <div className="flex flex-col gap-1">
                <p className="text-card text-ink">
                  {token.name} · {token.px}px
                </p>
                <p className="text-legal text-ink-muted">{token.use}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Spacing">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <p className="text-label text-ink-muted">4px grid, steps used in the design system</p>
            <ul className="flex flex-col gap-2">
              {spacingSteps.map((step) => (
                <li key={step} className="flex items-center gap-4">
                  <span className="w-12 font-mono text-legal text-ink-muted">{step}px</span>
                  <span className="h-4 rounded-none bg-primary" style={{ width: step }} />
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-label text-ink-muted">Desktop gutters, padding and section gaps</p>
            <ul className="flex flex-col gap-2">
              {desktopSpacingSteps.map((step) => (
                <li key={step} className="flex items-center gap-4">
                  <span className="w-12 font-mono text-legal text-ink-muted">{step}px</span>
                  <span className="h-4 rounded-none bg-sage" style={{ width: step }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Every size on canvas and on surface">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-card border border-hairline bg-canvas p-5">
            <p className="text-label text-ink-muted">On canvas</p>
            <TypeSpecimens onSurface={false} />
          </div>
          <div className="flex flex-col gap-4 rounded-card border border-hairline bg-surface p-5">
            <p className="text-label text-ink-muted">On surface</p>
            <TypeSpecimens onSurface />
          </div>
        </div>
      </Section>
    </div>
  );
}
