import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { SiteNav } from "@/views/site-nav";
import { ContactForm } from "@/views/contact-form";
import { SiteFooter } from "@/views/site-footer";
import { contactContent, footerContent } from "@/data/mocks/contact";
import { homeNav } from "@/data/mocks/home";
import { projectHref, projects, type Project } from "@/data/mocks/projects";
import { reels } from "@/data/mocks/reels";
import { logoDe, REEL_DE } from "@/data/mocks/project-logos";
import paletes from "@/data/mocks/paletes.json";

export interface ProjectViewProps {
  project: Project;
  prev: Project;
  next: Project;
}

const pad = (n: number) => String(n).padStart(2, "0");
const EYEBROW = "text-[0.7rem] font-semibold uppercase tracking-[0.3em]";

const PALETA_BASE = ["#f4f5f8", "#c9d6ee", "#2b72e2", "#22324f", "#0b1424"];
type Paleta = { colors: string[]; accent: string | null };
/** Colors del projecte (extrets de la captura) + accent per als visuals */
const paletaDe = (p: Project): { paleta: string[]; c: string[] } => {
  const key = p.image.split("/").pop()?.replace(/\.\w+$/, "") ?? "";
  const d = (paletes as Record<string, Paleta>)[key];
  const paleta = p.paleta?.slice(0, 5) ?? d?.colors ?? PALETA_BASE;
  const accent = p.color ?? d?.accent ?? "#2b72e2";
  const c = [...paleta];
  c[3] = accent;
  // to clar de l'accent per a fons suaus
  c[1] = `color-mix(in srgb, ${accent} 22%, white)`;
  c[2] = `color-mix(in srgb, ${accent} 55%, white)`;
  const strip = p.paleta ? [...p.paleta] : [...paleta];
  if (!p.paleta && d?.accent && !strip.includes(d.accent)) strip[2] = d.accent;
  return { paleta: strip, c };
};

const lluminos = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255) > 150;
};

/* ------------------------------------------------------------------ */
/* Textos per defecte de cada servei                                    */
/* ------------------------------------------------------------------ */

type Tipus = "web" | "ux" | "foto" | "seo" | "xarxes" | "chatbot" | "botiga" | "reserves" | "identitat" | "exterior" | "altre";

const tipusDe = (servei: string): Tipus => {
  const s = servei.toLowerCase();
  if (s.includes("ux") || s.includes("ui")) return "ux";
  if (s.startsWith("web")) return "web";
  if (s.includes("foto") || s.includes("vídeo") || s.includes("video")) return "foto";
  if (s.includes("seo")) return "seo";
  if (s.includes("xarxes")) return "xarxes";
  if (s.includes("chatbot") || s.includes("ia")) return "chatbot";
  if (s.includes("botiga") || s.includes("ecommerce")) return "botiga";
  if (s.includes("reserv")) return "reserves";
  if (s.includes("identitat") || s.includes("branding")) return "identitat";
  if (s.includes("exterior")) return "exterior";
  return "altre";
};

const TEXTOS: Record<Tipus, (n: string) => string> = {
  web: (n) =>
    `Hem dissenyat i programat el web de ${n} pensant primer en qui el visita: què busca, per on entra i on ha d'acabar. Estructura clara, textos que s'entenen, càrrega ràpida i un disseny que funciona igual de bé al mòbil que a l'ordinador.`,
  ux: (n) =>
    `Abans d'escriure una línia de codi, vam dibuixar ${n} pantalla a pantalla: recorregut de l'usuari, jerarquia de continguts i components reutilitzables. El disseny es valida a Figma i després es construeix tal qual.`,
  foto: (n) =>
    `Imatge pròpia, res de bancs d'imatges. Vam preparar la sessió, dirigir el rodatge i editar les fotos i els vídeos perquè ${n} es vegi com és de veritat, amb una llum i un to coherents a tots els canals.`,
  seo: (n) =>
    `Arquitectura de continguts, textos treballats per paraula clau, dades estructurades i rendiment tècnic. L'objectiu: que quan algú busca el que ofereix ${n}, el trobi a ell abans que a la competència.`,
  xarxes: (n) =>
    `Estratègia, guions, gravació i edició. Fem reels pensats per a cada xarxa, amb un ritme i un estil propis de ${n}, i els publiquem amb un calendari que manté la marca viva setmana rere setmana.`,
  chatbot: (n) =>
    `Un assistent amb IA entrenat amb la informació de ${n}: respon dubtes, recomana i fins i tot reserva, a qualsevol hora i en diversos idiomes. Menys trucades repetides, més clients atesos.`,
  botiga: (n) =>
    `Una botiga online que ven sola: catàleg fàcil de recórrer, fitxes de producte cuidades, pagament segur i un procés de compra sense friccions. ${n} gestiona estoc i comandes des d'un sol lloc.`,
  reserves: (n) =>
    `Hem integrat un motor de reserves directament al web de ${n}: el client tria dia i hora en pocs clics, sense intermediaris i sense comissions.`,
  identitat: (n) =>
    `Logotip, colors, tipografia i aplicacions. Una identitat que explica qui és ${n} d'un cop d'ull i que es manté coherent des del rètol fins al perfil d'Instagram.`,
  exterior: (n) =>
    `Concepte creatiu, disseny i adaptació a cada suport. Peces pensades per ser llegides en tres segons, al carrer, per qui passa per davant. Una campanya de ${n} que no passa desapercebuda.`,
  altre: (n) => `Un desenvolupament a mida per a ${n}, pensat per resoldre una necessitat concreta del seu dia a dia.`,
};

