import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { WishlistRemoveButton } from "./WishlistRemoveButton";

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
        include: { product: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  const items = wishlist?.items ?? [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb nav */}
      <div className="flex items-center gap-3 mb-8 text-sm">
        <Link href="/account" className="text-muted hover:text-foreground transition-colors">
          Tài khoản
        </Link>
        <span className="text-muted">/</span>
        <span>Yêu thích</span>
      </div>

      {/* Section nav */}
      <nav className="flex gap-6 border-b border-border mb-8 text-sm">
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

      <div className="flex items-baseline justify-between mb-6">
        <h1 className="font-serif text-3xl">Yêu thích</h1>
        {items.length > 0 && (
          <span className="text-sm text-muted">{items.length} sản phẩm</span>
        )}
      </div>

      {items.length === 0 ? (
        <div className="border border-border p-12 text-center">
          <p className="text-muted text-sm mb-6">Bạn chưa lưu sản phẩm nào</p>
          <Link
            href="/products"
            className="text-sm underline underline-offset-4 hover:text-muted transition-colors"
          >
            Khám phá bộ sưu tập
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => {
            const images = JSON.parse(item.product.images) as string[];
            const image = images[0] ?? null;
            const hasDiscount =
              item.product.salePrice !== null &&
              item.product.salePrice < item.product.price;

            return (
              <div key={item.id} className="group relative">
                {/* Remove button */}
                <WishlistRemoveButton productId={item.productId} />

                {/* Image */}
                <Link href={`/products/${item.product.slug}`} className="block">
                  <div className="relative aspect-[3/4] bg-card overflow-hidden mb-3">
                    {image ? (
                      <Image
                        src={image}
                        alt={item.product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-muted text-xs">
                        Không có ảnh
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div>
                    <p className="text-sm font-medium leading-snug line-clamp-2 mb-1">
                      {item.product.name}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm">
                        {formatPrice(item.product.salePrice ?? item.product.price)}
                      </span>
                      {hasDiscount && (
                        <span className="text-xs text-muted line-through">
                          {formatPrice(item.product.price)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
