import { getI18n } from "@/i18n/server";
import { Reveal } from "@/components/common/reveal";

const PILARS = [
  {
    n: "01",
    titol: "La IA al centre",
    text: "Fem servir la intel·ligència artificial i la tecnologia a cada projecte per aconseguir un millor resultat per al client.",
  },
  {
    n: "02",
    titol: "Creativitat i IA de la mà",
    text: "Les idees i el criteri els posem nosaltres. La IA ens ajuda a fer-les realitat més ràpid i millor.",
  },
  {
    n: "03",
    titol: "Sempre un pas per davant",
    text: "Innovació constant: seguim cada dia les tendències, l'algoritme i les eines noves per avançar-nos.",
  },
  {
    n: "04",
    titol: "Atenció propera i proactiva",
    text: "Parles directament amb qui fa la feina. I no esperem que ens ho demanis: et proposem millores.",
  },
];

const EQUIP = [
  {
    nom: "Martí Mercadé",
    rol: "CEO",
    text: "Ha portat campanyes a Havas Media per a UNICEF, JDE i Banca March, gestionant pressupostos molt grans.",
  },
  {
    nom: "Eric Carrera",
    rol: "CTO",
    text: "Treballa en el sector tecnològic des de molt jove, amb experiència en altres agències de Tarragona.",
  },
  {
    nom: "Andrea Ramos",
    rol: "Project Manager",
    text: "Graduada en Sociologia, amb un màster en màrqueting per la UB i experiència en diverses agències de màrqueting.",
  },
  {
    nom: "Maria Socias",
    rol: "Content Creator",
    text: "Formada en vídeo i amb un curs d'il·luminació: el contingut, ben gravat i ben il·luminat.",
  },
];

export const Diferencial = () => {
  const { t } = getI18n();
  return (
    <section aria-labelledby="diferencial-title" className="relative overflow-hidden bg-[#0e1116] px-6 py-24 text-white md:px-10 md:py-32 lg:px-12">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(50%_60%_at_85%_10%,rgb(47_91_255/0.16),transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="reveal-up">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/55">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
            {t("El que ens fa diferents")}
          </p>
          <h2 id="diferencial-title" className="mt-5 max-w-[22ch] text-[2rem] font-light leading-[1.1] tracking-tight md:text-[2.75rem]">
            {t("Un equip jove que va")} <strong className="font-semibold">{t("un pas per davant.")}</strong>
          </h2>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/65">
            {t("Hem crescut amb les xarxes i amb l'algoritme del dia a dia. Ens avancem a les tendències i a la tecnologia, i ho sumem a l'experiència de projectes reals: coneixement jove, però amb ofici.")}
          </p>
        </Reveal>

        {/* Pilars */}
        <Reveal as="ul" className="reveal-stagger mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILARS.map((p, i) => (
            <li key={p.n} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7" style={{ transitionDelay: `${i * 110}ms` }}>
              <span className="text-sm font-medium text-accent-lime">{p.n}</span>
              <p className="mt-6 text-lg leading-snug">{t(p.titol)}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-white/55">{t(p.text)}</p>
            </li>
          ))}
        </Reveal>

        {/* Experiència de l'equip */}
        <Reveal className="reveal-up mt-4 rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgb(47_91_255/0.14),rgb(255_255_255/0.02)_55%)] p-8 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">{t("Joves, però amb experiència")}</p>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {EQUIP.map((m) => (
              <li key={m.nom} className="text-[15px] leading-relaxed text-white/65">
                <span className="block text-[1.15rem] font-light tracking-tight text-white">{m.nom}</span>
                <span className="mb-3 block text-[12px] uppercase tracking-[0.18em] text-white/40">{t(m.rol)}</span>
                {t(m.text)}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
};
