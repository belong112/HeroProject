import { create } from "zustand";

interface HeroState {
  selectedId: string;
  setSelectedId: (id: string) => void;
  clearSelectedId: () => void;
}

export const useStore = create<HeroState>((set) => ({
  selectedId: "",
  setSelectedId: (id) => set({ selectedId: id }),
  clearSelectedId: () => set({ selectedId: "" }),
}));
