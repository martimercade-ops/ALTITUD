/* eslint-disable @next/next/no-img-element */
const PUNTS = [
  ["Tots els leads en un lloc.", "Ajuts PDE, formularis de la web, Meta i els que afegeixis a mà."],
  ["Seguiment fins al sí.", "Estats, notes, pressupostos i recordatoris de cada contacte."],
  ["Accés blindat.", "Contrasenya xifrada i codi del mòbil a cada entrada."],
];

export const AuthShell = ({ children }: { children: React.ReactNode }) => (
  <main className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
    <section className="pa-costat relative hidden overflow-hidden text-white lg:flex lg:flex-col lg:justify-between lg:p-14">
      <span aria-hidden="true" className="pa-llum pa-llum--a" />
      <span aria-hidden="true" className="pa-llum pa-llum--b" />
      <span aria-hidden="true" className="pa-graella" />
      <img src="/assets/altitud/altitud-logo-h.svg" alt="Altitud Digital" className="relative h-6 w-auto self-start" />
      <div className="relative max-w-xl">
        <h1 className="text-[3.4rem] font-semibold leading-[1.02] tracking-tight">
          Els teus leads,
          <br />
          <span className="text-[#b6f13a]">en directe.</span>
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-white/65">
          El panell privat d&apos;Altitud Digital per convertir cada sol·licitud en un client.
        </p>
        <ul className="mt-12 flex flex-col gap-4">
          {PUNTS.map(([t, d]) => (
            <li key={t} className="flex gap-3 text-[0.95rem] text-white/60">
              <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-[#b6f13a]/15 text-[0.7rem] text-[#b6f13a]">✓</span>
              <span>
                <strong className="font-medium text-white">{t}</strong> {d}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative flex items-center gap-4 self-start rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur">
        <span className="pa-pols relative grid size-10 place-items-center rounded-xl bg-white/10">
          <img src="/assets/altitud/simbol.svg" alt="" className="h-4 w-auto" />
        </span>
        <span>
          <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#b6f13a]">● Connexió segura</span>
          <span className="mt-0.5 block text-sm text-white/80">Verificació en 2 passos activa</span>
        </span>
      </div>
    </section>
    <section className="flex items-center justify-center bg-[#f4f5f7] px-4 py-12">
      <div className="w-full max-w-md">
        <img src="/assets/altitud/altitud-logo-h.svg" alt="Altitud Digital" className="mx-auto mb-8 h-5 w-auto invert lg:hidden" />
        {children}
      </div>
    </section>
  </main>
);
