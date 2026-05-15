import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/login");

  const users = await db.user.findMany({
    include: {
      orders: {
        select: { total: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl">Khách hàng</h1>
        <p className="text-sm text-muted mt-1">{users.length} tài khoản đã đăng ký</p>
      </div>

      {users.length === 0 ? (
        <p className="text-muted text-sm">Chưa có khách hàng nào.</p>
      ) : (
        <div className="border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-accent/10">
                <th className="text-left p-3 font-medium">Khách hàng</th>
                <th className="text-left p-3 font-medium">Số điện thoại</th>
                <th className="text-left p-3 font-medium">Số đơn hàng</th>
                <th className="text-left p-3 font-medium">Tổng chi tiêu</th>
                <th className="text-left p-3 font-medium">Vai trò</th>
                <th className="text-left p-3 font-medium">Ngày đăng ký</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const orderCount = user.orders.length;
                const totalSpent = user.orders.reduce((sum, o) => sum + o.total, 0);
                return (
                  <tr key={user.id} className="border-b border-border last:border-0 hover:bg-accent/5">
                    <td className="p-3">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted">{user.email}</p>
                    </td>
                    <td className="p-3 text-muted">{user.phone ?? "—"}</td>
                    <td className="p-3">{orderCount}</td>
                    <td className="p-3 font-medium">
                      {totalSpent > 0 ? formatPrice(totalSpent) : "—"}
                    </td>
                    <td className="p-3">
                      <span
                        className={`text-xs px-2 py-0.5 ${
                          user.role === "ADMIN"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {user.role === "ADMIN" ? "Admin" : "Khách hàng"}
                      </span>
                    </td>
                    <td className="p-3 text-muted">
                      {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
