"use client";

import { useEffect, useRef, useState } from "react";

const LANGS = [
  { code: "ca", label: "Català" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
] as const;
type Code = (typeof LANGS)[number]["code"];

const readLang = (): Code => {
  const m = document.cookie.match(/(?:^|;\s*)googtrans=\/ca\/(es|fr|en)/);
  return (m?.[1] as Code) ?? "ca";
};

const writeLang = (code: Code) => {
  const host = window.location.hostname;
  const domains = ["", host, `.${host.replace(/^www\./, "")}`];
  for (const d of domains) {
    const dom = d ? `; domain=${d}` : "";
    document.cookie =
      code === "ca"
        ? `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${dom}`
        : `googtrans=/ca/${code}; path=/${dom}`;
  }
};

/** Evita que React es trenqui quan Google Translate canvia els textos de la pàgina */
const protectReactDom = () => {
  const w = window as unknown as { __gtPatched?: boolean };
  if (w.__gtPatched) return;
  w.__gtPatched = true;
  const remove = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) return child;
    return remove.call(this, child) as T;
  };
  const insert = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(this: Node, node: T, ref: Node | null): T {
    if (ref && ref.parentNode !== this) return insert.call(this, node, null) as T;
    return insert.call(this, node, ref) as T;
  };
};

/** Carrega el traductor de Google només si el visitant ha triat un altre idioma */
const loadTranslator = () => {
  if (document.getElementById("gt-script")) return;
  protectReactDom();
  const host = document.createElement("div");
  host.id = "google_translate_element";
  host.style.display = "none";
  document.body.appendChild(host);
  const w = window as unknown as {
    googleTranslateElementInit?: () => void;
    google?: { translate: { TranslateElement: new (o: object, id: string) => unknown } };
  };
  w.googleTranslateElementInit = () => {
    new w.google!.translate.TranslateElement({ pageLanguage: "ca", includedLanguages: "ca,es,fr,en", autoDisplay: false }, "google_translate_element");
  };
  const s = document.createElement("script");
  s.id = "gt-script";
  s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  s.async = true;
  document.body.appendChild(s);
};

export const LangSwitcher = () => {
  const [lang, setLang] = useState<Code>("ca");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = readLang();
    setLang(current);
    if (current !== "ca") {
      document.documentElement.lang = current;
      loadTranslator();
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  const choose = (code: Code) => {
    setOpen(false);
    if (code === lang) return;
    writeLang(code);
    window.location.reload();
  };

  return (
    <div ref={ref} className="notranslate relative" translate="no">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Idioma"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-[56px] items-center gap-1.5 rounded-full border border-white/15 bg-[#0b1424]/70 px-4 text-[14px] font-medium uppercase text-white backdrop-blur-md hover:border-white/40 md:h-[60px] md:px-5"
      >
        {lang}
        <svg viewBox="0 0 10 6" aria-hidden="true" className={`h-1.5 w-2.5 transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul role="listbox" aria-label="Idioma" className="absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1424]/95 py-1.5 text-white shadow-2xl backdrop-blur-xl">
          {LANGS.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={l.code === lang}
                onClick={() => choose(l.code)}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm hover:bg-white/10 ${l.code === lang ? "text-accent-lime" : ""}`}
              >
                {l.label}
                <span className="text-xs uppercase text-white/40">{l.code}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
