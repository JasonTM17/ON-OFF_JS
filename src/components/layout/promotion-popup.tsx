"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Percent } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Promotion {
  id: string;
  title: string;
  description: string;
  code?: string;
  href?: string;
}

const PROMOTIONS: Promotion[] = [
  {
    id: "welcome",
    title: "Giảm 10% cho đơn đầu tiên",
    description: "Dùng mã WELCOME10 khi thanh toán",
    code: "WELCOME10",
  },
  {
    id: "freeship",
    title: "Miễn phí ship từ 500K",
    description: "Áp dụng cho tất cả đơn hàng",
    href: "/products",
  },
];

export function PromotionPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem("promo-popup-shown");
    if (!shown) {
      const timer = setTimeout(() => setVisible(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem("promo-popup-shown", "1");
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
          />
          <motion.div
            className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-sm bg-background border border-border shadow-xl"
            initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
          >
            <button
              onClick={dismiss}
              className="absolute top-3 right-3 p-1 text-muted hover:text-foreground transition-colors"
              aria-label="Đóng"
            >
              <X size={16} />
            </button>

            <div className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                <Percent size={20} className="text-foreground" />
              </div>
              <h3 className="font-serif text-xl font-light text-foreground mb-2">
                Ưu đãi dành cho bạn
              </h3>

              <div className="space-y-3 mt-5">
                {PROMOTIONS.map((promo) => (
                  <div key={promo.id} className="p-3 border border-border text-left">
                    <p className="text-sm font-medium text-foreground">{promo.title}</p>
                    <p className="text-xs text-muted mt-0.5">{promo.description}</p>
                    {promo.code && (
                      <span className="inline-block mt-2 px-2 py-0.5 bg-card text-xs font-mono tracking-wider text-foreground border border-border">
                        {promo.code}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <Link
                href="/products"
                onClick={dismiss}
                className="inline-flex items-center justify-center w-full h-11 mt-5 bg-foreground text-background text-xs tracking-[0.12em] uppercase hover:bg-muted transition-colors"
              >
                Mua sắm ngay
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
