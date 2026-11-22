import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { HomeView } from "@/views/home";
import { ServeisView } from "@/views/serveis";
import { ServiceView } from "@/views/service";
import { TeamPageView } from "@/views/team-page";
import { ParlemView } from "@/views/parlem";
import { LandingEsView } from "@/views/landing-es";
import { ArticleEsView, BlogIndexEs } from "@/views/blog-es";
import { findArticleEs, articleEsHref, type ArticleEs } from "@/data/blog-es";
import { findService, serviceHref, services } from "@/data/mocks/services";
import { findLandingEs, landingEsHref, type LandingEs } from "@/data/landings-es";
import { alternates, LOCALE, SERVEI_ES, type Lang, type LangAlt } from "@/i18n/config";
import { dictFor } from "@/i18n/dict";
import { LangProvider } from "@/i18n/client";
import { setLang, getI18n } from "@/i18n/server";
import { generateMetadata as pageMetadata } from "@/utils/seo/generate-page-metadata";
import { META_SERVEI, META } from "@/i18n/meta";
import type { ReactNode } from "react";

const Wrap = ({ lang, children }: { lang: Lang; children: ReactNode }) => (
  <LangProvider lang={lang} dict={dictFor(lang)}>
    <div lang={lang}>{children}</div>
  </LangProvider>
);

/** Metadades d'una pàgina traduïda, amb hreflang cap a totes les versions */
const meta = (lang: LangAlt, rutaCa: string, title: string, description: string): Metadata => {
  const alt = alternates(rutaCa);
  return pageMetadata({ title, description, url: alt[lang]!, locale: LOCALE[lang], languages: alt as Record<string, string> });
};

export const metaPagina = (lang: LangAlt, rutaCa: keyof typeof META) => meta(lang, rutaCa, META[rutaCa][lang].title, META[rutaCa][lang].description);

export const PaginaInici = ({ lang }: { lang: LangAlt }) => {
  setLang(lang);
  return <Wrap lang={lang}><HomeView /></Wrap>;
};
export const PaginaServeis = ({ lang }: { lang: LangAlt }) => {
  setLang(lang);
  return <Wrap lang={lang}><ServeisView /></Wrap>;
};
export const PaginaEquip = ({ lang }: { lang: LangAlt }) => {
  setLang(lang);
  return <Wrap lang={lang}><TeamPageView /></Wrap>;
};
export const PaginaParlem = ({ lang }: { lang: LangAlt }) => {
  setLang(lang);
  return <Wrap lang={lang}><ParlemView /></Wrap>;
};

/** Serveis amb pàgina pròpia en aquest idioma (en castellà, els que tenen landing local van a la landing) */
export const serveisDe = (lang: LangAlt) =>
  services.filter((s) => !(lang === "es" && SERVEI_ES[s.slug])).map((s) => ({ slug: s.slug }));

export const metaServei = (lang: LangAlt, slug: string): Metadata => {
  const s = findService(slug);
  if (!s) return {};
  const { t } = { t: (x: string) => dictFor(lang)[x] ?? x };
  const name = t(s.name);
  const title = META_SERVEI[lang](name);
  return meta(lang, serviceHref(slug), title, t(s.intro));
};

export const PaginaServei = ({ lang, slug }: { lang: LangAlt; slug: string }) => {
  const s = findService(slug);
  if (!s || (lang === "es" && SERVEI_ES[slug])) notFound();
  setLang(lang);
  return <Wrap lang={lang}><ServiceView service={s} /></Wrap>;
};

/** Landing (pàgines locals en castellà i la del PDE en francès i anglès) */
export const metaLanding = (lang: LangAlt, l: LandingEs, url: string): Metadata => {
  const d = dictFor(lang);
  const tr = (x: string) => (lang === "es" ? x : d[x] ?? x);
  const alt = l.ca ? alternates(l.ca) : { es: url };
  if (l.slug === "publicidad-online-andorra") return pageMetadata({ title: l.title, description: l.description, url, locale: LOCALE.es });
  return pageMetadata({ title: tr(l.title), description: tr(l.description), url, locale: LOCALE[lang], languages: alt as Record<string, string> });
};

export const PaginaLanding = ({ lang, slug }: { lang: LangAlt; slug: string }) => {
  const l = findLandingEs(slug);
  if (!l) notFound();
  setLang(lang);
  return <Wrap lang={lang}><LandingEsView l={l} /></Wrap>;
};

export const metaBlogEs = (): Metadata =>
  pageMetadata({
    title: "Blog de marketing digital, SEO e IA en Andorra | Altitud Digital",
    description: "Guías prácticas de SEO, diseño web, Google Ads e inteligencia artificial para empresas de Andorra, escritas por el equipo de Altitud Digital.",
    url: "/es/blog",
    locale: LOCALE.es,
  });

export const metaArticleEs = (a: ArticleEs): Metadata =>
  pageMetadata({ title: a.title, description: a.description, url: articleEsHref(a.slug), locale: LOCALE.es });

export const PaginaBlogEs = () => {
  setLang("es");
  return <Wrap lang="es"><BlogIndexEs /></Wrap>;
};

export const PaginaArticleEs = ({ slug }: { slug: string }) => {
  const a = findArticleEs(slug);
  if (!a) notFound();
  setLang("es");
  return <Wrap lang="es"><ArticleEsView a={a} /></Wrap>;
};

export { getI18n, landingEsHref };
