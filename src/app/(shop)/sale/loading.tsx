import { Skeleton } from "@/components/ui/skeleton";

export default function SaleLoading() {
  return (
    <div className="bg-background min-h-screen">
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col items-center gap-6">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-12 w-48 rounded-none" />
          <Skeleton className="h-3 w-20" />
          <div className="flex items-center gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-5">
                <div className="flex flex-col items-center gap-1">
                  <Skeleton className="h-10 w-12 rounded-none" />
                  <Skeleton className="h-2 w-8" />
                </div>
                {i < 3 && <Skeleton className="h-6 w-2 mb-4" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-baseline justify-between mb-8">
          <Skeleton className="h-3 w-48" />
          <Skeleton className="h-3 w-20" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="aspect-[3/4] w-full rounded-none mb-3" />
              <Skeleton className="h-4 w-3/4 mb-1.5" />
              <Skeleton className="h-3 w-1/2 mb-1.5" />
              <div className="flex items-baseline gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
