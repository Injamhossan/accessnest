import { create } from "zustand";

type Language = "en" | "bn";

interface LangState {
  lang: Language;
  toggleLang: () => void;
  setLang: (lang: Language) => void;
}

export const useLangStore = create<LangState>((set) => ({
  lang: "en",
  toggleLang: () => set((state) => ({ lang: state.lang === "en" ? "bn" : "en" })),
  setLang: (lang) => set({ lang }),
}));
