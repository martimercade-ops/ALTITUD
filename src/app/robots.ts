import type { MetadataRoute } from "next";

import { RASTREADORES_IA, RASTREADORES_VETADOS } from "@/lib/proteccion";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: RASTREADORES_VETADOS,
        disallow: "/",
      },
      {
        // Cercadors i assistents d'IA: benvinguts
        userAgent: [...RASTREADORES_IA, "Google-Extended", "Applebot-Extended"],
        allow: "/",
        disallow: ["/robot-view", "/panell", "/api"],
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
