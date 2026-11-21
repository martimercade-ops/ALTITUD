import "server-only";
import { createHash, createHmac, randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import type { RowDataPacket } from "mysql2/promise";
import { consulta, dbConfigurada, executa } from "./db";

const scrypt = promisify(scryptCb) as (pw: string, salt: Buffer, len: number, opts: object) => Promise<Buffer>;

/* ── Contrasenyes (scrypt) ─────────────────────────────────────────── */
const N = 2 ** 15;
const PARAMS = { N, r: 8, p: 1, maxmem: 128 * N * 8 * 2 };

export const hashContrasenya = async (pw: string) => {
  const salt = randomBytes(16);
  const key = await scrypt(pw, salt, 64, PARAMS);
  return `scrypt$${N}$${salt.toString("base64")}$${key.toString("base64")}`;
};

export const verificaContrasenya = async (pw: string, desat: string) => {
  const [alg, n, s, k] = desat.split("$");
  if (alg !== "scrypt" || Number(n) !== N) return false;
  const key = await scrypt(pw, Buffer.from(s, "base64"), 64, PARAMS);
  const esperat = Buffer.from(k, "base64");
  return esperat.length === key.length && timingSafeEqual(esperat, key);
};

/* ── Codis del mòbil (TOTP, RFC 6238) ──────────────────────────────── */
const B32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
export const nouSecretTotp = () => {
  const bytes = randomBytes(20);
  let bits = "";
  for (const b of bytes) bits += b.toString(2).padStart(8, "0");
  let out = "";
  for (let i = 0; i + 5 <= bits.length; i += 5) out += B32[parseInt(bits.slice(i, i + 5), 2)];
  return out;
};
const deBase32 = (s: string) => {
  let bits = "";
  for (const c of s.replace(/=+$/, "").toUpperCase()) {
    const v = B32.indexOf(c);
    if (v < 0) continue;
    bits += v.toString(2).padStart(5, "0");
  }
  const out: number[] = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) out.push(parseInt(bits.slice(i, i + 8), 2));
  return Buffer.from(out);
};
const codiPer = (secret: string, comptador: number) => {
  const buf = Buffer.alloc(8);
  buf.writeBigUInt64BE(BigInt(comptador));
  const h = createHmac("sha1", deBase32(secret)).update(buf).digest();
  const o = h[h.length - 1] & 0xf;
  const n = ((h[o] & 0x7f) << 24) | (h[o + 1] << 16) | (h[o + 2] << 8) | h[o + 3];
  return String(n % 1_000_000).padStart(6, "0");
};
/** Retorna el comptador acceptat (o null). Admet ±1 interval de 30 s. */
export const verificaTotp = (secret: string, codi: string, ultim = 0) => {
  const net = codi.replace(/\s/g, "");
  if (!/^\d{6}$/.test(net)) return null;
  const ara = Math.floor(Date.now() / 30_000);
  for (const c of [ara - 1, ara, ara + 1]) {
    if (c <= ultim) continue; // un codi no es pot fer servir dues vegades
    const esperat = Buffer.from(codiPer(secret, c));
    if (timingSafeEqual(esperat, Buffer.from(net))) return c;
  }
  return null;
};
export const uriTotp = (secret: string, usuari: string) =>
  `otpauth://totp/${encodeURIComponent(`Altitud Digital:${usuari}`)}?secret=${secret}&issuer=${encodeURIComponent("Altitud Digital")}&algorithm=SHA1&digits=6&period=30`;

/* ── Límits d'intents ──────────────────────────────────────────────── */
export const ipClient = async () => {
  const h = await headers();
  return (h.get("x-forwarded-for")?.split(",")[0] ?? h.get("x-real-ip") ?? "").trim().slice(0, 64);
};
const MAX_PER_IP = 5; // en 15 minuts
const MAX_GLOBAL = 20; // en 1 hora, de qualsevol lloc

export const bloquejat = async (ip: string) => {
  type R = RowDataPacket & { n: number };
  const [perIp] = await consulta<R>(
    "SELECT COUNT(*) n FROM panell_intent WHERE ip = ? AND quan > UTC_TIMESTAMP() - INTERVAL 15 MINUTE",
    [ip],
  );
  const [global] = await consulta<R>("SELECT COUNT(*) n FROM panell_intent WHERE quan > UTC_TIMESTAMP() - INTERVAL 1 HOUR");
  return perIp.n >= MAX_PER_IP || global.n >= MAX_GLOBAL;
};
export const registraIntentFallit = async (ip: string) => {
  await executa("INSERT INTO panell_intent (ip, quan) VALUES (?, UTC_TIMESTAMP())", [ip]);
  await executa("DELETE FROM panell_intent WHERE quan < UTC_TIMESTAMP() - INTERVAL 1 DAY");
};

/* ── Sessions ──────────────────────────────────────────────────────── */
export const COOKIE = "__Host-panell";
const DURADA_H = 12;
const sha = (s: string) => createHash("sha256").update(s).digest("hex");

export const creaSessio = async (usuariId: number, ip: string) => {
  const token = randomBytes(32).toString("base64url");
  await executa(
    "INSERT INTO panell_sessio (id, usuari_id, caduca, ip) VALUES (?, ?, UTC_TIMESTAMP() + INTERVAL ? HOUR, ?)",
    [sha(token), usuariId, DURADA_H, ip],
  );
  await executa("DELETE FROM panell_sessio WHERE caduca < UTC_TIMESTAMP()");
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: DURADA_H * 3600,
  });
};

export const sessioActual = async () => {
  if (!dbConfigurada()) return null;
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token || token.length > 100) return null;
  type R = RowDataPacket & { usuari_id: number; usuari: string };
  const rows = await consulta<R>(
    `SELECT s.usuari_id, u.usuari FROM panell_sessio s JOIN panell_usuari u ON u.id = s.usuari_id
     WHERE s.id = ? AND s.caduca > UTC_TIMESTAMP()`,
    [sha(token)],
  );
  return rows[0] ?? null;
};

export const tancaSessio = async () => {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (token) await executa("DELETE FROM panell_sessio WHERE id = ?", [sha(token)]);
  jar.delete(COOKIE);
};

/** Per a pàgines i accions del panell: si no hi ha sessió, cap a l'entrada. */
export const requereixSessio = async () => {
  const s = await sessioActual();
  if (!s) {
    if (process.env.PANELL_DEBUG) console.error("[panell] sense sessió", (await cookies()).getAll().map((c) => c.name));
    redirect("/panell/entrar");
  }
  return s;
};

export const hiHaUsuari = async () => {
  type R = RowDataPacket & { n: number };
  const [r] = await consulta<R>("SELECT COUNT(*) n FROM panell_usuari");
  return r.n > 0;
};
