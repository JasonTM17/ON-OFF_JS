"use client";

import Link from "next/link";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    salePrice: number | null;
    images: string | string[];
    isNew: boolean;
    isBestseller: boolean;
    variants: { id: string; size: string; color: string; colorHex: string; stock: number }[];
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [quickAdded, setQuickAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const colors = [...new Map(product.variants.map((v) => [v.color, v.colorHex])).entries()];
  const images: string[] = typeof product.images === "string"
    ? JSON.parse(product.images)
    : product.images;
  const img1 = images[0];
  const img2 = images[1] || images[0];

  // Quick-add: pick first available variant
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const variant = product.variants.find((v) => v.stock > 0);
    if (!variant) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.salePrice ?? product.price,
      image: img1 || "",
      size: variant.size,
      color: variant.color,
      colorHex: variant.colorHex,
      quantity: 1,
      slug: product.slug,
    });
    setQuickAdded(true);
    setTimeout(() => setQuickAdded(false), 1800);
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] bg-card overflow-hidden mb-3">
        {/* Primary image */}
        {img1 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img1}
            alt={product.name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              hovered ? "opacity-0" : "opacity-100"
            }`}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/40" />
        )}

        {/* Hover / secondary image */}
        {img2 && img2 !== img1 && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img2}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && <Badge variant="new">Mới</Badge>}
          {product.isBestseller && !product.isNew && (
            <Badge variant="bestseller">Bán chạy</Badge>
          )}
        </div>
        {product.salePrice && (
          <Badge variant="sale" className="absolute top-3 right-3 z-10">
            -{Math.round((1 - product.salePrice / product.price) * 100)}%
          </Badge>
        )}

        {/* Quick-add button */}
        <div
          className={`absolute bottom-0 left-0 right-0 transition-transform duration-300 ${
            hovered ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <button
            onClick={handleQuickAdd}
            className={`w-full py-3 flex items-center justify-center gap-2 text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 ${
              quickAdded
                ? "bg-muted text-background"
                : "bg-foreground text-background hover:bg-muted"
            }`}
            aria-label="Thêm vào giỏ"
          >
            <ShoppingBag size={12} />
            {quickAdded ? "Đã thêm!" : "Thêm vào giỏ"}
          </button>
        </div>
      </div>

      {/* Info */}
      <div>
        <h3 className="text-sm font-medium text-foreground line-clamp-1 mb-1 group-hover:text-muted transition-colors duration-200">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2">
          <span className="text-sm text-foreground">
            {formatPrice(product.salePrice ?? product.price)}
          </span>
          {product.salePrice && (
            <span className="text-xs text-muted/60 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Color swatches */}
        {colors.length > 0 && (
          <div className="flex gap-1.5 mt-2">
            {colors.slice(0, 6).map(([name, hex]) => (
              <span
                key={name}
                className="w-3 h-3 rounded-full border border-border shadow-sm"
                style={{ backgroundColor: hex }}
                title={name}
              />
            ))}
            {colors.length > 6 && (
              <span className="text-[10px] text-muted self-center">+{colors.length - 6}</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
