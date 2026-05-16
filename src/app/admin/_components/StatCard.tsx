"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
}

export function StatCard({ label, value, change, icon }: StatCardProps) {
  const getTrend = () => {
    if (!change) return { icon: Minus, color: "text-muted", label: "0%" };
    if (change > 0) return { icon: TrendingUp, color: "text-green-600", label: `+${change}%` };
    return { icon: TrendingDown, color: "text-red-600", label: `${change}%` };
  };

  const trend = getTrend();
  const TrendIcon = trend.icon;

  return (
    <motion.div
      className="border border-border p-5 hover:border-foreground/30 transition-colors"
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted tracking-wide">{label}</p>
          <p className="text-2xl font-serif mt-2">{value}</p>
        </div>
        {icon && <div className="text-muted">{icon}</div>}
      </div>
      {change !== undefined && (
        <div className={`flex items-center gap-1 mt-3 ${trend.color}`}>
          <TrendIcon size={12} />
          <span className="text-[10px]">{trend.label} so với tháng trước</span>
        </div>
      )}
    </motion.div>
  );
}