/* ------------------------------------------------------------------ */
/* Visuals abstractes de cada capítol                                   */
/* ------------------------------------------------------------------ */

const Navegador = ({ src, alt, url, priority = false }: { src: string; alt: string; url?: string; priority?: boolean }) => (
  <div className="overflow-hidden rounded-2xl bg-white shadow-[0_40px_80px_-30px_rgb(11_20_36/0.45)] ring-1 ring-black/5">
    <div className="flex items-center gap-1.5 border-b border-black/5 bg-[#f3f4f6] px-4 py-2.5">
      <span className="size-2.5 rounded-full bg-[#ff5f57]" />
      <span className="size-2.5 rounded-full bg-[#febc2e]" />
      <span className="size-2.5 rounded-full bg-[#28c840]" />
      {url && <span className="mx-auto truncate rounded-md bg-white px-4 py-0.5 text-[0.7rem] text-black/50">{url}</span>}
    </div>
    <div className="relative aspect-[16/10]">
      <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 1024px) 92vw, 640px" className="object-cover object-top" />
    </div>
  </div>
);

/** Esquelet abstracte d'una pàgina, fet amb els colors del client */
const Wireframe = ({ c, className = "" }: { c: string[]; className?: string }) => (
  <div className={`cas-wire rounded-2xl bg-white p-4 shadow-[0_30px_60px_-25px_rgb(11_20_36/0.5)] ring-1 ring-black/5 ${className}`}>
    <div className="flex items-center justify-between">
      <span className="h-2.5 w-10 rounded-full" style={{ background: c[3] }} />
      <span className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1.5 w-5 rounded-full bg-black/10" />
        ))}
      </span>
    </div>
    <div className="mt-4 rounded-xl p-4" style={{ background: c[1] }}>
      <span className="block h-2.5 w-3/4 rounded-full" style={{ background: c[4] }} />
      <span className="mt-2 block h-2 w-1/2 rounded-full bg-black/15" />
      <span className="mt-4 inline-block h-5 w-16 rounded-full" style={{ background: c[3] }} />
    </div>
    <div className="mt-3 grid grid-cols-3 gap-2">
      {[2, 1, 2].map((k, i) => (
        <span key={i} className="aspect-square rounded-lg" style={{ background: c[k], opacity: 0.85 }} />
      ))}
    </div>
    <span className="mt-3 block h-1.5 w-full rounded-full bg-black/10" />
    <span className="mt-1.5 block h-1.5 w-2/3 rounded-full bg-black/10" />
  </div>
);

const VisualWeb = ({ p, c }: { p: Project; c: string[] }) => (
  <div className="relative pb-16 pr-6 md:pb-20 md:pr-10">
    <Navegador src={p.image} alt={`Web de ${p.name}`} url={p.links[0]?.label} />
    <Wireframe c={c} className="cas-flota absolute -bottom-2 right-0 w-[38%] max-w-[15rem]" />
  </div>
);

/**
 * UX/UI: composició isomètrica (pantalles estirades en diagonal sobre un pla de color,
 * amb targetes flotants). Fa servir les pantalles de Figma si n'hi ha; si no, enquadraments del web.
 */
