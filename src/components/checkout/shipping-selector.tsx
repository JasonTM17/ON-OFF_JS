"use client";

import { motion } from "framer-motion";
import { Truck } from "lucide-react";

interface ShippingOption {
  id: string;
  label: string;
  description: string;
  price: number;
  estimatedDays: string;
}

const OPTIONS: ShippingOption[] = [
  {
    id: "standard",
    label: "Giao hàng tiêu chuẩn",
    description: "Giao hàng trong 3-5 ngày làm việc",
    price: 30000,
    estimatedDays: "3-5 ngày",
  },
  {
    id: "express",
    label: "Giao hàng nhanh",
    description: "Giao hàng trong 1-2 ngày làm việc",
    price: 50000,
    estimatedDays: "1-2 ngày",
  },
  {
    id: "same-day",
    label: "Giao trong ngày",
    description: "Nhận hàng trong ngày (nội thành HCM, HN)",
    price: 80000,
    estimatedDays: "Trong ngày",
  },
];

interface ShippingSelectorProps {
  selected: string;
  onChange: (id: string, price: number) => void;
  freeShippingEligible?: boolean;
}

export function ShippingSelector({ selected, onChange, freeShippingEligible = false }: ShippingSelectorProps) {
  const formatPrice = (n: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="space-y-3">
      {OPTIONS.map((option) => {
        const isSelected = selected === option.id;
        const isFree = freeShippingEligible && option.id === "standard";
        return (
          <motion.button
            key={option.id}
            onClick={() => onChange(option.id, isFree ? 0 : option.price)}
            className={`w-full flex items-center gap-4 p-4 border text-left transition-colors ${
              isSelected ? "border-foreground bg-card" : "border-border hover:border-foreground/30"
            }`}
            whileTap={{ scale: 0.99 }}
          >
            <Truck size={18} className={isSelected ? "text-foreground" : "text-muted"} />
            <div className="flex-1">
              <p className={`text-sm ${isSelected ? "font-medium" : ""}`}>{option.label}</p>
              <p className="text-xs text-muted mt-0.5">{option.description}</p>
            </div>
            <div className="text-right">
              {isFree ? (
                <span className="text-xs text-green-600 font-medium">Miễn phí</span>
              ) : (
                <span className="text-xs">{formatPrice(option.price)}</span>
              )}
              <p className="text-[10px] text-muted mt-0.5">{option.estimatedDays}</p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
