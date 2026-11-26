import { PDE_MIDES, PDE_SOLUCIONS, formatEuros } from "@/data/mocks/pde";

/**
 * Guia completa dels ajuts PDE (català i castellà): límits per mida, totes les solucions,
 * exemple de càlcul, la convocatòria 2026, com preparar-se per a la 2027 i preguntes freqüents.
 * Xifres de andorra-digital.com/pde/solucions-digitalitzacio i de la premsa (agost 2026).
 */
type L = "ca" | "es";

const TX = {
  ca: {
    midesEy: "Quant et pot tocar",
    midesH: "Fins a 6.000 € segons la mida de l'empresa.",
    midesP: "Cada solució té el seu percentatge i el seu màxim. La suma de totes no pot passar del límit de la teva empresa, i el nombre de solucions també té un màxim.",
    treb: "treballadors",
    finsA: "fins a",
    sol: "solucions com a màxim",
    solH: "Totes les solucions que paga el PDE",
    solP: "Ajut = el percentatge del cost real, sense passar de l'import màxim de cada solució.",
    nou: "Nou",
    col: ["Solució", "Ajut", "Màxim"],
    font: "Font: Andorra Digital, catàleg de solucions del PDE.",
    exH: "Un exemple real de càlcul",
    exP: "Una microempresa (fins a 5 treballadors) que fa la web nova, un xatbot amb IA i SEO:",
    ex: [
      ["Web nova", 4000, 30, 1200],
      ["Xatbot amb intel·ligència artificial", 5000, 50, 2500],
      ["SEO", 2000, 30, 500],
    ] as [string, number, number, number][],
    exNota: "El SEO arriba al seu màxim de 500 €, encara que el 30% seria 600 €.",
    exTotal: "Ajut total",
    exDe: "d'una inversió de",
    convH: "Què va passar amb la convocatòria 2026",
    conv: [
      "Es va obrir el 8 d'abril del 2026 amb 500.000 € i es va esgotar: 178 empreses i 368 solucions finançades.",
      "Les més demanades van ser la intel·ligència artificial (85 sol·licituds), les webs (70) i el SEO i SEM (58).",
      "El 69% dels ajuts van anar a microempreses.",
      "Ara mateix les subvencions estan esgotades fins que s'obri la nova convocatòria.",
    ],
    convFont: "Fonts: Andorra Digital i Alto Andorra (agost 2026).",
    prepH: "Com preparar-te per a la convocatòria 2027",
    prep: [
      "Fes ja el qüestionari d'autodiagnòstic d'Andorra Digital: és gratuït i obligatori.",
      "Tingues a punt el certificat digital per fer el tràmit en línia.",
      "Confirma quants treballadors tens: d'això depèn el teu límit.",
      "Tria les solucions amb nosaltres, sense passar del màxim de la teva mida.",
      "Tingues el pressupost preparat per solució, per presentar-lo el primer dia.",
      "Estigues al dia amb els impostos i la CASS.",
      "No comencis la feina abans de presentar la sol·licitud.",
      "Apunta't a la nostra llista i t'avisem el dia que obri.",
    ],
    errH: "Errors que fan perdre l'ajut",
    err: [
      ["Arribar tard", "Els ajuts s'esgoten en poques setmanes: cal presentar-ho tot el primer dia."],
      ["Començar abans d'hora", "Fes la feina després de presentar la sol·licitud, no abans."],
      ["Passar-se del límit", "Si tries més solucions de les que permet la teva mida, la sol·licitud no quadra."],
      ["Deixar el tancament", "Quan s'acaba la feina, el Punt Únic de Contacte ho revisa abans que el Govern pagui."],
    ] as [string, string][],
    faqH: "Preguntes freqüents sobre els ajuts PDE",
    faq: [
      ["Què és el PDE?", "El Programa de Digitalització d'Empreses del Govern d'Andorra, gestionat per Andorra Digital. Subvenciona entre el 30% i el 50% de solucions digitals com webs, botigues online, SEO, intel·ligència artificial o ciberseguretat."],
      ["Quant puc rebre?", "Fins a 6.000 € una microempresa (1 a 5 treballadors), 5.500 € una petita empresa (6 a 25), 4.000 € una mitjana (26 a 100) i 3.000 € una gran empresa."],
      ["Quan obre la propera convocatòria?", "Encara no hi ha data oficial. La del 2026 es va obrir a l'abril i es va esgotar. Et recomanem tenir-ho tot preparat i apuntar-te a la nostra llista perquè t'avisem."],
      ["Qui cobra l'ajut?", "El Govern paga l'ajut directament a l'empresa quan la feina està feta i revisada. L'empresa no ha de presentar factures al Govern."],
      ["Puc demanar diverses solucions alhora?", "Sí, fins al nombre màxim de solucions de la teva mida i sense passar del límit total."],
      ["Us encarregueu dels tràmits?", "Sí. T'ajudem amb el qüestionari, triem les solucions, preparem el pressupost i t'acompanyem fins que cobres l'ajut."],
    ] as [string, string][],
  },
  es: {
    midesEy: "Cuánto te puede tocar",
    midesH: "Hasta 6.000 € según el tamaño de tu empresa.",
    midesP: "Cada solución tiene su porcentaje y su máximo. La suma de todas no puede superar el límite de tu empresa, y el número de soluciones también tiene un máximo.",
    treb: "trabajadores",
    finsA: "hasta",
    sol: "soluciones como máximo",
    solH: "Todas las soluciones que paga el PDE",
    solP: "Ayuda = el porcentaje del coste real, sin superar el importe máximo de cada solución.",
    nou: "Nuevo",
    col: ["Solución", "Ayuda", "Máximo"],
    font: "Fuente: Andorra Digital, catálogo de soluciones del PDE.",
    exH: "Un ejemplo real de cálculo",
    exP: "Una microempresa (hasta 5 trabajadores) que hace una web nueva, un chatbot con IA y SEO:",
    ex: [
      ["Web nueva", 4000, 30, 1200],
      ["Chatbot con inteligencia artificial", 5000, 50, 2500],
      ["SEO", 2000, 30, 500],
    ] as [string, number, number, number][],
    exNota: "El SEO llega a su máximo de 500 €, aunque el 30% serían 600 €.",
    exTotal: "Ayuda total",
    exDe: "de una inversión de",
    convH: "Qué pasó con la convocatoria 2026",
    conv: [
      "Se abrió el 8 de abril de 2026 con 500.000 € y se agotó: 178 empresas y 368 soluciones financiadas.",
      "Las más pedidas fueron la inteligencia artificial (85 solicitudes), las webs (70) y el SEO y SEM (58).",
      "El 69% de las ayudas fue para microempresas.",
      "Ahora mismo las subvenciones están agotadas hasta que se abra la nueva convocatoria.",
    ],
    convFont: "Fuentes: Andorra Digital y Alto Andorra (agosto 2026).",
    prepH: "Cómo prepararte para la convocatoria 2027",
    prep: [
      "Haz ya el cuestionario de autodiagnóstico de Andorra Digital: es gratuito y obligatorio.",
      "Ten listo el certificado digital para hacer el trámite online.",
      "Confirma cuántos trabajadores tienes: de eso depende tu límite.",
      "Elige las soluciones con nosotros, sin superar el máximo de tu tamaño.",
      "Ten el presupuesto preparado por solución, para presentarlo el primer día.",
      "Mantente al día con los impuestos y la CASS.",
      "No empieces el trabajo antes de presentar la solicitud.",
      "Apúntate a nuestra lista y te avisamos el día que abra.",
    ],
    errH: "Errores que hacen perder la ayuda",
    err: [
      ["Llegar tarde", "Las ayudas se agotan en pocas semanas: hay que presentarlo todo el primer día."],
      ["Empezar antes de tiempo", "Haz el trabajo después de presentar la solicitud, no antes."],
      ["Pasarse del límite", "Si eliges más soluciones de las que permite tu tamaño, la solicitud no cuadra."],
      ["Descuidar el cierre", "Cuando se termina el trabajo, el Punt Únic de Contacte lo revisa antes de que el Govern pague."],
    ] as [string, string][],
    faqH: "Preguntas frecuentes sobre las ayudas PDE",
    faq: [
      ["¿Qué es el PDE?", "El Programa de Digitalització d'Empreses del Govern d'Andorra, gestionado por Andorra Digital. Subvenciona entre el 30% y el 50% de soluciones digitales como webs, tiendas online, SEO, inteligencia artificial o ciberseguridad."],
      ["¿Cuánto puedo recibir?", "Hasta 6.000 € una microempresa (1 a 5 trabajadores), 5.500 € una pequeña empresa (6 a 25), 4.000 € una mediana (26 a 100) y 3.000 € una gran empresa."],
      ["¿Cuándo abre la próxima convocatoria?", "Todavía no hay fecha oficial. La de 2026 se abrió en abril y se agotó. Te recomendamos tenerlo todo preparado y apuntarte a nuestra lista para que te avisemos."],
      ["¿Quién cobra la ayuda?", "El Govern paga la ayuda directamente a la empresa cuando el trabajo está hecho y revisado. La empresa no tiene que presentar facturas al Govern."],
      ["¿Puedo pedir varias soluciones a la vez?", "Sí, hasta el número máximo de soluciones de tu tamaño y sin superar el límite total."],
      ["¿Os encargáis de los trámites?", "Sí. Te ayudamos con el cuestionario, elegimos las soluciones, preparamos el presupuesto y te acompañamos hasta que cobras la ayuda."],
    ] as [string, string][],
  },
};

