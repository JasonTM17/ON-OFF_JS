import { cn } from "@/lib/utils";

type SkeletonVariant = "text" | "circular" | "rectangular" | "card";

interface SkeletonProps {
  className?: string;
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className, variant = "rectangular", width, height }: SkeletonProps) {
  const style: React.CSSProperties = {};
  if (width !== undefined) style.width = typeof width === "number" ? `${width}px` : width;
  if (height !== undefined) style.height = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      style={style}
      className={cn(
        "animate-pulse bg-[#E8E0D8]",
        variant === "text" && "rounded-sm h-4",
        variant === "circular" && "rounded-full",
        variant === "rectangular" && "rounded-sm",
        variant === "card" && "rounded-none",
        className
      )}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="block">
      <Skeleton variant="card" className="aspect-[3/4] w-full mb-3" />
      <Skeleton variant="text" className="w-3/4 mb-2" />
      <Skeleton variant="text" className="h-3.5 w-1/3 mb-2" />
      <div className="flex gap-1.5 mt-2">
        <Skeleton variant="circular" className="w-3 h-3" />
        <Skeleton variant="circular" className="w-3 h-3" />
        <Skeleton variant="circular" className="w-3 h-3" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CartItemSkeleton() {
  return (
    <div className="flex gap-5 py-6">
      <Skeleton variant="card" className="w-24 h-32 shrink-0" />
      <div className="flex-1 space-y-3">
        <Skeleton variant="text" className="w-2/3" />
        <Skeleton variant="text" className="h-3 w-1/3" />
        <div className="flex items-center justify-between mt-4">
          <Skeleton variant="rectangular" className="h-8 w-24" />
          <Skeleton variant="text" className="w-16" />
        </div>
      </div>
    </div>
  );
}

export function ChatMessageSkeleton() {
  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex gap-2 items-end">
        <Skeleton variant="circular" className="w-7 h-7 shrink-0" />
        <Skeleton variant="rectangular" className="h-10 w-48 rounded-2xl rounded-bl-none" />
      </div>
      <div className="flex gap-2 items-end justify-end">
        <Skeleton variant="rectangular" className="h-8 w-32 rounded-2xl rounded-br-none" />
      </div>
      <div className="flex gap-2 items-end">
        <Skeleton variant="circular" className="w-7 h-7 shrink-0" />
        <Skeleton variant="rectangular" className="h-16 w-56 rounded-2xl rounded-bl-none" />
      </div>
    </div>
  );
}
