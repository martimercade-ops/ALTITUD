import { PdeView } from "@/views/pde";
import { generateMetadata as pageMetadata } from "@/utils/seo/generate-page-metadata";

export const metadata = pageMetadata({
  title: "Ajuts PDE del Govern d'Andorra: digitalitza la teva empresa | Altitud Digital",
  description:
    "El Programa de Digitalització d'Empreses (PDE) subvenciona entre el 30% i el 50% de la digitalització de la teva empresa. Apunta't a la llista d'espera i tingues-ho tot preparat per a la propera convocatòria.",
  url: "/ajuts-pde",
});

export default function AjutsPdePage() {
  return <PdeView />;
}
