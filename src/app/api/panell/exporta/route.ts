import { dbConfigurada } from "@/lib/panell/db";
import { llistaLeads } from "@/lib/panell/leads";
import { sessioActual } from "@/lib/panell/seguretat";
import { aCsv } from "@/lib/panell/csv";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!dbConfigurada() || !(await sessioActual())) return new Response("No autoritzat", { status: 401 });
  const csv = aCsv((await llistaLeads()).filter((l) => !l.esborrat));
  const dia = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${dia}.csv"`,
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
