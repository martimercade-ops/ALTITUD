import Link from "next/link";
import { notFound } from "next/navigation";
import { dbConfigurada } from "@/lib/panell/db";
import { notesDe, obtéLead } from "@/lib/panell/leads";
import { requereixSessio } from "@/lib/panell/seguretat";
import { colorEstat, nomEstat, nomTipus } from "@/lib/panell/tipus";
import { desaLead, esborra, nota } from "@/app/panell/accions";
import { Barra } from "@/views/panell/barra";
import { FormLead } from "@/views/panell/form-lead";
import { SenseDb } from "@/views/panell/sense-db";
import { BotoEsborrar } from "@/views/panell/boto-esborrar";

const dataHora = (s: string) =>
  new Date(s.replace(" ", "T") + "Z").toLocaleString("ca-ES", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

export default async function FitxaLead({ params }: { params: Promise<{ id: string }> }) {
  if (!dbConfigurada()) return <SenseDb />;
  const s = await requereixSessio();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const lead = await obtéLead(id);
  if (!lead) notFound();
  const notes = await notesDe(id);

  return (
    <>
      <Barra usuari={s.usuari} />
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <Link href="/panell" className="text-sm text-black/50 hover:text-black">← Tots els leads</Link>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">{lead.empresa || lead.contacte || "Lead"}</h1>
          <span className="rounded-full px-2.5 py-1 text-xs font-medium" style={{ background: `${colorEstat(lead.estat)}18`, color: colorEstat(lead.estat) }}>{nomEstat(lead.estat)}</span>
          <span className="rounded-full bg-black/5 px-2.5 py-1 text-xs">{nomTipus(lead.tipus)}</span>
        </div>
        <p className="mt-1 text-sm text-black/50">
          Entrat el {dataHora(lead.creat)}{lead.origen ? ` · ${lead.origen}` : ""}
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          {lead.email && <a href={`mailto:${lead.email}`} className="panell-boto panell-boto--clar !py-1.5">✉ {lead.email}</a>}
          {lead.telefon && <a href={`tel:${lead.telefon.replace(/\s/g, "")}`} className="panell-boto panell-boto--clar !py-1.5">☎ {lead.telefon}</a>}
          {lead.telefon && (
            <a href={`https://wa.me/${lead.telefon.replace(/\D/g, "").replace(/^(?=\d{6}$)/, "376")}`} target="_blank" rel="noopener noreferrer" className="panell-boto panell-boto--clar !py-1.5">WhatsApp</a>
          )}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <FormLead lead={lead} accio={desaLead.bind(null, id)} boto="Desar canvis" />
          <aside className="flex flex-col gap-4">
            <form action={nota.bind(null, id)} className="panell-targeta p-5">
              <label>
                <span className="panell-etiqueta">Nova nota</span>
                <textarea name="text" rows={3} required placeholder="He trucat, vol pressupost de web + SEO…" className="panell-camp" />
              </label>
              <button type="submit" className="panell-boto mt-3">Afegir nota</button>
            </form>
            <div className="panell-targeta p-5">
              <p className="panell-etiqueta">Historial</p>
              {notes.length ? (
                <ol className="mt-2 flex flex-col gap-4">
                  {notes.map((n) => (
                    <li key={n.id} className="border-l-2 border-black/10 pl-3">
                      <p className="text-xs text-black/45">{dataHora(n.quan)}</p>
                      <p className="mt-0.5 whitespace-pre-wrap text-sm">{n.text}</p>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-2 text-sm text-black/45">Encara no hi ha notes.</p>
              )}
            </div>
            <BotoEsborrar accio={esborra.bind(null, id)} />
          </aside>
        </div>
      </main>
    </>
  );
}
