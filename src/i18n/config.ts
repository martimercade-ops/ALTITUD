/** Idiomes de la web. El català és l'original; la resta tradueixen les pàgines clau. */
export type Lang = "ca" | "es" | "fr" | "en";
export type LangAlt = Exclude<Lang, "ca">;
export const LANGS: Lang[] = ["ca", "es", "fr", "en"];
export const LANG_LABEL: Record<Lang, string> = { ca: "Català", es: "Español", fr: "Français", en: "English" };
export const LOCALE: Record<Lang, string> = { ca: "ca_ES", es: "es_ES", fr: "fr_FR", en: "en_GB" };

/** Pàgines catalanes que tenen traducció, amb la ruta a cada idioma */
const BASE: Record<string, Record<LangAlt, string>> = {
  "/": { es: "/es", fr: "/fr", en: "/en" },
  "/serveis": { es: "/es/servicios", fr: "/fr/services", en: "/en/services" },
  "/equip": { es: "/es/equipo", fr: "/fr/equipe", en: "/en/team" },
  "/parlem": { es: "/es/contacto", fr: "/fr/contact", en: "/en/contact" },
  "/ajuts-pde": { es: "/es/ayudas-pde-andorra", fr: "/fr/aides-pde", en: "/en/pde-grants" },
};

/** Serveis que en castellà tenen pàgina pròpia per a cerques locals */
export const SERVEI_ES: Record<string, string> = {
  "seo-sem": "agencia-seo-andorra",
  "web-ecommerce": "diseno-web-andorra",
  "xarxes-socials": "redes-sociales-andorra",
  branding: "branding-andorra",
  "chatbots-ia": "chatbots-ia-andorra",
  "formacions-ia": "cursos-marketing-digital-andorra",
};

const SERVEIS_PREFIX: Record<LangAlt, string> = { es: "/es/servicios", fr: "/fr/services", en: "/en/services" };

/** Ruta catalana → ruta en l'idioma (o null si no està traduïda) */
export const rutaTraduida = (ruta: string, lang: LangAlt): string | null => {
  if (BASE[ruta]) return BASE[ruta][lang];
  const m = ruta.match(/^\/serveis\/([a-z0-9-]+)$/);
  if (m) {
    if (lang === "es" && SERVEI_ES[m[1]]) return `/es/${SERVEI_ES[m[1]]}`;
    return `${SERVEIS_PREFIX[lang]}/${m[1]}`;
  }
  return null;
};

/** Localitza un href (manté query i àncora). Les pàgines sense traducció es queden en català. */
export const localHref = (href: string, lang: Lang): string => {
  if (lang === "ca" || !href.startsWith("/")) return href;
  const m = href.match(/^([^?#]*)(.*)$/)!;
  const ruta = m[1] === "" ? "/" : m[1].replace(/\/$/, "") || "/";
  const t = rutaTraduida(ruta, lang);
  return t ? t + m[2] : href;
};

/** Versions de la mateixa pàgina en tots els idiomes (per a hreflang i el selector) */
export const alternates = (rutaCa: string): Partial<Record<Lang, string>> => {
  const out: Partial<Record<Lang, string>> = { ca: rutaCa };
  for (const l of ["es", "fr", "en"] as LangAlt[]) {
    const t = rutaTraduida(rutaCa, l);
    if (t) out[l] = t;
  }
  return out;
};

/** Idioma a partir de la ruta (per als components del layout) */
export const langFromPath = (path: string): Lang => {
  const m = path.match(/^\/(es|fr|en)(\/|$)/);
  return (m?.[1] as Lang) ?? "ca";
};

/** Ruta en qualsevol idioma → ruta catalana equivalent (null si la pàgina no té traducció) */
export const caFromPath = (path: string): string | null => {
  const p = path.replace(/\/$/, "") || "/";
  if (langFromPath(p) === "ca") return p;
  for (const [ca, alt] of Object.entries(BASE)) if (Object.values(alt).includes(p)) return ca;
  for (const [slug, es] of Object.entries(SERVEI_ES)) if (p === `/es/${es}`) return `/serveis/${slug}`;
  const m = p.match(/^\/(?:es\/servicios|fr\/services|en\/services)\/([a-z0-9-]+)$/);
  if (m) return `/serveis/${m[1]}`;
  return null;
};

/** Enllaç a la mateixa pàgina en un altre idioma (o a la portada d'aquell idioma) */
export const switchHref = (path: string, to: Lang): string => {
  const ca = caFromPath(path);
  if (ca === null) return to === "ca" ? "/" : `/${to}`;
  if (to === "ca") return ca;
  return rutaTraduida(ca, to) ?? `/${to}`;
};
