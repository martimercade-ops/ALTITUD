import { generateMetadata as pageMetadata } from "@/utils/seo/generate-page-metadata";
import { landingEsHref, type LandingEs } from "@/data/landings-es";

/** Les pàgines amb equivalent català exacte porten hreflang ca ↔ es */
export const ALTERNATES_ES: Record<string, string> = {
  "": "/",
  "agencia-seo-andorra": "/serveis/seo-sem",
  "diseno-web-andorra": "/serveis/web-ecommerce",
  "redes-sociales-andorra": "/serveis/xarxes-socials",
  "branding-andorra": "/serveis/branding",
  "chatbots-ia-andorra": "/serveis/chatbots-ia",
  "ayudas-pde-andorra": "/ajuts-pde",
};

export const metaLandingEs = (l: LandingEs) => {
  const url = landingEsHref(l.slug);
  const ca = ALTERNATES_ES[l.slug];
  return pageMetadata({
    title: l.title,
    description: l.description,
    url,
    locale: "es_ES",
    languages: ca ? { ca, es: url } : undefined,
  });
};
