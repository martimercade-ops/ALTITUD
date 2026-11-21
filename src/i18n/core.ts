import { localHref, type Lang } from "@/i18n/config";

export type Dict = Record<string, string>;

const norm = (s: string) => s.replace(/\s+/g, " ").trim();

export const makeI18n = (lang: Lang, dict: Dict) => {
  const t = (s: string): string => {
    if (lang === "ca") return s;
    return dict[s] ?? dict[norm(s)] ?? s;
  };
  const h = (href: string) => localHref(href, lang);
  /** Tradueix recursivament els textos d'un objecte de contingut i localitza les rutes */
  const T = <V,>(v: V): V => {
    if (lang === "ca") return v;
    if (typeof v === "string") {
      if (v.startsWith("/") || v.startsWith("#")) return h(v) as V;
      return t(v) as V;
    }
    if (Array.isArray(v)) return v.map(T) as V;
    if (v && typeof v === "object" && Object.getPrototypeOf(v) === Object.prototype) {
      const o: Record<string, unknown> = {};
      for (const [k, x] of Object.entries(v)) o[k] = k === "src" || k === "slug" || k === "id" ? x : T(x);
      return o as V;
    }
    return v;
  };
  return { lang, t, h, T };
};

export type I18n = ReturnType<typeof makeI18n>;
