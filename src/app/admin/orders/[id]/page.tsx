import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, Package, User, MapPin, CreditCard } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Chi tiết đơn hàng",
  robots: { index: false },
};

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/login");

  const { id } = await params;

  const order = await db.order.findUnique({
    where: { id },
    include: {
      user: true,
      items: { include: { product: true } },
      address: true,
    },
  });

  if (!order) redirect("/admin/orders");

  const statusColors: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    SHIPPING: "bg-purple-100 text-purple-800",
    DELIVERED: "bg-emerald-100 text-emerald-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  const statusLabels: Record<string, string> = {
    PENDING: "Chờ xác nhận",
    CONFIRMED: "Đã xác nhận",
    SHIPPING: "Đang giao",
    DELIVERED: "Đã giao",
    CANCELLED: "Đã hủy",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-2 text-xs text-muted hover:text-foreground mb-6"
      >
        <ArrowLeft size={14} />
        Quay lại danh sách
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl">Đơn hàng #{order.id.slice(0, 8)}</h1>
          <p className="text-xs text-muted mt-1">
            {new Date(order.createdAt).toLocaleString("vi-VN")}
          </p>
        </div>
        <span className={`px-3 py-1 text-xs ${statusColors[order.status] || "bg-gray-100"}`}>
          {statusLabels[order.status] || order.status}
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <User size={14} className="text-muted" />
            <h3 className="text-xs font-medium tracking-wide">KHÁCH HÀNG</h3>
          </div>
          <p className="text-sm">{order.user.name}</p>
          <p className="text-xs text-muted mt-1">{order.user.email}</p>
          {order.user.phone && (
            <p className="text-xs text-muted mt-0.5">{order.user.phone}</p>
          )}
        </div>

        <div className="border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={14} className="text-muted" />
            <h3 className="text-xs font-medium tracking-wide">ĐỊA CHỈ GIAO HÀNG</h3>
          </div>
          {order.address ? (
            <>
              <p className="text-sm">{order.address.fullName}</p>
              <p className="text-xs text-muted mt-1">{order.address.phone}</p>
              <p className="text-xs text-muted mt-0.5">
                {order.address.street}, {order.address.ward}, {order.address.district}, {order.address.province}
              </p>
            </>
          ) : (
            <p className="text-xs text-muted">Không có thông tin</p>
          )}
        </div>

        <div className="border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard size={14} className="text-muted" />
            <h3 className="text-xs font-medium tracking-wide">THANH TOÁN</h3>
          </div>
          <p className="text-sm">{order.paymentMethod || "COD"}</p>
          <p className="text-xs text-muted mt-1">
            {order.status === "DELIVERED" ? "Đã thanh toán" : "Chưa thanh toán"}
          </p>
        </div>
      </div>

      <div className="border border-border">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card">
          <Package size={14} className="text-muted" />
          <h3 className="text-xs font-medium tracking-wide">SẢN PHẨM ({order.items.length})</h3>
        </div>
        <div className="divide-y divide-border">
          {order.items.map((item) => {
            const images: string[] = item.product?.images
              ? JSON.parse(item.product.images as string)
              : [];
            return (
              <div key={item.id} className="flex items-center gap-4 p-4">
                <div className="w-14 h-16 bg-card shrink-0 overflow-hidden">
                  {images[0] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={images[0]} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground line-clamp-1">{item.product?.name || "Sản phẩm"}</p>
                  <p className="text-xs text-muted mt-0.5">
                    {item.size && `Size: ${item.size}`}
                    {item.size && item.color && " · "}
                    {item.color && `Màu: ${item.color}`}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm">{formatPrice(item.price)}</p>
                  <p className="text-xs text-muted">x{item.quantity}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="border-t border-border p-4 space-y-2">
          <div className="flex justify-between text-xs text-muted">
            <span>Tạm tính</span>
            <span>{formatPrice(order.subtotal || order.total)}</span>
          </div>
          <div className="flex justify-between text-xs text-muted">
            <span>Phí vận chuyển</span>
            <span>{formatPrice(order.shippingFee || 0)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-xs text-accent">
              <span>Giảm giá</span>
              <span>-{formatPrice(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm font-medium pt-2 border-t border-border">
            <span>Tổng cộng</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
