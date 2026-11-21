import type { RowDataPacket } from "mysql2/promise";
import { consulta, dbConfigurada } from "@/lib/panell/db";
import { requereixSessio } from "@/lib/panell/seguretat";
import { Barra } from "@/views/panell/barra";
import { SenseDb } from "@/views/panell/sense-db";
import { FormConvida } from "@/views/panell/form-convida";

export default async function Equip() {
  if (!dbConfigurada()) return <SenseDb />;
  const s = await requereixSessio();
  const usuaris = await consulta<RowDataPacket & { usuari: string; creat: string }>("SELECT usuari, creat FROM panell_usuari ORDER BY id");
  return (
    <>
      <Barra usuari={s.usuari} actiu="/panell/equip" />
      <main className="mx-auto max-w-3xl px-4 py-10 md:px-8">
        <h1 className="text-2xl font-semibold tracking-tight">Equip</h1>
        <p className="mt-1 text-sm text-black/55">Persones amb accés al panell. Totes veuen el mateix: leads, projectes i números.</p>
        <ul className="panell-targeta mt-6 divide-y divide-black/5">
          {usuaris.map((u) => (
            <li key={u.usuari} className="flex items-center gap-3 px-5 py-4">
              <span className="grid size-9 place-items-center rounded-full bg-[#0b1424] text-sm font-semibold uppercase text-[#b6f13a]">{u.usuari.slice(0, 1)}</span>
              <span className="flex-1 font-medium">{u.usuari}{u.usuari === s.usuari && <span className="ml-2 text-xs font-normal text-black/40">(tu)</span>}</span>
              <span className="text-xs text-black/40">Des de {new Date(u.creat.replace(" ", "T") + "Z").toLocaleDateString("ca-ES")}</span>
            </li>
          ))}
        </ul>
        <h2 className="mt-10 text-lg font-semibold tracking-tight">Convidar algú</h2>
        <p className="mt-1 text-sm text-black/55">
          Es genera un enllaç d&apos;un sol ús que caduca en 48 hores. La persona hi crea el seu usuari, la seva contrasenya i connecta Google Authenticator, igual que tu.
        </p>
        <FormConvida />
      </main>
    </>
  );
}
