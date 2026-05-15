import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/login");

  const products = await db.product.findMany({
    include: { category: true, variants: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl">Quản lý sản phẩm</h1>
        <Link href="/admin" className="text-sm text-muted hover:text-foreground">&larr; Dashboard</Link>
      </div>

      <div className="border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-accent/10">
              <th className="text-left p-3 font-medium">Sản phẩm</th>
              <th className="text-left p-3 font-medium">Danh mục</th>
              <th className="text-left p-3 font-medium">Giá</th>
              <th className="text-left p-3 font-medium">Tồn kho</th>
              <th className="text-left p-3 font-medium">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);
              return (
                <tr key={product.id} className="border-b border-border last:border-0 hover:bg-accent/5">
                  <td className="p-3">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-muted">{product.slug}</p>
                    </div>
                  </td>
                  <td className="p-3 text-muted">{product.category.name}</td>
                  <td className="p-3">
                    {product.salePrice ? (
                      <div>
                        <span className="text-red-600">{formatPrice(product.salePrice)}</span>
                        <span className="text-xs text-muted line-through ml-2">{formatPrice(product.price)}</span>
                      </div>
                    ) : (
                      formatPrice(product.price)
                    )}
                  </td>
                  <td className="p-3">{totalStock}</td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      {product.isFeatured && <span className="text-[10px] px-1.5 py-0.5 bg-blue-100 text-blue-800">Featured</span>}
                      {product.isNew && <span className="text-[10px] px-1.5 py-0.5 bg-emerald-100 text-emerald-800">New</span>}
                      {product.isBestseller && <span className="text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-800">Bestseller</span>}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
