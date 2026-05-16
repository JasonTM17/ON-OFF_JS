"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";

interface CartSummaryProps {
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  freeShippingThreshold: number;
  itemCount: number;
}

export function CartSummary({
  subtotal,
  shippingFee,
  discount,
  total,
  freeShippingThreshold,
  itemCount,
}: CartSummaryProps) {
  const formatPrice = (n: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remaining = freeShippingThreshold - subtotal;

  return (
    <div className="border border-border p-6 sticky top-24">
      <h3 className="text-sm font-medium tracking-wide mb-6">TÓM TẮT ĐƠN HÀNG</h3>

      {remaining > 0 && (
        <div className="mb-6 pb-6 border-b border-border">
          <p className="text-xs text-muted mb-2">
            Mua thêm <span className="text-foreground font-medium">{formatPrice(remaining)}</span> để được miễn phí vận chuyển
          </p>
          <div className="h-1.5 bg-card overflow-hidden">
            <motion.div
              className="h-full bg-foreground"
              initial={{ width: 0 }}
              animate={{ width: `${progressToFreeShipping}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted">Tạm tính ({itemCount} sản phẩm)</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Phí vận chuyển</span>
          <span>{shippingFee === 0 ? "Miễn phí" : formatPrice(shippingFee)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-accent">
            <span>Giảm giá</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-4 pt-4 border-t border-border">
        <span className="font-medium">Tổng cộng</span>
        <span className="text-lg font-medium">{formatPrice(total)}</span>
      </div>

      <Link
        href="/checkout"
        className="mt-6 w-full h-12 bg-foreground text-background text-sm tracking-wide flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
      >
        Thanh toán
        <ArrowRight size={14} />
      </Link>

      <Link
        href="/products"
        className="mt-3 w-full h-10 border border-border text-sm text-muted flex items-center justify-center gap-2 hover:text-foreground hover:border-foreground transition-colors"
      >
        Tiếp tục mua sắm
      </Link>
    </div>
  );
}
