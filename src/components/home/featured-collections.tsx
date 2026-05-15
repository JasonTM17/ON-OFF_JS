"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface CollectionCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface FeaturedCollectionsProps {
  collections: CollectionCardProps[];
}

export function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-2xl md:text-3xl text-center mb-3">Bộ sưu tập nổi bật</h2>
        <p className="text-sm text-muted text-center mb-10">Khám phá phong cách mới nhất</p>

        <div className="grid md:grid-cols-3 gap-4">
          {collections.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Link href={col.link} className="group block relative overflow-hidden">
                <div className="aspect-[4/5] bg-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-serif text-xl">{col.title}</h3>
                  <p className="text-xs opacity-80 mt-1">{col.description}</p>
                  <span className="inline-block mt-3 text-xs tracking-wide border-b border-white/50 pb-0.5 group-hover:border-white transition-colors">
                    Xem ngay
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
