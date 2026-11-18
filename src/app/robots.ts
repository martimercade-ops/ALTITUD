import type { MetadataRoute } from "next";

import { RASTREADORES_VETADOS } from "@/lib/proteccion";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [...RASTREADORES_VETADOS, "Google-Extended", "Applebot-Extended"],
        disallow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: "/robot-view",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