export const PdeGuia = ({ lang = "ca", faq = true }: { lang?: L; faq?: boolean }) => {
  const x = TX[lang];
  const exCost = x.ex.reduce((a, r) => a + r[1], 0);
  const exAjut = x.ex.reduce((a, r) => a + r[3], 0);
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: x.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  return (
    <div className="text-[#171717]">
      {faq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />}

      {/* Límits per mida */}
      <section aria-labelledby="pde-mides" className="mx-auto max-w-6xl px-6 py-20 md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2f5bff]">{x.midesEy}</p>
        <h2 id="pde-mides" className="mt-4 max-w-2xl text-[2rem] font-light leading-[1.1] tracking-tight md:text-[2.6rem]">{x.midesH}</h2>
        <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-black/60">{x.midesP}</p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PDE_MIDES.map((m, i) => (
            <li key={m.id} className={`rounded-3xl p-6 ${i === 0 ? "bg-[#0b1424] text-white" : "bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]"}`}>
              <span className={`text-sm ${i === 0 ? "text-white/70" : "text-black/50"}`}>{m[lang]} · {m.treb} {x.treb}</span>
              <span className="mt-3 block text-[2.2rem] font-light leading-none tracking-tight">
                <span className={`mr-1 text-base ${i === 0 ? "text-white/60" : "text-black/45"}`}>{x.finsA}</span>
                {formatEuros(m.max)}
              </span>
              <span className={`mt-3 block text-sm ${i === 0 ? "text-accent-lime" : "text-[#2f5bff]"}`}>{m.sol} {x.sol}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Totes les solucions */}
      <section aria-labelledby="pde-solucions" className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
        <h2 id="pde-solucions" className="text-[1.75rem] font-light tracking-tight md:text-[2.25rem]">{x.solH}</h2>
        <p className="mt-3 text-[15px] text-black/55">{x.solP}</p>
        <div className="mt-8 gap-6 lg:columns-2">
          {PDE_SOLUCIONS.map((g) => (
            <div key={g.grup.ca} className="mb-6 break-inside-avoid overflow-hidden rounded-3xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <h3 className="border-b border-black/[0.06] px-6 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-black/55">{g.grup[lang]}</h3>
              <table className="w-full text-left text-[15px]">
                <thead className="sr-only">
                  <tr>{x.col.map((c) => <th key={c}>{c}</th>)}</tr>
                </thead>
                <tbody>
                  {g.items.map((s) => (
                    <tr key={s.ca} className="border-b border-black/[0.05] last:border-0">
                      <td className="py-3 pl-6 pr-2">
                        {s[lang]}
                        {s.nou && <span className="ml-2 rounded-full bg-accent-lime px-2 py-0.5 text-[11px] font-semibold text-black">{x.nou}</span>}
                      </td>
                      <td className="px-2 py-3 text-right font-semibold text-[#2f5bff]">{s.pct}%</td>
                      <td className="whitespace-nowrap px-6 py-3 text-right tabular-nums text-black/70">{formatEuros(s.max)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-black/45">{x.font}</p>
      </section>

      {/* Exemple */}
      <section aria-labelledby="pde-exemple" className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
        <div className="rounded-3xl bg-[#0b1424] p-8 text-white md:p-12">
          <h2 id="pde-exemple" className="text-[1.75rem] font-light tracking-tight md:text-[2.25rem]">{x.exH}</h2>
          <p className="mt-3 text-white/70">{x.exP}</p>
          <ul className="mt-8 divide-y divide-white/10">
            {x.ex.map(([n, cost, pct, ajut]) => (
              <li key={n} className="flex flex-wrap items-baseline justify-between gap-3 py-4">
                <span className="text-[17px]">{n}</span>
                <span className="text-white/60 tabular-nums">{formatEuros(cost)} × {pct}%</span>
                <span className="text-xl font-semibold tabular-nums text-accent-lime">{formatEuros(ajut)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-sm text-white/55">{x.exNota}</p>
          <p className="mt-8 text-[1.6rem] font-light">
            {x.exTotal}: <strong className="font-semibold text-accent-lime">{formatEuros(exAjut)}</strong>{" "}
            <span className="text-base text-white/60">{x.exDe} {formatEuros(exCost)}</span>
          </p>
        </div>
      </section>

      {/* Convocatòria 2026 i preparació 2027 */}
      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 md:px-10 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <h2 className="text-[1.5rem] font-light tracking-tight md:text-[1.8rem]">{x.convH}</h2>
          <ul className="mt-6 space-y-4">
            {x.conv.map((c) => (
              <li key={c} className="flex gap-3 text-[16px] leading-relaxed text-black/70">
                <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2f5bff]" />
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-black/45">{x.convFont}</p>
        </div>
        <div className="rounded-3xl bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <h2 className="text-[1.5rem] font-light tracking-tight md:text-[1.8rem]">{x.prepH}</h2>
          <ol className="mt-6 space-y-3">
            {x.prep.map((c, i) => (
              <li key={c} className="flex gap-3 text-[16px] leading-relaxed text-black/70">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-lime text-xs font-semibold text-black">{i + 1}</span>
                {c}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Errors */}
      <section aria-labelledby="pde-errors" className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
        <h2 id="pde-errors" className="text-[1.75rem] font-light tracking-tight md:text-[2.25rem]">{x.errH}</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {x.err.map(([t, d]) => (
            <li key={t} className="rounded-3xl border border-black/[0.08] p-6">
              <span className="text-lg">{t}</span>
              <p className="mt-2 text-[15px] leading-relaxed text-black/60">{d}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      {faq && <section aria-labelledby="pde-faq" className="mx-auto max-w-4xl px-6 pb-24 md:px-10">
        <h2 id="pde-faq" className="text-[1.75rem] font-light tracking-tight md:text-[2.25rem]">{x.faqH}</h2>
        <div className="mt-8 divide-y divide-black/10 border-y border-black/10">
          {x.faq.map(([q, a]) => (
            <details key={q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[17px] font-medium">
                {q}
                <span aria-hidden="true" className="text-2xl font-light transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-[16px] leading-relaxed text-black/65">{a}</p>
            </details>
          ))}
        </div>
      </section>}
    </div>
  );
};
