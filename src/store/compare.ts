import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CompareProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  category: string;
}

interface CompareState {
  items: CompareProduct[];
  addToCompare: (product: CompareProduct) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCompare: (product) =>
        set((state) => {
          if (state.items.length >= 4) return state;
          if (state.items.find((i) => i.id === product.id)) return state;
          return { items: [...state.items, product] };
        }),
      removeFromCompare: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      clearCompare: () => set({ items: [] }),
      isInCompare: (id) => get().items.some((i) => i.id === id),
    }),
    { name: "onoff-compare" }
  )
);
