import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tài khoản của tôi",
  description: "Quản lý thông tin cá nhân và theo dõi đơn hàng của bạn tại ON/OFF.",
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

export default async function AccountPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const [user, wishlist] = await Promise.all([
    db.user.findUnique({
      where: { id: session.userId },
      include: {
        orders: {
          orderBy: { createdAt: "desc" },
          take: 5,
          include: { items: true },
        },
      },
    }),
    db.wishlist.findUnique({
      where: { userId: session.userId },
      include: {
        items: {
          include: { product: true },
          orderBy: { createdAt: "desc" },
          take: 4,
        },
      },
    }),
  ]);

  if (!user) redirect("/login");

  const wishlistItems = wishlist?.items ?? [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl mb-8">Tài khoản</h1>

      {/* Section nav */}
      <nav className="flex gap-6 border-b border-border mb-8 text-sm">
        <span className="pb-3 border-b-2 border-foreground font-medium">
          Tổng quan
        </span>
        <Link
          href="/account/orders"
          className="pb-3 text-muted hover:text-foreground transition-colors"
        >
          Đơn hàng
        </Link>
        <Link
          href="/wishlist"
          className="pb-3 text-muted hover:text-foreground transition-colors"
        >
          Yêu thích
        </Link>
      </nav>

      {/* User info */}
      <div className="border border-border p-6 mb-8">
        <h2 className="text-xs font-medium tracking-wider uppercase mb-4 text-muted">
          Thông tin cá nhân
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted">Tên: </span>
            {user.name}
          </div>
          <div>
            <span className="text-muted">Email: </span>
            {user.email}
          </div>
          {user.phone && (
            <div>
              <span className="text-muted">SĐT: </span>
              {user.phone}
            </div>
          )}
        </div>
      </div>

      {/* Recent orders */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-medium tracking-wider uppercase">
            Đơn hàng gần đây
          </h2>
          <Link
            href="/account/orders"
            className="text-xs text-muted hover:text-foreground transition-colors"
          >
            Xem tất cả
          </Link>
        </div>

        {user.orders.length === 0 ? (
          <div className="border border-border p-8 text-center">
            <p className="text-muted text-sm mb-4">Bạn chưa có đơn hàng nào</p>
            <Link
              href="/products"
              className="text-sm underline underline-offset-4 hover:text-muted transition-colors"
            >
              Mua sắm ngay
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {user.orders.map((order) => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="flex items-center justify-between border border-border p-4 hover:border-foreground transition-colors group"
              >
                <div>
                  <span className="font-mono text-xs text-muted">
                    #{order.id.slice(0, 8).toUpperCase()}
                  </span>
                  <p className="text-sm mt-0.5">
                    {order.items.length} sản phẩm ·{" "}
                    <span className="font-medium">{formatPrice(order.total)}</span>
                  </p>
                  <p className="text-xs text-muted mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <div className="flex items-center gap-3">
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
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Wishlist preview */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-medium tracking-wider uppercase">
            Yêu thích
          </h2>
          <Link
            href="/wishlist"
            className="text-xs text-muted hover:text-foreground transition-colors"
          >
            Xem tất cả
          </Link>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="border border-border p-8 text-center">
            <p className="text-muted text-sm mb-4">Chưa có sản phẩm yêu thích</p>
            <Link
              href="/products"
              className="text-sm underline underline-offset-4 hover:text-muted transition-colors"
            >
              Khám phá bộ sưu tập
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {wishlistItems.map((item) => {
              const images = JSON.parse(item.product.images) as string[];
              const image = images[0] ?? null;
              return (
                <Link
                  key={item.id}
                  href={`/products/${item.product.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[2/3] bg-card overflow-hidden mb-2">
                    {image ? (
                      <Image
                        src={image}
                        alt={item.product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-muted text-xs">
                        Không có ảnh
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-medium line-clamp-1">{item.product.name}</p>
                  <p className="text-xs text-muted mt-0.5">
                    {formatPrice(item.product.salePrice ?? item.product.price)}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Logout */}
      <div className="pt-8 border-t border-border">
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="text-sm text-muted underline underline-offset-4 hover:text-foreground transition-colors"
          >
            Đăng xuất
          </button>
        </form>
      </div>
    </div>
  );
}
