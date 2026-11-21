import { PaginaServei, metaServei, serveisDe } from "@/i18n/pages";

export const dynamicParams = false;
export const generateStaticParams = () => serveisDe("fr");

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  return metaServei("fr", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <PaginaServei lang="fr" slug={(await params).slug} />;
}
