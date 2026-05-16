import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="block">
      <Skeleton variant="card" className="aspect-[2/3] w-full mb-3" />
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

export function ProductCardSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
