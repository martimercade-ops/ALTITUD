import { dbConfigurada } from "@/lib/panell/db";
import { requereixSessio } from "@/lib/panell/seguretat";
import { Barra } from "@/views/panell/barra";
import { FormImporta } from "@/views/panell/form-importa";
import { SenseDb } from "@/views/panell/sense-db";

export default async function Importa() {
  if (!dbConfigurada()) return <SenseDb />;
  const s = await requereixSessio();
  return (
    <>
      <Barra usuari={s.usuari} />
      <main className="mx-auto max-w-2xl px-4 py-8 md:px-8">
        <h1 className="text-2xl font-semibold tracking-tight">Importar leads</h1>
        <p className="mt-2 text-sm text-black/55">
          Fitxer CSV amb columnes com: tipus, creat, empresa, contacte, email, telefon, web, serveis, canal, estat, missatge.
        </p>
        <FormImporta />
      </main>
    </>
  );
}
