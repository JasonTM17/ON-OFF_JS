"use client";

import { formatPrice } from "@/lib/utils";

interface PriceDisplayProps {
  price: number;
  salePrice?: number | null;
  size?: "sm" | "md" | "lg";
}

export function PriceDisplay({ price, salePrice, size = "md" }: PriceDisplayProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  };

  const hasSale = salePrice && salePrice < price;
  const discount = hasSale ? Math.round((1 - salePrice / price) * 100) : 0;

  return (
    <div className="flex items-baseline gap-2 flex-wrap">
      <span className={`font-medium text-foreground ${sizeClasses[size]}`}>
        {formatPrice(hasSale ? salePrice : price)}
      </span>
      {hasSale && (
        <>
          <span className={`text-muted/60 line-through ${size === "lg" ? "text-sm" : "text-xs"}`}>
            {formatPrice(price)}
          </span>
          <span className={`text-red-500 font-medium ${size === "lg" ? "text-sm" : "text-[10px]"}`}>
            -{discount}%
          </span>
        </>
      )}
    </div>
  );
}
