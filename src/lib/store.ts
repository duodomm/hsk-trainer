import { create } from "zustand";
import { persist } from "zustand/middleware";

type VisibilityState = {
  showHanzi: boolean;
  showPinyin: boolean;
  showTranslation: boolean;
  toggleHanzi: () => void;
  togglePinyin: () => void;
  toggleTranslation: () => void;
};

export const useVisibility = create<VisibilityState>()(
  persist(
    (set) => ({
      showHanzi: true,
      showPinyin: true,
      showTranslation: true,
      toggleHanzi: () => set((s) => ({ showHanzi: !s.showHanzi })),
      togglePinyin: () => set((s) => ({ showPinyin: !s.showPinyin })),
      toggleTranslation: () => set((s) => ({ showTranslation: !s.showTranslation })),
    }),
    { name: "hsk-visibility" },
  ),
);
