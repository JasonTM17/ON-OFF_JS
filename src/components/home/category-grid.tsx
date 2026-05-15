"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface CategoryCardProps {
  name: string;
  slug: string;
  image: string;
  productCount?: number;
}

interface CategoryGridProps {
  categories: CategoryCardProps[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-2xl md:text-3xl text-center mb-10">Danh mục sản phẩm</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/products?category=${cat.slug}`} className="group block relative">
                <div className="aspect-[3/4] overflow-hidden bg-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-sm font-medium tracking-wide">{cat.name}</h3>
                  {cat.productCount !== undefined && (
                    <p className="text-xs opacity-70 mt-0.5">{cat.productCount} sản phẩm</p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