const VisualUX = ({ p, c }: { p: Project; c: string[] }) => {
  const logo = logoDe(p.slug);
  const pantalles = (p.ux?.length ? p.ux : [0, 1, 2].map(() => ({ src: p.image, alt: "", format: "mobil" as const }))).slice(0, 3);
  const web = pantalles[0]?.format === "web";
  const posicions = ["50% 0%", "30% 45%", "70% 90%"];
  return (
    <div
      className="cas-iso relative aspect-[4/3] overflow-hidden rounded-[2rem] md:aspect-[16/9]"
      style={{ background: `linear-gradient(135deg, ${c[1]} 0%, ${c[2]} 100%)` }}
    >
      <span aria-hidden="true" className="cas-iso-diagonal" />
      <div className="cas-iso-pla">
        {pantalles.map((u, i) => (
          <figure key={i} className={`cas-iso-mobil ${web ? "cas-iso-mobil--web" : ""}`} style={{ "--i": i } as CSSProperties}>
            <div className={`relative h-full w-full overflow-hidden bg-white ${web ? "rounded-[0.6rem]" : "rounded-[1.1rem]"}`}>
              <Image
                src={u.src}
                alt={u.alt || (i === 0 ? `Pantalles de ${p.name}` : "")}
                fill
                sizes="300px"
                className="object-cover"
                style={{ objectPosition: p.ux?.length ? "50% 0%" : posicions[i] }}
              />
            </div>
          </figure>
        ))}
        <div className="cas-iso-targeta cas-iso-targeta--a">
          <span className="block h-1.5 w-10 rounded-full bg-black/15" />
          <div className="mt-2.5 flex items-end gap-1">
            {[40, 70, 55, 90, 65].map((h, i) => (
              <span key={i} className="w-2 rounded-sm" style={{ height: `${h * 0.32}px`, background: i === 3 ? c[3] : c[1] }} />
            ))}
          </div>
        </div>
        <div className="cas-iso-targeta cas-iso-targeta--b">
          <span className="grid size-6 place-items-center rounded-full text-[0.55rem] text-white" style={{ background: c[3] }}>
            ✓
          </span>
          <span className="flex-1">
            <span className="block h-1.5 w-full rounded-full bg-black/15" />
            <span className="mt-1.5 block h-1.5 w-2/3 rounded-full bg-black/10" />
          </span>
        </div>
        <div className="cas-iso-targeta cas-iso-targeta--c">
          <span className="block h-2 w-14 rounded-full" style={{ background: c[4] }} />
          <span className="mt-2 block h-6 rounded-lg" style={{ background: c[3] }} />
        </div>
        {logo && (
          <span className="cas-iso-segell">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} alt="" className="max-h-full max-w-full object-contain" />
          </span>
        )}
      </div>
    </div>
  );
};

