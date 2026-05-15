import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 403 });
  }

  const [
    totalOrders,
    totalCustomers,
    totalProducts,
    revenueResult,
    recentOrders,
    ordersByStatus,
  ] = await Promise.all([
    db.order.count(),
    db.user.count({ where: { role: "USER" } }),
    db.product.count(),
    db.order.aggregate({
      _sum: { total: true },
      where: { status: { in: ["CONFIRMED", "SHIPPING", "DELIVERED"] } },
    }),
    db.order.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, name: true, email: true } },
        items: { select: { quantity: true, price: true } },
      },
    }),
    db.order.groupBy({
      by: ["status"],
      _count: { id: true },
    }),
  ]);

  const statusMap = Object.fromEntries(
    ordersByStatus.map((s) => [s.status, s._count.id])
  );

  return NextResponse.json({
    tongDonHang: totalOrders,
    doanhThu: revenueResult._sum.total ?? 0,
    tongKhachHang: totalCustomers,
    tongSanPham: totalProducts,
    donHangTheoTrangThai: {
      choXacNhan: statusMap["PENDING"] ?? 0,
      daXacNhan: statusMap["CONFIRMED"] ?? 0,
      dangGiao: statusMap["SHIPPING"] ?? 0,
      daGiao: statusMap["DELIVERED"] ?? 0,
      daHuy: statusMap["CANCELLED"] ?? 0,
    },
    donHangGanDay: recentOrders,
  });
}
