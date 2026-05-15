import { Skeleton } from "@/components/ui/skeleton";

export default function FAQLoading() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-10 space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-2" />
            <Skeleton className="h-3 w-28" />
          </div>
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
      </div>

      {/* FAQ sections */}
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-12">
        {Array.from({ length: 4 }).map((_, sectionIdx) => (
          <div key={sectionIdx}>
            {/* Section title */}
            <div className="pb-2 border-b border-border mb-6">
              <Skeleton className="h-6 w-48" />
            </div>
            {/* Q&A items */}
            <div className="space-y-6">
              {Array.from({ length: sectionIdx === 2 ? 3 : 4 }).map((_, itemIdx) => (
                <div key={itemIdx} className="space-y-2">
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-3.5 w-full" />
                  <Skeleton className="h-3.5 w-3/4" />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* CTA card */}
        <div className="bg-card p-6 border border-border flex flex-col items-center gap-3">
          <Skeleton className="h-6 w-52" />
          <Skeleton className="h-3.5 w-72" />
          <div className="flex flex-wrap justify-center gap-3 mt-1">
            <Skeleton className="h-9 w-36 rounded-none" />
            <Skeleton className="h-9 w-40 rounded-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
