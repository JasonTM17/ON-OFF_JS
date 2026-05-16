import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { Package, ShoppingBag, Users, TrendingUp } from "lucide-react";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Quản trị",
  description: "Trang quản trị ON/OFF — Quản lý sản phẩm, đơn hàng và khách hàng.",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/login");

  const [productCount, orderCount, userCount, recentOrders] = await Promise.all([
    db.product.count(),
    db.order.count(),
    db.user.count(),
    db.order.findMany({ take: 5, orderBy: { createdAt: "desc" }, include: { user: true, items: true } }),
  ]);

  const totalRevenue = await db.order.aggregate({ _sum: { total: true } });

  const stats = [
    { label: "Sản phẩm", value: productCount, icon: Package },
    { label: "Đơn hàng", value: orderCount, icon: ShoppingBag },
    { label: "Khách hàng", value: userCount, icon: Users },
    { label: "Doanh thu", value: formatPrice(totalRevenue._sum.total || 0), icon: TrendingUp },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl">Admin Dashboard</h1>
        <div className="flex gap-4 text-sm">
          <Link href="/admin/products" className="text-muted hover:text-foreground">Sản phẩm</Link>
          <Link href="/admin/orders" className="text-muted hover:text-foreground">Đơn hàng</Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-border p-6">
            <stat.icon size={20} className="text-muted mb-3" strokeWidth={1.5} />
            <p className="text-2xl font-serif">{stat.value}</p>
            <p className="text-xs text-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <h2 className="font-serif text-xl mb-4">Đơn hàng gần đây</h2>
      {recentOrders.length === 0 ? (
        <p className="text-muted text-sm">Chưa có đơn hàng nào.</p>
      ) : (
        <div className="border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-accent/10">
                <th className="text-left p-3 font-medium">Mã đơn</th>
                <th className="text-left p-3 font-medium">Khách hàng</th>
                <th className="text-left p-3 font-medium">Tổng</th>
                <th className="text-left p-3 font-medium">Trạng thái</th>
                <th className="text-left p-3 font-medium">Ngày</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0">
                  <td className="p-3 font-mono text-xs">{order.id.slice(0, 8)}</td>
                  <td className="p-3">{order.user.name}</td>
                  <td className="p-3">{formatPrice(order.total)}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-0.5 ${order.status === "PENDING" ? "bg-amber-100 text-amber-800" : order.status === "COMPLETED" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-800"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 text-muted">{new Date(order.createdAt).toLocaleDateString("vi-VN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
