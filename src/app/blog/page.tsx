import { alternates } from "@/i18n/config";
import { BlogIndexCa } from "@/views/blog-ca";
import { generateMetadata as pageMetadata } from "@/utils/seo/generate-page-metadata";

export const metadata = pageMetadata({
  title: "Blog de màrqueting digital, SEO i IA a Andorra | Altitud Digital",
  description:
    "Guies pràctiques de màrqueting de continguts, SEO, xarxes socials i intel·ligència artificial per a empreses d'Andorra, escrites per l'equip d'Altitud Digital.",
  url: "/blog",
  languages: alternates("/blog") as Record<string, string>,
});

export default function Page() {
  return <BlogIndexCa />;
}
