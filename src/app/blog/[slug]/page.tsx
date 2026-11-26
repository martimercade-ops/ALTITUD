import { notFound } from "next/navigation";
import { articlesCa, findArticleCa } from "@/data/blog-ca";
import { ArticleCaView } from "@/views/blog-ca";
import { generateMetadata as pageMetadata } from "@/utils/seo/generate-page-metadata";

export const dynamicParams = false;
export const generateStaticParams = () => articlesCa.filter((a) => !a.ruta).map((a) => ({ slug: a.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const a = findArticleCa((await params).slug);
  return a ? pageMetadata({ title: a.title, description: a.description, url: `/blog/${a.slug}` }) : {};
}

export default async function Page({ params }: Props) {
  const a = findArticleCa((await params).slug);
  if (!a || a.ruta) notFound();
  return <ArticleCaView a={a} />;
}
