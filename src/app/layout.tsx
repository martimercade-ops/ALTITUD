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

import "@/app/globals.css";

const mulish = localFont({
  variable: "--font-mulish",
  display: "swap",
  src: [
    { path: "./fonts/Mulish-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Mulish-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Mulish-Medium.woff2", weight: "500", style: "normal" },
  ],
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
      <body className={`${mulish.variable}`}>
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
      </body>
    </html>
  );
}
