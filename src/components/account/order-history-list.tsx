"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Clock, CheckCircle, XCircle, Truck } from "lucide-react";
import Link from "next/link";

interface Order {
  id: string;
  orderCode: string;
  total: number;
  status: string;
  createdAt: string;
  itemCount: number;
  firstItemImage?: string;
}

interface OrderHistoryListProps {
  orders: Order[];
}

const STATUS_CONFIG: Record<string, { label: string; icon: typeof Package; color: string }> = {
  PENDING: { label: "Chờ xác nhận", icon: Clock, color: "text-amber-600" },
  CONFIRMED: { label: "Đã xác nhận", icon: Package, color: "text-blue-600" },
  SHIPPING: { label: "Đang giao", icon: Truck, color: "text-purple-600" },
  DELIVERED: { label: "Đã giao", icon: CheckCircle, color: "text-green-600" },
  CANCELLED: { label: "Đã hủy", icon: XCircle, color: "text-red-600" },
};

export function OrderHistoryList({ orders }: OrderHistoryListProps) {
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

  return (
    <div>
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { key: "all", label: "Tất cả" },
          { key: "PENDING", label: "Chờ xác nhận" },
          { key: "SHIPPING", label: "Đang giao" },
          { key: "DELIVERED", label: "Đã giao" },
          { key: "CANCELLED", label: "Đã hủy" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 text-xs whitespace-nowrap border transition-colors ${
              filter === tab.key
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted hover:text-foreground hover:border-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <Package size={32} className="mx-auto text-muted mb-3" />
          <p className="text-sm text-muted">Không có đơn hàng nào</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => {
            const config = STATUS_CONFIG[order.status] || STATUS_CONFIG.PENDING;
            const StatusIcon = config.icon;
            return (
              <motion.div
                key={order.id}
                className="border border-border hover:border-foreground/30 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Link href={`/orders/${order.id}`} className="block p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-muted">#{order.orderCode}</span>
                    <span className={`flex items-center gap-1.5 text-xs ${config.color}`}>
                      <StatusIcon size={12} />
                      {config.label}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {order.firstItemImage && (
                        <div className="w-12 h-14 bg-card overflow-hidden shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={order.firstItemImage} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm">{order.itemCount} sản phẩm</p>
                        <p className="text-xs text-muted mt-0.5">
                          {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium">{formatPrice(order.total)}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
