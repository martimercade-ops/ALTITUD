import { HomeView } from "@/views/home";
import { generateMetadata as pageMetadata } from "@/utils/seo/generate-page-metadata";
import { alternates } from "@/i18n/config";

export const metadata = pageMetadata({
  title: "Agència de màrqueting digital a Andorra | Altitud Digital",
  description:
    "Agència de màrqueting digital a Andorra la Vella: webs, SEO, xarxes socials, publicitat i IA per a empreses d'Andorra. Més de 100 clients. Parlem?",
  url: "/",
  languages: alternates("/") as Record<string, string>,
});

export default function Home() {
  return <HomeView />;
}
