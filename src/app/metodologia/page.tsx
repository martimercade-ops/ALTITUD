import { MetodologiaView } from "@/views/metodologia";
import { generateMetadata as pageMetadata } from "@/utils/seo/generate-page-metadata";

export const metadata = pageMetadata({
  title: "Metodologia — Altitud Digital",
  description:
    "Camp base, la ruta, l'ascens i el cim: la metodologia d'Altitud Digital per fer créixer el teu negoci, inspirada en la muntanya d'Andorra.",
  url: "/metodologia",
});

export default function MetodologiaPage() {
  return <MetodologiaView />;
}
