import { ImageResponse } from "next/og";
import { colourTokens } from "@/app/styleguide/tokens";

/** Hex values from the token table, since satori cannot read CSS variables. */
const hex = Object.fromEntries(colourTokens.map((token) => [token.name, token.hex])) as Record<
  string,
  string
>;

export const ogSize = { width: 1200, height: 630 } as const;
export const ogContentType = "image/png";

let fontPromise: Promise<ArrayBuffer> | null = null;

/** Plus Jakarta Sans 800 as TrueType, fetched once from Google Fonts at build. */
async function fetchFont(): Promise<ArrayBuffer> {
  const css = await fetch(
    "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800&text=" +
      encodeURIComponent(
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,:;'’()+·/%-–&₹",
      ),
  ).then((response) => response.text());
  const url = css.match(/src: url\(([^)]+)\)/)?.[1];
  if (!url) throw new Error("Could not resolve the Plus Jakarta Sans font URL");
  return fetch(url).then((response) => response.arrayBuffer());
}

function loadFont(): Promise<ArrayBuffer> {
  if (!fontPromise) fontPromise = fetchFont();
  return fontPromise;
}

interface OgProps {
  title: string;
  /** For example the molecule line. */
  line?: string;
}

/** Canvas background, wordmark, the title in Jakarta 800, the line in Ink muted. No photo, no gradient. */
export async function renderOg({ title, line }: OgProps): Promise<ImageResponse> {
  const font = await loadFont();
  const titleSize = title.length > 40 ? 56 : 68;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        backgroundColor: hex.canvas,
        color: hex.ink,
        fontFamily: "Plus Jakarta Sans",
      }}
    >
      <div style={{ fontSize: 40, letterSpacing: "-0.03em", color: hex.ink }}>Vello</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            fontSize: titleSize,
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        {line ? <div style={{ fontSize: 30, color: hex["ink-muted"] }}>{line}</div> : null}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 26,
          color: hex["ink-secondary"],
        }}
      >
        <div style={{ width: 14, height: 14, borderRadius: 99, backgroundColor: hex.primary }} />
        <div>Medicine, exactly as prescribed.</div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [{ name: "Plus Jakarta Sans", data: font, weight: 800, style: "normal" }],
    },
  );
}
