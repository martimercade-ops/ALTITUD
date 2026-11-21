import { PaginaServei, metaServei, serveisDe } from "@/i18n/pages";

export const dynamicParams = false;
export const generateStaticParams = () => serveisDe("en");

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  return metaServei("en", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <PaginaServei lang="en" slug={(await params).slug} />;
}
