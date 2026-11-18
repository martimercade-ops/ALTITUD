import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";

const BASE = (process.env.BASE_URL ?? "https://altitudigital.com").replace(/\/$/, "");
const ORIGEN = new URL(BASE).origin;
const CHROME =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
const NAVEGACION = { "user-agent": CHROME, "sec-fetch-site": "none", "sec-fetch-mode": "navigate", "sec-fetch-dest": "document" };
const RECURSO = { "user-agent": CHROME, "sec-fetch-site": "same-origin", "sec-fetch-mode": "no-cors", "sec-fetch-dest": "script", referer: `${ORIGEN}/` };

const pedir = (ruta, cabeceras = NAVEGACION, opciones = {}) => {
  const sinCache = /^\/(_next|assets)\//.test(ruta) ? `?prueba=${Date.now()}${Math.random()}` : "";
  return fetch(`${BASE}${ruta}${sinCache}`, { headers: cabeceras, redirect: "manual", ...opciones });
};

const portada = async () => {
  const respuesta = await pedir("/");
  return { respuesta, html: await respuesta.text() };
};

test("la portada responde con la web nueva", async () => {
  const { respuesta, html } = await portada();
  assert.equal(respuesta.status, 200);
  assert.match(html, /_next\/static/);
  assert.doesNotMatch(html, /wp-content|wp-includes/);
});

test("envía las cabeceras de seguridad", async () => {
  const { respuesta } = await portada();
  const h = respuesta.headers;
  assert.match(h.get("content-security-policy") ?? "", /frame-ancestors 'none'/);
  assert.match(h.get("content-security-policy") ?? "", /object-src 'none'/);
  assert.match(h.get("content-security-policy") ?? "", /base-uri 'self'/);
  assert.match(h.get("strict-transport-security") ?? "", /max-age=\d{7,}/);
  assert.equal(h.get("x-content-type-options"), "nosniff");
  assert.equal(h.get("x-frame-options"), "DENY");
  assert.equal(h.get("referrer-policy"), "strict-origin-when-cross-origin");
  assert.equal(h.get("cross-origin-opener-policy"), "same-origin");
  assert.equal(h.get("cross-origin-resource-policy"), "same-origin");
  assert.match(h.get("permissions-policy") ?? "", /camera=\(\)/);
  assert.equal(h.get("x-powered-by"), null);
});

test("la CSP autoriza exactamente los scripts en línea de cada página", async () => {
  for (const ruta of ["/", "/privacy-policy", "/no-existe"]) {
    const respuesta = await pedir(ruta);
    const csp = respuesta.headers.get("content-security-policy") ?? "";
    const html = await respuesta.text();
    const scriptSrc = csp.split(";").map((d) => d.trim()).find((d) => d.startsWith("script-src"));
    if (!scriptSrc) continue;
    assert.doesNotMatch(scriptSrc, /'unsafe-inline'|'unsafe-eval'/, ruta);
    const enLinea = [...html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)]
      .filter(([, atributos]) => !/type="application\/ld\+json"/.test(atributos))
      .map(([, , codigo]) => `'sha256-${createHash("sha256").update(codigo).digest("base64")}'`);
    assert.ok(enLinea.length > 0, ruta);
    for (const hash of enLinea) assert.ok(scriptSrc.includes(hash), `${ruta}: falta ${hash}`);
  }
});

test("el HTML no se guarda en cachés compartidas", async () => {
  const { respuesta } = await portada();
  assert.match(respuesta.headers.get("cache-control") ?? "", /private|no-store/);
});

test("rutas públicas y de error", async () => {
  const casos = [
    ["/privacy-policy", 200],
    ["/robots.txt", 200],
    ["/sitemap.xml", 200],
    ["/no-existe", 404],
    ["/index.html", 404],
    ["/privacy-policy.html", 404],
    ["/_not-found", 404],
  ];
  for (const [ruta, esperado] of casos) assert.equal((await pedir(ruta)).status, esperado, ruta);
});

test("no expone archivos internos ni restos del WordPress", async () => {
  for (const ruta of ["/.htaccess", "/.git/config", "/.env", "/wp-login.php", "/wp-config.php", "/xmlrpc.php", "/package.json", "/next.config.ts"]) {
    const { status } = await pedir(ruta);
    assert.ok(status === 403 || status === 404 || (status >= 300 && status < 400), `${ruta} → ${status}`);
  }
});

