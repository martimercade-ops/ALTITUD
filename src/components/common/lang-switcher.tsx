"use client";

import { usePathname } from "next/navigation";
import { LANGS, LANG_LABEL, langFromPath, switchHref } from "@/i18n/config";

/** Selector d'idioma: porta a la mateixa pàgina traduïda (o a la portada de l'idioma) */
export const LangSwitcher = ({ variant = "pill" }: { variant?: "pill" | "row" }) => {
  const path = usePathname() ?? "/";
  const actual = langFromPath(path);

  if (variant === "row") {
    return (
      <ul className="flex gap-2">
        {LANGS.map((l) => (
          <li key={l}>
            <a
              href={switchHref(path, l)}
              hrefLang={l}
              lang={l}
              aria-current={l === actual ? "true" : undefined}
              className={`inline-flex h-10 min-w-12 items-center justify-center rounded-full border px-3 text-sm uppercase ${
                l === actual ? "border-accent-lime text-accent-lime" : "border-white/20 text-white/75 hover:border-white/60 hover:text-white"
              }`}
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <details className="group relative hidden md:block">
      <summary
        aria-label={LANG_LABEL[actual]}
        className="flex h-[60px] cursor-pointer list-none items-center gap-1.5 rounded-full border border-white/10 bg-[#0b1424]/85 px-[20px] text-[14px] font-medium uppercase text-white/85 shadow-[0_8px_30px_rgb(0_0_0/0.12)] backdrop-blur-md hover:text-white [&::-webkit-details-marker]:hidden"
      >
        {actual}
        <svg viewBox="0 0 10 6" aria-hidden="true" className="h-1.5 w-2.5 transition-transform group-open:rotate-180">
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </summary>
      <ul className="absolute right-0 top-[68px] min-w-40 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1424]/95 p-1.5 text-white shadow-[0_20px_60px_rgb(0_0_0/0.35)] backdrop-blur-xl">
        {LANGS.map((l) => (
          <li key={l}>
            <a
              href={switchHref(path, l)}
              hrefLang={l}
              lang={l}
              aria-current={l === actual ? "true" : undefined}
              className={`flex items-center justify-between gap-4 rounded-xl px-3.5 py-2.5 text-[14px] hover:bg-white/10 ${l === actual ? "text-accent-lime" : "text-white/85"}`}
            >
              {LANG_LABEL[l]}
              <span className="text-xs uppercase text-white/40">{l}</span>
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
};
