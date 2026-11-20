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
];
