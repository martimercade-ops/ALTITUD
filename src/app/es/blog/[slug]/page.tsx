import { PaginaArticleEs, metaArticleEs } from "@/i18n/pages";
import { articlesEs, findArticleEs } from "@/data/blog-es";

export const dynamicParams = false;
export const generateStaticParams = () => articlesEs.map((a) => ({ slug: a.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const a = findArticleEs((await params).slug);
  return a ? metaArticleEs(a) : {};
}

export default async function Page({ params }: Props) {
  return <PaginaArticleEs slug={(await params).slug} />;
}
