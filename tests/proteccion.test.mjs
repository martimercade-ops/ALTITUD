import { test } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";

import { filtrarPeticion } from "../src/lib/proteccion.ts";

const CHROME =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
const SAFARI_ANTIGUO =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Safari/605.1.15";
const NAVEGACION = { "sec-fetch-site": "none", "sec-fetch-mode": "navigate", "sec-fetch-dest": "document" };

let siguienteIp = 1;
const ipNueva = () => `203.0.113.${siguienteIp++}`;

const peticion = (ruta, cabeceras = {}, ip = ipNueva()) =>
  new NextRequest(`https://altitudigital.com${ruta}`, {
    headers: { host: "altitudigital.com", "x-forwarded-for": ip, ...cabeceras },
  });

const estado = (respuesta) => (respuesta ? respuesta.status : 200);

test("deja pasar a un navegador real", () => {
  assert.equal(estado(filtrarPeticion(peticion("/", { "user-agent": CHROME, ...NAVEGACION }))), 200);
});

test("no filtra la red interna", () => {
  assert.equal(filtrarPeticion(peticion("/", {}, "10.0.0.5")), null);
  assert.equal(filtrarPeticion(peticion("/", {}, "127.0.0.1")), null);
});

test("rechaza peticiones sin agente de usuario", () => {
  assert.equal(estado(filtrarPeticion(peticion("/"))), 403);
});

test("rechaza clientes HTTP, clonadores y rastreadores de IA", () => {
  for (const ua of [
    "curl/8.4.0",
    "Wget/1.21",
    "python-requests/2.31",
    "Go-http-client/2.0",
    "Mozilla/5.0 HeadlessChrome/120.0",
    "HTTrack 3.0",
    "GPTBot/1.1",
    "ClaudeBot/1.0",
    "Scrapy/2.11",
  ]) {
    assert.equal(estado(filtrarPeticion(peticion("/", { "user-agent": ua }))), 403, ua);
  }
});

test("rechaza un Chrome fingido que no envía Sec-Fetch", () => {
  assert.equal(estado(filtrarPeticion(peticion("/", { "user-agent": CHROME }))), 403);
});

test("deja pasar a los buscadores aunque no envíen Sec-Fetch", () => {
  const ua = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
  assert.equal(estado(filtrarPeticion(peticion("/", { "user-agent": ua }))), 200);
  assert.equal(estado(filtrarPeticion(peticion("/_next/static/chunks/a.js", { "user-agent": ua }))), 200);
});

test("sirve los recursos solo a páginas del propio sitio", () => {
  const ruta = "/_next/static/chunks/a.js";
  const base = { "user-agent": CHROME, "sec-fetch-mode": "no-cors" };
  assert.equal(
    estado(filtrarPeticion(peticion(ruta, { ...base, "sec-fetch-site": "same-origin", "sec-fetch-dest": "script" }))),
    200,
  );
  assert.equal(
    estado(filtrarPeticion(peticion(ruta, { ...base, "sec-fetch-site": "cross-site", "sec-fetch-dest": "script" }))),
    403,
  );
  assert.equal(
    estado(filtrarPeticion(peticion(ruta, { ...base, "sec-fetch-site": "same-origin", "sec-fetch-dest": "document" }))),
    403,
  );
});

test("con Safari antiguo decide por la página de origen", () => {
  const ruta = "/assets/altitud/equip.jpg";
  assert.equal(
    estado(filtrarPeticion(peticion(ruta, { "user-agent": SAFARI_ANTIGUO, referer: "https://altitudigital.com/" }))),
    200,
  );
  assert.equal(
    estado(filtrarPeticion(peticion(ruta, { "user-agent": SAFARI_ANTIGUO, referer: "https://otra.example/" }))),
    403,
  );
  assert.equal(estado(filtrarPeticion(peticion(ruta, { "user-agent": SAFARI_ANTIGUO }))), 403);
});

test("limita las páginas por minuto y por IP", () => {
  const ip = ipNueva();
  const cabeceras = { "user-agent": CHROME, ...NAVEGACION };
  for (let i = 0; i < 60; i++) {
    assert.equal(estado(filtrarPeticion(peticion("/", cabeceras, ip))), 200, `petición ${i + 1}`);
  }
  const respuesta = filtrarPeticion(peticion("/", cabeceras, ip));
  assert.equal(estado(respuesta), 429);
  assert.equal(respuesta.headers.get("retry-after"), "60");
  assert.equal(respuesta.headers.get("cache-control"), "no-store");
  assert.equal(estado(filtrarPeticion(peticion("/", cabeceras))), 200);
});
