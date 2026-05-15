"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface BrandStoryProps {
  compact?: boolean;
}

export function BrandStory({ compact = false }: BrandStoryProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs tracking-[0.3em] text-muted mb-4">CÂU CHUYỆN THƯƠNG HIỆU</p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight">
              Thời trang tối giản,<br />phong cách tối đa
            </h2>
            <p className="mt-6 text-sm text-muted leading-relaxed max-w-md">
              ON/OFF ra đời với sứ mệnh mang đến những sản phẩm thời trang chất lượng cao,
              thiết kế tối giản nhưng tinh tế. Chúng tôi tin rằng phong cách không cần phô trương —
              sự đơn giản chính là đỉnh cao của sự tinh tế.
            </p>
            {!compact && (
              <p className="mt-4 text-sm text-muted leading-relaxed max-w-md">
                Mỗi sản phẩm được chọn lọc kỹ lưỡng về chất liệu, form dáng và chi tiết hoàn thiện,
                đảm bảo mang lại trải nghiệm tốt nhất cho khách hàng.
              </p>
            )}
            <Link
              href="/about"
              className="inline-block mt-8 px-8 py-3 border border-foreground text-sm tracking-wide hover:bg-foreground hover:text-background transition-colors"
            >
              Tìm hiểu thêm
            </Link>
          </motion.div>

          <motion.div
            className="relative aspect-[4/5] bg-card overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://2885966831.e.cdneverest.net/media/catalog/category/banner_brand_story.jpg"
              alt="ON/OFF Brand Story"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
