import { dbConfigurada } from "@/lib/panell/db";
import { requereixSessio } from "@/lib/panell/seguretat";
import { nouProjecte } from "@/app/panell/accions";
import { Barra } from "@/views/panell/barra";
import { FormProjecte } from "@/views/panell/form-projecte";
import { SenseDb } from "@/views/panell/sense-db";

export default async function NouProjecte() {
  if (!dbConfigurada()) return <SenseDb />;
  const s = await requereixSessio();
  return (
    <>
      <Barra usuari={s.usuari} actiu="/panell/projectes" />
      <main className="mx-auto max-w-4xl px-4 py-8 md:px-8">
        <h1 className="mb-2 text-2xl font-semibold tracking-tight">Nou projecte</h1>
        <p className="mb-6 text-sm text-black/55">Es crearà amb 5 fases per defecte, que després pots canviar.</p>
        <FormProjecte accio={nouProjecte} boto="Crear projecte" />
      </main>
    </>
  );
}
