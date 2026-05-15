"use client";

import { CreditCard, Banknote, Smartphone, Building2 } from "lucide-react";

interface PaymentMethod {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const METHODS: PaymentMethod[] = [
  { id: "COD", label: "Thanh toán khi nhận hàng", description: "Trả tiền mặt cho shipper", icon: Banknote },
  { id: "BANK", label: "Chuyển khoản ngân hàng", description: "Vietcombank, Techcombank, MB Bank", icon: Building2 },
  { id: "EWALLET", label: "Ví điện tử", description: "MoMo, ZaloPay, VNPay", icon: Smartphone },
  { id: "CARD", label: "Thẻ tín dụng / ghi nợ", description: "Visa, Mastercard", icon: CreditCard },
];

interface PaymentMethodSelectorProps {
  selected: string;
  onSelect: (method: string) => void;
}

export function PaymentMethodSelector({ selected, onSelect }: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-2">
      {METHODS.map((method) => {
        const Icon = method.icon;
        const isActive = selected === method.id;
        return (
          <button
            key={method.id}
            onClick={() => onSelect(method.id)}
            className={`w-full flex items-center gap-4 p-4 border transition-colors text-left ${
              isActive
                ? "border-foreground bg-card"
                : "border-border hover:border-foreground/50"
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              isActive ? "bg-foreground text-background" : "bg-card text-muted"
            }`}>
              <Icon size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{method.label}</p>
              <p className="text-xs text-muted mt-0.5">{method.description}</p>
            </div>
            <div className={`w-4 h-4 rounded-full border-2 shrink-0 ${
              isActive ? "border-foreground bg-foreground" : "border-border"
            }`}>
              {isActive && <div className="w-full h-full rounded-full bg-foreground ring-2 ring-background ring-inset" />}
            </div>
          </button>
        );
      })}
    </div>
  );
}
