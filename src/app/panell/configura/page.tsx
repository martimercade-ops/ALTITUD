import { redirect } from "next/navigation";
import QRCode from "qrcode";
import { getServerEnv } from "@/env";
import { dbConfigurada } from "@/lib/panell/db";
import { hiHaUsuari, nouSecretTotp, uriTotp } from "@/lib/panell/seguretat";
import { FormConfigura } from "@/views/panell/form-configura";
import { SenseDb } from "@/views/panell/sense-db";

export default async function Configura() {
  if (!dbConfigurada()) return <SenseDb />;
  if (await hiHaUsuari()) redirect("/panell/entrar");
  const token = getServerEnv().PANELL_SETUP_TOKEN;
  if (!token || token.length < 24) {
    return (
      <main className="grid min-h-screen place-items-center px-4">
        <div className="panell-targeta max-w-md p-8 text-sm text-black/70">
          <h1 className="text-xl font-semibold text-black">Configuració tancada</h1>
          <p className="mt-3">Per crear l&apos;usuari cal definir PANELL_SETUP_TOKEN (mínim 24 caràcters) a les variables d&apos;entorn.</p>
        </div>
      </main>
    );
  }
  const secret = nouSecretTotp();
  const qr = await QRCode.toDataURL(uriTotp(secret, "panell"), { margin: 1, width: 220 });
  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <div className="panell-targeta w-full max-w-lg p-8">
        <h1 className="text-2xl font-semibold tracking-tight">Crea l&apos;accés al panell</h1>
        <p className="mt-2 text-sm text-black/60">Només es pot fer una vegada. Després aquesta pàgina queda tancada.</p>
        <FormConfigura secret={secret} qr={qr} />
      </div>
    </main>
  );
}
