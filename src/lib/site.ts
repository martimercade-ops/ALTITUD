import { getServerEnv, publicEnv } from "@/env";

const vercelProduction = getServerEnv().VERCEL_PROJECT_PRODUCTION_URL;

export const siteConfig = {
  name: "Altitud Digital",
  tagline: "Agència de màrqueting 360° a Andorra",
  description:
    "Estratègia, creativitat i tecnologia per atraure clients, fer créixer la teva marca i convertir oportunitats en resultats reals.",
  url:
    publicEnv.NEXT_PUBLIC_SITE_URL ??
    (vercelProduction
      ? `https://${vercelProduction}`
      : process.env.NODE_ENV === "production"
        ? "https://altitudigital.com"
        : "http://localhost:3000"),
  ogImage: "/open-graph.jpg",
  ogImageAlt: "Altitud Digital, agència de màrqueting 360° a Andorra",
  twitterHandle: undefined as string | undefined,
  author: "Altitud Digital",
  keywords: [
    "Altitud Digital",
    "agència de màrqueting Andorra",
    "màrqueting digital",
    "SEO",
    "disseny web",
    "xarxes socials",
  ],
  themeColor: "#0b1424",
} as const;
