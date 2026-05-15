"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface ProductTabsProps {
  description: string;
  material?: string;
  careInstructions?: string;
}

export function ProductTabs({ description, material, careInstructions }: ProductTabsProps) {
  const [active, setActive] = useState(0);

  const tabs = [
    { label: "Mô tả", content: description },
    {
      label: "Chất liệu",
      content: material || "Cotton cao cấp, co giãn 4 chiều. Chứng nhận Oeko-Tex Standard 100.",
    },
    {
      label: "Hướng dẫn bảo quản",
      content: careInstructions || `• Giặt máy ở nhiệt độ dưới 40°C
• Không sử dụng chất tẩy
• Phơi trong bóng râm
• Không sấy khô ở nhiệt độ cao
• Ủi ở nhiệt độ thấp nếu cần`,
    },
  ];

  return (
    <div>
      {/* Tab headers */}
      <div className="flex border-b border-border">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`px-5 py-3 text-xs tracking-[0.1em] uppercase transition-colors border-b-2 -mb-px ${
              active === i
                ? "text-foreground border-foreground font-medium"
                : "text-muted border-transparent hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-6 text-sm text-muted leading-relaxed whitespace-pre-line">
        {tabs[active].content}
      </div>
    </div>
  );
}

// Star rating display
export function StarRating({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={star <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-border"}
          />
        ))}
      </div>
      {count !== undefined && (
        <span className="text-xs text-muted">({count} đánh giá)</span>
      )}
    </div>
  );
}
