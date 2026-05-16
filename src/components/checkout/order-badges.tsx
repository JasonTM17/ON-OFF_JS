"use client";

import { Truck, Shield, RotateCcw } from "lucide-react";

export function OrderSummaryBadges() {
  return (
    <div className="grid grid-cols-3 gap-3 py-4 border-t border-border">
      <div className="flex flex-col items-center text-center gap-1.5">
        <Truck size={16} className="text-muted" strokeWidth={1.5} />
        <span className="text-[10px] text-muted leading-tight">Miễn phí ship<br />từ 499.000đ</span>
      </div>
      <div className="flex flex-col items-center text-center gap-1.5">
        <RotateCcw size={16} className="text-muted" strokeWidth={1.5} />
        <span className="text-[10px] text-muted leading-tight">Đổi trả<br />30 ngày</span>
      </div>
      <div className="flex flex-col items-center text-center gap-1.5">
        <Shield size={16} className="text-muted" strokeWidth={1.5} />
        <span className="text-[10px] text-muted leading-tight">Thanh toán<br />bảo mật</span>
      </div>
    </div>
  );
}
