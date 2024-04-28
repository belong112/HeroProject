import { create } from "zustand";

interface SelectState {
  selectedId: string;
  setSelectedId: (id: string) => void;
  clearSelectedId: () => void;
}

interface HeroListsState {
  heroLists: Array<Object>;
  setHeroLists: (lists: Array<Object>) => void;
}

export const useSelectStore = create<SelectState>((set) => ({
  selectedId: "",
  setSelectedId: (id) => set({ selectedId: id }),
  clearSelectedId: () => set({ selectedId: "" }),
}));

export const useHeroListsStore = create<HeroListsState>((set) => ({
  heroLists: [],
  setHeroLists: (lists) => set({ heroLists: lists }),
}));