test("no publica mapas de código fuente", async () => {
  const { html } = await portada();
  assert.doesNotMatch(html, /localhost:3000/);
  const chunk = html.match(/\/_next\/static\/chunks\/[\w-]+\.js/)?.[0];
  assert.ok(chunk);
  const js = await (await pedir(chunk, RECURSO)).text();
  assert.doesNotMatch(js, /sourceMappingURL/);
  assert.equal((await pedir(`${chunk}.map`, RECURSO)).status, 404);
});

test("redirige las URL antiguas", async () => {
  const casos = [
    ["/contacto/", "/parlem"],
    ["/servicios/optimizacion-seo/", "/serveis/seo-sem"],
    ["/quienes-somos/", "/#about"],
    ["/privacy-policy/", "/privacy-policy"],
  ];
  for (const [ruta, destino] of casos) {
    // Segueix com a màxim dues redireccions (la de la barra final i la de l'URL antiga)
    let actual = ruta;
    for (let salt = 0; salt < 2; salt++) {
      const respuesta = await pedir(actual);
      if (salt === 0) assert.ok([301, 308].includes(respuesta.status), `${ruta} → ${respuesta.status}`);
      if (![301, 308].includes(respuesta.status)) break;
      const url = new URL(respuesta.headers.get("location"), BASE);
      actual = url.pathname + url.hash;
    }
    assert.equal(actual, destino, ruta);
  }
});

test("bloquea clientes automáticos sin guardar el bloqueo en caché", async () => {
  for (const ua of ["curl/8.4.0", "python-requests/2.31", "GPTBot/1.1", "HTTrack 3.0", "Mozilla/5.0 HeadlessChrome/120.0", ""]) {
    const respuesta = await pedir("/", { "user-agent": ua });
    assert.equal(respuesta.status, 403, `UA «${ua}»`);
    assert.match(respuesta.headers.get("cache-control") ?? "", /no-store/);
  }
  assert.equal((await pedir("/", NAVEGACION)).status, 200);
});

test("los medidores y buscadores reciben la vista sin animación", async () => {
  const robot = { "user-agent": "Mozilla/5.0 (Linux; Android 11) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36 Chrome-Lighthouse" };
  const portadaRobot = await pedir("/", robot);
  assert.equal(portadaRobot.status, 200);
  const htmlRobot = await portadaRobot.text();
  const vistaRobot = await (await pedir("/robot-view", robot)).text();
  const htmlHumano = await (await pedir("/")).text();
  assert.equal(htmlRobot, vistaRobot);
  assert.notEqual(htmlRobot, htmlHumano);
  assert.match(htmlRobot, /<link rel="canonical" href="https:\/\/altitudigital\.com"/);
  assert.ok([302, 307].includes((await pedir("/robot-view")).status));
});

test("impide el hotlinking y abrir recursos sueltos", async () => {
  const imagen = "/assets/altitud/equip.jpg";
  assert.equal((await pedir(imagen, { ...RECURSO, "sec-fetch-dest": "image" })).status, 200);
  assert.equal((await pedir(imagen, { ...RECURSO, "sec-fetch-site": "cross-site", referer: "https://otra.example/" })).status, 403);
  assert.equal((await pedir(imagen, { ...NAVEGACION })).status, 403);
  assert.equal((await pedir(imagen, { "user-agent": CHROME.replace("Chrome/130.0", "Version/15.6"), referer: "https://otra.example/" })).status, 403);
  assert.equal((await pedir("/open-graph.jpg", { "user-agent": "WhatsApp/2.23" })).status, 200);
});

test("solo acepta GET y HEAD", async () => {
  for (const method of ["POST", "PUT", "DELETE", "PATCH"]) {
    const { status } = await pedir("/", NAVEGACION, { method });
    assert.ok(status === 403 || status === 405, `${method} → ${status}`);
  }
  assert.equal((await pedir("/", NAVEGACION, { method: "HEAD" })).status, 200);
});

test("los recursos con hash se guardan un año", async () => {
  const { html } = await portada();
  const chunk = html.match(/\/_next\/static\/chunks\/[\w-]+\.js/)[0];
  assert.match((await pedir(chunk, RECURSO)).headers.get("cache-control") ?? "", /max-age=31536000.*immutable/);
});
