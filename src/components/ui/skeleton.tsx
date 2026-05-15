import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-sm bg-[#E8E0D8]",
        className
      )}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="block">
      {/* Image */}
      <Skeleton className="aspect-[3/4] w-full mb-3 rounded-none" />
      {/* Name */}
      <Skeleton className="h-4 w-3/4 mb-2" />
      {/* Price */}
      <Skeleton className="h-3.5 w-1/3 mb-2" />
      {/* Color dots */}
      <div className="flex gap-1.5 mt-2">
        <Skeleton className="w-3 h-3 rounded-full" />
        <Skeleton className="w-3 h-3 rounded-full" />
        <Skeleton className="w-3 h-3 rounded-full" />
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
      <Skeleton className="w-24 h-32 shrink-0 rounded-none" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/3" />
        <div className="flex items-center justify-between mt-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

export function ChatMessageSkeleton() {
  return (
    <div className="flex flex-col gap-3 p-4">
      {/* Bot message */}
      <div className="flex gap-2 items-end">
        <Skeleton className="w-7 h-7 rounded-full shrink-0" />
        <Skeleton className="h-10 w-48 rounded-2xl rounded-bl-none" />
      </div>
      {/* User message */}
      <div className="flex gap-2 items-end justify-end">
        <Skeleton className="h-8 w-32 rounded-2xl rounded-br-none" />
      </div>
      {/* Bot message */}
      <div className="flex gap-2 items-end">
        <Skeleton className="w-7 h-7 rounded-full shrink-0" />
        <Skeleton className="h-16 w-56 rounded-2xl rounded-bl-none" />
      </div>
    </div>
  );
}
