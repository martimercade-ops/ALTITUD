import { notFound } from "next/navigation";
import { LandingEsView } from "@/views/landing-es";
import { findLandingEs } from "@/data/landings-es";
import { metaLandingEs } from "@/app/es/meta";

const l = findLandingEs("");

export const metadata = l ? metaLandingEs(l) : {};

export default function EsPage() {
  if (!l) notFound();
  return <LandingEsView l={l} />;
}