const VisualFoto = ({ p }: { p: Project }) => {
  const fotos = p.gallery?.length ? p.gallery : null;
  if (fotos) {
    return (
      <div className={`grid gap-4 ${fotos.length > 1 ? "grid-cols-2" : "max-w-md"}`}>
        {fotos.map((g, i) => (
          <figure key={g.src} className={`relative overflow-hidden rounded-2xl ${i % 3 === 0 ? "aspect-[4/5]" : "aspect-square"}`}>
            <Image src={g.src} alt={g.alt} fill sizes="(max-width: 768px) 46vw, 320px" className="object-cover" />
          </figure>
        ))}
      </div>
    );
  }
  // Full de contactes: tres enquadraments de la mateixa imatge
  return (
    <div className="rounded-3xl bg-[#111] p-4 md:p-5">
      <div className="grid grid-cols-3 gap-3">
        {["25% 38%", "50% 42%", "75% 46%"].map((pos, i) => (
          <div key={pos} className="relative aspect-[3/4] overflow-hidden rounded-lg">
            <Image src={p.image} alt="" fill sizes="200px" className="object-cover" style={{ objectPosition: pos, transform: `scale(${1.9 + i * 0.25})` }} />
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between font-mono text-[0.6rem] uppercase tracking-widest text-white/40">
        <span>{p.name}</span>
        <span>01 — 03</span>
      </div>
    </div>
  );
};

const VisualSEO = ({ p, c }: { p: Project; c: string[] }) => (
  <div className="relative rounded-3xl bg-white p-6 shadow-[0_30px_60px_-30px_rgb(11_20_36/0.35)] ring-1 ring-black/5 md:p-8">
    <div className="flex items-center gap-3 rounded-full border border-black/10 px-5 py-3 text-sm text-black/60">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-none stroke-current" strokeWidth="2">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <span className="truncate">{p.sector.toLowerCase()} andorra</span>
    </div>
    <div className="mt-6 rounded-2xl p-4" style={{ background: c[1] }}>
      <p className="text-xs text-black/50">{p.links[0]?.label ?? p.name}</p>
      <p className="mt-1 text-lg font-medium text-[#1a0dab]">{p.name} — {p.sector}</p>
      <p className="mt-1 line-clamp-2 text-sm text-black/60">{p.about}</p>
    </div>
    {[0, 1].map((i) => (
      <div key={i} className="mt-4 px-4 opacity-40">
        <span className="block h-2 w-24 rounded-full bg-black/20" />
        <span className="mt-2 block h-3 w-2/3 rounded-full bg-black/25" />
      </div>
    ))}
    <svg aria-hidden="true" viewBox="0 0 300 90" className="mt-6 h-20 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="seo-g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#2b72e2" stopOpacity="0.35" />
          <stop offset="1" stopColor="#2b72e2" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 80 C40 78 60 70 90 66 S150 52 180 40 S250 14 300 6 L300 90 L0 90Z" fill="url(#seo-g)" />
      <path className="cas-traca" d="M0 80 C40 78 60 70 90 66 S150 52 180 40 S250 14 300 6" fill="none" stroke="#2b72e2" strokeWidth="2.5" />
    </svg>
  </div>
);

const VisualXarxes = ({ p, c }: { p: Project; c: string[] }) => {
  const meus = reels.filter((r) => r.slug === (REEL_DE[p.slug] ?? p.slug));
  if (meus.length) {
    return (
      <div className="flex justify-center gap-4">
        {meus.slice(0, 3).map((r, i) => (
          <div
            key={r.slug}
            className="relative aspect-[9/16] w-[46%] max-w-[15rem] overflow-hidden rounded-[2rem] border-[6px] border-[#111] bg-black shadow-[0_30px_60px_-25px_rgb(11_20_36/0.6)]"
            style={{ transform: `rotate(${i % 2 ? 3 : -3}deg)` }}
          >
            <video
              src={r.video}
              poster={r.poster}
              muted
              loop
              autoPlay
              playsInline
              preload="none"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="mx-auto grid max-w-sm grid-cols-3 gap-1.5 rounded-3xl bg-white p-3 shadow-[0_30px_60px_-30px_rgb(11_20_36/0.4)] ring-1 ring-black/5">
      {Array.from({ length: 9 }, (_, i) => (
        <span key={i} className="cas-tessela aspect-square rounded-md" style={{ background: c[(i * 2) % c.length], "--i": i } as CSSProperties} />
      ))}
    </div>
  );
};

const VisualChatbot = ({ p, c }: { p: Project; c: string[] }) => (
  <div className="mx-auto max-w-sm rounded-[2rem] bg-white p-5 shadow-[0_30px_60px_-30px_rgb(11_20_36/0.45)] ring-1 ring-black/5">
    <div className="flex items-center gap-3 border-b border-black/5 pb-4">
      <span className="grid size-9 place-items-center rounded-full text-xs font-semibold text-white" style={{ background: c[3] }}>
        IA
      </span>
      <div>
        <p className="text-sm font-medium">Assistent de {p.name}</p>
        <p className="flex items-center gap-1.5 text-[0.7rem] text-black/45">
          <span className="size-1.5 rounded-full bg-[#28c840]" /> En línia 24/7
        </p>
      </div>
    </div>
    <div className="flex flex-col gap-2.5 pt-4 text-sm">
      <span className="cas-bombolla max-w-[80%] self-start rounded-2xl rounded-bl-md bg-black/5 px-4 py-2.5" style={{ "--i": 0 } as CSSProperties}>
        Hola! En què et puc ajudar?
      </span>
      <span className="cas-bombolla max-w-[80%] self-end rounded-2xl rounded-br-md px-4 py-2.5 text-white" style={{ background: c[3], "--i": 1 } as CSSProperties}>
        Teniu disponibilitat dissabte?
      </span>
      <span className="cas-bombolla max-w-[80%] self-start rounded-2xl rounded-bl-md bg-black/5 px-4 py-2.5" style={{ "--i": 2 } as CSSProperties}>
        Sí! Et puc reservar ara mateix. Quina hora et va bé?
      </span>
      <span className="cas-bombolla flex gap-1 self-start rounded-2xl bg-black/5 px-4 py-3" style={{ "--i": 3 } as CSSProperties}>
        {[0, 1, 2].map((i) => (
          <span key={i} className="cas-punt size-1.5 rounded-full bg-black/40" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </span>
    </div>
    <p className="mt-4 text-center text-[0.65rem] text-black/35">Conversa d&apos;exemple</p>
  </div>
);

const VisualBotiga = ({ c }: { c: string[] }) => (
  <div className="relative rounded-3xl bg-white p-5 shadow-[0_30px_60px_-30px_rgb(11_20_36/0.4)] ring-1 ring-black/5 md:p-6">
    <div className="grid grid-cols-3 gap-3">
      {[1, 2, 1, 2, 1, 2].map((k, i) => (
        <div key={i}>
          <span className="block aspect-[4/5] rounded-xl" style={{ background: c[k] }} />
          <span className="mt-2 block h-1.5 w-3/4 rounded-full bg-black/15" />
          <span className="mt-1.5 block h-1.5 w-1/3 rounded-full" style={{ background: c[3] }} />
        </div>
      ))}
    </div>
    <span className="cas-flota absolute -right-3 -top-4 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-white shadow-lg" style={{ background: c[4] }}>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-none stroke-current" strokeWidth="2">
        <path d="M5 7h14l-1.5 9h-11z" />
        <circle cx="9" cy="20" r="1" />
        <circle cx="16" cy="20" r="1" />
      </svg>
      Comanda rebuda
    </span>
  </div>
);

const VisualReserves = ({ c }: { c: string[] }) => (
  <div className="mx-auto max-w-sm rounded-3xl bg-white p-6 shadow-[0_30px_60px_-30px_rgb(11_20_36/0.4)] ring-1 ring-black/5">
    <div className="flex items-center justify-between text-sm font-medium">
      <span>Tria un dia</span>
      <span className="text-black/35">‹ ›</span>
    </div>
    <div className="mt-4 grid grid-cols-7 gap-1.5 text-center text-[0.65rem] text-black/40">
      {["Dl", "Dt", "Dc", "Dj", "Dv", "Ds", "Dg"].map((d) => (
        <span key={d}>{d}</span>
      ))}
      {Array.from({ length: 28 }, (_, i) => {
        const sel = i === 12;
        const lliure = [3, 5, 9, 10, 12, 16, 17, 19, 23, 24].includes(i);
        return (
          <span
            key={i}
            className={`grid aspect-square place-items-center rounded-lg text-xs ${sel ? "text-white" : lliure ? "text-black/80" : "text-black/20"}`}
            style={{ background: sel ? c[3] : lliure ? c[1] : undefined }}
          >
            {i + 1}
          </span>
        );
      })}
    </div>
    <div className="mt-5 flex gap-2">
      {["13:00", "13:30", "20:30"].map((h, i) => (
        <span key={h} className="flex-1 rounded-full border py-2 text-center text-xs" style={i === 1 ? { background: c[4], color: "#fff", borderColor: c[4] } : { borderColor: "rgb(0 0 0 / 0.1)" }}>
          {h}
        </span>
      ))}
    </div>
  </div>
);

const VisualIdentitat = ({ p, c }: { p: Project; c: string[] }) => {
  const logo = logoDe(p.slug);
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 grid aspect-[2/1] place-items-center rounded-3xl bg-white p-10 ring-1 ring-black/5">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt={`Logotip de ${p.name}`} className="max-h-24 max-w-[70%] object-contain" />
        ) : (
          <span className="text-4xl font-light tracking-tight">{p.name}</span>
        )}
      </div>
      <div className="grid aspect-square place-items-center rounded-3xl p-8" style={{ background: c[4] }}>
        {logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt="" className="max-h-16 max-w-[80%] object-contain brightness-0 invert" />
        )}
      </div>
      <div className="flex aspect-square flex-col justify-end rounded-3xl p-6" style={{ background: c[1] }}>
        <span className="text-6xl font-light leading-none" style={{ color: c[4] }}>
          Aa
        </span>
        <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: c[4] }}>
          Tipografia
        </span>
      </div>
    </div>
  );
};

const VisualExterior = ({ p }: { p: Project }) => (
  <figure className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_40px_80px_-30px_rgb(11_20_36/0.5)]">
    <Image src={p.image} alt={`Campanya exterior de ${p.name}`} fill sizes="(max-width: 1024px) 92vw, 640px" className="object-cover" />
  </figure>
);

const VisualAltre = ({ c }: { c: string[] }) => (
  <div className="relative mx-auto aspect-square max-w-sm">
    {c.slice(1, 5).map((col, i) => (
      <span
        key={i}
        className="cas-orbita absolute rounded-full mix-blend-multiply"
        style={{ background: col, inset: `${i * 12}%`, "--i": i } as CSSProperties}
      />
    ))}
  </div>
);

const visualDe = (t: Tipus, p: Project, c: string[]): ReactNode => {
  switch (t) {
    case "web":
      return p.foto ? <VisualExterior p={p} /> : <VisualWeb p={p} c={c} />;
    case "ux":
      return <VisualUX p={p} c={c} />;
    case "foto":
      return <VisualFoto p={p} />;
    case "seo":
      return <VisualSEO p={p} c={c} />;
    case "xarxes":
      return <VisualXarxes p={p} c={c} />;
    case "chatbot":
      return <VisualChatbot p={p} c={c} />;
    case "botiga":
      return <VisualBotiga c={c} />;
    case "reserves":
      return <VisualReserves c={c} />;
    case "identitat":
      return <VisualIdentitat p={p} c={c} />;
    case "exterior":
      return <VisualExterior p={p} />;
    default:
      return <VisualAltre c={c} />;
  }
};


/** Arquitectura del web (mapa de seccions), sistema tipogràfic i captures de mòbil */
const Arquitectura = ({ p, c }: { p: Project; c: string[] }) => {
  if (!p.arquitectura?.length && !p.mobils?.length) return null;
  const domini = p.links[0]?.label ?? p.name;
  return (
    <>
      {p.arquitectura?.length ? (
        <section aria-labelledby="arquitectura" className="mx-auto max-w-6xl px-6 pb-24 md:px-10 md:pb-32">
          <div className="border-t border-black/10 pt-16 md:pt-24">
            <p className={`${EYEBROW} text-muted-small`}>Arquitectura</p>
            <h2 id="arquitectura" className="mt-4 max-w-2xl text-[2rem] font-light leading-tight tracking-tight sm:text-[2.75rem]">
              Com s&apos;organitza el web
            </h2>
            <div className="mt-14 flex flex-col items-center">
              <span className="rounded-full px-6 py-3 text-sm font-medium text-white shadow-lg" style={{ background: "#101010" }}>
                {domini}
              </span>
              <span aria-hidden="true" className="h-10 w-px bg-black/20" />
            </div>
            <ol className="cas-arbre grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {p.arquitectura.map((b, i) => (
                <li key={b.nom} className="relative rounded-3xl border border-black/10 bg-white/60 p-7 backdrop-blur transition-transform duration-500 hover:-translate-y-1">
                  <span className="absolute right-6 top-6 font-mono text-[0.7rem] text-black/35">{pad(i + 1)}</span>
                  <span aria-hidden="true" className="block h-1.5 w-10 rounded-full" style={{ background: p.paleta?.[(i % 6) + 1] ?? c[3] }} />
                  <h3 className="mt-5 text-2xl font-light tracking-tight">{b.nom}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-black/60">{b.text}</p>
                  {b.seccions && (
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {b.seccions.map((x) => (
                        <li key={x} className="rounded-full border border-black/10 px-3 py-1 text-xs text-black/70">
                          {x}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {p.tipografies?.length ? (
        <section aria-labelledby="tipografia" className="mx-auto max-w-6xl px-6 pb-24 md:px-10 md:pb-32">
          <p id="tipografia" className={`${EYEBROW} text-muted-small`}>Sistema tipogràfic</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {p.tipografies.map((t) => (
              <figure key={t.nom} className="flex flex-col justify-between rounded-3xl p-8 md:p-10" style={{ background: p.paleta?.[0] ?? "#f3f1ea" }}>
                <span className={`block text-[6rem] leading-none tracking-tight md:text-[8rem] ${t.serif ? "font-serif italic" : "font-light"}`} aria-hidden="true">
                  Aa
                </span>
                <figcaption className="mt-10">
                  <span className="block text-xl font-light">{t.nom}</span>
                  <span className="mt-2 block max-w-sm text-sm leading-relaxed text-black/60">{t.us}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {p.mobils?.length ? (
        <section aria-labelledby="mobil" className="px-4 pb-24 md:px-10 md:pb-32">
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 overflow-hidden rounded-[2rem] px-6 py-16 md:grid-cols-[1fr_1.4fr] md:px-14 md:py-20" style={{ background: c[1] }}>
            <div>
              <p className={`${EYEBROW} text-black/50`}>Mòbil</p>
              <h2 id="mobil" className="mt-4 text-[2rem] font-light leading-tight tracking-tight sm:text-[2.5rem]">Pensat primer per a la pantalla petita</h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-black/60">
                Qui arriba des d&apos;Instagram ho fa amb el telèfon a la mà. Per això cada secció es va dissenyar primer en vertical: l&apos;índex es converteix en una llista de fotos i els camins, en targetes grans fàcils de tocar.
              </p>
            </div>
            <div className="flex justify-center gap-5 md:gap-8">
              {p.mobils.map((m, i) => (
                <figure key={m.src} className={`cas-telefon w-[44%] max-w-[240px] ${i % 2 ? "md:translate-y-12" : ""}`}>
                  <div className="overflow-hidden rounded-[2rem] border-[6px] border-[#101010] bg-[#101010] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.5)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.src} alt={m.alt} loading="lazy" decoding="async" className="block w-full rounded-[1.6rem]" />
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

/** Detalls destacats: captura gran + explicació (funcionalitats concretes del projecte) */
const Destacats = ({ p, c }: { p: Project; c: string[] }) =>
  p.destacats?.length ? (
    <section aria-labelledby="destacats" className="cas-destacats relative overflow-hidden bg-footer pb-28 pt-24 text-white md:pb-40 md:pt-32">
      <span aria-hidden="true" className="cas-taca cas-taca--a opacity-30" />
      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <p className={`${EYEBROW} text-white/55`}>A fons</p>
        <h2 id="destacats" className="mt-4 max-w-2xl text-[2rem] font-light leading-tight tracking-tight sm:text-[2.75rem]">
          Els detalls que fan la diferència
        </h2>
        <div className="mt-16 flex flex-col gap-24 md:gap-32">
          {p.destacats.map((d, i) => (
            <article key={d.titol} className="cas-destacat grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
              <figure className={`cas-visual group relative ${i % 2 ? "lg:order-2" : ""}`}>
                <span aria-hidden="true" className="absolute -inset-4 rounded-[2rem] opacity-40 blur-2xl transition-opacity duration-700 group-hover:opacity-70" style={{ background: c[3] }} />
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] ring-1 ring-white/10 transition-transform duration-700 group-hover:-translate-y-1">
                  {!d.foto && (
                  <div className="flex items-center gap-1.5 border-b border-black/5 bg-[#f3f4f6] px-4 py-2.5">
                    <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="size-2.5 rounded-full bg-[#febc2e]" />
                    <span className="size-2.5 rounded-full bg-[#28c840]" />
                    {p.links[0] && <span className="mx-auto truncate rounded-md bg-white px-4 py-0.5 text-[0.7rem] text-black/50">{p.links[0].label}</span>}
                  </div>
                  )}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={d.imatge} alt={d.alt} loading="lazy" decoding="async" className="block w-full" />
                </div>
              </figure>
              <div className={i % 2 ? "lg:order-1" : ""}>
                <p className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-white/50">
                  <span>{pad(i + 1)}</span>
                  {d.etiqueta && (
                    <>
                      <span className="h-px w-8 bg-white/25" />
                      <span>{d.etiqueta}</span>
                    </>
                  )}
                </p>
                <h3 className="mt-5 text-[1.75rem] font-light leading-tight tracking-tight sm:text-[2.25rem]">{d.titol}</h3>
                <p className="mt-5 text-lg leading-relaxed text-white/70">{d.text}</p>
                {d.punts && (
                  <ul className="mt-7 flex flex-wrap gap-2">
                    {d.punts.map((pt) => (
                      <li key={pt} className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/85">
                        {pt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  ) : null;

/* ------------------------------------------------------------------ */
/* Pàgina                                                               */
/* ------------------------------------------------------------------ */

export const ProjectView = ({ project: p, prev, next }: ProjectViewProps) => {
  const index = projects.findIndex((x) => x.slug === p.slug) + 1;
  const main = p.links[0];
  const { paleta, c } = paletaDe(p);
  const logo = logoDe(p.slug);

  // Capítols: un per servei (+ UX/UI si hi ha pantalles de Figma i no surt als serveis)
  const serveis = p.services.filter((s) => tipusDe(s) !== "ux");
  const ux = p.services.find((s) => tipusDe(s) === "ux") ?? (p.ux?.length ? "Disseny UX/UI" : null);
  if (ux) serveis.splice(serveis[0] && tipusDe(serveis[0]) === "web" ? 1 : 0, 0, ux);
  // Fotografia i vídeo comparteixen visual: n'agrupem el títol
  const capitols: { titol: string; tipus: Tipus; text: string }[] = [];
  for (const s of serveis) {
    const t = tipusDe(s);
    const ja = capitols.find((x) => x.tipus === t && t === "foto");
    if (ja) {
      ja.titol = `${ja.titol} i ${s.toLowerCase()}`;
      continue;
    }
    capitols.push({ titol: s, tipus: t, text: p.capitols?.[s] ?? TEXTOS[t](p.name) });
  }

  const vars = { "--c1": c[1], "--c2": c[2], "--c3": c[3], "--c4": c[4] } as CSSProperties;

  return (
    <>
      <SiteNav {...homeNav} homeHref="/" navLabel="Principal" />
      <main id="top" className="w-full bg-hero-page text-[#171717]" style={vars}>
        {/* ── Portada ─────────────────────────────────────────── */}
        <section aria-labelledby="project-title" className="cas-hero relative overflow-hidden bg-footer px-6 pb-24 pt-36 text-white md:px-10 md:pb-32 md:pt-44 lg:px-12">
          <span aria-hidden="true" className="cas-taca cas-taca--a" />
          <span aria-hidden="true" className="cas-taca cas-taca--b" />
          <span aria-hidden="true" className="cas-graella" />

          <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className={`${EYEBROW} text-white/60`}>
                Cas d&apos;estudi · {pad(index)}/{pad(projects.length)} · {p.lloc ?? "Andorra"}{p.any ? ` · ${p.any}` : ""}
              </p>
              <h1 id="project-title" className="cas-titol mt-6 text-[2.75rem] font-light leading-[0.98] tracking-tight sm:text-6xl lg:text-[5rem]">
                {p.name}
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-white/75">{p.summary.replace(/\.$/, "")} per a {p.sector.toLowerCase()}.</p>

              <ol className="mt-10 flex flex-wrap gap-x-6 gap-y-3" aria-label="Què hem fet">
                {capitols.map((k, i) => (
                  <li key={k.titol} className="flex items-baseline gap-2 text-sm text-white/85">
                    <span className="font-mono text-[0.7rem] text-white/40">{pad(i + 1)}</span>
                    {k.titol}
                  </li>
                ))}
              </ol>

              {main && (
                <a
                  href={main.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-plum shadow-sm hover:bg-white/90"
                >
                  Visitar {main.label} <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>

            {/* Escena abstracta: capes "explotades" de la peça */}
            <div className="cas-escena relative" aria-hidden={!p.foto}>
              <span className="cas-capa cas-capa--3" />
              <span className="cas-capa cas-capa--2" />
              <div className="cas-capa cas-capa--1 overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={p.image}
                    alt={p.foto ? `${p.name}: ${p.summary}` : `Web de ${p.name}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 92vw, 620px"
                    className={p.foto ? "object-cover" : "object-cover object-top"}
                  />
                </div>
              </div>
              {logo && (
                <span className="cas-segell absolute -bottom-6 -left-4 grid size-24 place-items-center rounded-full bg-white p-4 shadow-xl md:size-28">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logo} alt="" className="max-h-full max-w-full object-contain" />
                </span>
              )}
            </div>
          </div>
        </section>

        {/* ── Repte i fitxa ───────────────────────────────────── */}
        <section aria-label="El projecte" className="mx-auto grid max-w-6xl gap-14 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className={`${EYEBROW} text-muted-small`}>El repte</p>
            <p className="cas-entra mt-6 text-[1.75rem] font-light leading-[1.2] tracking-tight sm:text-[2.25rem]">{p.repte ?? p.about}</p>
            {p.enfoc && <p className="cas-entra mt-6 max-w-2xl text-lg leading-relaxed text-black/60">{p.enfoc}</p>}
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 self-end border-t border-black/10 pt-8 text-sm lg:grid-cols-1">
            {[
              ["Client", p.name],
              ["Sector", p.sector],
              ["Localització", p.lloc ?? "Andorra"],
              ...(p.any ? [["Any", p.any]] : []),
              ["Serveis", p.services.join(" · ")],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className={`${EYEBROW} text-muted-small`}>{k}</dt>
                <dd className="mt-2 text-base font-light">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Paleta ──────────────────────────────────────────── */}
        <section aria-label="Paleta de colors" className="px-4 md:px-10">
          <div className="mx-auto flex h-40 max-w-6xl overflow-hidden rounded-3xl ring-1 ring-black/5 md:h-56">
            {paleta.map((col, i) => (
              <div key={col + i} className="cas-color group relative flex-1 transition-[flex] duration-500 hover:flex-[2.2]" style={{ background: col }}>
                <span
                  className="absolute bottom-4 left-4 font-mono text-[0.65rem] uppercase tracking-wider opacity-70"
                  style={{ color: lluminos(col) ? "#111" : "#fff" }}
                >
                  {col}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Què hem fet ─────────────────────────────────────── */}
        <section aria-labelledby="que-hem-fet" className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
          <h2 id="que-hem-fet" className={`${EYEBROW} text-muted-small`}>
            Què hem fet
          </h2>
          <div className="mt-6 flex flex-col">
            {capitols.map((k, i) => (
              <article
                key={k.titol}
                id={k.tipus === "ux" ? "ux-ui" : undefined}
                className={`cas-capitol scroll-mt-24 grid items-center gap-10 border-t border-black/10 py-16 md:py-24 ${k.tipus === "ux" ? "" : "lg:grid-cols-2 lg:gap-20"}`}
              >
                <div className={k.tipus === "ux" ? "max-w-2xl" : i % 2 ? "lg:order-2" : ""}>
                  <span className="cas-num block text-[5rem] font-extralight leading-none tracking-tighter md:text-[7rem]">{pad(i + 1)}</span>
                  <h3 className="mt-4 text-[2rem] font-light leading-tight tracking-tight sm:text-[2.5rem]">{k.titol}</h3>
                  <p className="mt-5 max-w-md text-lg leading-relaxed text-black/60">{k.text}</p>
                </div>
                <div className={`cas-visual ${k.tipus !== "ux" && i % 2 ? "lg:order-1" : ""}`}>{visualDe(k.tipus, p, c)}</div>
              </article>
            ))}
          </div>
        </section>

        <Arquitectura p={p} c={c} />

        <Destacats p={p} c={c} />

        {/* ── Galeria a sang (si hi ha fotos i no s'han fet servir al capítol de foto) ── */}
        {p.gallery && p.gallery.length > 0 && !capitols.some((k) => k.tipus === "foto") && (
          <section aria-label="Fotografies del projecte" className="mx-auto max-w-6xl px-4 pb-24 md:px-10">
            <div className={`grid gap-4 ${p.gallery.length > 1 ? "md:grid-cols-2" : ""}`}>
              {p.gallery.map((g) => (
                <figure key={g.src} className="relative aspect-[16/10] overflow-hidden rounded-3xl">
                  <Image src={g.src} alt={g.alt} fill sizes="(max-width: 768px) 92vw, 1088px" className="object-cover" />
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* ── Següent projecte ────────────────────────────────── */}
        <nav aria-label="Altres projectes" className={`px-4 pb-24 md:px-10 md:pb-32 ${p.destacats?.length ? "pt-24 md:pt-40" : ""}`}>
          <Link href={projectHref(next.slug)} className="cas-seguent group relative mx-auto block max-w-6xl overflow-hidden rounded-[2rem] bg-footer text-white">
            <Image
              src={next.image}
              alt=""
              fill
              sizes="(max-width: 1152px) 96vw, 1152px"
              className="object-cover object-top opacity-35 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-50"
            />
            <span className="absolute inset-0 bg-gradient-to-r from-[#0b1424] via-[#0b1424]/70 to-transparent" />
            <span className="relative flex min-h-[18rem] flex-col justify-end p-8 md:min-h-[24rem] md:p-14">
              <span className={`${EYEBROW} text-white/60`}>Següent projecte · {next.sector}</span>
              <span className="mt-4 flex items-end justify-between gap-6">
                <span className="text-[2.5rem] font-light leading-none tracking-tight sm:text-6xl">{next.name}</span>
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-white text-xl text-plum transition-transform duration-500 group-hover:translate-x-1 md:size-16">→</span>
              </span>
            </span>
          </Link>
          <div className="mx-auto mt-6 flex max-w-6xl items-center justify-between text-sm">
            <Link href={projectHref(prev.slug)} className="text-black/55 hover:text-black">
              ← {prev.name}
            </Link>
            <Link href="/projectes" className="rounded-full border border-black/15 px-5 py-2.5 font-medium hover:border-black/50">
              Tots els projectes
            </Link>
          </div>
        </nav>

        <div className="relative">
          <ContactForm content={contactContent} />
          <SiteFooter content={footerContent} />
        </div>
      </main>
    </>
  );
};
