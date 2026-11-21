import { notFound } from "next/navigation";
import { ServiceView } from "@/views/service";
import { findService, serviceHref, services } from "@/data/mocks/services";
import { generateMetadata as pageMetadata } from "@/utils/seo/generate-page-metadata";
import { ALTERNATES_ES } from "@/app/es/meta";

const esDe = (ruta: string) => {
  const slug = Object.keys(ALTERNATES_ES).find((k) => ALTERNATES_ES[k] === ruta);
  return slug === undefined ? undefined : slug ? `/es/${slug}` : "/es";
};

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

/** Títols pensats per a les cerques reals de Google (Search Console) */
const TITOLS: Record<string, string> = {
  "seo-sem": "Agència SEO i SEM a Andorra: posicionament web i Google Ads | Altitud Digital",
  "web-ecommerce": "Disseny web i botigues online a Andorra | Altitud Digital",
  "xarxes-socials": "Gestió de xarxes socials a Andorra: Instagram i Meta Ads | Altitud Digital",
  "branding": "Branding, logotips i disseny gràfic a Andorra | Altitud Digital",
  "consultoria": "Consultoria de màrqueting digital a Andorra | Altitud Digital",
  "chatbots-ia": "Chatbots amb IA per a empreses d'Andorra | Altitud Digital",
  "formacions-ia": "Formacions d'IA i màrqueting a Andorra | Altitud Digital",
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return {};
  return pageMetadata({
    title: TITOLS[service.slug] ?? `${service.name} a Andorra | Altitud Digital`,
    description: service.intro,
    url: serviceHref(service.slug),
    ...(esDe(serviceHref(service.slug)) ? { languages: { ca: serviceHref(service.slug), es: esDe(serviceHref(service.slug))! } } : {}),
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();
  return <ServiceView service={service} />;
}
