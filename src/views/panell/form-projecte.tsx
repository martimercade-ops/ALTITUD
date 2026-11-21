import { ESTATS_PROJECTE, type Projecte } from "@/lib/panell/tipus";

const Camp = ({ label, children, full = false }: { label: string; children: React.ReactNode; full?: boolean }) => (
  <label className={full ? "md:col-span-2" : ""}>
    <span className="panell-etiqueta">{label}</span>
    {children}
  </label>
);

export const FormProjecte = ({ p, accio, boto }: { p?: Projecte; accio: (f: FormData) => Promise<void>; boto: string }) => (
  <form action={accio} className="panell-targeta grid gap-5 p-6 md:grid-cols-2">
    <Camp label="Client"><input name="client" required defaultValue={p?.client} className="panell-camp" /></Camp>
    <Camp label="Projecte"><input name="nom" required defaultValue={p?.nom} placeholder="Web + SEO, botiga online…" className="panell-camp" /></Camp>
    <Camp label="Estat">
      <select name="estat" defaultValue={p?.estat ?? "actiu"} className="panell-camp">
        {ESTATS_PROJECTE.map((e) => <option key={e.id} value={e.id}>{e.nom}</option>)}
      </select>
    </Camp>
    <Camp label="Responsable"><input name="responsable" defaultValue={p?.responsable} placeholder="Martí, Eric…" className="panell-camp" /></Camp>
    <Camp label="Data d'inici"><input name="inici" type="date" defaultValue={p?.inici ?? ""} className="panell-camp" /></Camp>
    <Camp label="Data d'entrega"><input name="entrega" type="date" defaultValue={p?.entrega ?? ""} className="panell-camp" /></Camp>
    <Camp label="Preu al client (€)"><input name="preu_client" inputMode="decimal" defaultValue={p?.preu_client ?? ""} className="panell-camp" /></Camp>
    <Camp label="Cost extern / Eric (€)"><input name="cost_extern" inputMode="decimal" defaultValue={p?.cost_extern ?? ""} className="panell-camp" /></Camp>
    <label className="flex items-center gap-3 self-end rounded-xl border border-black/10 bg-white px-4 py-3 text-sm">
      <input type="checkbox" name="cost_pagat" defaultChecked={Boolean(p?.cost_pagat)} className="size-4 accent-[#15803d]" />
      Cost extern ja pagat
    </label>
    <Camp label="Data del pagament"><input name="cost_data_pagament" type="date" defaultValue={p?.cost_data_pagament ?? ""} className="panell-camp" /></Camp>
    <Camp label="Web / enllaç" full><input name="web" defaultValue={p?.web} placeholder="https://…" className="panell-camp" /></Camp>
    <Camp label="Descripció" full><textarea name="descripcio" rows={4} defaultValue={p?.descripcio ?? ""} className="panell-camp" /></Camp>
    <div className="md:col-span-2"><button type="submit" className="panell-boto">{boto}</button></div>
  </form>
);
