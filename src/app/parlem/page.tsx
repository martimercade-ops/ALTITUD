import { ParlemView } from "@/views/parlem";
import { generateMetadata as pageMetadata } from "@/utils/seo/generate-page-metadata";

export const metadata = pageMetadata({
  title: "Contacte: parlem del teu projecte | Altitud Digital, Andorra",
  description:
    "Explica'ns el teu projecte i t'assessorem sense compromís. Agència de màrqueting 360° a Andorra la Vella.",
  url: "/parlem",
});

export default function ParlemPage() {
  return <ParlemView />;
}
