import { MetodologiaView } from "@/views/metodologia";
import { generateMetadata as pageMetadata } from "@/utils/seo/generate-page-metadata";

export const metadata = pageMetadata({
  title: "Metodologia — Altitud Digital",
  description:
    "Diagnòstic, estratègia, execució i resultats: així treballem a Altitud Digital per fer créixer el teu negoci.",
  url: "/metodologia",
});

export default function MetodologiaPage() {
  return <MetodologiaView />;
}
