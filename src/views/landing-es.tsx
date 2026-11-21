import Image from "next/image";
import Link from "next/link";
import { SiteNav, type SiteNavContent } from "@/views/site-nav";
import { FormEs } from "@/views/form-es";
import { projectHref, projects } from "@/data/mocks/projects";
import { landingEsHref, landingsEs, type LandingEs } from "@/data/landings-es";
import { GOOGLE_REVIEWS, MAPS } from "@/data/mocks/home";

const WHATSAPP_ES =
  "https://wa.me/376670222?text=" + encodeURIComponent("¡Hola! Vengo de la web de Altitud Digital y me gustaría más información.");

const pad = (n: number) => String(n).padStart(2, "0");

export const navEs: SiteNavContent = {
  brand: "Altitud Digital",
  items: [
    { label: "Inicio", href: "/es" },
    {
      label: "Servicios",
      href: "/es#servicios",
      children: landingsEs.filter((l) => l.slug && l.slug !== "ayudas-pde-andorra").map((l) => ({ label: l.nom, href: landingEsHref(l.slug) })),
    },
    { label: "Proyectos", href: "/projectes" },
    { label: "Ayudas PDE", href: "/es/ayudas-pde-andorra" },
  ],
  cta: { label: "Contacto", href: "#contacto" },
};

