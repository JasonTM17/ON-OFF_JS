"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Heart, Eye } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { QuickViewModal } from "@/components/product/quick-view-modal";

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
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { isInWishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  const wishlisted = isInWishlist(product.id);

  const colors = [...new Map(product.variants.map((v) => [v.color, v.colorHex])).entries()];
  const images: string[] = typeof product.images === "string"
    ? JSON.parse(product.images)
    : product.images;
  const img1 = images[0];
  const img2 = images[1] || images[0];
  const hasSecondImage = img2 && img2 !== img1;

  const salePercent = product.salePrice
    ? Math.round((1 - product.salePrice / product.price) * 100)
    : 0;

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

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  const handleAddToCartFromModal = (productId: string, size: string, color: string) => {
    const variant = product.variants.find(
      (v) => (size ? v.size === size : true) && (color ? v.color === color : true) && v.stock > 0
    ) ?? product.variants.find((v) => v.stock > 0);
    if (!variant) return;
    addItem({
      productId,
      name: product.name,
      price: product.salePrice ?? product.price,
      image: img1 || "",
      size: variant.size,
      color: variant.color,
      colorHex: variant.colorHex,
      quantity: 1,
      slug: product.slug,
    });
    setQuickViewOpen(false);
  };

  return (
    <>
    <Link
      href={`/products/${product.slug}`}
      className="group block product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-[2/3] bg-card overflow-hidden mb-4">
        {/* Primary image */}
        {img1 ? (
          <Image
            src={img1}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className={`object-cover transition-opacity duration-500 ${
              hovered && hasSecondImage ? "opacity-0" : "opacity-100"
            }`}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/40" />
        )}

        {/* Secondary image on hover */}
        {hasSecondImage && (
          <Image
            src={img2}
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className={`object-cover transition-opacity duration-500 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Badges — top left stack */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && <Badge variant="new">Mới</Badge>}
          {product.isBestseller && !product.isNew && (
            <Badge variant="bestseller">Bán chạy</Badge>
          )}
          {salePercent > 0 && (
            <span className="inline-block bg-red-600 text-white text-xs tracking-wider uppercase font-medium px-2 py-0.5 leading-tight">
              -{salePercent}%
            </span>
          )}
        </div>

        {/* Wishlist button — top right */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 z-20 min-w-[44px] min-h-[44px] flex items-center justify-center transition-all duration-300 ${
            hovered || wishlisted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
          }`}
          aria-label={wishlisted ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
        >
          <Heart
            size={17}
            className={`transition-all duration-200 drop-shadow-sm ${
              wishlisted
                ? "fill-red-500 stroke-red-500"
                : "fill-white/60 stroke-foreground/80 hover:fill-red-100 hover:stroke-red-400"
            }`}
          />
        </button>

        {/* Quick-add + quick-view buttons — slides up from bottom */}
        <div
          className={`absolute bottom-0 left-0 right-0 transition-transform duration-300 ease-out flex ${
            hovered ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <button
            onClick={handleQuickAdd}
            className={`flex-1 py-3.5 flex items-center justify-center gap-2.5 text-[10px] tracking-[0.25em] uppercase font-medium transition-colors duration-200 ${
              quickAdded
                ? "bg-muted text-white"
                : "bg-foreground/95 text-background hover:bg-foreground backdrop-blur-sm"
            }`}
            aria-label="Thêm vào giỏ"
          >
            <ShoppingBag size={12} />
            {quickAdded ? "Đã thêm vào giỏ ✓" : "Thêm vào giỏ"}
          </button>
          <button
            onClick={handleQuickView}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center bg-foreground/80 text-background hover:bg-foreground transition-colors duration-200 backdrop-blur-sm border-l border-background/20"
            aria-label="Xem nhanh"
          >
            <Eye size={14} />
          </button>
        </div>
      </div>

      {/* Product info */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-muted transition-colors duration-200 tracking-wide">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span
            className={`text-sm font-semibold tracking-wide ${
              product.salePrice ? "text-red-600" : "text-foreground"
            }`}
          >
            {formatPrice(product.salePrice ?? product.price)}
          </span>
          {product.salePrice && (
            <span className="text-xs text-muted/50 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Color swatches */}
        {colors.length > 0 && (
          <div className="flex gap-1.5 pt-0.5">
            {colors.slice(0, 6).map(([name, hex]) => (
              <span
                key={name}
                className="w-5 h-5 rounded-full border border-border shadow-sm transition-transform duration-150 hover:scale-125"
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
    <QuickViewModal
      product={quickViewOpen ? {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        salePrice: product.salePrice ?? undefined,
        images,
        sizes: [...new Set(product.variants.map((v) => v.size))],
        colors: [...new Map(product.variants.map((v) => [v.color, { name: v.color, hex: v.colorHex }])).values()],
      } : null}
      onClose={() => setQuickViewOpen(false)}
      onAddToCart={handleAddToCartFromModal}
    />
    </>
  );
}
