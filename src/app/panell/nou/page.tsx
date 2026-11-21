import { dbConfigurada } from "@/lib/panell/db";
import { requereixSessio } from "@/lib/panell/seguretat";
import { nouLead } from "@/app/panell/accions";
import { Barra } from "@/views/panell/barra";
import { FormLead } from "@/views/panell/form-lead";
import { SenseDb } from "@/views/panell/sense-db";

export default async function Nou() {
  if (!dbConfigurada()) return <SenseDb />;
  const s = await requereixSessio();
  return (
    <>
      <Barra usuari={s.usuari} />
      <main className="mx-auto max-w-4xl px-4 py-8 md:px-8">
        <h1 className="mb-6 text-2xl font-semibold tracking-tight">Nou lead</h1>
        <FormLead accio={nouLead} boto="Crear lead" />
      </main>
    </>
  );
}
