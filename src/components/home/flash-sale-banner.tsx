"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame } from "lucide-react";
import Link from "next/link";

interface FlashSaleProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice: number;
  image: string;
  soldPercent: number;
}

interface FlashSaleBannerProps {
  endTime: Date;
  products: FlashSaleProduct[];
}

export function FlashSaleBanner({ endTime, products }: FlashSaleBannerProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = endTime.getTime() - Date.now();
      if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };
      return {
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };
    setTimeLeft(calc());
    const timer = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

  return (
    <section className="py-8 bg-card">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Flame size={20} className="text-accent" />
            <h2 className="font-serif text-xl">Flash Sale</h2>
            <div className="flex items-center gap-1 ml-4">
              {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((v, i) => (
                <span key={i} className="flex items-center gap-1">
                  <span className="w-8 h-8 bg-foreground text-background text-xs font-medium flex items-center justify-center">
                    {String(v).padStart(2, "0")}
                  </span>
                  {i < 2 && <span className="text-foreground text-xs">:</span>}
                </span>
              ))}
            </div>
          </div>
          <Link href="/products?sale=true" className="text-xs text-muted hover:text-foreground transition-colors">
            Xem tất cả
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group block border border-border hover:border-foreground/30 transition-colors"
            >
              <div className="aspect-[2/3] overflow-hidden bg-background">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-2.5">
                <p className="text-xs line-clamp-1 text-foreground">{product.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-medium text-accent">{formatPrice(product.salePrice)}</span>
                  <span className="text-[10px] text-muted line-through">{formatPrice(product.price)}</span>
                </div>
                <div className="mt-2 h-1.5 bg-border overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all"
                    style={{ width: `${product.soldPercent}%` }}
                  />
                </div>
                <p className="text-[10px] text-muted mt-1">Đã bán {product.soldPercent}%</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
