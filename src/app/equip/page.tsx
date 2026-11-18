import { TeamPageView } from "@/views/team-page";
import { generateMetadata as pageMetadata } from "@/utils/seo/generate-page-metadata";

export const metadata = pageMetadata({
  title: "Equip — Altitud Digital",
  description:
    "Coneix l'equip d'Altitud Digital: persones reals d'Andorra que fan créixer el teu negoci. Vine a fer un cafè a la nostra oficina d'Andorra la Vella.",
  url: "/equip",
});

export default function EquipPage() {
  return <TeamPageView />;
}
