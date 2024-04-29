import { create } from "zustand";

interface SelectState {
  selectedId: string;
  setSelectedId: (id: string) => void;
  clearSelectedId: () => void;
}

interface Hero {
  id: string;
  name: string;
  image: string;
}

interface HeroListsState {
  heroLists: Array<Hero>;
  setHeroLists: (lists: Array<Hero>) => void;
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
