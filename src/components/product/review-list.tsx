"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ThumbsUp, Flag } from "lucide-react";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
  helpful: number;
  verified: boolean;
  size?: string;
}

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  const [sortBy, setSortBy] = useState<"newest" | "highest" | "lowest">("newest");

  const sorted = [...reviews].sort((a, b) => {
    if (sortBy === "highest") return b.rating - a.rating;
    if (sortBy === "lowest") return a.rating - b.rating;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs text-muted">{reviews.length} đánh giá</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="text-xs border border-border bg-transparent px-3 py-1.5 text-muted focus:outline-none"
        >
          <option value="newest">Mới nhất</option>
          <option value="highest">Cao nhất</option>
          <option value="lowest">Thấp nhất</option>
        </select>
      </div>

      <div className="space-y-6">
        {sorted.map((review) => (
          <motion.div
            key={review.id}
            className="pb-6 border-b border-border last:border-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{review.author}</span>
                  {review.verified && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700">
                      Đã mua hàng
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={11}
                        className={i < review.rating ? "fill-foreground text-foreground" : "text-border"}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted">{review.date}</span>
                </div>
              </div>
              {review.size && (
                <span className="text-xs text-muted">Size: {review.size}</span>
              )}
            </div>

            <p className="mt-3 text-sm text-muted leading-relaxed">{review.content}</p>

            <div className="mt-3 flex items-center gap-4">
              <button className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors">
                <ThumbsUp size={12} />
                <span>Hữu ích ({review.helpful})</span>
              </button>
              <button className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors">
                <Flag size={12} />
                <span>Báo cáo</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
