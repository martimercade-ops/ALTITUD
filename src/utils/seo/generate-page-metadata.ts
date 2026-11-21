import { Metadata, Viewport } from "next";

import { siteConfig } from "@/lib/site";

interface MetadataProps {
  title?: string;
  description?: string;
  url?: string;
  ogImage?: string;
  twitterHandle?: string;
  author?: string;
  siteName?: string;
}

export function generateMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  url = "/",
  ogImage = siteConfig.ogImage,
  twitterHandle = siteConfig.twitterHandle,
  author = siteConfig.author,
  siteName = siteConfig.name,
}: MetadataProps = {}): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    applicationName: siteConfig.name,
    keywords: [...siteConfig.keywords],
    authors: [{ name: author }],
    creator: author,
    publisher: author,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      images: [
        { url: ogImage, width: 1200, height: 630, alt: siteConfig.ogImageAlt },
      ],
      locale: "ca_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(twitterHandle ? { site: twitterHandle, creator: twitterHandle } : {}),
      images: [{ url: ogImage, alt: siteConfig.ogImageAlt }],
    },
    icons: {
      icon: [
        { url: "/icon.svg?v=2", type: "image/svg+xml" },
        { url: "/favicon.ico?v=2", sizes: "48x48" },
        { url: "/favicon-16x16.png?v=2", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png?v=2", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/apple-icon-180x180.png?v=2", sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: "/manifest.json",
    other: {
      robots: "noai, noimageai",
      "tdm-reservation": "1",
      copyright: "© 2026 Altitud Digital",
      "site-id": "AD-AND-2026-8R3T",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateViewport(): Viewport {
  return {
    themeColor: siteConfig.themeColor,
    width: "device-width",
    initialScale: 1,
  };
}
