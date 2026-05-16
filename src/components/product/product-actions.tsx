"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";

interface Props {
  productId: string;
  productName: string;
  productSlug: string;
  price: number;
  image: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  variants: { size: string; color: string; colorHex: string; stock: number }[];
}

export function ProductActions({ productId, productName, productSlug, price, image, colors, sizes, variants }: Props) {
  const [selectedColor, setSelectedColor] = useState(colors[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const selectedVariant = variants.find((v) => v.color === selectedColor && v.size === selectedSize);
  const inStock = selectedVariant ? selectedVariant.stock > 0 : true;

  function handleAdd() {
    if (!selectedSize || !selectedColor) return;
    const colorHex = colors.find((c) => c.name === selectedColor)?.hex || "";
    addItem({
      productId,
      name: productName,
      slug: productSlug,
      price,
      image,
      size: selectedSize,
      color: selectedColor,
      colorHex,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div>
      {/* Color */}
      <div className="mb-6">
        <p className="text-xs tracking-wider uppercase text-muted mb-3">
          Màu sắc {selectedColor && <span className="normal-case text-foreground ml-1">— {selectedColor}</span>}
        </p>
        <div className="flex gap-2">
          {colors.map((c) => (
            <button
              key={c.name}
              onClick={() => setSelectedColor(c.name)}
              className={`w-8 h-8 rounded-full transition-all ${selectedColor === c.name ? "ring-2 ring-offset-2 ring-foreground" : "ring-1 ring-border hover:ring-muted"}`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
              aria-label={c.name}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs tracking-wider uppercase text-muted">Size</p>
          <Link
            href="/size-guide"
            className="text-xs tracking-wide underline underline-offset-2 transition-opacity hover:opacity-60"
            style={{ color: "#7A5C45" }}
          >
            Hướng dẫn chọn size
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => {
            const variantForSize = variants.find((v) => v.color === selectedColor && v.size === size);
            const sizeOutOfStock = variantForSize ? variantForSize.stock === 0 : false;
            return (
              <button
                key={size}
                onClick={() => !sizeOutOfStock && setSelectedSize(size)}
                disabled={sizeOutOfStock}
                className={`min-w-[48px] h-10 px-3 border text-sm transition-all relative ${
                  selectedSize === size
                    ? "bg-foreground text-background border-foreground"
                    : sizeOutOfStock
                    ? "border-border text-muted cursor-not-allowed opacity-40"
                    : "border-border hover:border-foreground"
                }`}
              >
                {size}
                {sizeOutOfStock && (
                  <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="absolute w-full h-px bg-current opacity-40 rotate-45" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stock status */}
      {selectedVariant && (
        <div className="mb-4 flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: inStock ? "#4A7C59" : "#C0392B" }}
          />
          <span className="text-xs tracking-wide" style={{ color: inStock ? "#4A7C59" : "#C0392B" }}>
            {inStock ? `Còn hàng${selectedVariant.stock <= 5 ? ` — chỉ còn ${selectedVariant.stock}` : ""}` : "Hết hàng"}
          </span>
        </div>
      )}

      {/* Quantity */}
      <div className="mb-6">
        <p className="text-xs tracking-wider uppercase text-muted mb-3">Số lượng</p>
        <div className="flex items-center">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 border border-border text-lg hover:border-foreground transition-colors">−</button>
          <span className="w-12 h-10 border-t border-b border-border flex items-center justify-center text-sm">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 border border-border text-lg hover:border-foreground transition-colors">+</button>
        </div>
      </div>

      {/* Add to cart */}
      <Button
        onClick={handleAdd}
        disabled={!selectedSize || !inStock}
        className={`w-full h-12 ${added ? "bg-emerald-700 hover:bg-emerald-700" : ""}`}
      >
        {added ? "Đã thêm vào giỏ ✓" : !selectedSize ? "Chọn size" : !inStock ? "Hết hàng" : "Thêm vào giỏ"}
      </Button>
    </div>
  );
}
