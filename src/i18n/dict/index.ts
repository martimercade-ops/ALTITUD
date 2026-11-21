import type { Lang } from "@/i18n/config";
import type { Dict } from "@/i18n/core";
import { UI } from "@/i18n/dict/ui";
import { HOME } from "@/i18n/dict/home";
import { SERVEIS } from "@/i18n/dict/serveis";
import { LANDING } from "@/i18n/dict/landing";

/** Cada entrada: text original → [castellà, francès, anglès] */
export type Entrades = Record<string, readonly [string, string, string]>;

const TOTES: Entrades[] = [UI, HOME, SERVEIS, LANDING];
const IDX = { es: 0, fr: 1, en: 2 } as const;

const cache: Partial<Record<Lang, Dict>> = {};

export const dictFor = (lang: Lang): Dict => {
  if (lang === "ca") return {};
  if (cache[lang]) return cache[lang]!;
  const d: Dict = {};
  for (const e of TOTES) for (const [k, v] of Object.entries(e)) d[k.replace(/\s+/g, " ").trim()] = v[IDX[lang]];
  return (cache[lang] = d);
};
