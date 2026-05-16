import { Skeleton } from "@/components/ui/skeleton";

export default function AddressesLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-9 w-36" />
      </div>

      <div className="flex gap-6 border-b border-border mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-16 mb-3" />
        ))}
      </div>

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="border border-border p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-32" />
                  {i === 0 && <Skeleton className="h-5 w-16" />}
                </div>
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="h-3.5 w-64" />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-3.5 w-16" />
                <Skeleton className="h-3.5 w-20" />
                <Skeleton className="h-3.5 w-8" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-8 border-t border-border">
        <Skeleton className="h-4 w-36" />
      </div>
    </div>
  );
}
