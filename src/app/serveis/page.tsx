import { alternates } from "@/i18n/config";
import { ServeisView } from "@/views/serveis";
import { generateMetadata as pageMetadata } from "@/utils/seo/generate-page-metadata";

export const metadata = pageMetadata({
  title: "Serveis de màrqueting digital, web i IA a Andorra | Altitud Digital",
  description:
    "Consultoria, webs, SEO, xarxes socials, vídeo, branding, IA, chatbots i formacions. Tot el que fem a Altitud Digital per fer créixer el teu negoci a Andorra.",
  url: "/serveis",
  languages: alternates("/serveis") as Record<string, string>,
});

export default function ServeisPage() {
  return <ServeisView />;
}
