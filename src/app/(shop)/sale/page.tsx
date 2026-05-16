import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { CountdownTimer } from "./_components/countdown-timer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Khuyến mãi | ON/OFF",
  description:
    "Ưu đãi có thời hạn — Khám phá các sản phẩm đồ lót & đồ mặc nhà ON/OFF đang giảm giá. Chất liệu tự nhiên, thiết kế tối giản, giá tốt nhất.",
  openGraph: {
    title: "Khuyến mãi | ON/OFF",
    description:
      "Ưu đãi có thời hạn — Khám phá các sản phẩm đồ lót & đồ mặc nhà ON/OFF đang giảm giá.",
    url: "https://onoff.vn/sale",
  },
};

const SALE_END = new Date("2026-05-23T23:59:59+07:00");

export default async function SalePage() {
  const rawProducts = await db.product.findMany({
    where: { salePrice: { not: null } },
    include: { category: true, variants: true },
  });

  const products = rawProducts
    .filter((p) => p.salePrice !== null && p.salePrice < p.price)
    .map((p) => ({
      ...p,
      images: JSON.parse(p.images) as string[],
      discountPct: Math.round((1 - p.salePrice! / p.price) * 100),
    }))
    .sort((a, b) => b.discountPct - a.discountPct);

  return (
    <div className="bg-background min-h-screen">
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col items-center text-center gap-6">
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted">
            Ưu đãi có thời hạn
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-light text-foreground">
            Khuyến mãi
          </h1>
          <p className="text-sm text-muted max-w-md">
            Kết thúc sau
          </p>
          <CountdownTimer endDate={SALE_END} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-baseline justify-between mb-8">
          <nav className="text-xs text-muted flex items-center gap-2">
            <Link href="/" className="hover:text-foreground transition-colors">
              Trang chủ
            </Link>
            <span className="text-border">/</span>
            <span className="text-foreground">Khuyến mãi</span>
          </nav>
          <p className="text-sm text-muted">{products.length} sản phẩm</p>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="font-serif text-3xl font-light text-foreground mb-3">
              Hiện chưa có sản phẩm khuyến mãi
            </p>
            <p className="text-sm text-muted mb-8">
              Quay lại sau để không bỏ lỡ ưu đãi
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-8 h-11 border border-foreground text-sm tracking-[0.1em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors duration-200"
            >
              Xem tất cả sản phẩm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
            {products.map((product) => {
              const img = product.images[0];
              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[2/3] bg-card overflow-hidden mb-3">
                    {img ? (
                      <Image
                        src={img}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-card" />
                    )}
                    <span className="absolute top-3 right-3 z-10 inline-flex items-center px-2 py-1 bg-foreground text-background text-[10px] tracking-[0.1em] font-medium">
                      -{product.discountPct}%
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-foreground line-clamp-1 mb-1 group-hover:text-muted transition-colors duration-200">
                      {product.name}
                    </h3>
                    <p className="text-[10px] tracking-[0.1em] uppercase text-muted mb-1.5">
                      {product.category.name}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm text-foreground">
                        {formatPrice(product.salePrice!)}
                      </span>
                      <span className="text-xs text-muted/60 line-through">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
