"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "sale" | "new" | "bestseller";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-foreground text-background",
    sale: "bg-red-600 text-white",
    new: "bg-emerald-700 text-white",
    bestseller: "bg-amber-700 text-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
