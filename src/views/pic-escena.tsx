import { RIDGES } from "@/data/ridges";

/** Serralada en capes (sense fons) amb el pic principal i la línia de llum del capvespre */
export const PicEscena = () => (
  <div aria-hidden="true" className="pic-escena pointer-events-none absolute inset-0 -z-[1] overflow-hidden">
    <span className="pic-sol" />
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="pic-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a4f86" stopOpacity="0.55" />
          <stop offset="1" stopColor="#0b1424" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="pic-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#24345e" />
          <stop offset="1" stopColor="#0b1424" />
        </linearGradient>
        <linearGradient id="pic-peak" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1a2647" />
          <stop offset="0.45" stopColor="#0e1830" />
          <stop offset="1" stopColor="#070d1a" />
        </linearGradient>
        <linearGradient id="pic-llum" gradientUnits="userSpaceOnUse" x1="120" y1="0" x2="740" y2="0">
          <stop offset="0" stopColor="#ff9a4d" stopOpacity="0" />
          <stop offset="0.25" stopColor="#ffb36b" />
          <stop offset="0.45" stopColor="#ffe3a3" />
          <stop offset="0.65" stopColor="#b6f13a" />
          <stop offset="1" stopColor="#2f5bff" stopOpacity="0" />
        </linearGradient>
        <filter id="pic-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g className="pic-capa pic-capa--1"><path d={RIDGES.back.fill} fill="url(#pic-back)" /></g>
      <g className="pic-capa pic-capa--2"><path d={RIDGES.mid.fill} fill="url(#pic-mid)" /></g>
      <g className="pic-capa pic-capa--3">
        <path d={RIDGES.peak.fill} fill="url(#pic-peak)" />
        <path className="pic-linia" d={RIDGES.peak.line} pathLength={1} fill="none" stroke="url(#pic-llum)" strokeWidth="2.2" filter="url(#pic-glow)" />
        <circle className="pic-cim" cx="392" cy="250" r="5" fill="#b6f13a" />
      </g>
      <g className="pic-capa pic-capa--4"><path d={RIDGES.front.fill} fill="#060b16" /></g>
    </svg>
    <span className="pic-boira" />
  </div>
);
