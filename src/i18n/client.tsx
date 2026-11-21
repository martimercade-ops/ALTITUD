"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Lang } from "@/i18n/config";
import { makeI18n, type Dict } from "@/i18n/core";

const Ctx = createContext<{ lang: Lang; dict: Dict }>({ lang: "ca", dict: {} });

export const LangProvider = ({ lang, dict, children }: { lang: Lang; dict: Dict; children: ReactNode }) => (
  <Ctx.Provider value={{ lang, dict }}>{children}</Ctx.Provider>
);

export const useI18n = () => {
  const { lang, dict } = useContext(Ctx);
  return useMemo(() => makeI18n(lang, dict), [lang, dict]);
};

/** Text traduït dins JSX (serveix tant a components de servidor com de client) */
export const Tx = ({ children }: { children: string }) => {
  const { t } = useI18n();
  return <>{t(children)}</>;
};
