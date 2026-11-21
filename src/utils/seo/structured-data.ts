import { siteConfig } from "@/lib/site";

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
        knowsAbout: ["Màrqueting digital", "SEO", "Disseny web", "Xarxes socials", "Publicitat digital", "Intel·ligència artificial"],
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