export const LandingEsView = ({ l }: { l: LandingEs }) => {
  const related = l.projectes
    .map((s) => projects.find((p) => p.slug === s))
    .filter((p): p is (typeof projects)[number] => Boolean(p));
  const others = landingsEs.filter((x) => x.slug !== l.slug);
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: l.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <div lang="es">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, "\\u003c") }} />
      <SiteNav {...navEs} homeHref="/es" navLabel="Principal" />
      <main id="top" className="w-full bg-hero-page text-[#171717]">
        {/* Capçalera amb formulari */}
        <section aria-labelledby="es-title" className="relative overflow-hidden bg-[#0b1424] px-6 pb-20 pt-32 text-white md:px-10 md:pb-28 md:pt-40 lg:px-12">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_10%,rgb(43_114_226/0.35),transparent_70%)]" />
          <div aria-hidden="true" className="logo-vidre logo-vidre--dreta opacity-40" />
          <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_26rem]">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
                {l.eyebrow}
              </p>
              <h1 id="es-title" className="mt-6 max-w-[16ch] text-[2.5rem] font-light leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.25rem]">
                {l.h1}
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/80">{l.intro}</p>
              <a href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-3 text-sm text-white/80 hover:text-white">
                <span className="text-accent-lime" aria-hidden="true">★★★★★</span>
                4,9 en Google · +100 empresas de Andorra
              </a>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href={WHATSAPP_ES} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center rounded-full border border-white/30 px-6 text-sm font-medium text-white/90 hover:border-white/70 hover:text-white">
                  Escríbenos por WhatsApp
                </a>
                <a href="tel:+376670222" className="inline-flex h-12 items-center rounded-full border border-white/30 px-6 text-sm font-medium text-white/90 hover:border-white/70 hover:text-white">
                  +376 670 222
                </a>
              </div>
            </div>
            <div id="contacto" className="scroll-mt-28">
              <FormEs origen={l.nom} servei={l.servei} />
            </div>
          </div>
        </section>

        {/* Què inclou */}
        <section id="servicios" aria-labelledby="incluye-title" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:px-10 md:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-small">Qué hacemos</p>
          <h2 id="incluye-title" className="mt-4 max-w-[24ch] text-[2rem] font-light leading-[1.08] tracking-tight md:text-[2.75rem]">
            Todo lo que necesitas, con un solo equipo.
          </h2>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
            {l.incluye.map((item, i) => (
              <li key={item.title} className="flex flex-col bg-white p-8 transition-colors hover:bg-paper">
                <span className="text-sm font-medium text-[#2f5bff]">{pad(i + 1)}</span>
                <h3 className="mt-6 text-xl font-normal tracking-tight">{item.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-black/60">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Per què nosaltres */}
        <section aria-labelledby="porque-title" className="bg-[#0b1424] px-6 py-24 text-white md:px-10 md:py-32">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image src={l.image} alt={l.imageAlt} fill sizes="(max-width: 1024px) 92vw, 45vw" className="object-cover" />
            </div>
            <div>
              <h2 id="porque-title" className="text-[2rem] font-light leading-[1.08] tracking-tight md:text-[2.75rem]">{l.porQue.title}</h2>
              {l.porQue.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/70">{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Projectes */}
        {related.length > 0 && (
          <section aria-labelledby="proyectos-title" className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
            <div className="flex items-end justify-between gap-6">
              <h2 id="proyectos-title" className="text-[2rem] font-light leading-[1.08] tracking-tight md:text-[2.75rem]">
                Algunos proyectos en Andorra
              </h2>
              <Link href="/projectes" className="hidden whitespace-nowrap rounded-full border border-black/15 px-5 py-2.5 text-sm font-medium hover:border-black/50 sm:inline-flex">
                Ver todos
              </Link>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {related.map((p) => (
                <Link key={p.slug} href={projectHref(p.slug)} className="group flex flex-col gap-4">
                  <span className="relative block aspect-[16/11] overflow-hidden rounded-2xl bg-card-gray">
                    <Image src={p.image} alt={`Proyecto de ${p.name}`} fill sizes="(max-width: 768px) 92vw, 30vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
                  </span>
                  <span className="block text-xl font-light tracking-tight group-hover:underline group-hover:underline-offset-4">{p.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Preguntes freqüents */}
        <section aria-labelledby="faq-title" className="mx-auto max-w-4xl px-6 pb-24 md:px-10 md:pb-32">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-small">Preguntas frecuentes</p>
          <h2 id="faq-title" className="mt-4 text-[2rem] font-light leading-[1.08] tracking-tight md:text-[2.75rem]">Lo que nos suelen preguntar</h2>
          <div className="mt-10 divide-y divide-black/10 border-y border-black/10">
            {l.faqs.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-normal tracking-tight">
                  <h3 className="text-lg font-normal">{f.q}</h3>
                  <span aria-hidden="true" className="text-2xl font-light text-[#2f5bff] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-3xl leading-relaxed text-black/65">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Crida a l'acció */}
        <section className="px-4 pb-24 md:px-10 md:pb-32">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[#2f5bff] px-8 py-16 text-white md:px-16 md:py-20">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(50%_80%_at_100%_0%,rgb(182_241_58/0.25),transparent_70%)]" />
            <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-[20ch] text-[2rem] font-light leading-[1.08] tracking-tight md:text-[2.75rem]">¿Hablamos de tu proyecto?</h2>
              <a href="#contacto" className="inline-flex h-12 shrink-0 items-center gap-3 self-start rounded-full bg-white pl-6 pr-2 text-sm font-semibold text-black transition-transform hover:scale-[1.02] md:self-auto">
                Pide presupuesto
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* Altres pàgines */}
        <nav aria-label="Más servicios" className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-small">También te puede interesar</p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={landingEsHref(s.slug)} className="group inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-sm transition-colors hover:border-black hover:bg-black hover:text-white">
                  {s.nom}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Peu en castellà */}
        <footer className="bg-[#0b1424] px-6 py-16 text-white md:px-10">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <img src="/assets/altitud/altitud-logo-h.svg" alt="Altitud Digital" width={160} height={20} className="h-5 w-auto" />
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">Agencia de marketing digital en Andorra. Web, SEO, redes sociales, publicidad e IA para empresas del país.</p>
            </div>
            <address className="not-italic text-sm leading-relaxed text-white/70">
              <span className="block font-medium text-white">Oficina</span>
              Carrer Ciutat de Valls, 24<br />AD500 Andorra la Vella<br />
              <a href="tel:+376670222" className="hover:text-white">+376 670 222</a><br />
              <a href="mailto:info@altitudigital.com" className="hover:text-white">info@altitudigital.com</a><br />
              <a href={MAPS} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white">Cómo llegar</a>
            </address>
            <div className="text-sm leading-relaxed text-white/70">
              <span className="block font-medium text-white">Horario</span>
              Lunes a jueves<br />9–14 h y 15–18 h<br />Visitas con cita previa
              {l.ca && (
                <Link href={l.ca} hrefLang="ca" className="mt-4 block underline underline-offset-4 hover:text-white">Versió en català</Link>
              )}
            </div>
          </div>
          <p className="mx-auto mt-12 max-w-6xl text-xs text-white/40">
            © 2026 Altitud Digital · <Link href="/avis-legal" className="hover:text-white">Aviso legal</Link> · <Link href="/privacy-policy" className="hover:text-white">Privacidad</Link>
          </p>
        </footer>
      </main>
    </div>
  );
};
