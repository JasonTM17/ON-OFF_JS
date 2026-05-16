import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { WishlistCard } from "./WishlistCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Danh sách yêu thích",
  description: "Các sản phẩm bạn đã lưu tại ON/OFF.",
  robots: { index: false, follow: false },
};

export default async function WishlistPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const wishlist = await db.wishlist.findUnique({
    where: { userId: session.userId },
    include: {
      items: {
        include: {
          product: {
            include: { variants: true },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  const items = wishlist?.items ?? [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 mb-10 text-xs tracking-widest uppercase text-muted">
        <Link href="/account" className="hover:text-foreground transition-colors">
          Tài khoản
        </Link>
        <span>/</span>
        <span className="text-foreground">Yêu thích</span>
      </div>

      {/* Section nav */}
      <nav className="flex gap-8 border-b border-border mb-10 text-sm">
        <Link
          href="/account"
          className="pb-3 text-muted hover:text-foreground transition-colors"
        >
          Tổng quan
        </Link>
        <Link
          href="/account/orders"
          className="pb-3 text-muted hover:text-foreground transition-colors"
        >
          Đơn hàng
        </Link>
        <span className="pb-3 border-b-2 border-foreground font-medium">
          Yêu thích
        </span>
      </nav>

      {/* Heading */}
      <div className="flex items-baseline justify-between mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl tracking-tight">Yêu thích</h1>
        {items.length > 0 && (
          <span className="text-sm text-muted tabular-nums">
            {items.length} sản phẩm
          </span>
        )}
      </div>

      {items.length === 0 ? (
        /* ── Empty state ── */
        <div className="flex flex-col items-center justify-center py-24 text-center">
          {/* Minimal heart illustration */}
          <div className="mb-8 text-muted/30">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M32 54S8 38 8 22a12 12 0 0 1 24 0 12 12 0 0 1 24 0c0 16-24 32-24 32Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="font-serif text-2xl mb-3 tracking-tight">
            Chưa có sản phẩm yêu thích
          </h2>
          <p className="text-sm text-muted mb-8 max-w-xs leading-relaxed">
            Lưu những sản phẩm bạn yêu thích để dễ dàng tìm lại sau.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 border border-foreground px-8 py-3 text-xs tracking-[0.2em] uppercase font-medium hover:bg-foreground hover:text-background transition-colors duration-200"
          >
            Khám phá sản phẩm
          </Link>
        </div>
      ) : (
        /* ── Grid ── */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
          {items.map((item) => (
            <WishlistCard
              key={item.id}
              itemId={item.id}
              productId={item.productId}
              product={item.product}
            />
          ))}
        </div>
      )}
    </div>
  );
}
