import { siteConfig } from "@/lib/site";
import { services, serviceHref } from "@/data/mocks/services";

const SAME_AS = [
  "https://www.instagram.com/altitudigital",
  "https://www.facebook.com/people/Altitud-Digital/61563871467106/",
  "https://www.google.com/maps?cid=16031392341318370555",
];

export function getSiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        description: siteConfig.description,
        slogan: siteConfig.tagline,
        url: siteConfig.url,
        logo: `${siteConfig.url}/icon-512.png`,
        sameAs: SAME_AS,
        founder: { "@type": "Person", name: "Martí Mercadé", jobTitle: "CEO" },
        email: "info@altitudigital.com",
        telephone: "+376 670 222",
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#agencia`,
        name: siteConfig.name,
        description: "Agència de màrqueting digital a Andorra: webs, SEO, xarxes socials, publicitat, vídeo i IA.",
        url: siteConfig.url,
        image: `${siteConfig.url}${siteConfig.ogImage}`,
        logo: `${siteConfig.url}/icon-512.png`,
        telephone: "+376 670 222",
        email: "info@altitudigital.com",
        priceRange: "€€",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Carrer Ciutat de Valls, 24",
          addressLocality: "Andorra la Vella",
          postalCode: "AD500",
          addressCountry: "AD",
        },
        areaServed: [
          { "@type": "Country", name: "Andorra" },
          { "@type": "Country", name: "Espanya" },
          { "@type": "Country", name: "França" },
        ],
        openingHoursSpecification: [
          { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "09:00", closes: "14:00" },
          { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "15:00", closes: "18:00" },
        ],
        alternateName: ["Altitud Digital Andorra", "Altitud Digital agència de màrqueting"],
        sameAs: SAME_AS,
        hasMap: "https://www.google.com/maps?cid=16031392341318370555",
        availableLanguage: ["ca", "es", "fr", "en"],
        knowsAbout: [
          "Màrqueting digital", "Agencia de marketing digital", "SEO", "Posicionamiento web", "GEO (posicionamiento en IA)",
          "Disseny web", "Tiendas online", "Xarxes socials", "Reels", "Google Ads", "Meta Ads", "Branding",
          "Disseny UX/UI", "Vídeo", "Intel·ligència artificial", "Chatbots amb IA", "Automatitzacions", "Formació de màrqueting digital",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Serveis d'Altitud Digital",
          itemListElement: services.map((sv) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: sv.name, description: sv.short, url: `${siteConfig.url}${serviceHref(sv.slug)}` },
          })),
        },
        parentOrganization: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
    ],
  };
}
