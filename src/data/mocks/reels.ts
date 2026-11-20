export type Reel = {
  slug: string;
  client: string;
  sector: string;
  /** vídeo vertical 9:16 */
  video: string;
  /** millor fotograma del vídeo */
  poster: string;
  /** logo en color (public/assets/altitud/clients/color) */
  logo?: string;
};

const R = "/assets/altitud/reels";

export const reels: Reel[] = [
  { slug: "nou-aire", client: "Nou Aire", sector: "Immobiliària", video: `${R}/nou-aire.mp4`, poster: `${R}/nou-aire.webp`, logo: "nou-aire" },
  { slug: "sicoris-gestoria", client: "Sicoris Gestoria", sector: "Gestoria", video: `${R}/sicoris-gestoria.mp4`, poster: `${R}/sicoris-gestoria.webp`, logo: "sicoris-gestoria-s" },
  { slug: "erf-assegurances", client: "ERF Assegurances", sector: "Assegurances", video: `${R}/erf-assegurances.mp4`, poster: `${R}/erf-assegurances.webp`, logo: "erf-assegurances" },
  { slug: "tass-glass", client: "Tass Glass", sector: "Vidres d'automòbil", video: `${R}/tass-glass.mp4`, poster: `${R}/tass-glass.webp` },
  { slug: "auro-jardiners", client: "Auró Jardiners", sector: "Jardineria", video: `${R}/auro-jardiners.mp4`, poster: `${R}/auro-jardiners.webp`, logo: "auro-jardiners" },
  { slug: "relaxia", client: "Relaxia", sector: "Descans i matalassos", video: `${R}/relaxia.mp4`, poster: `${R}/relaxia.webp`, logo: "relaxia-r" },
];
