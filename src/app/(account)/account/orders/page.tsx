import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Đơn hàng của tôi",
  description: "Theo dõi tất cả đơn hàng của bạn tại ON/OFF.",
  robots: { index: false, follow: false },
};

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Chờ xác nhận",
  CONFIRMED: "Đã xác nhận",
  SHIPPING: "Đang giao hàng",
  DELIVERED: "Đã giao hàng",
  CANCELLED: "Đã hủy",
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  SHIPPING: "bg-indigo-100 text-indigo-800",
  DELIVERED: "bg-emerald-100 text-emerald-800",
  CANCELLED: "bg-red-100 text-red-700",
};

export default async function OrdersPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const orders = await db.order.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb nav */}
      <div className="flex items-center gap-3 mb-8 text-sm">
        <Link href="/account" className="text-muted hover:text-foreground transition-colors">
          Tài khoản
        </Link>
        <span className="text-muted">/</span>
        <span>Đơn hàng</span>
      </div>

      {/* Section nav */}
      <nav className="flex gap-6 border-b border-border mb-8 text-sm">
        <Link
          href="/account"
          className="pb-3 text-muted hover:text-foreground transition-colors"
        >
          Tổng quan
        </Link>
        <span className="pb-3 border-b-2 border-foreground font-medium">
          Đơn hàng
        </span>
        <Link
          href="/wishlist"
          className="pb-3 text-muted hover:text-foreground transition-colors"
        >
          Yêu thích
        </Link>
      </nav>

      <div className="flex items-baseline justify-between mb-6">
        <h1 className="font-serif text-3xl">Đơn hàng</h1>
        {orders.length > 0 && (
          <span className="text-sm text-muted">{orders.length} đơn hàng</span>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="border border-border p-12 text-center">
          <p className="text-muted text-sm mb-6">Bạn chưa có đơn hàng nào</p>
          <Link
            href="/products"
            className="text-sm underline underline-offset-4 hover:text-muted transition-colors"
          >
            Mua sắm ngay
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="block border border-border p-4 hover:border-foreground transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <span className="font-mono text-xs text-muted">
                    #{order.id.slice(0, 8).toUpperCase()}
                  </span>
                  <p className="text-sm mt-1">
                    {order.items.length} sản phẩm ·{" "}
                    <span className="font-medium">{formatPrice(order.total)}</span>
                  </p>
                  <p className="text-xs text-muted mt-1">
                    {new Date(order.createdAt).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span
                    className={`text-xs px-2 py-0.5 font-medium ${
                      STATUS_COLORS[order.status] ?? "bg-muted/20 text-muted"
                    }`}
                  >
                    {STATUS_LABELS[order.status] ?? order.status}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-muted group-hover:text-foreground transition-colors"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 3l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
