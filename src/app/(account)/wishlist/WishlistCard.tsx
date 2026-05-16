"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ShoppingBag, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

interface WishlistCardProps {
  itemId: string;
  productId: string;
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    salePrice: number | null;
    images: string;
    variants: { id: string; size: string; color: string; colorHex: string; stock: number }[];
  };
}

export function WishlistCard({ productId, product }: WishlistCardProps) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const [removing, setRemoving] = useState(false);
  const [quickAdded, setQuickAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const images: string[] = (() => {
    try {
      return typeof product.images === "string" ? JSON.parse(product.images) : product.images;
    } catch {
      return [];
    }
  })();

  const img1 = images[0] ?? null;
  const img2 = images[1] ?? images[0] ?? null;
  const hasSecondImage = img2 && img2 !== img1;

  const hasDiscount =
    product.salePrice !== null && product.salePrice !== undefined && product.salePrice < product.price;

  const salePercent = hasDiscount
    ? Math.round((1 - (product.salePrice as number) / product.price) * 100)
    : 0;

  async function handleRemove(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setRemoving(true);
    try {
      await fetch(`/api/wishlist?productId=${productId}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setRemoving(false);
    }
  }

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const variant = product.variants.find((v) => v.stock > 0);
    if (!variant) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.salePrice ?? product.price,
      image: img1 ?? "",
      size: variant.size,
      color: variant.color,
      colorHex: variant.colorHex,
      quantity: 1,
      slug: product.slug,
    });
    setQuickAdded(true);
    setTimeout(() => setQuickAdded(false), 1800);
  }

  const inStock = product.variants.some((v) => v.stock > 0);

  return (
    <div
      className={`group relative transition-opacity duration-300 ${removing ? "opacity-40 pointer-events-none" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Remove button */}
      <button
        onClick={handleRemove}
        disabled={removing}
        aria-label="Xóa khỏi danh sách yêu thích"
        className="absolute top-2 right-2 z-20 w-7 h-7 flex items-center justify-center bg-background/90 border border-border text-muted hover:text-foreground hover:border-foreground transition-all duration-200 opacity-0 group-hover:opacity-100 disabled:opacity-40"
      >
        {removing ? (
          <span className="block w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <X size={12} strokeWidth={1.5} />
        )}
      </button>

      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[2/3] bg-card overflow-hidden mb-3">
          {img1 ? (
            <>
              <Image
                src={img1}
                alt={product.name}
                fill
                className={`object-cover transition-opacity duration-500 ${
                  hovered && hasSecondImage ? "opacity-0" : "opacity-100"
                }`}
              />
              {hasSecondImage && (
                <Image
                  src={img2 as string}
                  alt=""
                  aria-hidden="true"
                  fill
                  className={`object-cover transition-opacity duration-500 ${
                    hovered ? "opacity-100" : "opacity-0"
                  }`}
                />
              )}
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/40 flex items-center justify-center">
              <span className="text-xs text-muted tracking-widest uppercase">ON/OFF</span>
            </div>
          )}

          {/* Sale badge */}
          {salePercent > 0 && (
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-block bg-red-600 text-white text-[10px] tracking-wider uppercase font-medium px-2 py-0.5 leading-tight">
                -{salePercent}%
              </span>
            </div>
          )}

          {/* Add to cart — slides up on hover */}
          <div
            className={`absolute bottom-0 left-0 right-0 transition-transform duration-300 ease-out ${
              hovered ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className={`w-full py-3.5 flex items-center justify-center gap-2.5 text-[10px] tracking-[0.25em] uppercase font-medium transition-colors duration-200 ${
                !inStock
                  ? "bg-muted/80 text-muted-foreground cursor-not-allowed"
                  : quickAdded
                  ? "bg-muted text-white"
                  : "bg-foreground/95 text-background hover:bg-foreground backdrop-blur-sm"
              }`}
              aria-label={inStock ? "Thêm vào giỏ" : "Hết hàng"}
            >
              <ShoppingBag size={12} />
              {!inStock ? "Hết hàng" : quickAdded ? "Đã thêm vào giỏ ✓" : "Thêm vào giỏ"}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1.5">
          <p className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-muted transition-colors duration-200 tracking-wide">
            {product.name}
          </p>
          <div className="flex items-baseline gap-2">
            <span
              className={`text-sm font-semibold tracking-wide ${
                hasDiscount ? "text-red-600" : "text-foreground"
              }`}
            >
              {formatPrice(product.salePrice ?? product.price)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-muted/50 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
