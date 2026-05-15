"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface ReviewFormProps {
  productId: string;
  onSubmit?: (data: { rating: number; comment: string }) => void;
}

export function ReviewForm({ productId, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    onSubmit?.({ rating, comment });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-foreground font-medium mb-1">Cảm ơn bạn đã đánh giá!</p>
        <p className="text-xs text-muted">Đánh giá của bạn sẽ được hiển thị sau khi duyệt.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs tracking-[0.1em] uppercase text-muted mb-2 font-medium">
          Đánh giá
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="p-0.5"
            >
              <Star
                size={20}
                className={`transition-colors ${
                  star <= (hover || rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-border"
                }`}
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="ml-2 text-xs text-muted self-center">
              {rating === 1 && "Tệ"}
              {rating === 2 && "Không tốt"}
              {rating === 3 && "Bình thường"}
              {rating === 4 && "Tốt"}
              {rating === 5 && "Tuyệt vời"}
            </span>
          )}
        </div>
      </div>

      <div>
        <label htmlFor={`review-${productId}`} className="block text-xs tracking-[0.1em] uppercase text-muted mb-2 font-medium">
          Nhận xét
        </label>
        <textarea
          id={`review-${productId}`}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
          className="w-full px-4 py-3 border border-border bg-transparent text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={rating === 0}
        className="px-6 h-10 bg-foreground text-background text-xs tracking-[0.1em] uppercase hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Gửi đánh giá
      </button>
    </form>
  );
}
