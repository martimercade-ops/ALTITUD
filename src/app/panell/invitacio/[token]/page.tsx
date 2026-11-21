import { createHash } from "node:crypto";
import QRCode from "qrcode";
import type { RowDataPacket } from "mysql2/promise";
import { consulta, dbConfigurada } from "@/lib/panell/db";
import { nouSecretTotp, uriTotp } from "@/lib/panell/seguretat";
import { AuthShell } from "@/views/panell/auth-shell";
import { SenseDb } from "@/views/panell/sense-db";
import { FormInvitacio } from "@/views/panell/form-invitacio";

export default async function Invitacio({ params }: { params: Promise<{ token: string }> }) {
  if (!dbConfigurada()) return <SenseDb />;
  const token = (await params).token.slice(0, 100);
  const hash = createHash("sha256").update(token).digest("hex");
  const [inv] = await consulta<RowDataPacket>("SELECT id FROM panell_invitacio WHERE id = ? AND usada = 0 AND caduca > UTC_TIMESTAMP()", [hash]);
  if (!inv) {
    return (
      <AuthShell>
        <div className="panell-targeta p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Invitació no vàlida</h2>
          <p className="mt-2 text-sm text-black/55">Aquest enllaç ja s&apos;ha fet servir o ha caducat. Demana&apos;n un de nou.</p>
        </div>
      </AuthShell>
    );
  }
  const secret = nouSecretTotp();
  const qr = await QRCode.toDataURL(uriTotp(secret, "panell"), { margin: 1, width: 220 });
  return (
    <AuthShell>
      <div className="panell-targeta p-8">
        <h2 className="text-2xl font-semibold tracking-tight">Benvingut al panell</h2>
        <p className="mt-1 text-sm text-black/55">Crea el teu accés. L&apos;enllaç només es pot fer servir una vegada.</p>
        <FormInvitacio token={token} secret={secret} qr={qr} />
      </div>
    </AuthShell>
  );
}
