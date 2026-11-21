import { alternates } from "@/i18n/config";
import { TeamPageView } from "@/views/team-page";
import { generateMetadata as pageMetadata } from "@/utils/seo/generate-page-metadata";

export const metadata = pageMetadata({
  title: "Qui som: agència de màrqueting a Andorra la Vella | Altitud Digital",
  description:
    "Coneix l'equip d'Altitud Digital: un equip creatiu i compromès que fa créixer el teu negoci des d'Andorra. Vine a fer un cafè a la nostra oficina d'Andorra la Vella.",
  url: "/equip",
  languages: alternates("/equip") as Record<string, string>,
});

export default function EquipPage() {
  return <TeamPageView />;
}
