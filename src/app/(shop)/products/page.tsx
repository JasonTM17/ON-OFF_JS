import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/product/product-card";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { MobileFilterToggle } from "@/components/product/mobile-filter-toggle";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Tất cả sản phẩm",
  description:
    "Khám phá toàn bộ bộ sưu tập đồ lót & đồ mặc nhà cao cấp ON/OFF — Quần lót, áo lót, đồ mặc nhà cho nam và nữ. Chất liệu tự nhiên, thiết kế tối giản.",
  openGraph: {
    title: "Tất cả sản phẩm | ON/OFF",
    description:
      "Khám phá toàn bộ bộ sưu tập đồ lót & đồ mặc nhà cao cấp ON/OFF — Quần lót, áo lót, đồ mặc nhà cho nam và nữ.",
    url: "https://onoff.vn/products",
  },
};

// CDN thumbnail images mapped by category slug (fallback to index-based)
const CATEGORY_THUMBS: Record<string, string> = {
  "quan-lot-nam":  "https://2885966831.e.cdneverest.net//catalog/category/nam-quanlot_1.webp",
  "quan-lot-nu":   "https://2885966831.e.cdneverest.net//catalog/category/nu-quanlot_1.webp",
  "quan-ao-nu":    "https://2885966831.e.cdneverest.net//catalog/category/nu-quanao_1.webp",
  "phu-kien-nam":  "https://2885966831.e.cdneverest.net//catalog/category/nam-phukien_1.webp",
  "ao-lot-nu":     "https://2885966831.e.cdneverest.net//catalog/category/nu-aolot_2.webp",
  "do-mac-nha":    "https://2885966831.e.cdneverest.net//catalog/category/nu-all_1.webp",
};
const FALLBACK_THUMBS = [
  "https://2885966831.e.cdneverest.net//catalog/category/nam-quanlot_1.webp",
  "https://2885966831.e.cdneverest.net//catalog/category/nu-quanlot_1.webp",
  "https://2885966831.e.cdneverest.net//catalog/category/nu-quanao_1.webp",
  "https://2885966831.e.cdneverest.net//catalog/category/nam-phukien_1.webp",
  "https://2885966831.e.cdneverest.net//catalog/category/nu-aolot_2.webp",
  "https://2885966831.e.cdneverest.net//catalog/category/nu-all_1.webp",
];

const PAGE_SIZE = 24;

interface Props {
  searchParams: Promise<{
    category?: string;
    gender?: string;
    sort?: string;
    q?: string;
    brand?: string;
    page?: string;
  }>;
}

const SORT_OPTIONS = [
  { label: "Mới nhất", value: "" },
  { label: "Giá thấp → cao", value: "price-asc" },
  { label: "Giá cao → thấp", value: "price-desc" },
  { label: "Đánh giá cao", value: "rating" },
];

