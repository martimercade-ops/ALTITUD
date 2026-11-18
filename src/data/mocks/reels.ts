/** Reels de clients de xarxes socials. Afegeix-hi el vídeo (mp4 vertical) i una imatge de portada. */
export interface Reel {
  client: string;
  video: string;
  poster: string;
  instagram?: string;
}

export const reels: Reel[] = [];
