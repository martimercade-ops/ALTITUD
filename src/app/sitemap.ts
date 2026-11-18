import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";
import { projectHref, projects } from "@/data/mocks/projects";
import { serviceHref, services } from "@/data/mocks/services";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
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
    ...projects.map((p) => ({
      url: `${siteConfig.url}${projectHref(p.slug)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
