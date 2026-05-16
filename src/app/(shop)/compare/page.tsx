"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { ShoppingBag, X } from "lucide-react";

interface ProductDetail {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice: number | null;
  description: string;
  images: string[];
  category: { name: string; slug: string };
  variants: { size: string; color: string; colorHex: string; stock: number }[];
}

function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const [products, setProducts] = useState<(ProductDetail | null)[]>([]);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState<Record<string, boolean>>({});

  const rawIds = searchParams.get("ids") ?? "";
  const ids = rawIds
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean)
    .slice(0, 4);

  useEffect(() => {
    if (ids.length === 0) {
      setLoading(false);
      setProducts([]);
      return;
    }
    setLoading(true);
    Promise.all(
      ids.map((id) =>
        fetch(`/api/products/${id}`)
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null)
      )
    ).then((results) => {
      setProducts(results);
      setLoading(false);
    });
  }, [rawIds]);

  const removeProduct = (id: string) => {
    const next = ids.filter((i) => i !== id);
    if (next.length === 0) {
      router.push("/compare");
    } else {
      router.push(`/compare?ids=${next.join(",")}`);
    }
  };

  const handleAddToCart = (product: ProductDetail) => {
    const variant = product.variants.find((v) => v.stock > 0);
    if (!variant) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.salePrice ?? product.price,
      image: product.images[0] ?? "",
      size: variant.size,
      color: variant.color,
      colorHex: variant.colorHex,
      quantity: 1,
      slug: product.slug,
    });
    setAdded((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAdded((prev) => ({ ...prev, [product.id]: false })), 1800);
  };

  if (ids.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-center">
        <p className="font-serif text-3xl font-light text-foreground mb-3">
          Chưa có sản phẩm để so sánh
        </p>
        <p className="text-sm text-muted mb-8">
          Thêm sản phẩm vào danh sách so sánh từ trang sản phẩm
        </p>
        <Link
          href="/products"
          className="inline-flex items-center px-8 h-11 border border-foreground text-sm tracking-[0.1em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors duration-200"
        >
          Xem sản phẩm
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-40">
        <div className="w-6 h-6 border border-foreground border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const validProducts = products.filter(Boolean) as ProductDetail[];

  if (validProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-center">
        <p className="font-serif text-3xl font-light text-foreground mb-3">
          Không tìm thấy sản phẩm
        </p>
        <Link
          href="/products"
          className="inline-flex items-center px-8 h-11 border border-foreground text-sm tracking-[0.1em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors duration-200"
        >
          Xem sản phẩm
        </Link>
      </div>
    );
  }

  const ROWS: { label: string; key: string }[] = [
    { label: "Hình ảnh", key: "image" },
    { label: "Tên sản phẩm", key: "name" },
    { label: "Giá", key: "price" },
    { label: "Danh mục", key: "category" },
    { label: "Kích cỡ", key: "sizes" },
    { label: "Màu sắc", key: "colors" },
    { label: "Mô tả", key: "description" },
    { label: "", key: "action" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse min-w-[600px]">
        <colgroup>
          <col style={{ width: "9rem" }} />
          {validProducts.map((p) => (
            <col key={p.id} />
          ))}
        </colgroup>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.key} className="border-b border-border last:border-0">
              <td className="py-5 pr-6 text-[10px] tracking-[0.18em] uppercase text-muted align-top whitespace-nowrap">
                {row.label}
              </td>

              {validProducts.map((product) => {
                const sizes = [...new Set(product.variants.map((v) => v.size))];
                const colors = [
                  ...new Map(
                    product.variants.map((v) => [v.color, v.colorHex])
                  ).entries(),
                ];

                if (row.key === "image") {
                  return (
                    <td key={product.id} className="py-5 px-3 align-top">
                      <div className="relative">
                        <Link href={`/products/${product.slug}`}>
                          <div className="relative aspect-[3/4] w-full max-w-[160px] bg-card overflow-hidden">
                            {product.images[0] ? (
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                sizes="160px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-card" />
                            )}
                          </div>
                        </Link>
                        <button
                          onClick={() => removeProduct(product.id)}
                          className="absolute top-2 right-2 w-6 h-6 bg-background border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors duration-150"
                          aria-label="Xóa khỏi so sánh"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    </td>
                  );
                }

                if (row.key === "name") {
                  return (
                    <td key={product.id} className="py-5 px-3 align-top">
                      <Link
                        href={`/products/${product.slug}`}
                        className="font-serif text-base font-light text-foreground hover:text-muted transition-colors"
                      >
                        {product.name}
                      </Link>
                    </td>
                  );
                }

                if (row.key === "price") {
                  return (
                    <td key={product.id} className="py-5 px-3 align-top">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm text-foreground">
                          {formatPrice(product.salePrice ?? product.price)}
                        </span>
                        {product.salePrice && (
                          <span className="text-xs text-muted line-through">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>
                    </td>
                  );
                }

                if (row.key === "category") {
                  return (
                    <td
                      key={product.id}
                      className="py-5 px-3 align-top text-sm text-foreground"
                    >
                      {product.category.name}
                    </td>
                  );
                }

                if (row.key === "sizes") {
                  return (
                    <td key={product.id} className="py-5 px-3 align-top">
                      <div className="flex flex-wrap gap-1.5">
                        {sizes.map((s) => (
                          <span
                            key={s}
                            className="inline-flex items-center justify-center w-8 h-8 border border-border text-xs text-foreground"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                  );
                }

                if (row.key === "colors") {
                  return (
                    <td key={product.id} className="py-5 px-3 align-top">
                      <div className="flex flex-wrap gap-2">
                        {colors.map(([name, hex]) => (
                          <span
                            key={name}
                            className="w-5 h-5 rounded-full border border-border"
                            style={{ backgroundColor: hex }}
                            title={name}
                          />
                        ))}
                      </div>
                    </td>
                  );
                }

                if (row.key === "description") {
                  return (
                    <td
                      key={product.id}
                      className="py-5 px-3 align-top text-sm text-muted leading-relaxed"
                    >
                      <p className="line-clamp-4">{product.description}</p>
                    </td>
                  );
                }

                if (row.key === "action") {
                  return (
                    <td key={product.id} className="py-5 px-3 align-top">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`inline-flex items-center gap-2 px-4 h-10 border text-xs tracking-[0.1em] uppercase transition-colors duration-200 w-full justify-center ${
                          added[product.id]
                            ? "border-muted bg-muted text-background"
                            : "border-foreground text-foreground hover:bg-foreground hover:text-background"
                        }`}
                      >
                        <ShoppingBag size={12} />
                        {added[product.id] ? "Đã thêm!" : "Thêm vào giỏ"}
                      </button>
                    </td>
                  );
                }

                return <td key={product.id} />;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ComparePage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <nav className="text-xs text-muted mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-foreground transition-colors">
              Trang chủ
            </Link>
            <span className="text-border">/</span>
            <span className="text-foreground">So sánh sản phẩm</span>
          </nav>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground">
            So sánh sản phẩm
          </h1>
          <p className="text-sm text-muted mt-2">Tối đa 4 sản phẩm</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-40">
              <div className="w-6 h-6 border border-foreground border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <CompareContent />
        </Suspense>
      </div>
    </div>
  );
}
