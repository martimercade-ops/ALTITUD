import "server-only";
import mysql, { type Pool, type RowDataPacket, type ResultSetHeader } from "mysql2/promise";
import { getServerEnv } from "@/env";

let pool: Pool | null = null;
let preparada: Promise<void> | null = null;

export const dbConfigurada = () => {
  const e = getServerEnv();
  return Boolean(e.DB_HOST && e.DB_USER && e.DB_NAME);
};

const ESQUEMA = [
  `CREATE TABLE IF NOT EXISTS panell_usuari (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuari VARCHAR(80) NOT NULL UNIQUE,
    hash VARCHAR(255) NOT NULL,
    totp_secret VARCHAR(64) NOT NULL,
    totp_ultim BIGINT NOT NULL DEFAULT 0,
    creat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) CHARACTER SET utf8mb4`,
  `CREATE TABLE IF NOT EXISTS panell_sessio (
    id CHAR(64) PRIMARY KEY,
    usuari_id INT NOT NULL,
    caduca DATETIME NOT NULL,
    ip VARCHAR(64) NOT NULL DEFAULT '',
    creat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) CHARACTER SET utf8mb4`,
  `CREATE TABLE IF NOT EXISTS panell_intent (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip VARCHAR(64) NOT NULL,
    quan DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX (quan)
  ) CHARACTER SET utf8mb4`,
  `CREATE TABLE IF NOT EXISTS leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    creat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    actualitzat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    tipus VARCHAR(20) NOT NULL DEFAULT 'altres',
    empresa VARCHAR(200) NOT NULL DEFAULT '',
    contacte VARCHAR(200) NOT NULL DEFAULT '',
    email VARCHAR(200) NOT NULL DEFAULT '',
    telefon VARCHAR(60) NOT NULL DEFAULT '',
    web VARCHAR(200) NOT NULL DEFAULT '',
    serveis VARCHAR(500) NOT NULL DEFAULT '',
    canal VARCHAR(100) NOT NULL DEFAULT '',
    origen VARCHAR(100) NOT NULL DEFAULT '',
    estat VARCHAR(20) NOT NULL DEFAULT 'nou',
    valor DECIMAL(10,2) NULL,
    seguiment DATE NULL,
    missatge TEXT NULL,
    INDEX (estat), INDEX (tipus)
  ) CHARACTER SET utf8mb4`,
  `CREATE TABLE IF NOT EXISTS lead_notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lead_id INT NOT NULL,
    quan DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    text TEXT NOT NULL,
    INDEX (lead_id)
  ) CHARACTER SET utf8mb4`,
];

export const db = async (): Promise<Pool> => {
  if (!dbConfigurada()) throw new Error("db_no_configurada");
  if (!pool) {
    const e = getServerEnv();
    pool = mysql.createPool({
      host: e.DB_HOST,
      port: e.DB_PORT ?? 3306,
      user: e.DB_USER,
      password: e.DB_PASSWORD,
      database: e.DB_NAME,
      connectionLimit: 5,
      charset: "utf8mb4",
      timezone: "Z",
      dateStrings: true,
    });
    // Tot en UTC (CURRENT_TIMESTAMP inclòs), es mostra en hora d'Andorra al navegador
    pool.on("connection", (c) => {
      c.query("SET time_zone = '+00:00'");
    });
  }
  preparada ??= (async () => {
    for (const sql of ESQUEMA) await pool!.query(sql);
  })().catch((err) => {
    preparada = null;
    throw err;
  });
  await preparada;
  return pool;
};

export const consulta = async <T extends RowDataPacket>(sql: string, params: unknown[] = []) => {
  const [rows] = await (await db()).query<T[]>(sql, params);
  return rows;
};

export const executa = async (sql: string, params: unknown[] = []) => {
  const [res] = await (await db()).query<ResultSetHeader>(sql, params);
  return res;
};
