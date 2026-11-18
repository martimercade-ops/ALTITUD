import { usePreloader } from "@/hooks/use-preloader";

let handedOver = false;
const waiting = new Set<() => void>();

export const markHandoff = () => {
  if (handedOver) return;
  handedOver = true;
  usePreloader.getState().setDone();
  waiting.forEach((listener) => listener());
  waiting.clear();
};

export const onHandoff = (listener: () => void, fallbackMs = 9000) => {
  if (handedOver) {
    listener();
    return () => {};
  }

  waiting.add(listener);
  const failsafe = window.setTimeout(() => {
    if (waiting.delete(listener)) listener();
  }, fallbackMs);

  return () => {
    waiting.delete(listener);
    window.clearTimeout(failsafe);
  };
};
