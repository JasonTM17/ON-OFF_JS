"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Eye } from "lucide-react";
import Link from "next/link";

interface QuickViewProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
}

interface QuickViewModalProps {
  product: QuickViewProduct | null;
  onClose: () => void;
  onAddToCart: (productId: string, size: string, color: string) => void;
}

export function QuickViewModal({ product, onClose, onAddToCart }: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [currentImage, setCurrentImage] = useState(0);

  if (!product) return null;

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-background border border-border max-w-3xl w-full max-h-[85vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative aspect-[2/3] bg-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.images[currentImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === currentImage ? "bg-foreground" : "bg-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 flex flex-col">
              <Link
                href={`/products/${product.slug}`}
                className="font-serif text-lg hover:underline"
                onClick={onClose}
              >
                {product.name}
              </Link>

              <div className="mt-2 flex items-center gap-2">
                {product.salePrice ? (
                  <>
                    <span className="text-sm font-medium text-accent">{formatPrice(product.salePrice)}</span>
                    <span className="text-xs text-muted line-through">{formatPrice(product.price)}</span>
                  </>
                ) : (
                  <span className="text-sm font-medium">{formatPrice(product.price)}</span>
                )}
              </div>

              {product.colors.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs text-muted mb-2">Màu sắc</p>
                  <div className="flex gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.hex}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-colors ${
                          selectedColor === c.name ? "border-foreground" : "border-transparent"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {product.sizes.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs text-muted mb-2">Kích thước</p>
                  <div className="flex gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`w-10 h-10 flex items-center justify-center text-xs border transition-colors ${
                          selectedSize === s
                            ? "border-foreground bg-foreground text-background"
                            : "border-border hover:border-foreground"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-auto pt-6 space-y-3">
                <button
                  onClick={() => {
                    if (selectedSize || product.sizes.length === 0) {
                      onAddToCart(product.id, selectedSize, selectedColor);
                    }
                  }}
                  disabled={product.sizes.length > 0 && !selectedSize}
                  className="w-full h-11 bg-foreground text-background text-sm tracking-wide flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-40"
                >
                  <ShoppingBag size={14} />
                  Thêm vào giỏ
                </button>
                <Link
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                  className="w-full h-11 border border-border text-sm tracking-wide flex items-center justify-center gap-2 hover:border-foreground transition-colors"
                >
                  <Eye size={14} />
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
