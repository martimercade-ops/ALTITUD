import { articleEsHref, articlesEs } from "@/data/blog-es";
import { articleCaHref, articlesCa } from "@/data/blog-ca";
import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";
import { projectHref, projects } from "@/data/mocks/projects";
import { serviceHref, services } from "@/data/mocks/services";
import { landingEsHref, landingsEs } from "@/data/landings-es";
import { alternates } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/avis-legal`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${siteConfig.url}/politica-de-galetes`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${siteConfig.url}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${siteConfig.url}/projectes`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/serveis`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/metodologia`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/ajuts-pde`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/equip`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/parlem`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    ...services.map((s) => ({
      url: `${siteConfig.url}${serviceHref(s.slug)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    // Versions traduïdes (castellà, francès i anglès) de les pàgines clau
    ...["/", "/serveis", "/equip", "/parlem", "/ajuts-pde", ...services.map((x) => serviceHref(x.slug))]
      .flatMap((ca) => Object.entries(alternates(ca)).filter(([l]) => l !== "ca").map(([, u]) => u!))
      .filter((u) => !u.startsWith("/es/") || !landingsEs.some((l) => landingEsHref(l.slug) === u))
      .map((u) => ({
        url: `${siteConfig.url}${u}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: u.split("/").length <= 2 ? 0.9 : 0.8,
      })),
    ...landingsEs.map((l) => ({
      url: `${siteConfig.url}${landingEsHref(l.slug)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: l.slug ? 0.9 : 1,
    })),
    { url: `${siteConfig.url}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    ...articlesCa.map((a) => ({
      url: `${siteConfig.url}${articleCaHref(a)}`,
      lastModified: new Date(a.date),
      changeFrequency: "monthly" as const,
      priority: a.ruta ? 0.9 : 0.7,
    })),
    { url: `${siteConfig.url}/es/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    ...articlesEs.map((a) => ({
      url: `${siteConfig.url}${articleEsHref(a.slug)}`,
      lastModified: new Date(a.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...projects.map((p) => ({
      url: `${siteConfig.url}${projectHref(p.slug)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
