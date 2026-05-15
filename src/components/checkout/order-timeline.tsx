"use client";

import { Package, Truck, CheckCircle, Clock, XCircle } from "lucide-react";

interface OrderTimelineProps {
  status: string;
  createdAt: string;
}

const STEPS = [
  { key: "PENDING", label: "Đặt hàng", icon: Clock },
  { key: "CONFIRMED", label: "Xác nhận", icon: Package },
  { key: "SHIPPING", label: "Đang giao", icon: Truck },
  { key: "DELIVERED", label: "Đã giao", icon: CheckCircle },
];

export function OrderTimeline({ status, createdAt }: OrderTimelineProps) {
  if (status === "CANCELLED") {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100">
        <XCircle size={20} className="text-red-500" />
        <div>
          <p className="text-sm font-medium text-red-700">Đơn hàng đã bị hủy</p>
          <p className="text-xs text-red-500 mt-0.5">
            Đặt lúc {new Date(createdAt).toLocaleDateString("vi-VN")}
          </p>
        </div>
      </div>
    );
  }

  const currentIndex = STEPS.findIndex((s) => s.key === status);

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        {STEPS.map((step, i) => {
          const isCompleted = i <= currentIndex;
          const isCurrent = i === currentIndex;
          const Icon = step.icon;

          return (
            <div key={step.key} className="flex flex-col items-center relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                  isCompleted
                    ? "bg-foreground border-foreground text-background"
                    : "bg-background border-border text-muted"
                } ${isCurrent ? "ring-2 ring-accent ring-offset-2" : ""}`}
              >
                <Icon size={16} />
              </div>
              <span
                className={`text-[10px] mt-2 tracking-wide ${
                  isCompleted ? "text-foreground font-medium" : "text-muted"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress line */}
      <div className="absolute top-5 left-5 right-5 h-0.5 bg-border -z-0">
        <div
          className="h-full bg-foreground transition-all duration-500"
          style={{ width: `${(currentIndex / (STEPS.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}
