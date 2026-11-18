import { create } from "zustand";

interface PreloaderState {
  done: boolean;
  setDone: () => void;
}

export const usePreloader = create<PreloaderState>((set) => ({
  done: false,
  setDone: () => set({ done: true }),
}));
