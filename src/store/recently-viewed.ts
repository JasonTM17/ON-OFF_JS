import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ViewedProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  viewedAt: string;
}

interface RecentlyViewedState {
  items: ViewedProduct[];
  addViewed: (product: Omit<ViewedProduct, "viewedAt">) => void;
  clearViewed: () => void;
}

const MAX_ITEMS = 12;

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      items: [],
      addViewed: (product) =>
        set((state) => {
          const filtered = state.items.filter((i) => i.id !== product.id);
          const item: ViewedProduct = { ...product, viewedAt: new Date().toISOString() };
          return { items: [item, ...filtered].slice(0, MAX_ITEMS) };
        }),
      clearViewed: () => set({ items: [] }),
    }),
    { name: "onoff-recently-viewed" }
  )
);
