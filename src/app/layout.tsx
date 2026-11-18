import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import {
  generateMetadata,
  generateViewport,
} from "@/utils/seo/generate-page-metadata";
import { getSiteStructuredData } from "@/utils/seo/structured-data";
import { siteConfig } from "@/lib/site";

import { AdaptiveGrid } from "@/components/common/grid";
import { ReducedMotion } from "@/components/common/reduced-motion";
import { Guardia } from "@/components/common/guardia";
import { ScrollLayout } from "@/layouts/scroll-layout";
import { ConsentBanner } from "@/components/common/consent";

import "@/app/globals.css";

const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: "./fonts/Inter-Variable-latin.woff2",
  weight: "100 900",
});

export const metadata: Metadata = generateMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
});
export const viewport: Viewport = generateViewport();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="ca">
      <body className={`${inter.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSiteStructuredData()).replace(/</g, "\\u003c"),
          }}
        />
        <noscript>
          <style>{`[data-preloader]{display:none}`}</style>
        </noscript>
        <Guardia />
        <ScrollLayout>
          <AdaptiveGrid coef={1} />
          <ReducedMotion />
          {children}
        </ScrollLayout>
        <ConsentBanner />
      </body>
    </html>
  );
}
