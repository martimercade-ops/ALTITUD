import { findArticleCa } from "@/data/blog-ca";
import { ArticleCaView } from "@/views/blog-ca";
import { generateMetadata as pageMetadata } from "@/utils/seo/generate-page-metadata";

const a = findArticleCa("marqueting-de-continguts-andorra")!;

export const metadata = pageMetadata({ title: a.title, description: a.description, url: a.ruta! });

export default function Page() {
  return <ArticleCaView a={a} />;
}
