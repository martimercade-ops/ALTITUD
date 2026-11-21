import { dbConfigurada } from "@/lib/panell/db";
import { llistaLeads } from "@/lib/panell/leads";
import { requereixSessio } from "@/lib/panell/seguretat";
import { Barra } from "@/views/panell/barra";
import { SenseDb } from "@/views/panell/sense-db";
import { Tauler } from "@/views/panell/tauler";

export default async function Panell() {
  if (!dbConfigurada()) return <SenseDb />;
  const s = await requereixSessio();
  const leads = await llistaLeads();
  return (
    <>
      <Barra usuari={s.usuari} />
      <main>
        <Tauler leads={leads} usuari={s.usuari} />
      </main>
    </>
  );
}
