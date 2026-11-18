import type { CSSProperties } from "react";

export const maskStyle = (src: string): CSSProperties => ({
  maskImage: `url(${src})`,
  maskSize: "100% 100%",
  maskRepeat: "no-repeat",
  WebkitMaskImage: `url(${src})`,
  WebkitMaskSize: "100% 100%",
  WebkitMaskRepeat: "no-repeat",
});