const GENDER_OPTIONS = [
  { label: "Tất cả", value: "" },
  { label: "Nam", value: "nam" },
  { label: "Nữ", value: "nu" },
  { label: "Unisex", value: "unisex" },
];

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page ?? "1", 10));

  const where: Record<string, unknown> = {};
  if (params.category) {
    where.category = { slug: params.category };
  }
  if (params.gender) {
    where.category = { ...(where.category as object || {}), gender: params.gender };
  }
  if (params.q) {
    where.OR = [
      { name: { contains: params.q } },
      { description: { contains: params.q } },
    ];
  }

  const orderBy: Record<string, string> = {};
  switch (params.sort) {
    case "price-asc":  orderBy.price    = "asc";  break;
    case "price-desc": orderBy.price    = "desc"; break;
    case "rating":     orderBy.rating   = "desc"; break;
    default:           orderBy.createdAt = "desc";
  }

  const [products, totalCount, categories] = await Promise.all([
    db.product.findMany({
      where,
      include: { category: true, variants: true },
      orderBy,
      take: PAGE_SIZE * currentPage,
    }),
    db.product.count({ where }),
    db.category.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  const activeCategory = categories.find((c) => c.slug === params.category);
  const title =
    activeCategory?.name ||
    (params.gender === "nam" ? "Nam" : params.gender === "nu" ? "Nữ" : "Tất cả sản phẩm");

  const hasMore = products.length < totalCount;

  // Build next-page URL (keeps all current filters)
  const nextPageParams = new URLSearchParams({
    ...(params.category ? { category: params.category } : {}),
    ...(params.gender   ? { gender:   params.gender   } : {}),
    ...(params.sort     ? { sort:     params.sort     } : {}),
    ...(params.q        ? { q:        params.q        } : {}),
    page: String(currentPage + 1),
  });

  // Active filter chips
  const activeFilters: { label: string; removeHref: string }[] = [];
  if (params.category && activeCategory) {
    const sp = new URLSearchParams({
      ...(params.gender ? { gender: params.gender } : {}),
      ...(params.sort   ? { sort:   params.sort   } : {}),
      ...(params.q      ? { q:      params.q      } : {}),
    });
    activeFilters.push({ label: activeCategory.name, removeHref: `/products?${sp}` });
  }
  if (params.gender) {
    const sp = new URLSearchParams({
      ...(params.category ? { category: params.category } : {}),
      ...(params.sort     ? { sort:     params.sort     } : {}),
      ...(params.q        ? { q:        params.q        } : {}),
    });
    activeFilters.push({
      label: params.gender === "nam" ? "Nam" : params.gender === "nu" ? "Nữ" : params.gender,
      removeHref: `/products?${sp}`,
    });
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Page header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Breadcrumb */}
          <nav className="text-xs text-muted mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-foreground transition-colors">
              Trang chủ
            </Link>
            <span className="text-border">/</span>
            <span className="text-foreground">{title}</span>
          </nav>

          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground">{title}</h1>
              {params.q && (
                <p className="text-sm text-muted mt-2">
                  Kết quả tìm kiếm cho &ldquo;<span className="text-foreground">{params.q}</span>&rdquo;
                </p>
              )}
            </div>
            <p className="text-sm text-muted shrink-0">{totalCount} sản phẩm</p>
          </div>

          {/* Active filter chips */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {activeFilters.map((f) => (
                <Link
                  key={f.label}
                  href={f.removeHref}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-foreground text-xs tracking-wide text-foreground hover:bg-foreground hover:text-background transition-colors duration-150"
                >
                  {f.label}
                  <X size={10} />
                </Link>
              ))}
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-wide text-muted hover:text-foreground transition-colors duration-150"
              >
                Xóa tất cả
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ── Category thumbnail strip ── */}
      {categories.length > 0 && (
        <div className="border-b border-border bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-0 overflow-x-auto scrollbar-hide -mx-1">
              {/* "Tất cả" tile */}
              <Link
                href={`/products?${new URLSearchParams({
                  ...(params.gender ? { gender: params.gender } : {}),
                  ...(params.sort   ? { sort:   params.sort   } : {}),
                })}`}
                className={`group flex-shrink-0 flex flex-col items-center gap-2 px-4 py-4 transition-colors duration-150 ${
                  !params.category
                    ? "border-b-2 border-foreground"
                    : "border-b-2 border-transparent hover:border-accent"
                }`}
              >
                <div className="w-14 h-14 rounded-full overflow-hidden bg-accent/20 flex items-center justify-center border-2 border-border group-hover:border-foreground transition-colors duration-150">
                  <span className="text-[10px] font-semibold tracking-wide text-muted group-hover:text-foreground transition-colors">ALL</span>
                </div>
                <span className={`text-[11px] tracking-wide whitespace-nowrap ${!params.category ? "font-semibold text-foreground" : "text-muted group-hover:text-foreground"}`}>
                  Tất cả
                </span>
              </Link>

              {categories.map((cat, i) => {
                const thumb = CATEGORY_THUMBS[cat.slug] ?? FALLBACK_THUMBS[i % FALLBACK_THUMBS.length];
                const isActive = params.category === cat.slug;
                const href = `/products?${new URLSearchParams({
                  category: cat.slug,
                  ...(params.gender ? { gender: params.gender } : {}),
                  ...(params.sort   ? { sort:   params.sort   } : {}),
                })}`;
                return (
                  <Link
                    key={cat.id}
                    href={href}
                    className={`group flex-shrink-0 flex flex-col items-center gap-2 px-4 py-4 transition-colors duration-150 ${
                      isActive
                        ? "border-b-2 border-foreground"
                        : "border-b-2 border-transparent hover:border-accent"
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-full overflow-hidden border-2 transition-colors duration-150 ${
                      isActive ? "border-foreground" : "border-border group-hover:border-foreground"
                    }`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={thumb}
                        alt={cat.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <span className={`text-[11px] tracking-wide whitespace-nowrap ${
                      isActive ? "font-semibold text-foreground" : "text-muted group-hover:text-foreground"
                    }`}>
                      {cat.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* ── Sidebar ── */}
          <aside className="w-full lg:w-56 shrink-0">
            <MobileFilterToggle>
              <div className="space-y-8">
                {/* Categories */}
                <div>
                  <h3 className="text-[10px] tracking-[0.2em] uppercase text-muted mb-4 font-medium flex items-center gap-2">
                    <SlidersHorizontal size={11} />
                    Danh mục
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href={`/products?${new URLSearchParams({
                          ...(params.gender ? { gender: params.gender } : {}),
                          ...(params.sort   ? { sort:   params.sort   } : {}),
                        })}`}
                        className={`text-sm transition-colors duration-150 ${
                          !params.category
                            ? "font-medium text-foreground"
                            : "text-muted hover:text-foreground"
                        }`}
                      >
                        Tất cả
                      </Link>
                    </li>
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <Link
                          href={`/products?${new URLSearchParams({
                            category: cat.slug,
                            ...(params.gender ? { gender: params.gender } : {}),
                            ...(params.sort   ? { sort:   params.sort   } : {}),
                          })}`}
                          className={`text-sm transition-colors duration-150 flex items-center justify-between group ${
                            params.category === cat.slug
                              ? "font-medium text-foreground"
                              : "text-muted hover:text-foreground"
                          }`}
                        >
                          <span>{cat.name}</span>
                          {params.category === cat.slug && (
                            <span className="w-1 h-1 rounded-full bg-foreground" />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="h-px bg-border" />

                {/* Gender */}
                <div>
                  <h3 className="text-[10px] tracking-[0.2em] uppercase text-muted mb-4 font-medium">
                    Giới tính
                  </h3>
                  <ul className="space-y-2">
                    {GENDER_OPTIONS.map((g) => (
                      <li key={g.value}>
                        <Link
                          href={`/products?${new URLSearchParams({
                            ...(params.category ? { category: params.category } : {}),
                            ...(g.value         ? { gender:   g.value         } : {}),
                            ...(params.sort     ? { sort:     params.sort     } : {}),
                          })}`}
                          className={`text-sm transition-colors duration-150 flex items-center justify-between ${
                            params.gender === g.value || (!params.gender && !g.value)
                              ? "font-medium text-foreground"
                              : "text-muted hover:text-foreground"
                          }`}
                        >
                          <span>{g.label}</span>
                          {(params.gender === g.value || (!params.gender && !g.value)) && (
                            <span className="w-1 h-1 rounded-full bg-foreground" />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="h-px bg-border" />

                {/* Sort */}
                <div>
                  <h3 className="text-[10px] tracking-[0.2em] uppercase text-muted mb-4 font-medium">
                    Sắp xếp
                  </h3>
                  <ul className="space-y-2">
                    {SORT_OPTIONS.map((s) => {
                      const href = `/products?${new URLSearchParams({
                        ...(params.category ? { category: params.category } : {}),
                        ...(params.gender   ? { gender:   params.gender   } : {}),
                        ...(s.value         ? { sort:     s.value         } : {}),
                      })}`;
                      const isActive = params.sort === s.value || (!params.sort && !s.value);
                      return (
                        <li key={s.value}>
                          <Link
                            href={href}
                            className={`text-sm transition-colors duration-150 flex items-center justify-between ${
                              isActive
                                ? "font-medium text-foreground"
                                : "text-muted hover:text-foreground"
                            }`}
                          >
                            <span>{s.label}</span>
                            {isActive && (
                              <span className="w-1 h-1 rounded-full bg-foreground" />
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </MobileFilterToggle>
          </aside>

          {/* ── Product grid ── */}
          <div className="flex-1 min-w-0">
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <p className="font-serif text-3xl font-light mb-3 text-foreground">
                  Không tìm thấy sản phẩm
                </p>
                <p className="text-sm text-muted mb-8">
                  Thử thay đổi bộ lọc hoặc xem tất cả sản phẩm
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-8 h-11 border border-foreground text-sm tracking-[0.1em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors duration-200"
                >
                  Xem tất cả
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-12">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load-more footer */}
                <div className="mt-16 flex flex-col items-center gap-5">
                  <p className="text-xs text-muted tracking-wide">
                    Hiển thị{" "}
                    <span className="text-foreground font-medium">{products.length}</span>
                    {" "}trên tổng số{" "}
                    <span className="text-foreground font-medium">{totalCount}</span>
                    {" "}sản phẩm
                  </p>

                  {/* Progress bar */}
                  <div className="w-48 h-px bg-border relative overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-foreground transition-all duration-500"
                      style={{ width: `${Math.min(100, (products.length / totalCount) * 100)}%` }}
                    />
                  </div>

                  {hasMore && (
                    <Link
                      href={`/products?${nextPageParams}`}
                      className="inline-flex items-center gap-2 px-10 h-11 border border-foreground text-xs tracking-[0.15em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors duration-200"
                    >
                      Xem thêm
                      <ChevronDown size={13} />
                    </Link>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
