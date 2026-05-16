import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <div className="bg-background min-h-screen">
      {/* Page header skeleton */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <Skeleton variant="text" className="w-24 h-3 mb-4" />
          <Skeleton variant="text" className="w-48 h-8 mb-2" />
          <Skeleton variant="text" className="w-16 h-3" />
        </div>
      </div>

      {/* Category strip skeleton */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-6 overflow-hidden">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 shrink-0">
              <Skeleton variant="circular" className="w-14 h-14" />
              <Skeleton variant="text" className="w-12 h-2.5" />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar skeleton */}
          <aside className="hidden lg:block w-56 shrink-0 space-y-6">
            <Skeleton variant="text" className="w-20 h-3" />
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} variant="text" className="w-full h-3" />
            ))}
            <div className="h-px bg-border" />
            <Skeleton variant="text" className="w-16 h-3" />
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} variant="text" className="w-full h-3" />
            ))}
          </aside>

          {/* Product grid skeleton */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-12">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i}>
                  <Skeleton variant="card" className="aspect-[2/3] w-full mb-3" />
                  <Skeleton variant="text" className="w-3/4 mb-2" />
                  <Skeleton variant="text" className="h-3.5 w-1/3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
