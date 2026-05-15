import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/login");

  const orders = await db.order.findMany({
    include: { user: true, items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl">Quản lý đơn hàng</h1>
        <Link href="/admin" className="text-sm text-muted hover:text-foreground">&larr; Dashboard</Link>
      </div>

      {orders.length === 0 ? (
        <p className="text-muted text-sm">Chưa có đơn hàng nào.</p>
      ) : (
        <div className="border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-accent/10">
                <th className="text-left p-3 font-medium">Mã đơn</th>
                <th className="text-left p-3 font-medium">Khách hàng</th>
                <th className="text-left p-3 font-medium">Sản phẩm</th>
                <th className="text-left p-3 font-medium">Tổng</th>
                <th className="text-left p-3 font-medium">Thanh toán</th>
                <th className="text-left p-3 font-medium">Trạng thái</th>
                <th className="text-left p-3 font-medium">Ngày</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0 hover:bg-accent/5">
                  <td className="p-3 font-mono text-xs">{order.id.slice(0, 8)}</td>
                  <td className="p-3">
                    <p>{order.user.name}</p>
                    <p className="text-xs text-muted">{order.user.email}</p>
                  </td>
                  <td className="p-3">
                    <p className="text-xs text-muted">{order.items.length} sản phẩm</p>
                  </td>
                  <td className="p-3 font-medium">{formatPrice(order.total)}</td>
                  <td className="p-3 text-xs text-muted">{order.paymentMethod}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-0.5 ${
                      order.status === "PENDING" ? "bg-amber-100 text-amber-800" :
                      order.status === "PROCESSING" ? "bg-blue-100 text-blue-800" :
                      order.status === "SHIPPED" ? "bg-purple-100 text-purple-800" :
                      order.status === "COMPLETED" ? "bg-emerald-100 text-emerald-800" :
                      "bg-red-100 text-red-800"
                    }`}>
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
