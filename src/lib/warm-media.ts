export interface WarmProgress {
  done: number;
  total: number;
}

const willRender = (img: HTMLImageElement) =>
  img.offsetWidth > 0 || img.offsetHeight > 0;

const whenLaidOut = (timeoutMs: number): Promise<void> =>
  new Promise((resolve) => {
    const deadline = performance.now() + timeoutMs;
    const check = () => {
      if (
        document.body.scrollHeight > window.innerHeight ||
        performance.now() >= deadline
      ) {
        resolve();
        return;
      }
      window.requestAnimationFrame(check);
    };
    window.requestAnimationFrame(check);
  });

const whenReady = (img: HTMLImageElement): Promise<unknown> => {
  if (typeof img.decode === "function") return img.decode();
  if (img.complete) return Promise.resolve();
  return new Promise<void>((resolve) => {
    img.addEventListener("load", () => resolve(), { once: true });
    img.addEventListener("error", () => resolve(), { once: true });
  });
};

const WARMED = "data-warmed";

const SWEEPS = 3;

const IN_FLIGHT = 4;

export const warmMedia = async (
  onProgress?: (progress: WarmProgress) => void,
  budgetMs = 6000,
): Promise<void> => {
  if (typeof document === "undefined") return;

  const deadline = performance.now() + budgetMs;
  let done = 0;
  let total = 0;

  const sweep = async (): Promise<number> => {
    const fresh = Array.from(document.querySelectorAll("img")).filter(
      (img) => !img.hasAttribute(WARMED) && willRender(img),
    );
    if (!fresh.length) return 0;

    total += fresh.length;
    onProgress?.({ done, total });

    for (let i = 0; i < fresh.length; i += IN_FLIGHT) {
      if (performance.now() >= deadline) break;
      await Promise.all(
        fresh.slice(i, i + IN_FLIGHT).map((img) => {
          img.setAttribute(WARMED, "");
          if (img.loading === "lazy") {
            img.loading = "eager";
            img.setAttribute("fetchpriority", "low");
          }
          return whenReady(img)
            .catch(() => {})
            .then(() => {
              done += 1;
              onProgress?.({ done, total });
            });
        }),
      );
    }
    return fresh.length;
  };

  const work = (async () => {
    await whenLaidOut(Math.min(budgetMs, 2000));
    for (let pass = 0; pass < SWEEPS; pass += 1) {
      const found = await sweep();
      if (!found || performance.now() >= deadline) break;
    }
  })();

  await Promise.race([
    work,
    new Promise<void>((resolve) =>
      window.setTimeout(resolve, Math.max(0, deadline - performance.now())),
    ),
  ]);
};
