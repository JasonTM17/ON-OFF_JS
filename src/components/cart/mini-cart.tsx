"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

interface MiniCartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

interface MiniCartProps {
  items: MiniCartItem[];
  open: boolean;
  onClose: () => void;
  onRemove: (id: string) => void;
}

export function MiniCart({ items, open, onClose, onRemove }: MiniCartProps) {
  const formatPrice = (n: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="text-sm font-medium tracking-wide">GIỎ HÀNG ({items.length})</h2>
              <button onClick={onClose} className="text-muted hover:text-foreground">
                <X size={18} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6">
                <ShoppingBag size={32} className="text-muted mb-4" />
                <p className="text-sm text-muted">Giỏ hàng trống</p>
                <button
                  onClick={onClose}
                  className="mt-4 text-xs text-foreground underline"
                >
                  Tiếp tục mua sắm
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-20 bg-card shrink-0 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted mt-0.5">
                          {item.size && `Size: ${item.size}`}
                          {item.size && item.color && " · "}
                          {item.color && item.color}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-sm">{formatPrice(item.price)} × {item.quantity}</p>
                          <button
                            onClick={() => onRemove(item.id)}
                            className="text-xs text-muted hover:text-red-500"
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border px-6 py-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Tạm tính</span>
                    <span className="font-medium">{formatPrice(total)}</span>
                  </div>
                  <Link
                    href="/cart"
                    onClick={onClose}
                    className="w-full h-11 bg-foreground text-background text-sm tracking-wide flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    Xem giỏ hàng
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className="w-full h-11 border border-foreground text-sm tracking-wide flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                  >
                    Thanh toán ngay
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
