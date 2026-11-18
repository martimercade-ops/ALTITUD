import { notFound } from "next/navigation";
import { ServiceView } from "@/views/service";
import { findService, serviceHref, services } from "@/data/mocks/services";
import { generateMetadata as pageMetadata } from "@/utils/seo/generate-page-metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return {};
  return pageMetadata({
    title: `${service.name} a Andorra — Altitud Digital`,
    description: service.intro,
    url: serviceHref(service.slug),
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();
  return <ServiceView service={service} />;
}
