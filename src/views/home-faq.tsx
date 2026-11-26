import { getI18n } from "@/i18n/server";

/**
 * Preguntes freqüents de l'inici: responen el que busca qui cerca
 * «agència de màrqueting digital a Andorra» i porten dades FAQPage.
 */
const FAQS = [
  {
    q: "Què fa una agència de màrqueting digital a Andorra?",
    a: "Ajudem les empreses d'Andorra a aconseguir clients a internet: web i botiga online, SEO, xarxes socials, publicitat a Google i Meta, branding, vídeo i solucions amb intel·ligència artificial, tot coordinat per un sol equip.",
  },
  {
    q: "Per què triar Altitud Digital com a agència de màrqueting?",
    a: "Som un equip jove amb més de 6 anys d'experiència, més de 100 empreses d'Andorra com a clients i un 4,9 a Google. Posem la IA al centre, ens avancem a les tendències i parles directament amb qui fa la feina.",
  },
  {
    q: "Treballeu amb empreses de totes les parròquies?",
    a: "Sí. Treballem amb empreses d'Andorra la Vella, Escaldes-Engordany, Encamp, Canillo, La Massana, Ordino i Sant Julià de Lòria, i també amb clients d'Espanya i França.",
  },
  {
    q: "Quant costa contractar una agència de màrqueting a Andorra?",
    a: "Depèn dels serveis. Treballem amb packs mensuals clars per a xarxes socials i publicitat, i amb pressupost tancat per a webs i branding. Te'l preparem sense compromís.",
  },
  {
    q: "Puc demanar ajuts per digitalitzar la meva empresa?",
    a: "Sí. Gestionem els ajuts PDE del Govern d'Andorra perquè una part de la inversió en digitalització la cobreixi l'ajut.",
  },
  {
    q: "En quins idiomes treballeu?",
    a: "En català, castellà, francès i anglès, tant per parlar amb tu com per crear el contingut de la teva marca.",
  },
];

export const HomeFaq = () => {
  const { t } = getI18n();
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: t(f.q),
      acceptedAnswer: { "@type": "Answer", text: t(f.a) },
    })),
  };
  return (
    <section aria-labelledby="faq-inici" className="bg-white px-6 py-24 md:px-10 md:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/45">{t("Preguntes freqüents")}</p>
          <h2 id="faq-inici" className="mt-5 text-[2rem] font-light leading-[1.12] tracking-tight md:text-[2.6rem]">
            {t("Tot sobre la nostra agència de màrqueting digital a Andorra")}
          </h2>
        </div>
        <div className="divide-y divide-black/10 border-y border-black/10">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[17px] font-medium">
                {t(f.q)}
                <span aria-hidden="true" className="text-2xl font-light transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-[16px] leading-relaxed text-black/65">{t(f.a)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
