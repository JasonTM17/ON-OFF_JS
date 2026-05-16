import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Chi tiết đơn hàng",
  description: "Xem chi tiết và theo dõi trạng thái đơn hàng của bạn tại ON/OFF.",
  robots: { index: false, follow: false },
};

const STATUS_STEPS = [
  { key: "PENDING", label: "Chờ xác nhận" },
  { key: "CONFIRMED", label: "Đã xác nhận" },
  { key: "SHIPPING", label: "Đang giao hàng" },
  { key: "DELIVERED", label: "Đã giao hàng" },
  { key: "CANCELLED", label: "Đã hủy" },
];

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Chờ xác nhận",
  CONFIRMED: "Đã xác nhận",
  SHIPPING: "Đang giao hàng",
  DELIVERED: "Đã giao hàng",
  CANCELLED: "Đã hủy",
};

function getStepIndex(status: string) {
  const idx = STATUS_STEPS.findIndex((s) => s.key === status);
  return idx === -1 ? 0 : idx;
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const { id } = await params;

  const order = await db.order.findUnique({
    where: { id },
    include: {
      items: { include: { product: true } },
      address: true,
    },
  });

  if (!order) notFound();
  if (order.userId !== session.userId && session.role !== "ADMIN") notFound();

  const isCancelled = order.status === "CANCELLED";
  const currentStep = getStepIndex(order.status);
  const timelineSteps = STATUS_STEPS.filter((s) => s.key !== "CANCELLED");

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/account" className="text-sm text-muted hover:text-foreground">
          ← Tài khoản
        </Link>
        <span className="text-muted">/</span>
        <span className="text-sm font-mono">#{order.id.slice(0, 8)}</span>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl">Chi tiết đơn hàng</h1>
        <span
          className={`text-xs px-3 py-1 font-medium ${
            isCancelled
              ? "bg-red-100 text-red-700"
              : order.status === "DELIVERED"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {STATUS_LABELS[order.status] ?? order.status}
        </span>
      </div>

      {/* Status timeline */}
      {!isCancelled && (
        <div className="border border-border p-6 mb-8">
          <h2 className="text-xs font-medium tracking-wider uppercase mb-6 text-muted">
            Trạng thái đơn hàng
          </h2>
          <div className="relative flex items-start justify-between">
            {/* Progress bar */}
            <div className="absolute top-3 left-0 right-0 h-px bg-border" />
            <div
              className="absolute top-3 left-0 h-px bg-foreground transition-all duration-500"
              style={{
                width:
                  currentStep === 0
                    ? "0%"
                    : `${(currentStep / (timelineSteps.length - 1)) * 100}%`,
              }}
            />

            {timelineSteps.map((step, idx) => {
              const done = idx <= currentStep;
              return (
                <div key={step.key} className="relative flex flex-col items-center gap-2 z-10">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs transition-colors ${
                      done
                        ? "bg-foreground border-foreground text-background"
                        : "bg-background border-border text-muted"
                    }`}
                  >
                    {done ? "✓" : idx + 1}
                  </div>
                  <span
                    className={`text-xs text-center max-w-[72px] leading-tight ${
                      done ? "text-foreground font-medium" : "text-muted"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Order items */}
      <div className="border border-border mb-6">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-xs font-medium tracking-wider uppercase text-muted">
            Sản phẩm ({order.items.length})
          </h2>
        </div>
        <div className="divide-y divide-border">
          {order.items.map((item) => {
            const images = JSON.parse(item.product.images) as string[];
            return (
              <div key={item.id} className="flex gap-4 p-4">
                <div className="relative w-16 h-20 flex-shrink-0 bg-muted/10">
                  {images[0] && (
                    <Image
                      src={images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="text-sm font-medium hover:underline line-clamp-2"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-xs text-muted mt-1">
                    {item.size} · {item.color}
                  </p>
                  <p className="text-xs text-muted">x{item.quantity}</p>
                </div>
                <div className="text-sm font-medium whitespace-nowrap">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary + address */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {order.address && (
          <div className="border border-border p-4">
            <h3 className="text-xs font-medium tracking-wider uppercase text-muted mb-3">
              Địa chỉ giao hàng
            </h3>
            <p className="text-sm font-medium">{order.address.fullName}</p>
            <p className="text-sm text-muted">{order.address.phone}</p>
            <p className="text-sm text-muted mt-1">
              {order.address.street}, {order.address.ward}, {order.address.district},{" "}
              {order.address.province}
            </p>
          </div>
        )}

        <div className="border border-border p-4">
          <h3 className="text-xs font-medium tracking-wider uppercase text-muted mb-3">
            Tóm tắt thanh toán
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Tạm tính</span>
              <span>{formatPrice(order.total - order.shippingFee + order.discount)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Giảm giá</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted">Phí vận chuyển</span>
              <span>{order.shippingFee === 0 ? "Miễn phí" : formatPrice(order.shippingFee)}</span>
            </div>
            <div className="flex justify-between font-medium pt-2 border-t border-border">
              <span>Tổng cộng</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
          <p className="text-xs text-muted mt-3">
            Thanh toán: {order.paymentMethod === "COD" ? "Tiền mặt khi nhận hàng" : "Chuyển khoản"}
          </p>
        </div>
      </div>

      <p className="text-xs text-muted mt-6">
        Đặt lúc {new Date(order.createdAt).toLocaleString("vi-VN")}
      </p>
    </div>
  );
}
