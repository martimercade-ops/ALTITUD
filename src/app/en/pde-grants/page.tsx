import { PaginaLanding, metaLanding } from "@/i18n/pages";
import { findLandingEs } from "@/data/landings-es";

export const metadata = metaLanding("en", findLandingEs("ayudas-pde-andorra")!, "/en/pde-grants");

export default function Page() {
  return <PaginaLanding lang="en" slug="ayudas-pde-andorra" />;
}
