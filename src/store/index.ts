import { create } from "zustand";
import { Hero } from "@/interfaces";

export type SelectState = {
  selectedId: string;
  setSelectedId: (id: string) => void;
  clearSelectedId: () => void;
};

export interface HeroListsState {
  heroLists: Array<Hero>;
  setHeroLists: (lists: Array<Hero>) => void;
}

// 當前選擇的 Hero Id
export const useSelectStore = create<SelectState>((set) => ({
  selectedId: "",
  setSelectedId: (id) => set({ selectedId: id }),
  clearSelectedId: () => set({ selectedId: "" }),
}));

// 完整的 Hero 資料
// 補充：為達到切換 url 不重複 render HeroList， 所以以 store 儲存此資料
export const useHeroListsStore = create<HeroListsState>((set) => ({
  heroLists: [],
  setHeroLists: (lists) => set({ heroLists: lists }),
}));
