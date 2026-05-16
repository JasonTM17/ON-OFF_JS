import { Skeleton } from "@/components/ui/skeleton";

export default function WishlistLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 space-y-2">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="block">
            <Skeleton className="aspect-[2/3] w-full mb-3 rounded-none" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3.5 w-1/3 mb-2" />
            <div className="flex gap-1.5 mt-2">
              <Skeleton className="w-3 h-3 rounded-full" />
              <Skeleton className="w-3 h-3 rounded-full" />
              <Skeleton className="w-3 h-3 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
