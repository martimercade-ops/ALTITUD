import Link from "next/link";
import type { ReactNode } from "react";
import { SiteNav } from "@/views/site-nav";
import { SiteFooter } from "@/views/site-footer";
import { getI18n } from "@/i18n/server";
import { footerContent } from "@/data/mocks/contact";
import { homeNav } from "@/data/mocks/home";
import { articleEsHref, articlesEs, type ArticleEs } from "@/data/blog-es";
import { siteConfig } from "@/lib/site";

const dataLlarga = (iso: string) =>
  new Date(iso).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });

/** Converteix [text](/ruta) en enllaços interns */
const ambEnllacos = (text: string): ReactNode[] => {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <Link key={m.index} href={m[2]} className="font-medium text-[#2f5bff] underline decoration-[#2f5bff]/30 underline-offset-4 hover:decoration-[#2f5bff]">
        {m[1]}
      </Link>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
};

const Marc = ({ children }: { children: ReactNode }) => {
  const { t, T, h } = getI18n();
  return (
    <div lang="es">
      <SiteNav {...T(homeNav)} homeHref={h("/")} navLabel={t("Principal")} cta={{ label: t("Contacto"), href: "/es/contacto" }} />
      <main id="top" className="w-full bg-hero-page text-[#171717]">
        {children}
        <SiteFooter content={T(footerContent)} />
      </main>
    </div>
  );
};

const Capcalera = ({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) => (
  <section className="relative overflow-hidden bg-[#0b1424] px-6 pb-16 pt-32 text-white md:px-10 md:pb-24 md:pt-40">
    <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_10%,rgb(43_114_226/0.35),transparent_70%)]" />
    <div className="relative z-10 mx-auto max-w-3xl">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
        {eyebrow}
      </p>
      <h1 className="mt-6 text-[2.2rem] font-light leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">{title}</h1>
      {intro && <p className="mt-8 text-lg leading-relaxed text-white/80">{intro}</p>}
    </div>
  </section>
);

export const BlogIndexEs = () => (
  <Marc>
    <Capcalera
      eyebrow="Blog"
      title="Marketing digital, SEO e IA para empresas de Andorra."
      intro="Guías prácticas escritas por el equipo de Altitud Digital: lo que aprendemos cada día con nuestros clientes, explicado sin tecnicismos."
    />
    <section className="mx-auto max-w-5xl px-6 py-20 md:px-10 md:py-28">
      <ul className="grid gap-5 md:grid-cols-2">
        {articlesEs.map((a) => (
          <li key={a.slug}>
            <Link href={articleEsHref(a.slug)} className="group flex h-full flex-col rounded-3xl border border-black/[0.08] bg-white p-8 transition-shadow hover:shadow-[0_20px_60px_rgb(0_0_0/0.08)]">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2f5bff]">{a.categoria}</span>
              <h2 className="mt-4 text-[1.45rem] font-light leading-snug tracking-tight">{a.h1}</h2>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-black/60">{a.description}</p>
              <span className="mt-6 text-sm text-black/45">
                {dataLlarga(a.date)} · {a.minutos} min de lectura
              </span>
              <span className="mt-4 text-sm font-medium group-hover:underline">Leer el artículo →</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  </Marc>
);

export const ArticleEsView = ({ a }: { a: ArticleEs }) => {
  const url = `${siteConfig.url}${articleEsHref(a.slug)}`;
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: a.h1,
      description: a.description,
      datePublished: a.date,
      dateModified: a.date,
      inLanguage: "es",
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: "Altitud Digital", url: siteConfig.url },
      publisher: { "@type": "Organization", name: "Altitud Digital", url: siteConfig.url },
    },
    ...(a.faqs?.length
      ? [{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: a.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }]
      : []),
  ];
  const altres = articlesEs.filter((x) => x.slug !== a.slug).slice(0, 3);
  return (
    <Marc>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <Capcalera eyebrow={`${a.categoria} · ${a.minutos} min`} title={a.h1} intro={a.intro} />
      <article className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
        <p className="text-sm text-black/45">
          <Link href="/es/blog" className="hover:underline">Blog</Link> · {dataLlarga(a.date)} · Equipo de Altitud Digital
        </p>
        {a.secciones.map((s) => (
          <section key={s.h2} className="mt-12">
            <h2 className="text-[1.6rem] font-normal leading-snug tracking-tight md:text-[1.9rem]">{s.h2}</h2>
            {s.p.map((p) => (
              <p key={p.slice(0, 32)} className="mt-5 text-[17px] leading-[1.75] text-black/75">{ambEnllacos(p)}</p>
            ))}
            {s.li && (
              <ul className="mt-5 space-y-2.5">
                {s.li.map((li) => (
                  <li key={li} className="flex gap-3 text-[17px] leading-[1.6] text-black/75">
                    <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2f5bff]" />
                    <span>{ambEnllacos(li)}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {a.faqs && a.faqs.length > 0 && (
          <section className="mt-16">
            <h2 className="text-[1.6rem] font-normal tracking-tight md:text-[1.9rem]">Preguntas frecuentes</h2>
            <div className="mt-6 divide-y divide-black/10 border-y border-black/10">
              {a.faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[17px] font-medium">
                    {f.q}
                    <span aria-hidden="true" className="text-xl transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-[16px] leading-relaxed text-black/70">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Crida */}
        <div className="mt-16 rounded-3xl bg-[#0b1424] p-8 text-white md:p-10">
          <p className="text-[1.5rem] font-light leading-snug">¿Quieres que lo hagamos por ti?</p>
          <p className="mt-3 text-white/70">Somos una agencia de marketing digital en Andorra la Vella. Te asesoramos sin compromiso.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={a.landing.href} className="inline-flex h-12 items-center rounded-full bg-white px-6 text-sm font-medium text-black hover:bg-white/90">
              {a.landing.label}
            </Link>
            <Link href="/es/contacto" className="inline-flex h-12 items-center rounded-full border border-white/30 px-6 text-sm font-medium hover:border-white/70">
              Contactar
            </Link>
          </div>
        </div>
      </article>

      <section className="mx-auto max-w-5xl px-6 pb-24 md:px-10">
        <h2 className="text-[1.4rem] font-light tracking-tight">Otros artículos</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {altres.map((x) => (
            <li key={x.slug}>
              <Link href={articleEsHref(x.slug)} className="block h-full rounded-2xl border border-black/[0.08] bg-white p-6 hover:shadow-[0_12px_40px_rgb(0_0_0/0.07)]">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2f5bff]">{x.categoria}</span>
                <span className="mt-3 block text-[1.05rem] leading-snug">{x.h1}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Marc>
  );
};
