import { ProjectesView } from "@/views/projectes";
import { generateMetadata as pageMetadata } from "@/utils/seo/generate-page-metadata";

export const metadata = pageMetadata({
  title: "Projectes: webs, SEO i xarxes per a empreses d'Andorra | Altitud Digital",
  description: "Webs, botigues online, SEO i xarxes socials per a empreses d'Andorra. Descobreix els projectes d'Altitud Digital.",
  url: "/projectes",
});

export default function ProjectesPage() {
  return <ProjectesView />;
}
