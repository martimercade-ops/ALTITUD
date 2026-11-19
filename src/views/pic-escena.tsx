/** Estany del Pirineu sense cel: muntanyes i llac sobre la nit, amb llum de capvespre a la carena */
export const PicEscena = () => (
  <div aria-hidden="true" className="llac-escena pointer-events-none absolute inset-0 -z-[1] overflow-hidden">
    <span className="llac-sol" />
    <div className="llac-foto">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/altitud/llac-pirineu.webp"
        srcSet="/assets/altitud/llac-pirineu-600.webp 600w, /assets/altitud/llac-pirineu.webp 1162w"
        sizes="(max-width: 1024px) 100vw, 55vw"
        alt=""
        loading="lazy"
        decoding="async"
      />
      <span className="llac-reflex" />
    </div>
  </div>
);
