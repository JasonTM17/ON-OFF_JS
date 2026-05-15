"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProductCardCompactProps {
  product: {
    slug: string;
    name: string;
    price: number;
    salePrice?: number | null;
    image: string;
  };
}

export function ProductCardCompact({ product }: ProductCardCompactProps) {
  const formatPrice = (n: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex items-center gap-3 p-3 border border-border hover:border-foreground/50 transition-colors"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.image}
        alt={product.name}
        className="w-14 h-18 object-cover shrink-0 group-hover:scale-105 transition-transform duration-300"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground line-clamp-1 group-hover:text-muted transition-colors">
          {product.name}
        </p>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-sm font-medium text-foreground">
            {formatPrice(product.salePrice ?? product.price)}
          </span>
          {product.salePrice && (
            <span className="text-xs text-muted/60 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
      <ArrowRight size={14} className="text-muted group-hover:text-foreground shrink-0 transition-colors" />
    </Link>
  );
}
