import { Reveal } from "@/components/common/reveal";
import { andorraMap, andorraNet, toolIcons } from "@/data/mocks/arrels";

const AndorraMap = () => {
  const { w, h, d } = andorraMap;
  const { inner, border, edges, outer, outerEdges, outerLinks } = andorraNet;
  const all = [...inner, ...border];
  const pad = 260;
  return (
    <svg viewBox={`${-pad} ${-pad} ${w + pad * 2} ${h + pad * 2}`} className="h-auto w-full" role="img" aria-label="Mapa d'Andorra amb punts il·luminats per tot el país">
      <defs>
        <filter id="mapa-brill" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="mapa-fons" cx="45%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#1f4bff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#1f4bff" stopOpacity="0.05" />
        </radialGradient>
        <radialGradient id="mapa-punt" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#8fd0ff" />
          <stop offset="100%" stopColor="#2e9bff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Xarxa exterior */}
      <g className="mapa-xarxa" stroke="#2e9bff" strokeWidth="1.2" opacity="0.45">
        {outerEdges.map(([a, b]) => (
          <line key={`o${a}-${b}`} x1={outer[a][0]} y1={outer[a][1]} x2={outer[b][0]} y2={outer[b][1]} />
        ))}
        {outerLinks.map(([a, b]) => (
          <line key={`l${a}-${b}`} x1={outer[a][0]} y1={outer[a][1]} x2={border[b][0]} y2={border[b][1]} />
        ))}
      </g>

      {/* Silueta brillant */}
      <path d={d} fill="url(#mapa-fons)" />
      <path d={d} fill="none" stroke="#5cc2ff" strokeWidth="5" strokeLinejoin="round" filter="url(#mapa-brill)" className="mapa-traç" pathLength={1} />

      {/* Xarxa interior */}
      <g className="mapa-xarxa" stroke="#6fb8ff" strokeWidth="1.3" opacity="0.5">
        {edges.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={all[a][0]} y1={all[a][1]} x2={all[b][0]} y2={all[b][1]} />
        ))}
      </g>

      {/* Punts que s'encenen */}
      {[...outer, ...all].map(([x, y], i) => {
        const big = i >= outer.length && i < outer.length + 7;
        return (
          <g key={i} className="mapa-node" style={{ animationDelay: `${((i * 37) % 50) / 10}s` }}>
            <circle cx={x} cy={y} r={big ? 26 : 16} fill="url(#mapa-punt)" />
            <circle cx={x} cy={y} r={big ? 5 : 3} fill="#fff" />
          </g>
        );
      })}
    </svg>
  );
};

const STATS = [
  { value: "+100", label: "empreses del país confien en nosaltres" },
  { value: "+6", label: "anys d'experiència en màrqueting" },
];

