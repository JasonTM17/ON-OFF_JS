import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bộ sưu tập | ON/OFF",
  description:
    "Khám phá các bộ sưu tập đồ lót & đồ mặc nhà ON/OFF — Thiết kế tối giản, chất liệu tự nhiên dành cho nam và nữ.",
  openGraph: {
    title: "Bộ sưu tập | ON/OFF",
    description:
      "Khám phá các bộ sưu tập đồ lót & đồ mặc nhà ON/OFF — Thiết kế tối giản, chất liệu tự nhiên.",
    url: "https://onoff.vn/collections",
  },
};

export default async function CollectionsPage() {
  const categories = await db.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div className="bg-background min-h-screen">
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <nav className="text-xs text-muted mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-foreground transition-colors">
              Trang chủ
            </Link>
            <span className="text-border">/</span>
            <span className="text-foreground">Bộ sưu tập</span>
          </nav>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground">
            Bộ sưu tập
          </h1>
          <p className="text-sm text-muted mt-2">
            {categories.length} bộ sưu tập
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="font-serif text-3xl font-light text-foreground mb-3">
              Chưa có bộ sưu tập nào
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-8 h-11 border border-foreground text-sm tracking-[0.1em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors duration-200"
            >
              Xem tất cả sản phẩm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] bg-card overflow-hidden mb-4">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-card to-border/30" />
                  )}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
                    <p className="font-serif text-xl font-light text-background">
                      {category.name}
                    </p>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-background/70 mt-1">
                      {category._count.products} sản phẩm
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-medium text-foreground group-hover:text-muted transition-colors duration-200">
                      {category.name}
                    </h2>
                    {category.description && (
                      <p className="text-xs text-muted mt-0.5 line-clamp-1">
                        {category.description}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-muted shrink-0 ml-3">
                    {category._count.products} sản phẩm
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
