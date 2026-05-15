"use client";

import { create } from "zustand";

interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  price: number;
  salePrice: number | null;
  image: string;
  createdAt: string;
}

interface WishlistStore {
  items: WishlistItem[];
  loading: boolean;
  fetchWishlist: () => Promise<void>;
  addItem: (productId: string) => Promise<boolean>;
  removeItem: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  loading: false,

  fetchWishlist: async () => {
    set({ loading: true });
    try {
      const res = await fetch("/api/wishlist");
      if (res.ok) {
        const data = await res.json();
        set({ items: data.items });
      }
    } finally {
      set({ loading: false });
    }
  },

  addItem: async (productId) => {
    const res = await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    if (res.ok) {
      await get().fetchWishlist();
      return true;
    }
    return false;
  },

  removeItem: async (productId) => {
    const res = await fetch(`/api/wishlist?productId=${productId}`, { method: "DELETE" });
    if (res.ok) {
      set({ items: get().items.filter((i) => i.productId !== productId) });
    }
  },

  isInWishlist: (productId) => get().items.some((i) => i.productId === productId),
}));
