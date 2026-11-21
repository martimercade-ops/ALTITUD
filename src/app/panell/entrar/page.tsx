import { redirect } from "next/navigation";
import { dbConfigurada } from "@/lib/panell/db";
import { hiHaUsuari, sessioActual } from "@/lib/panell/seguretat";
import { FormEntrar } from "@/views/panell/form-entrar";
import { SenseDb } from "@/views/panell/sense-db";
import { AuthShell } from "@/views/panell/auth-shell";

export default async function Entrar() {
  if (!dbConfigurada()) return <SenseDb />;
  if (await sessioActual()) redirect("/panell");
  if (!(await hiHaUsuari())) redirect("/panell/configura");
  return (
    <AuthShell>
      <div className="panell-targeta p-8 shadow-[0_30px_60px_-30px_rgb(11_20_36/0.25)]">
        <h2 className="text-2xl font-semibold tracking-tight">Accedeix al panell</h2>
        <p className="mt-1 text-sm text-black/55">Només per a l&apos;equip d&apos;Altitud Digital.</p>
        <FormEntrar />
      </div>
      <p className="mt-6 text-center text-xs text-black/40">Accés protegit · Els intents fallits queden registrats</p>
    </AuthShell>
  );
}
