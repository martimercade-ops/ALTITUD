import { NextResponse, type NextRequest } from "next/server";

export const RASTREADORES_VETADOS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "CCBot",
  "Bytespider",
  "Amazonbot",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "FacebookBot",
  "cohere-ai",
  "MistralAI-User",
  "YouBot",
  "Diffbot",
  "AI2Bot",
  "Timpibot",
  "Omgilibot",
  "ImagesiftBot",
  "PetalBot",
  "DuckAssistBot",
  "ia_archiver",
  "archive.org_bot",
  "HTTrack",
  "Wget",
];

const HERRAMIENTAS = [
  "curl",
  "python",
  "scrapy",
  "aiohttp",
  "httpx",
  "go-http-client",
  "java/",
  "okhttp",
  "node-fetch",
  "undici",
  "axios",
  "libwww",
  "lwp-",
  "ruby",
  "php/",
  "guzzle",
  "mechanize",
  "headlesschrome",
  "phantomjs",
  "puppeteer",
  "playwright",
  "selenium",
  "webdriver",
  "sitesucker",
  "webcopier",
  "webzip",
  "teleport",
  "offline explorer",
  "webripper",
  "wpull",
  "grab-site",
  "archivebox",
  "monolith",
  "singlefile",
  "firecrawl",
  "apify",
  "crawlee",
  "scrapingbee",
  "zyte",
  "browserless",
];

const NO_PERMITIDOS = new RegExp(
  [...RASTREADORES_VETADOS, ...HERRAMIENTAS].join("|"),
  "i",
);

const DE_CONFIANZA =
  /googlebot|google-inspectiontool|adsbot-google|bingbot|duckduckbot|yandexbot|baiduspider|applebot|facebookexternalhit|facebot|twitterbot|linkedinbot|whatsapp|telegrambot|slackbot|discordbot|pinterestbot|lighthouse|pagespeed|gtmetrix|pingdom/i;

const NAVEGADOR_CON_SEC_FETCH = /\b(?:chrome|firefox)\/\d+/i;

const RUTAS_DE_RECURSO = /^\/(?:_next\/(?:static|image)|assets|draco)(?:\/|$)/;

const IP_INTERNA = /^(?:10\.|127\.|192\.168\.|172\.(?:1[6-9]|2\d|3[01])\.|::1$)/;

const VENTANA_MS = 60_000;
const MAX_PAGINAS = 60;
const MAX_RECURSOS = 600;

type Cuenta = { desde: number; paginas: number; recursos: number };
const cuentas = new Map<string, Cuenta>();

const superaElLimite = (ip: string, esRecurso: boolean) => {
  const ahora = Date.now();
  let cuenta = cuentas.get(ip);
  if (!cuenta || ahora - cuenta.desde > VENTANA_MS) {
    if (cuentas.size > 20_000) cuentas.clear();
    cuenta = { desde: ahora, paginas: 0, recursos: 0 };
    cuentas.set(ip, cuenta);
  }
  return esRecurso
    ? ++cuenta.recursos > MAX_RECURSOS
    : ++cuenta.paginas > MAX_PAGINAS;
};

const recursoPedidoDesdeElSitio = ({ headers }: NextRequest) => {
  const origen = headers.get("sec-fetch-site");
  if (origen) {
    return origen === "same-origin" && headers.get("sec-fetch-dest") !== "document";
  }
  try {
    const host = headers.get("x-forwarded-host") ?? headers.get("host");
    return new URL(headers.get("referer") ?? "").host === host;
  } catch {
    return false;
  }
};

const rechazar = (estado: 403 | 429) =>
  new NextResponse(
    estado === 403
      ? "Acceso no permitido."
      : "Demasiadas peticiones. Inténtalo de nuevo en un minuto.",
    {
      status: estado,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8",
        ...(estado === 429 ? { "Retry-After": "60" } : {}),
      },
    },
  );

export const filtrarPeticion = (request: NextRequest) => {
  const { headers, nextUrl } = request;
  const ip = (headers.get("x-forwarded-for") ?? "")
    .split(",")[0]
    .trim()
    .replace(/^::ffff:/, "");
  if (!ip || IP_INTERNA.test(ip)) return null;

  const agente = headers.get("user-agent") ?? "";
  const deConfianza = DE_CONFIANZA.test(agente);
  const esRecurso = RUTAS_DE_RECURSO.test(nextUrl.pathname);

  if (!deConfianza) {
    if (!agente || NO_PERMITIDOS.test(agente)) return rechazar(403);
    if (NAVEGADOR_CON_SEC_FETCH.test(agente) && !headers.has("sec-fetch-mode")) {
      return rechazar(403);
    }
    if (esRecurso && !recursoPedidoDesdeElSitio(request)) return rechazar(403);
  }

  const destino = headers.get("sec-fetch-dest");
  const cuentaComoRecurso = esRecurso || (!!destino && destino !== "document");
  return superaElLimite(ip, cuentaComoRecurso) ? rechazar(429) : null;
};
