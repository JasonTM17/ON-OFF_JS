"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag, ArrowRight, Lock, Truck, RotateCcw, Headphones } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-[65vh] flex flex-col items-center justify-center px-4 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6">
          <ShoppingBag size={28} className="text-muted" strokeWidth={1.5} />
        </div>
        <p className="font-serif text-3xl mb-3">Giỏ hàng trống</p>
        <p className="text-muted text-sm mb-8">Khám phá bộ sưu tập của chúng tôi</p>
        <Button asChild>
          <Link href="/products">Mua sắm ngay</Link>
        </Button>
      </div>
    );
  }

  const total = totalPrice();
  const shipping = total >= 500000 ? 0 : 30000;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-baseline gap-3 mb-8">
        <h1 className="font-serif text-3xl">Giỏ hàng</h1>
        <span className="text-sm text-muted">({items.length} sản phẩm)</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items */}
        <div className="lg:col-span-2">
          <div className="space-y-0 divide-y divide-border">
            {items.map((item) => (
              <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-5 py-6 first:pt-0">
                {/* Image */}
                <Link href={`/products/${item.slug}`} className="shrink-0">
                  <div className="w-24 h-32 bg-gradient-to-br from-accent/15 to-accent/35 overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    ) : null}
                  </div>
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link href={`/products/${item.slug}`} className="text-sm font-medium hover:text-muted transition-colors line-clamp-1">
                        {item.name}
                      </Link>
                      <p className="text-xs text-muted mt-1.5 flex items-center gap-1.5">
                        <span className="inline-block w-3 h-3 rounded-full border border-border shadow-sm" style={{ backgroundColor: item.colorHex }} />
                        {item.color} · Size {item.size}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId, item.size, item.color)}
                      className="text-muted/50 hover:text-red-600 transition-colors p-1"
                      aria-label="Xóa"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity */}
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                        className="w-8 h-8 border border-border text-sm hover:border-foreground transition-colors flex items-center justify-center"
                      >
                        −
                      </button>
                      <span className="w-10 h-8 border-t border-b border-border flex items-center justify-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                        className="w-8 h-8 border border-border text-sm hover:border-foreground transition-colors flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
            <button onClick={clearCart} className="text-xs text-muted hover:text-foreground transition-colors underline underline-offset-4">
              Xóa tất cả
            </button>
            <Link href="/products" className="text-xs text-muted hover:text-foreground transition-colors underline underline-offset-4">
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-24 self-start">
          <div className="bg-card p-6 border border-border">
            <h2 className="font-serif text-xl mb-6">Tóm tắt đơn hàng</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted">
                <span>Tạm tính</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Vận chuyển</span>
                <span>{shipping === 0 ? <span className="text-emerald-700">Miễn phí</span> : formatPrice(shipping)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-[11px] text-muted/70">Miễn phí vận chuyển cho đơn từ {formatPrice(500000)}</p>
              )}
              <div className="border-t border-border pt-4 mt-4 flex justify-between font-serif text-xl">
                <span>Tổng</span>
                <span>{formatPrice(total + shipping)}</span>
              </div>
            </div>

            <Button asChild className="w-full mt-6 h-12 group">
              <Link href="/checkout">
                Thanh toán
                <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-muted">
            <div className="flex items-center gap-1.5 p-2 bg-white border border-border">
              <Lock size={12} strokeWidth={1.5} /> Thanh toán an toàn
            </div>
            <div className="flex items-center gap-1.5 p-2 bg-white border border-border">
              <Truck size={12} strokeWidth={1.5} /> Giao 2-5 ngày
            </div>
            <div className="flex items-center gap-1.5 p-2 bg-white border border-border">
              <RotateCcw size={12} strokeWidth={1.5} /> Đổi trả 30 ngày
            </div>
            <div className="flex items-center gap-1.5 p-2 bg-white border border-border">
              <Headphones size={12} strokeWidth={1.5} /> Hỗ trợ 24/7
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
