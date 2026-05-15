import Link from "next/link";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, RotateCcw, Shield, Headphones, ArrowRight } from "lucide-react";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { HeroSlider } from "@/components/home/hero-slider";

export const dynamic = 'force-dynamic';

async function getFeaturedProducts() {
  return db.product.findMany({
    where: { isFeatured: true },
    include: { category: true, variants: true },
    take: 8,
  });
}

async function getNewProducts() {
  return db.product.findMany({
    where: { isNew: true },
    include: { category: true, variants: true },
    take: 4,
  });
}

async function getCategories() {
  return db.category.findMany({ orderBy: { sortOrder: "asc" } });
}

// Curated lifestyle images for category cards
const CATEGORY_IMAGES = [
  "https://2885966831.e.cdneverest.net//catalog/category/nam-quanlot_1.webp",
  "https://2885966831.e.cdneverest.net//catalog/category/nu-quanlot_1.webp",
  "https://2885966831.e.cdneverest.net//catalog/category/nu-quanao_1.webp",
  "https://2885966831.e.cdneverest.net//catalog/category/nam-phukien_1.webp",
];

export default async function HomePage() {
  const [products, newProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getNewProducts(),
    getCategories(),
  ]);

  return (
    <div className="bg-background">
      {/* ─── HERO SLIDER ──────────────────────────────────────────────────── */}
      <HeroSlider />

      {/* ─── BRAND STRIP ──────────────────────────────────────────────────── */}
      <div className="border-b border-border overflow-x-auto">
        <div className="flex min-w-max mx-auto">
          {[
            { label: "ONFIT", sub: "Premium Collection", href: "/products?brand=onfit" },
            { label: "BASIC", sub: "Everyday Essentials", href: "/products?brand=basic" },
            { label: "LOUNGE", sub: "Comfort Wear", href: "/products?brand=lounge" },
          ].map((brand, i) => (
            <Link
              key={brand.label}
              href={brand.href}
              className={`flex-1 min-w-[200px] flex flex-col items-center justify-center py-8 gap-1 hover:bg-accent/10 transition-colors duration-200 ${
                i < 2 ? "border-r border-border" : ""
              }`}
            >
              <span className="font-serif text-2xl tracking-[0.2em] text-foreground">{brand.label}</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted">{brand.sub}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ─── NEW ARRIVALS ─────────────────────────────────────────────────── */}
      {newProducts.length > 0 && (
        <section className="py-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-3">Mới nhất</p>
                <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground">
                  Hàng mới về
                </h2>
              </div>
              <Link
                href="/products?sort=newest"
                className="hidden md:flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted hover:text-foreground transition-colors group"
              >
                Xem tất cả
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 4-col asymmetric grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {newProducts.map((product, i) => {
                const images: string[] = typeof product.images === "string"
                  ? JSON.parse(product.images)
                  : product.images;
                const img1 = images[0];
                const img2 = images[1] || images[0];
                const isLarge = i === 0;

                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className={`group block ${isLarge ? "lg:col-span-2 lg:row-span-2" : ""}`}
                  >
                    <div className={`relative overflow-hidden bg-card ${isLarge ? "aspect-[3/4]" : "aspect-[3/4]"}`}>
                      {/* Primary image */}
                      {img1 && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={img1}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                        />
                      )}
                      {/* Hover image */}
                      {img2 && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={img2}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 scale-105 group-hover:scale-100 transition-transform"
                        />
                      )}
                      {!img1 && (
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/40" />
                      )}

                      {/* NEW badge */}
                      <span className="absolute top-3 left-3 px-2 py-1 bg-foreground text-background text-[9px] tracking-[0.2em] uppercase">
                        Mới
                      </span>

                      {/* Hover overlay */}
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end px-4 pb-4">
                        <span className="text-background text-[10px] tracking-[0.2em] uppercase">Xem chi tiết</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <h3 className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-muted transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted mt-0.5">
                        {formatPrice(product.salePrice ?? product.price)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── CATEGORIES ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-12 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-3">Danh mục</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground">
                Tìm phong cách<br />
                <span className="italic text-muted">của bạn</span>
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden md:flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted hover:text-foreground transition-colors group"
            >
              Tất cả sản phẩm
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.slice(0, 4).map((cat, i) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="group relative aspect-[3/4] overflow-hidden bg-accent/20"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={CATEGORY_IMAGES[i % CATEGORY_IMAGES.length]}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />

                {/* Number */}
                <span className="absolute top-5 left-5 font-serif text-background/30 text-4xl font-light leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-background text-xl font-light leading-tight">{cat.name}</h3>
                  {cat.description && (
                    <p className="text-background/60 text-xs mt-1.5 leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  )}
                  <div className="mt-3 flex items-center gap-1.5 text-background/70 text-[10px] tracking-[0.2em] uppercase group-hover:text-background transition-colors">
                    <span>Xem ngay</span>
                    <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ────────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-3">Nổi bật</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground">
                Được yêu thích<br />
                <span className="italic text-muted">nhất tuần này</span>
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden md:flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted hover:text-foreground transition-colors group"
            >
              Xem tất cả
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
            {products.map((product) => {
              const colors = [
                ...new Map(product.variants.map((v) => [v.color, v.colorHex])).entries(),
              ];
              const images: string[] = typeof product.images === "string"
                ? JSON.parse(product.images)
                : product.images;
              const img1 = images[0];
              const img2 = images[1] || images[0];

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group block"
                >
                  {/* Image with swap */}
                  <div className="relative aspect-[3/4] bg-card overflow-hidden mb-4">
                    {img1 ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img1}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                          loading="lazy"
                        />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img2}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          loading="lazy"
                        />
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/40" />
                    )}

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {product.isNew && (
                        <Badge variant="new">Mới</Badge>
                      )}
                      {product.isBestseller && !product.isNew && (
                        <Badge variant="bestseller">Bán chạy</Badge>
                      )}
                    </div>
                    {product.salePrice && (
                      <Badge variant="sale" className="absolute top-3 right-3">
                        -{Math.round((1 - product.salePrice / product.price) * 100)}%
                      </Badge>
                    )}

                    {/* Quick-view bar */}
                    <div className="absolute bottom-0 left-0 right-0 bg-foreground/90 py-3 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-background text-[10px] tracking-[0.25em] uppercase">Xem nhanh</span>
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="font-sans text-sm font-medium text-foreground line-clamp-1 mb-1.5 group-hover:text-muted transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-foreground">
                      {formatPrice(product.salePrice ?? product.price)}
                    </span>
                    {product.salePrice && (
                      <span className="text-xs text-muted/60 line-through">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>

                  {colors.length > 0 && (
                    <div className="flex gap-1.5 mt-2.5">
                      {colors.slice(0, 6).map(([name, hex]) => (
                        <span
                          key={name}
                          className="w-3.5 h-3.5 rounded-full border border-border shadow-sm"
                          style={{ backgroundColor: hex }}
                          title={name}
                        />
                      ))}
                      {colors.length > 6 && (
                        <span className="text-[10px] text-muted self-center">+{colors.length - 6}</span>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile CTA */}
          <div className="mt-12 text-center md:hidden">
            <Button asChild variant="outline" className="border-foreground text-foreground">
              <Link href="/products">Xem tất cả sản phẩm</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── EDITORIAL BANNER ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://2885966831.e.cdneverest.net//catalog/category/nu-aolot_2.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-28 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-4">Triết lý thương hiệu</p>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-background leading-snug">
              Chúng tôi tin rằng sự thoải mái<br />
              <span className="italic text-accent">không cần đánh đổi vẻ đẹp.</span>
            </h2>
          </div>
          <div className="shrink-0">
            <Link
              href="/about"
              className="inline-flex items-center gap-3 px-10 h-12 border border-background text-background text-xs tracking-[0.15em] uppercase hover:bg-background hover:text-foreground transition-colors duration-300"
            >
              Về ONFIT
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── BRAND PROMISES ───────────────────────────────────────────────── */}
      <section className="py-16 px-6 lg:px-12 bg-background border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              { icon: Truck,      title: "Miễn phí vận chuyển", desc: "Đơn hàng từ 500.000₫" },
              { icon: RotateCcw,  title: "Đổi trả 30 ngày",     desc: "Không cần lý do" },
              { icon: Shield,     title: "Chất liệu an toàn",   desc: "Chứng nhận Oeko-Tex" },
              { icon: Headphones, title: "Hỗ trợ 24/7",         desc: "Chat & hotline" },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center px-6 py-8 gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                  <item.icon size={18} className="text-muted" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold tracking-wide text-foreground mb-1">{item.title}</h4>
                  <p className="text-[11px] text-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ───────────────────────────────────────────────────── */}
      <section className="py-28 px-6 lg:px-12 bg-foreground relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-5%] w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-5%] w-[350px] h-[350px] rounded-full bg-accent/8 blur-3xl pointer-events-none" />

        <div className="relative max-w-lg mx-auto text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-5">Cộng đồng ONFIT</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-background mb-4 leading-tight">
            Nhận ưu đãi<br />
            <span className="italic text-accent">độc quyền</span>
          </h2>
          <p className="text-background/50 text-sm leading-relaxed mb-10 max-w-sm mx-auto">
            Đăng ký để nhận thông tin về bộ sưu tập mới, khuyến mãi độc quyền và nội dung phong cách sống.
          </p>
          <NewsletterForm />
          <p className="text-background/30 text-[10px] mt-4 tracking-wide">
            Không spam. Hủy đăng ký bất kỳ lúc nào.
          </p>
        </div>
      </section>
    </div>
  );
}
