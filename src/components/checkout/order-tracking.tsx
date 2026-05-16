"use client";

import { motion } from "framer-motion";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";

interface OrderTrackingProps {
  orderCode: string;
  status: "PENDING" | "CONFIRMED" | "SHIPPING" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
}

const STEPS = [
  { key: "PENDING", label: "Chờ xác nhận", icon: Clock },
  { key: "CONFIRMED", label: "Đã xác nhận", icon: Package },
  { key: "SHIPPING", label: "Đang giao hàng", icon: Truck },
  { key: "DELIVERED", label: "Đã giao", icon: CheckCircle },
];

export function OrderTracking({ orderCode, status, createdAt, updatedAt }: OrderTrackingProps) {
  const currentStep = STEPS.findIndex((s) => s.key === status);
  const isCancelled = status === "CANCELLED";

  return (
    <div className="p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs text-muted">Mã đơn hàng</p>
          <p className="text-sm font-mono font-medium mt-0.5">{orderCode}</p>
        </div>
        {isCancelled && (
          <span className="px-3 py-1 text-xs bg-red-50 text-red-600 border border-red-200">
            Đã hủy
          </span>
        )}
      </div>

      {!isCancelled && (
        <div className="relative">
          <div className="absolute top-5 left-5 right-5 h-0.5 bg-border" />
          <div
            className="absolute top-5 left-5 h-0.5 bg-foreground transition-all duration-500"
            style={{ width: `${(currentStep / (STEPS.length - 1)) * (100 - 10)}%` }}
          />

          <div className="relative flex justify-between">
            {STEPS.map((step, i) => {
              const isActive = i <= currentStep;
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.key}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      isActive
                        ? "bg-foreground border-foreground text-background"
                        : "bg-background border-border text-muted"
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                  <span className={`mt-2 text-[10px] text-center ${isActive ? "text-foreground font-medium" : "text-muted"}`}>
                    {step.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-border flex justify-between text-xs text-muted">
        <span>Đặt hàng: {new Date(createdAt).toLocaleDateString("vi-VN")}</span>
        <span>Cập nhật: {new Date(updatedAt).toLocaleDateString("vi-VN")}</span>
      </div>
    </div>
  );
}
