"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface WriteReviewFormProps {
  productId: string;
  productName: string;
  onSubmit: (data: { rating: number; comment: string }) => Promise<void>;
  onCancel: () => void;
}

export function WriteReviewForm({ productName, onSubmit, onCancel }: WriteReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    setLoading(true);
    try {
      await onSubmit({ rating, comment });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="border border-border p-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-sm font-medium mb-4">Đánh giá: {productName}</h3>

      <div className="mb-4">
        <p className="text-xs text-muted mb-2">Chất lượng sản phẩm</p>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onMouseEnter={() => setHoverRating(i + 1)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(i + 1)}
              className="p-0.5"
            >
              <Star
                size={20}
                className={`transition-colors ${
                  i < (hoverRating || rating)
                    ? "fill-foreground text-foreground"
                    : "text-border"
                }`}
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="text-xs text-muted ml-2 self-center">
              {["", "Rất tệ", "Tệ", "Bình thường", "Tốt", "Rất tốt"][rating]}
            </span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
          rows={4}
          className="w-full px-4 py-3 border border-border bg-transparent text-sm placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-colors resize-none"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-muted hover:text-foreground transition-colors"
        >
          Hủy
        </button>
        <button
          type="submit"
          disabled={rating === 0 || loading}
          className="px-6 h-10 bg-foreground text-background text-xs tracking-wide hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          {loading ? "Đang gửi..." : "Gửi đánh giá"}
        </button>
      </div>
    </motion.form>
  );
}
