import { PaginaLanding, metaLanding } from "@/i18n/pages";
import { findLandingEs } from "@/data/landings-es";

export const metadata = metaLanding("fr", findLandingEs("ayudas-pde-andorra")!, "/fr/aides-pde");

export default function Page() {
  return <PaginaLanding lang="fr" slug="ayudas-pde-andorra" />;
}
