"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Truck, Shield, RotateCcw, CreditCard } from "lucide-react";

const FEATURES = [
  {
    icon: Truck,
    title: "Miễn phí vận chuyển",
    description: "Cho đơn hàng từ 500.000đ",
  },
  {
    icon: Shield,
    title: "Bảo hành chất lượng",
    description: "Cam kết hàng chính hãng",
  },
  {
    icon: RotateCcw,
    title: "Đổi trả 30 ngày",
    description: "Đổi trả miễn phí trong 30 ngày",
  },
  {
    icon: CreditCard,
    title: "Thanh toán an toàn",
    description: "Bảo mật thông tin 100%",
  },
];

export function TrustFeatures() {
  return (
    <section className="py-12 border-t border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <feature.icon size={24} className="text-foreground mb-3" strokeWidth={1.5} />
              <h3 className="text-xs font-medium tracking-wide text-foreground">{feature.title}</h3>
              <p className="text-xs text-muted mt-1">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
