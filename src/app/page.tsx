import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Truck, RotateCcw, Gem, ShieldCheck, ArrowRight } from "lucide-react";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { HeroSlider } from "@/components/home/hero-slider";
import { ProductCard } from "@/components/product/product-card";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    absolute: "ON/OFF — Đồ lót & đồ mặc nhà cao cấp Việt Nam",
  },
  description:
    "Khám phá bộ sưu tập đồ lót & đồ mặc nhà cao cấp ON/OFF — Chất liệu tự nhiên, thiết kế tối giản, thoải mái suốt ngày dài.",
  openGraph: {
    title: "ON/OFF — Đồ lót & đồ mặc nhà cao cấp Việt Nam",
    description:
      "Khám phá bộ sưu tập đồ lót & đồ mặc nhà cao cấp ON/OFF — Chất liệu tự nhiên, thiết kế tối giản, thoải mái suốt ngày dài.",
    url: "https://onoff.vn",
    type: "website",
  },
};

async function getBestsellers() {
  return db.product.findMany({
    where: { isBestseller: true },
    orderBy: { reviewCount: "desc" },
    include: { category: true, variants: true },
    take: 8,
  });
}

async function getNewArrivals() {
  return db.product.findMany({
    where: { isNew: true },
    orderBy: { createdAt: "desc" },
    include: { category: true, variants: true },
    take: 8,
  });
}

async function getCategories() {
  return db.category.findMany({ orderBy: { sortOrder: "asc" } });
}

// Curated lifestyle images for category cards
const CATEGORY_IMAGES = [
  "https://2885966831.e.cdneverest.net/catalog/category/nam-quanlot_1.webp",
  "https://2885966831.e.cdneverest.net/catalog/category/nu-quanlot_1.webp",
  "https://2885966831.e.cdneverest.net/catalog/category/nu-quanao_1.webp",
  "https://2885966831.e.cdneverest.net/catalog/category/nam-phukien_1.webp",
];

export default async function HomePage() {
  const [bestsellers, newArrivals, categories] = await Promise.all([
    getBestsellers(),
    getNewArrivals(),
    getCategories(),
  ]);

  return (
    <div className="bg-background">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "ON/OFF",
            url: "https://onoff.vn",
            description: "Đồ lót & đồ mặc nhà cao cấp Việt Nam",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://onoff.vn/products?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "ON/OFF",
            url: "https://onoff.vn",
            logo: "https://onoff.vn/icons/icon-512x512.svg",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+84-1900-272-737",
              contactType: "customer service",
              availableLanguage: "Vietnamese",
            },
            sameAs: [
              "https://facebook.com/onoff.vn",
              "https://instagram.com/onoff.vn",
              "https://tiktok.com/@onoff.vn",
            ],
          }),
        }}
      />

      {/* ─── HERO SLIDER ──────────────────────────────────────────────────── */}
      <HeroSlider />


      {/* ─── SẢN PHẨM BÁN CHẠY ───────────────────────────────────────────── */}
      {bestsellers.length > 0 && (
        <section className="py-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-3">Được chọn nhiều nhất</p>
                <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground">
                  Sản phẩm<br />
                  <span className="italic text-muted">bán chạy</span>
                </h2>
              </div>
              <Link
                href="/products?sort=bestseller"
                className="hidden md:flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted hover:text-foreground transition-colors group"
              >
                Xem tất cả
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
              {bestsellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-12 text-center md:hidden">
              <Button asChild variant="outline" className="border-foreground text-foreground">
                <Link href="/products?sort=bestseller">Xem tất cả</Link>
              </Button>
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
                className="group relative aspect-[2/3] overflow-hidden bg-accent/20"
              >
                <Image
                  src={CATEGORY_IMAGES[i % CATEGORY_IMAGES.length]}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
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

      {/* ─── PROMOTIONAL BANNER ────────────────────────────────────────── */}
      <section className="px-6 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          <Link href="/sale" className="block group relative overflow-hidden">
            <div className="bg-card border border-border p-8 md:p-12 flex items-center justify-between">
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-2">Ưu đãi đặc biệt</p>
                <h3 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-2">
                  Summer Essential Pack
                </h3>
                <p className="text-sm text-muted max-w-md">Mua 3 tặng 1 — Áp dụng cho tất cả sản phẩm BASICON Collection</p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-accent group-hover:gap-3 transition-all">
                Mua ngay
                <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ─── MỚI VỀ ───────────────────────────────────────────────────────── */}
      {newArrivals.length > 0 && (
        <section className="py-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-3">Vừa cập bến</p>
                <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground">
                  Mới về<br />
                  <span className="italic text-muted">bộ sưu tập</span>
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

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-12 text-center md:hidden">
              <Button asChild variant="outline" className="border-foreground text-foreground">
                <Link href="/products?sort=newest">Xem tất cả</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* ─── EDITORIAL BANNER ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <Image
          src="https://2885966831.e.cdneverest.net/catalog/category/nu-aolot_2.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover"
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
              Về ON/OFF
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CAM KẾT CỦA ON/OFF ───────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12 bg-background border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-3">Tiêu chuẩn của chúng tôi</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground">
              Cam kết của <span className="italic text-muted">ON/OFF</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              {
                icon: Truck,
                title: "Miễn phí vận chuyển",
                desc: "Đơn hàng từ 500.000đ",
              },
              {
                icon: RotateCcw,
                title: "Đổi trả 30 ngày",
                desc: "Không cần lý do",
              },
              {
                icon: Gem,
                title: "Chất liệu cao cấp",
                desc: "Chứng nhận Oeko-Tex",
              },
              {
                icon: ShieldCheck,
                title: "Thanh toán an toàn",
                desc: "Mã hoá SSL 256-bit",
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center px-6 py-8 gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <item.icon size={20} className="text-foreground/70" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold tracking-wide text-foreground mb-1.5">{item.title}</h4>
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
          <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-5">Cộng đồng ON/OFF</p>
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
