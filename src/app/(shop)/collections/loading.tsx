import { Skeleton } from "@/components/ui/skeleton";

export default function CollectionsLoading() {
  return (
    <div className="bg-background min-h-screen">
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <Skeleton className="h-3 w-48 mb-4" />
          <Skeleton className="h-10 w-56 rounded-none" />
          <Skeleton className="h-3 w-24 mt-2" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="aspect-[4/5] w-full rounded-none mb-4" />
              <div className="flex items-center justify-between">
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-3 w-16 ml-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
