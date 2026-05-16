"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface RecentProduct {
  slug: string;
  name: string;
  image: string;
  price: number;
}

const STORAGE_KEY = "onfit-recently-viewed";
const MAX_ITEMS = 8;

export function addToRecentlyViewed(product: RecentProduct) {
  if (typeof window === "undefined") return;
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as RecentProduct[];
  const filtered = stored.filter((p) => p.slug !== product.slug);
  const updated = [product, ...filtered].slice(0, MAX_ITEMS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function RecentlyViewed() {
  const [products, setProducts] = useState<RecentProduct[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as RecentProduct[];
    setProducts(stored);
  }, []);

  if (products.length < 2) return null;

  return (
    <section className="py-16 px-6 lg:px-12 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[10px] tracking-[0.3em] uppercase text-muted mb-6 font-medium">
          Đã xem gần đây
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group shrink-0 w-32"
            >
              <div className="aspect-[2/3] bg-card overflow-hidden mb-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-xs text-foreground line-clamp-1 group-hover:text-muted transition-colors">
                {p.name}
              </p>
              <p className="text-xs text-muted mt-0.5">
                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(p.price)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
