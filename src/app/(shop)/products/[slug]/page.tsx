import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ProductActions } from "@/components/product/product-actions";

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const product = await db.product.findFirst({
    where: { OR: [{ slug }, { id: slug }] },
    include: { category: true },
  });

  if (!product) {
    return { title: "Sản phẩm không tìm thấy" };
  }

  const images: string[] = (() => {
    try {
      return JSON.parse(product.images as unknown as string);
    } catch {
      return [];
    }
  })();

  const description =
    product.description ||
    `Mua ${product.name} tại ONFIT — Đồ lót & đồ mặc nhà cao cấp Việt Nam. Chất liệu tự nhiên, thiết kế tối giản.`;

  return {
    title: product.name,
    description,
    openGraph: {
      title: `${product.name} | ONFIT`,
      description,
      url: `https://onfit.vn/products/${product.slug}`,
      type: "website",
      images: images[0]
        ? [{ url: images[0], alt: product.name, width: 800, height: 1067 }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ONFIT`,
      description,
      images: images[0] ? [images[0]] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  const product = await db.product.findFirst({
    where: { OR: [{ slug }, { id: slug }] },
    include: { category: true, variants: true },
  });

  if (!product) notFound();

  const related = await db.product.findMany({
    where: { categoryId: product.categoryId, id: { not: product.id } },
    include: { variants: true },
    take: 4,
  });

  const images: string[] = (() => {
    try { return JSON.parse(product.images as unknown as string); } catch { return []; }
  })();
  const mainImage = images[0] && !images[0].includes("placeholder") ? images[0] : null;
  const thumbImages = images.slice(0, 3);

  const colors = [...new Map(product.variants.map((v) => [v.color, v.colorHex])).entries()];
  const sizes = [...new Set(product.variants.map((v) => v.size))];

  const discountPercent = product.salePrice
    ? Math.round((1 - product.salePrice / product.price) * 100)
    : null;

  const careInstructions = [
    { icon: "○", label: "Giặt máy ở 30°C" },
    { icon: "◇", label: "Không dùng chất tẩy" },
    { icon: "△", label: "Phơi trong bóng râm" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex items-center gap-2 text-xs tracking-wide">
            <li>
              <Link
                href="/"
                className="transition-colors duration-200"
                style={{ color: "#7A5C45" }}
              >
                Trang chủ
              </Link>
            </li>
            <li style={{ color: "#D8C3A5" }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </li>
            <li>
              <Link
                href={`/products?category=${product.category.slug}`}
                className="transition-colors duration-200 uppercase tracking-widest"
                style={{ color: "#7A5C45" }}
              >
                {product.category.name}
              </Link>
            </li>
            <li style={{ color: "#D8C3A5" }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </li>
            <li
              className="font-medium truncate max-w-[180px]"
              style={{ color: "#1F1F1F" }}
              aria-current="page"
            >
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

          {/* ── Image panel ── */}
          <div className="lg:sticky lg:top-24 self-start">
            <div
              className="aspect-[3/4] w-full overflow-hidden relative"
              style={{ borderRadius: "2px" }}
            >
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  {/* Multi-layer gradient placeholder */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(160deg, #EDE3D8 0%, #D8C3A5 35%, #C4A882 65%, #B08F6A 100%)",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.35) 0%, transparent 60%)",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse at 75% 80%, rgba(31,31,31,0.12) 0%, transparent 55%)",
                    }}
                  />
                  {/* Subtle texture overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
                    }}
                  />
                  {/* Brand watermark */}
                  <div
                    className="absolute bottom-6 right-6 font-serif text-xs tracking-[0.3em] uppercase select-none pointer-events-none"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    ONFIT
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-2 mt-3">
              {thumbImages.length > 0 ? thumbImages.map((img, i) => (
                <div
                  key={i}
                  className="aspect-square w-16 flex-shrink-0 overflow-hidden"
                  style={{
                    opacity: i === 0 ? 1 : 0.6,
                    borderRadius: "1px",
                    outline: i === 0 ? "1.5px solid #1F1F1F" : "none",
                    outlineOffset: "2px",
                  }}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              )) : [0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="aspect-square w-16 flex-shrink-0 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, #D8C3A5 ${i * 15}%, #B08F6A 100%)`,
                    opacity: i === 0 ? 1 : 0.55,
                    borderRadius: "1px",
                    outline: i === 0 ? "1.5px solid #1F1F1F" : "none",
                    outlineOffset: "2px",
                  }}
                />
              ))}
            </div>
          </div>

          {/* ── Details panel ── */}
          <div className="flex flex-col">

            {/* Badges */}
            <div className="flex items-center gap-2 mb-4 min-h-[24px]">
              {product.isNew && <Badge variant="new">Mới</Badge>}
              {product.isBestseller && <Badge variant="bestseller">Bán chạy</Badge>}
            </div>

            {/* Product name */}
            <h1
              className="font-serif font-light leading-tight mb-4"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#1F1F1F", letterSpacing: "-0.01em" }}
            >
              {product.name}
            </h1>

            {/* Price row */}
            <div className="flex items-baseline gap-3 mb-3">
              <span
                className="font-serif text-2xl font-medium"
                style={{ color: "#1F1F1F" }}
              >
                {formatPrice(product.salePrice || product.price)}
              </span>
              {product.salePrice && (
                <>
                  <span
                    className="text-base line-through"
                    style={{ color: "#D8C3A5" }}
                  >
                    {formatPrice(product.price)}
                  </span>
                  <span
                    className="text-xs font-medium px-1.5 py-0.5 tracking-wide"
                    style={{ backgroundColor: "#1F1F1F", color: "#FAF7F2", borderRadius: "1px" }}
                  >
                    -{discountPercent}%
                  </span>
                </>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2.5 mb-6">
              <div className="flex items-center gap-0.5" aria-label={`${product.rating} sao`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill={i < Math.round(product.rating) ? "#D8C3A5" : "none"}
                    stroke="#D8C3A5"
                    strokeWidth="1.2"
                    aria-hidden="true"
                  >
                    <polygon points="6.5,1 8.2,4.5 12,5 9.25,7.7 9.9,11.5 6.5,9.7 3.1,11.5 3.75,7.7 1,5 4.8,4.5" />
                  </svg>
                ))}
              </div>
              <span className="text-xs" style={{ color: "#7A5C45" }}>
                {product.rating.toFixed(1)}
              </span>
              <span className="text-xs" style={{ color: "#D8C3A5" }}>·</span>
              <span className="text-xs" style={{ color: "#7A5C45" }}>
                {product.reviewCount} đánh giá
              </span>
            </div>

            {/* Thin divider */}
            <div className="mb-6" style={{ height: "1px", backgroundColor: "#E8E0D8" }} />

            {/* Description */}
            <p
              className="text-sm leading-relaxed mb-8"
              style={{ color: "#7A5C45", lineHeight: "1.8" }}
            >
              {product.description}
            </p>

            {/* Free shipping banner */}
            <div
              className="flex items-center gap-3 px-4 py-3 mb-8"
              style={{
                backgroundColor: "#F0EAE0",
                borderLeft: "2px solid #D8C3A5",
                borderRadius: "1px",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                <path d="M1 4h9v7H1zM10 6l3 1.5V11h-3V6z" stroke="#7A5C45" strokeWidth="1.2" strokeLinejoin="round" />
                <circle cx="3.5" cy="11.5" r="1" stroke="#7A5C45" strokeWidth="1.2" />
                <circle cx="11.5" cy="11.5" r="1" stroke="#7A5C45" strokeWidth="1.2" />
              </svg>
              <span className="text-xs tracking-wide" style={{ color: "#7A5C45" }}>
                Miễn phí vận chuyển đơn từ <strong style={{ color: "#1F1F1F" }}>500K</strong>
              </span>
            </div>

            {/* Client-side actions */}
            <ProductActions
              productId={product.id}
              productName={product.name}
              productSlug={product.slug}
              price={product.salePrice || product.price}
              image={images[0] || ""}
              colors={colors.map(([name, hex]) => ({ name, hex }))}
              sizes={sizes}
              variants={product.variants}
            />

            {/* Material */}
            {product.material && (
              <div className="mt-8 pt-6" style={{ borderTop: "1px solid #E8E0D8" }}>
                <h3
                  className="text-xs tracking-widest uppercase mb-2"
                  style={{ color: "#7A5C45" }}
                >
                  Chất liệu
                </h3>
                <p className="text-sm" style={{ color: "#7A5C45" }}>
                  {product.material}
                </p>
              </div>
            )}

            {/* Care instructions */}
            <div className="mt-6 pt-6" style={{ borderTop: "1px solid #E8E0D8" }}>
              <h3
                className="text-xs tracking-widest uppercase mb-4"
                style={{ color: "#7A5C45" }}
              >
                Hướng dẫn bảo quản
              </h3>
              <ul className="flex flex-col gap-2.5">
                {careInstructions.map((item) => (
                  <li key={item.label} className="flex items-center gap-3">
                    <span
                      className="text-xs w-4 text-center select-none"
                      style={{ color: "#D8C3A5" }}
                      aria-hidden="true"
                    >
                      {item.icon}
                    </span>
                    <span className="text-sm" style={{ color: "#7A5C45" }}>
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping & returns */}
            <div className="mt-6 pt-6" style={{ borderTop: "1px solid #E8E0D8" }}>
              <h3
                className="text-xs tracking-widest uppercase mb-4"
                style={{ color: "#7A5C45" }}
              >
                Vận chuyển &amp; Đổi trả
              </h3>
              <ul className="flex flex-col gap-2">
                {[
                  "Miễn phí vận chuyển đơn từ 500.000đ",
                  "Đổi trả trong 30 ngày",
                  "Giao hàng 2–5 ngày làm việc",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "#7A5C45" }}>
                    <span style={{ color: "#D8C3A5", marginTop: "2px" }} aria-hidden="true">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Related products ── */}
        {related.length > 0 && (
          <section className="mt-24" aria-labelledby="related-heading">
            {/* Section divider */}
            <div className="flex items-center gap-6 mb-10">
              <div className="flex-1" style={{ height: "1px", backgroundColor: "#E8E0D8" }} />
              <h2
                id="related-heading"
                className="font-serif font-light text-xl tracking-wide whitespace-nowrap"
                style={{ color: "#1F1F1F" }}
              >
                Sản phẩm liên quan
              </h2>
              <div className="flex-1" style={{ height: "1px", backgroundColor: "#E8E0D8" }} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {related.map((p) => {
                const pColors = [...new Map(p.variants.map((v) => [v.color, v.colorHex])).entries()];
                const pDiscount = p.salePrice
                  ? Math.round((1 - p.salePrice / p.price) * 100)
                  : null;
                return (
                  <Link
                    key={p.id}
                    href={`/products/${p.slug}`}
                    className="group block"
                    aria-label={p.name}
                  >
                    {/* Image */}
                    <div
                      className="aspect-[3/4] mb-3 overflow-hidden relative"
                      style={{ borderRadius: "1px" }}
                    >
                      <div
                        className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                        style={{
                          background:
                            "linear-gradient(150deg, #EDE3D8 0%, #D8C3A5 50%, #B08F6A 100%)",
                        }}
                      />
                      <div
                        className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                        style={{
                          background:
                            "radial-gradient(ellipse at 40% 30%, rgba(255,255,255,0.2) 0%, transparent 60%)",
                        }}
                      />
                      {pDiscount && (
                        <div
                          className="absolute top-2.5 left-2.5 text-xs font-medium px-1.5 py-0.5"
                          style={{
                            backgroundColor: "#1F1F1F",
                            color: "#FAF7F2",
                            borderRadius: "1px",
                          }}
                        >
                          -{pDiscount}%
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <h3
                      className="text-sm font-medium line-clamp-1 mb-1 transition-colors duration-200 group-hover:opacity-70"
                      style={{ color: "#1F1F1F" }}
                    >
                      {p.name}
                    </h3>

                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-sm font-medium" style={{ color: "#1F1F1F" }}>
                        {formatPrice(p.salePrice || p.price)}
                      </span>
                      {p.salePrice && (
                        <span className="text-xs line-through" style={{ color: "#D8C3A5" }}>
                          {formatPrice(p.price)}
                        </span>
                      )}
                    </div>

                    {pColors.length > 0 && (
                      <div className="flex gap-1.5">
                        {pColors.map(([name, hex]) => (
                          <span
                            key={name}
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: hex,
                              boxShadow: "0 0 0 1px rgba(0,0,0,0.12)",
                            }}
                            title={name}
                            aria-label={name}
                          />
                        ))}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
