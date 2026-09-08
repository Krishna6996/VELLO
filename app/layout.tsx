import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { OfflineBar } from "@/components/layout/OfflineBar";
import { largeTypeBootScript } from "@/lib/large-type-boot";
import { motionCssVars } from "@/lib/motion";
import { siteDescription, siteName, siteUrl } from "@/lib/site";
import { organizationJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

/** Editorial only, so it is not preloaded; it loads when a page first uses it. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: `%s · ${siteName}` },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName,
    locale: "en_IN",
    title: siteName,
    description: siteDescription,
    url: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${fraunces.variable} h-full`}
      style={motionCssVars}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: largeTypeBootScript }} />
        <JsonLd data={organizationJsonLd()} />
      </head>
      <body className="flex min-h-full flex-col bg-canvas text-ink">
        <Header />
        <OfflineBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
