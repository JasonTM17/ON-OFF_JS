"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface AddToCartSuccessProps {
  visible: boolean;
  onClose: () => void;
  product: {
    name: string;
    image: string;
    size: string;
    color: string;
    price: number;
  } | null;
}

export function AddToCartSuccess({ visible, onClose, product }: AddToCartSuccessProps) {
  if (!product) return null;

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-foreground/10 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-4 right-4 z-50 w-80 bg-background border border-border shadow-xl"
            initial={{ opacity: 0, x: 50, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                  <Check size={12} className="text-green-600" />
                </div>
                <span className="text-sm font-medium text-foreground">Đã thêm vào giỏ hàng</span>
                <button
                  onClick={onClose}
                  className="ml-auto p-1 text-muted hover:text-foreground transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="flex gap-3">
                <div className="relative w-16 h-20 shrink-0">
                  <Image src={product.image} alt={product.name} width={64} height={80} className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground line-clamp-2">{product.name}</p>
                  <p className="text-xs text-muted mt-1">{product.size} · {product.color}</p>
                  <p className="text-sm font-medium text-foreground mt-1">{formatPrice(product.price)}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={onClose}
                  className="flex-1 h-9 border border-border text-xs tracking-[0.1em] uppercase text-foreground hover:bg-card transition-colors"
                >
                  Tiếp tục mua
                </button>
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="flex-1 h-9 bg-foreground text-background text-xs tracking-[0.1em] uppercase flex items-center justify-center gap-1.5 hover:bg-muted transition-colors"
                >
                  <ShoppingBag size={12} />
                  Giỏ hàng
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
