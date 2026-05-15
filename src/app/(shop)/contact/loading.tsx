import { Skeleton } from "@/components/ui/skeleton";

export default function ContactLoading() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-2" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-4 w-72" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info column */}
          <div className="space-y-8">
            {/* Info items */}
            <div>
              <Skeleton className="h-6 w-44 mb-6" />
              <div className="space-y-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                    <div className="space-y-1.5 flex-1">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-3.5 w-36" />
                      {i === 1 && <Skeleton className="h-3 w-28" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Store locations */}
            <div>
              <Skeleton className="h-6 w-24 mb-4" />
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="p-4 border border-border space-y-1.5">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-56" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form column */}
          <div>
            <Skeleton className="h-6 w-36 mb-6" />
            <div className="space-y-5">
              {/* Name, email, phone, subject fields */}
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-11 w-full rounded-none" />
                </div>
              ))}
              {/* Textarea */}
              <div className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-32 w-full rounded-none" />
              </div>
              {/* Submit */}
              <Skeleton className="h-12 w-full rounded-none" />
              <Skeleton className="h-3 w-64 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
