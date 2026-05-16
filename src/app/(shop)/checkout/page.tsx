"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Loader2, CheckCircle, ChevronDown, Tag, X } from "lucide-react";

interface AppliedCoupon {
  code: string;
  discount: number;
  type: string;
  discountAmount: number;
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullName: "", phone: "", email: "",
    province: "", district: "", ward: "", street: "",
    paymentMethod: "COD" as "COD" | "BANK_TRANSFER",
    note: "",
  });

  // Coupon state
  const [couponOpen, setCouponOpen] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);

  const total = totalPrice();
  const shipping = total >= 500000 ? 0 : 30000;
  const discount = appliedCoupon?.discountAmount ?? 0;
  const grandTotal = total + shipping - discount;

  if (items.length === 0 && !submitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <p className="font-serif text-3xl mb-4">Giỏ hàng trống</p>
        <Button asChild><Link href="/products">Mua sắm ngay</Link></Button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
          <CheckCircle size={28} className="text-emerald-700" strokeWidth={1.5} />
        </div>
        <h1 className="font-serif text-3xl mb-3">Đặt hàng thành công!</h1>
        <p className="text-muted text-sm mb-8 max-w-md">Cảm ơn bạn đã mua hàng. Chúng tôi sẽ liên hệ xác nhận đơn hàng trong thời gian sớm nhất.</p>
        <Button asChild><Link href="/products">Tiếp tục mua sắm</Link></Button>
      </div>
    );
  }

  async function handleApplyCoupon() {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setCouponError("");
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponInput.trim(), orderTotal: total }),
      });
      const data = await res.json();
      if (res.ok) {
        setAppliedCoupon(data as AppliedCoupon);
        setCouponInput("");
        setCouponOpen(false);
      } else {
        setCouponError(data.error || "Mã giảm giá không hợp lệ");
      }
    } catch {
      setCouponError("Lỗi kết nối. Vui lòng thử lại.");
    } finally {
      setCouponLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
          })),
          email: form.email,
          address: {
            fullName: form.fullName,
            phone: form.phone,
            province: form.province,
            district: form.district,
            ward: form.ward,
            street: form.street,
          },
          paymentMethod: form.paymentMethod,
          note: form.note,
        }),
      });
      if (res.ok) {
        clearCart();
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || "Đặt hàng thất bại. Vui lòng thử lại.");
      }
    } catch {
      setError("Lỗi kết nối. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl mb-8">Thanh toán</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Contact */}
          <section>
            <h2 className="text-sm font-medium tracking-wider uppercase mb-4">Thông tin liên hệ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input placeholder="Họ và tên *" required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
              <Input placeholder="Số điện thoại *" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <Input placeholder="Email" type="email" className="sm:col-span-2" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
          </section>

          {/* Address */}
          <section>
            <h2 className="text-sm font-medium tracking-wider uppercase mb-4">Địa chỉ giao hàng</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input placeholder="Tỉnh/Thành phố *" required value={form.province} onChange={(e) => setForm({ ...form, province: e.target.value })} />
              <Input placeholder="Quận/Huyện *" required value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} />
              <Input placeholder="Phường/Xã *" required value={form.ward} onChange={(e) => setForm({ ...form, ward: e.target.value })} />
              <Input placeholder="Số nhà, đường *" required value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} />
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="text-sm font-medium tracking-wider uppercase mb-4">Phương thức thanh toán</h2>
            <div className="space-y-3">
              {[
                { value: "COD" as const, label: "Thanh toán khi nhận hàng (COD)" },
                { value: "BANK_TRANSFER" as const, label: "Chuyển khoản ngân hàng" },
              ].map((method) => (
                <label key={method.value} className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors ${form.paymentMethod === method.value ? "border-foreground" : "border-border hover:border-muted"}`}>
                  <input type="radio" name="payment" value={method.value} checked={form.paymentMethod === method.value} onChange={() => setForm({ ...form, paymentMethod: method.value })} className="accent-foreground" />
                  <span className="text-sm">{method.label}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Note */}
          <section>
            <h2 className="text-sm font-medium tracking-wider uppercase mb-4">Ghi chú</h2>
            <textarea
              placeholder="Ghi chú cho đơn hàng (tùy chọn)"
              className="w-full h-24 border border-border px-4 py-3 text-sm bg-transparent resize-none focus:outline-none focus:border-foreground"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
            />
          </section>
        </div>

        {/* Order summary */}
        <div className="lg:sticky lg:top-24 self-start">
          <h2 className="font-serif text-xl mb-6">Đơn hàng ({items.length} sản phẩm)</h2>
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3">
                <div className="w-14 h-[84px] bg-accent/20 shrink-0 overflow-hidden">
                  {item.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm line-clamp-1">{item.name}</p>
                  <p className="text-xs text-muted">{item.color} · {item.size} · x{item.quantity}</p>
                </div>
                <span className="text-sm">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          {/* Coupon section */}
          <div className="border-t border-border pt-4">
            {appliedCoupon ? (
              <div className="flex items-center justify-between text-sm py-2 px-3 bg-accent/10 border border-border">
                <div className="flex items-center gap-2">
                  <Tag size={14} className="text-foreground" />
                  <span className="font-medium">{appliedCoupon.code}</span>
                  <span className="text-muted">
                    {appliedCoupon.type === "PERCENT"
                      ? `(-${appliedCoupon.discount}%)`
                      : ""}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-foreground">-{formatPrice(appliedCoupon.discountAmount)}</span>
                  <button
                    type="button"
                    onClick={() => setAppliedCoupon(null)}
                    className="text-muted hover:text-foreground transition-colors"
                    aria-label="Xóa mã giảm giá"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={() => { setCouponOpen((o) => !o); setCouponError(""); }}
                  className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors w-full py-2"
                >
                  <Tag size={14} />
                  <span>Mã giảm giá</span>
                  <ChevronDown
                    size={14}
                    className={`ml-auto transition-transform duration-200 ${couponOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {couponOpen && (
                  <div className="mt-2 space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Nhập mã giảm giá"
                        value={couponInput}
                        onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponError(""); }}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleApplyCoupon(); } }}
                        className="flex-1 h-9 text-sm"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={couponLoading || !couponInput.trim()}
                        onClick={handleApplyCoupon}
                        className="h-9 px-4 shrink-0"
                      >
                        {couponLoading ? <Loader2 size={14} className="animate-spin" /> : "Áp dụng"}
                      </Button>
                    </div>
                    {couponError && (
                      <p className="text-xs text-red-600">{couponError}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="border-t border-border pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-muted"><span>Tạm tính</span><span>{formatPrice(total)}</span></div>
            <div className="flex justify-between text-muted"><span>Vận chuyển</span><span>{shipping === 0 ? "Miễn phí" : formatPrice(shipping)}</span></div>
            {discount > 0 && (
              <div className="flex justify-between text-muted"><span>Giảm giá</span><span>-{formatPrice(discount)}</span></div>
            )}
            <div className="border-t border-border pt-3 flex justify-between font-serif text-lg"><span>Tổng</span><span>{formatPrice(grandTotal)}</span></div>
          </div>
          <Button type="submit" disabled={isLoading} className="w-full mt-6 h-12 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Đang xử lý...
              </>
            ) : (
              "Đặt hàng"
            )}
          </Button>
          {error && (
            <p className="text-sm text-red-600 mt-3 text-center">{error}</p>
          )}
        </div>
      </form>
    </div>
  );
}
