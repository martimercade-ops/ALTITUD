import { alternates } from "@/i18n/config";
import { PdeView } from "@/views/pde";
import { generateMetadata as pageMetadata } from "@/utils/seo/generate-page-metadata";

export const metadata = pageMetadata({
  title: "Ajuts PDE Andorra 2027: fins a 6.000 € per digitalitzar la teva empresa | Altitud Digital",
  description:
    "El Programa de Digitalització d'Empreses (PDE) subvenciona entre el 30% i el 50% de la teva web, IA, SEO o ciberseguretat, fins a 6.000 €. Imports per mida, totes les solucions, un exemple de càlcul i com preparar la convocatòria 2027.",
  url: "/ajuts-pde",
  languages: alternates("/ajuts-pde") as Record<string, string>,
});

export default function AjutsPdePage() {
  return <PdeView />;
}