export const Arrels = () => (
  <>
    {/* Mapa d'Andorra */}
    <section aria-labelledby="arrels-title" className="relative overflow-hidden bg-[#0e1116] px-6 py-24 text-white md:px-10 md:py-32 lg:px-12">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(50%_60%_at_75%_50%,rgb(47_91_255/0.12),transparent_70%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal className="reveal-up">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/55">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
              Negoci local
            </p>
            <h2 id="arrels-title" className="mt-5 text-[2rem] font-light leading-[1.1] tracking-tight md:text-[2.75rem]">
              D&apos;Andorra, per a <strong className="font-semibold">empreses d&apos;Andorra.</strong>
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-white/65">
              Treballem colze a colze amb negocis de totes les parròquies, i també hem portat projectes a França,
              Espanya i Llatinoamèrica.
            </p>
          </Reveal>
          <Reveal as="dl" className="reveal-stagger mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
            {STATS.map((s, i) => (
              <div key={s.label} style={{ transitionDelay: `${i * 120}ms` }}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-[2rem] font-light leading-none tracking-tight md:text-[2.5rem]">{s.value}</dd>
                <dd className="mt-2 text-[13px] leading-snug text-white/55">{s.label}</dd>
              </div>
            ))}
          </Reveal>
          <Reveal className="reveal-up mt-8 flex flex-wrap gap-2">
            {["Andorra", "França", "Espanya", "Llatinoamèrica"].map((c) => (
              <span key={c} className="rounded-full border border-white/20 px-4 py-1.5 text-[13px] text-white/75">
                {c}
              </span>
            ))}
          </Reveal>
        </div>
        <Reveal className="reveal-map lg:col-span-7">
          <AndorraMap />
        </Reveal>
      </div>
    </section>

  </>
);

export const Talent = () => (
  <>
    {/* Talent i experiència */}
    <section aria-labelledby="talent-title" className="bg-[#0e1116] px-6 py-24 text-white md:px-10 md:py-32 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Reveal className="reveal-up">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/55">Talent i experiència</p>
          <h2 id="talent-title" className="mt-5 max-w-[24ch] text-[2rem] font-light leading-[1.1] tracking-tight md:text-[2.75rem]">
            Apostem pel <strong className="font-semibold">talent andorrà</strong>, amb formació i ofici.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          <Reveal className="reveal-up rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <p className="text-[3rem] font-extralight leading-none">+6</p>
            <p className="mt-5 text-lg">anys fent màrqueting</p>
            <p className="mt-2 text-[15px] leading-relaxed text-white/55">
              Estratègia, contingut, web i publicitat per a empreses de sectors molt diferents.
            </p>
          </Reveal>
          <Reveal className="reveal-up rounded-3xl border border-white/10 bg-white/[0.03] p-8" style={{ transitionDelay: "120ms" }}>
            <p className="text-[3rem] font-extralight leading-none">Màster</p>
            <p className="mt-5 text-lg">en màrqueting</p>
            <p className="mt-2 text-[15px] leading-relaxed text-white/55">
              L&apos;Andrea, la nostra project manager, té un màster en màrqueting: cada projecte, ben planificat.
            </p>
          </Reveal>
          <Reveal className="reveal-up rounded-3xl border border-white/10 bg-white/[0.03] p-8" style={{ transitionDelay: "240ms" }}>
            <p className="text-[3rem] font-extralight leading-none">AD</p>
            <p className="mt-5 text-lg">talent d&apos;aquí</p>
            <p className="mt-2 text-[15px] leading-relaxed text-white/55">
              Creiem en la gent del país i hi apostem: coneixem el mercat perquè hi vivim.
            </p>
          </Reveal>
        </div>

        {/* Martí */}
        <Reveal className="reveal-up mt-4 grid gap-8 rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgb(47_91_255/0.14),rgb(255_255_255/0.02)_55%)] p-8 md:grid-cols-12 md:p-10">
          <div className="md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">Fundador i CEO</p>
            <p className="mt-3 text-[1.75rem] font-light tracking-tight">Martí Mercadé</p>
          </div>
          <ul className="grid gap-6 text-[15px] leading-relaxed text-white/70 sm:grid-cols-3 md:col-span-8">
            <li>
              <span className="block text-white">Doble grau a ESIC</span>
              Màrqueting i Negocis Digitals, cinc anys de formació.
            </li>
            <li>
              <span className="block text-white">Projectes premiats</span>
              Diversos premis en projectes durant la universitat.
            </li>
            <li>
              <span className="block text-white">Havas Media</span>
              Experiència amb clients com UNICEF, JDE i Banca March.
            </li>
          </ul>
        </Reveal>
      </div>
    </section>

  </>
);

const ToolLogo = ({ name, path }: { name: string; path: string }) => (
  <div className="flex h-16 w-44 shrink-0 items-center justify-center gap-3 px-5 md:h-20 md:w-56">
    {path ? (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={`shrink-0 fill-white/55 ${name === "WooCommerce" ? "h-9 w-9" : "h-6 w-6 md:h-7 md:w-7"}`}>
        <path d={path} />
      </svg>
    ) : null}
    <span className="whitespace-nowrap text-[16px] font-medium tracking-tight text-white/55 md:text-[18px]">{name}</span>
  </div>
);

export const Eines = () => {
  const tools = [...toolIcons, { name: "OpenAI", path: "" }];
  return (
    <section aria-labelledby="eines-title" className="bg-[#0a0c10] py-12 text-white md:py-14">
      <h2 id="eines-title" className="px-6 text-center text-[1.35rem] font-light leading-[1.2] tracking-tight md:text-[1.75rem]">
        Les eines amb què <strong className="font-semibold">treballem cada dia</strong>
      </h2>
      <ul className="sr-only">
        {tools.map((t) => (
          <li key={t.name}>{t.name}</li>
        ))}
      </ul>
      <div aria-hidden="true" className="logos-fila group mt-6 flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)] md:mt-8">
        <div className="logos-pista flex w-max shrink-0 items-center group-hover:[animation-play-state:paused]" style={{ ["--logos-durada" as string]: "45s" }}>
          {[0, 1].map((copy) => tools.map((t) => <ToolLogo key={`${copy}-${t.name}`} {...t} />))}
        </div>
      </div>
    </section>
  );
};
