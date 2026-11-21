import { notFound } from "next/navigation";
import { LandingEsView } from "@/views/landing-es";
import { findLandingEs, landingsEs } from "@/data/landings-es";
import { metaLandingEs } from "@/app/es/meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return landingsEs.filter((l) => l.slug).map((l) => ({ slug: l.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const l = findLandingEs((await params).slug);
  return l ? metaLandingEs(l) : {};
}

export default async function LandingEsPage({ params }: Props) {
  const l = findLandingEs((await params).slug);
  if (!l || !l.slug) notFound();
  return <LandingEsView l={l} />;
}
