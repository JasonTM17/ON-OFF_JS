import { Skeleton } from "@/components/ui/skeleton";

export default function AccountLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Page title */}
      <Skeleton className="h-9 w-36 mb-8" />

      {/* User info card */}
      <div className="border border-border p-6 mb-8">
        <Skeleton className="h-4 w-40 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-56" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>

      {/* Orders section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3.5 w-20" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border border-border p-4 space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-5 w-20" />
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="mt-8 pt-8 border-t border-border">
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}
