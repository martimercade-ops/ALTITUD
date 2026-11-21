import "server-only";
import { cache } from "react";
import type { Lang } from "@/i18n/config";
import { makeI18n } from "@/i18n/core";
import { dictFor } from "@/i18n/dict";

/** Idioma de la pàgina que s'està renderitzant (el fixa la pàgina abans de pintar) */
const store = cache(() => ({ lang: "ca" as Lang }));

export const setLang = (lang: Lang) => {
  store().lang = lang;
};

export const getI18n = () => {
  const lang = store().lang;
  return makeI18n(lang, dictFor(lang));
};
