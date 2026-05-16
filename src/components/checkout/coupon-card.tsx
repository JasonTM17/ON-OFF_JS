"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Percent, Clock, ShoppingBag } from "lucide-react";

interface CouponCardProps {
  code: string;
  description: string;
  discount: string;
  minOrder?: number;
  expiresAt: string;
  isUsed?: boolean;
  onApply?: (code: string) => void;
}

export function CouponCard({
  code,
  description,
  discount,
  minOrder,
  expiresAt,
  isUsed = false,
  onApply,
}: CouponCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

  return (
    <motion.div
      className={`border border-border overflow-hidden ${isUsed ? "opacity-50" : ""}`}
      whileHover={!isUsed ? { y: -2 } : undefined}
    >
      <div className="flex">
        <div className="w-24 bg-foreground flex flex-col items-center justify-center text-background p-3">
          <Percent size={18} className="mb-1" />
          <span className="text-lg font-bold leading-none">{discount}</span>
        </div>
        <div className="flex-1 p-4">
          <p className="text-sm font-medium text-foreground">{description}</p>
          <div className="flex items-center gap-3 mt-2">
            {minOrder && (
              <span className="flex items-center gap-1 text-[10px] text-muted">
                <ShoppingBag size={10} />
                Đơn tối thiểu {formatPrice(minOrder)}
              </span>
            )}
            <span className="flex items-center gap-1 text-[10px] text-muted">
              <Clock size={10} />
              HSD: {expiresAt}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="px-3 py-1 border border-dashed border-foreground/30 font-mono text-xs tracking-wider">
              {code}
            </span>
            {onApply && !isUsed ? (
              <button
                onClick={() => onApply(code)}
                className="px-3 py-1 bg-foreground text-background text-[10px] tracking-wide hover:opacity-90 transition-opacity"
              >
                Áp dụng
              </button>
            ) : (
              <button
                onClick={handleCopy}
                className="px-3 py-1 border border-border text-[10px] text-muted hover:text-foreground transition-colors"
              >
                {copied ? "Đã sao chép" : "Sao chép"}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
