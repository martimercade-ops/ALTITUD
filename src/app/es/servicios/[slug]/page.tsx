import { PaginaServei, metaServei, serveisDe } from "@/i18n/pages";

export const dynamicParams = false;
export const generateStaticParams = () => serveisDe("es");

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  return metaServei("es", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <PaginaServei lang="es" slug={(await params).slug} />;
}
