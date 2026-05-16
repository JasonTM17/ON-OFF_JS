"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface PromoBarProps {
  message?: string;
  link?: { label: string; href: string };
}

const DEFAULT_MESSAGE = "Miễn phí vận chuyển cho đơn hàng từ 500.000đ | Đổi trả trong 30 ngày";
const DEFAULT_LINK = { label: "Mua ngay", href: "/products" };

export function PromoBar({ message = DEFAULT_MESSAGE, link = DEFAULT_LINK }: PromoBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("promo-dismissed");
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem("promo-dismissed", "1");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-foreground text-background overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-center gap-4 relative">
            <p className="text-[11px] tracking-[0.1em] text-center">
              {message}
              {link && (
                <Link
                  href={link.href}
                  className="ml-3 underline underline-offset-4 hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              )}
            </p>
            <button
              onClick={dismiss}
              className="absolute right-4 p-1 text-background/50 hover:text-background transition-colors"
              aria-label="Đóng"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
