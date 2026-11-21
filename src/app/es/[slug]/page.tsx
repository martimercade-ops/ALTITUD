import { PaginaLanding, metaLanding } from "@/i18n/pages";
import { findLandingEs, landingEsHref, landingsEs } from "@/data/landings-es";

export const dynamicParams = false;
export const generateStaticParams = () => landingsEs.map((l) => ({ slug: l.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const l = findLandingEs((await params).slug);
  return l ? metaLanding("es", l, landingEsHref(l.slug)) : {};
}

export default async function Page({ params }: Props) {
  return <PaginaLanding lang="es" slug={(await params).slug} />;
}
