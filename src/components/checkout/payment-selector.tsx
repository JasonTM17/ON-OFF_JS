"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Banknote, Smartphone, Building2 } from "lucide-react";

interface PaymentMethod {
  id: string;
  label: string;
  description: string;
  icon: typeof CreditCard;
}

const METHODS: PaymentMethod[] = [
  { id: "cod", label: "Thanh toán khi nhận hàng", description: "Thanh toán bằng tiền mặt khi nhận hàng", icon: Banknote },
  { id: "bank", label: "Chuyển khoản ngân hàng", description: "Chuyển khoản qua tài khoản ngân hàng", icon: Building2 },
  { id: "momo", label: "Ví MoMo", description: "Thanh toán qua ví điện tử MoMo", icon: Smartphone },
  { id: "card", label: "Thẻ tín dụng/ghi nợ", description: "Visa, Mastercard, JCB", icon: CreditCard },
];

interface PaymentSelectorProps {
  selected: string;
  onChange: (method: string) => void;
}

export function PaymentSelector({ selected, onChange }: PaymentSelectorProps) {
  return (
    <div className="space-y-3">
      {METHODS.map((method) => {
        const Icon = method.icon;
        const isSelected = selected === method.id;
        return (
          <motion.button
            key={method.id}
            onClick={() => onChange(method.id)}
            className={`w-full flex items-center gap-4 p-4 border text-left transition-colors ${
              isSelected ? "border-foreground bg-card" : "border-border hover:border-foreground/30"
            }`}
            whileTap={{ scale: 0.99 }}
          >
            <div className={`w-10 h-10 flex items-center justify-center border ${
              isSelected ? "border-foreground" : "border-border"
            }`}>
              <Icon size={18} className={isSelected ? "text-foreground" : "text-muted"} />
            </div>
            <div className="flex-1">
              <p className={`text-sm ${isSelected ? "font-medium text-foreground" : "text-foreground"}`}>
                {method.label}
              </p>
              <p className="text-xs text-muted mt-0.5">{method.description}</p>
            </div>
            <div className={`w-4 h-4 rounded-full border-2 ${
              isSelected ? "border-foreground bg-foreground" : "border-border"
            }`}>
              {isSelected && <div className="w-full h-full rounded-full bg-foreground flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-background" />
              </div>}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
