"use client";

import { motion } from "framer-motion";
import { Trash2, Minus, Plus } from "lucide-react";
import Link from "next/link";

interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  size?: string;
  color?: string;
  quantity: number;
}

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItemRow({ item, onUpdateQuantity, onRemove }: CartItemRowProps) {
  const formatPrice = (n: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

  return (
    <motion.div
      className="flex gap-4 py-4 border-b border-border"
      layout
      exit={{ opacity: 0, x: -20 }}
    >
      <Link href={`/products/${item.slug}`} className="shrink-0">
        <div className="w-20 h-24 bg-card overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>
      </Link>

      <div className="flex-1 min-w-0">
        <Link href={`/products/${item.slug}`} className="text-sm text-foreground hover:underline line-clamp-1">
          {item.name}
        </Link>
        <div className="flex items-center gap-2 mt-1">
          {item.size && <span className="text-xs text-muted">Size: {item.size}</span>}
          {item.color && <span className="text-xs text-muted">Màu: {item.color}</span>}
        </div>
        <p className="text-sm font-medium mt-2">{formatPrice(item.price)}</p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-border">
            <button
              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
              className="w-8 h-8 flex items-center justify-center text-muted hover:text-foreground"
            >
              <Minus size={12} />
            </button>
            <span className="w-8 text-center text-xs">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, Math.min(10, item.quantity + 1))}
              className="w-8 h-8 flex items-center justify-center text-muted hover:text-foreground"
            >
              <Plus size={12} />
            </button>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className="text-muted hover:text-red-500 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
      </div>
    </motion.div>
  );
}
