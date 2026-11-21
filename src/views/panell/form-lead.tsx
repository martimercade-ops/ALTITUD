import { ESTATS, SERVEIS, TIPUS, type Lead } from "@/lib/panell/tipus";

export const FormLead = ({ lead, accio, boto }: { lead?: Lead; accio: (f: FormData) => Promise<void>; boto: string }) => {
  const actius = new Set((lead?.serveis ?? "").split(",").map((s) => s.trim()).filter(Boolean));
  const extres = [...actius].filter((s) => !SERVEIS.includes(s));
  return (
    <form action={accio} className="panell-targeta grid gap-5 p-6 md:grid-cols-2">
      <label>
        <span className="panell-etiqueta">Empresa</span>
        <input name="empresa" defaultValue={lead?.empresa} className="panell-camp" />
      </label>
      <label>
        <span className="panell-etiqueta">Persona de contacte</span>
        <input name="contacte" defaultValue={lead?.contacte} className="panell-camp" />
      </label>
      <label>
        <span className="panell-etiqueta">Correu</span>
        <input name="email" type="email" defaultValue={lead?.email} className="panell-camp" />
      </label>
      <label>
        <span className="panell-etiqueta">Telèfon</span>
        <input name="telefon" defaultValue={lead?.telefon} className="panell-camp" />
      </label>
      <label>
        <span className="panell-etiqueta">Web</span>
        <input name="web" defaultValue={lead?.web} className="panell-camp" />
      </label>
      <label>
        <span className="panell-etiqueta">Canal (com ens ha trobat)</span>
        <input name="canal" defaultValue={lead?.canal} placeholder="Instagram, recomanació…" className="panell-camp" />
      </label>
      <label>
        <span className="panell-etiqueta">Tipus</span>
        <select name="tipus" defaultValue={lead?.tipus ?? "altres"} className="panell-camp">
          {TIPUS.map((t) => <option key={t.id} value={t.id}>{t.nom}</option>)}
        </select>
      </label>
      <label>
        <span className="panell-etiqueta">Estat</span>
        <select name="estat" defaultValue={lead?.estat ?? "nou"} className="panell-camp">
          {ESTATS.map((e) => <option key={e.id} value={e.id}>{e.nom}</option>)}
        </select>
      </label>
      <label>
        <span className="panell-etiqueta">Import del pressupost (€)</span>
        <input name="valor" inputMode="decimal" defaultValue={lead?.valor ?? ""} className="panell-camp" />
      </label>
      <label>
        <span className="panell-etiqueta">Pròxim seguiment</span>
        <input name="seguiment" type="date" defaultValue={lead?.seguiment ?? ""} className="panell-camp" />
      </label>
      <fieldset className="md:col-span-2">
        <legend className="panell-etiqueta">Serveis</legend>
        <div className="flex flex-wrap gap-2">
          {[...SERVEIS, ...extres].map((s) => (
            <label key={s} className="flex cursor-pointer items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-sm has-[:checked]:border-[#111827] has-[:checked]:bg-[#111827] has-[:checked]:text-white">
              <input type="checkbox" name="serveis" value={s} defaultChecked={actius.has(s)} className="sr-only" />
              {s}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="md:col-span-2">
        <span className="panell-etiqueta">Missatge / descripció</span>
        <textarea name="missatge" rows={4} defaultValue={lead?.missatge ?? ""} className="panell-camp" />
      </label>
      <div className="md:col-span-2">
        <button type="submit" className="panell-boto">{boto}</button>
      </div>
    </form>
  );
};
