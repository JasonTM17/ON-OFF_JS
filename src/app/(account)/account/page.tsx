import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Tài khoản của tôi",
  description: "Quản lý thông tin cá nhân và theo dõi đơn hàng của bạn tại ONFIT.",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await db.user.findUnique({
    where: { id: session.userId },
    include: { orders: { orderBy: { createdAt: "desc" }, take: 5, include: { items: true } } },
  });

  if (!user) redirect("/login");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl mb-8">Tài khoản</h1>

      {/* User info */}
      <div className="border border-border p-6 mb-8">
        <h2 className="text-sm font-medium tracking-wider uppercase mb-4">Thông tin cá nhân</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div><span className="text-muted">Tên:</span> {user.name}</div>
          <div><span className="text-muted">Email:</span> {user.email}</div>
          {user.phone && <div><span className="text-muted">SĐT:</span> {user.phone}</div>}
        </div>
      </div>

      {/* Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium tracking-wider uppercase">Đơn hàng gần đây</h2>
          <Link href="/account/orders" className="text-xs text-muted hover:text-foreground">Xem tất cả</Link>
        </div>

        {user.orders.length === 0 ? (
          <div className="border border-border p-8 text-center">
            <p className="text-muted text-sm mb-4">Bạn chưa có đơn hàng nào</p>
            <Link href="/products" className="text-sm underline hover:text-foreground">Mua sắm ngay</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {user.orders.map((order) => (
              <div key={order.id} className="border border-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-muted">#{order.id.slice(0, 8)}</span>
                  <span className={`text-xs px-2 py-0.5 ${order.status === "PENDING" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">{order.items.length} sản phẩm</span>
                  <span className="text-sm font-medium">{formatPrice(order.total)}</span>
                </div>
                <p className="text-xs text-muted mt-1">{new Date(order.createdAt).toLocaleDateString("vi-VN")}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Logout */}
      <div className="mt-8 pt-8 border-t border-border">
        <form action="/api/auth/logout" method="POST">
          <button type="submit" className="text-sm text-muted underline hover:text-foreground">Đăng xuất</button>
        </form>
      </div>
    </div>
  );
}
