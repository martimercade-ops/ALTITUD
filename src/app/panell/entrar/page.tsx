import { redirect } from "next/navigation";
import { dbConfigurada } from "@/lib/panell/db";
import { hiHaUsuari, sessioActual } from "@/lib/panell/seguretat";
import { FormEntrar } from "@/views/panell/form-entrar";
import { SenseDb } from "@/views/panell/sense-db";

export default async function Entrar() {
  if (!dbConfigurada()) return <SenseDb />;
  if (await sessioActual()) redirect("/panell");
  if (!(await hiHaUsuari())) redirect("/panell/configura");
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="panell-targeta w-full max-w-sm p-8">
        <span className="grid size-10 place-items-center rounded-xl bg-[#111827] text-sm font-semibold text-white">AD</span>
        <h1 className="mt-5 text-2xl font-semibold tracking-tight">Panell privat</h1>
        <p className="mt-1 text-sm text-black/55">Accés restringit.</p>
        <FormEntrar />
      </div>
    </main>
  );
}
