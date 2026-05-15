"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface ReviewSummaryProps {
  averageRating: number;
  totalReviews: number;
  distribution: { stars: number; count: number }[];
}

export function ReviewSummary({ averageRating, totalReviews, distribution }: ReviewSummaryProps) {
  const [filterStar, setFilterStar] = useState<number | null>(null);

  return (
    <div className="flex flex-col sm:flex-row gap-8 py-6 border-b border-border">
      <div className="flex flex-col items-center justify-center min-w-[120px]">
        <span className="text-4xl font-serif font-bold text-foreground">
          {averageRating.toFixed(1)}
        </span>
        <div className="flex gap-0.5 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < Math.round(averageRating) ? "fill-foreground text-foreground" : "text-border"}
            />
          ))}
        </div>
        <span className="text-xs text-muted mt-1">{totalReviews} đánh giá</span>
      </div>

      <div className="flex-1 space-y-2">
        {distribution.map(({ stars, count }) => {
          const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
          return (
            <button
              key={stars}
              onClick={() => setFilterStar(filterStar === stars ? null : stars)}
              className={`flex items-center gap-3 w-full group ${
                filterStar === stars ? "opacity-100" : filterStar ? "opacity-40" : "opacity-100"
              }`}
            >
              <span className="text-xs text-muted w-12">{stars} sao</span>
              <div className="flex-1 h-2 bg-card overflow-hidden">
                <div
                  className="h-full bg-foreground transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-xs text-muted w-8 text-right">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
