import { Skeleton } from "@/components/ui/skeleton";

export default function AboutLoading() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Skeleton className="w-full h-[420px] md:h-[560px] rounded-none" />
      </section>

      {/* Story */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-4">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-8 w-32" />
              <div className="space-y-2 pt-2">
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-4/5" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-3/4" />
              </div>
            </div>
            <Skeleton className="aspect-[2/3] w-full rounded-none" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 lg:px-12 bg-card">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <Skeleton className="h-3 w-24 mx-auto" />
            <Skeleton className="h-8 w-48 mx-auto" />
            <Skeleton className="h-8 w-36 mx-auto" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <Skeleton className="w-14 h-14 rounded-full" />
                <Skeleton className="h-4 w-28" />
                <div className="space-y-1.5 w-full">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6 mx-auto" />
                  <Skeleton className="h-3 w-4/6 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <Skeleton className="h-3 w-20 mx-auto" />
            <Skeleton className="h-8 w-52 mx-auto" />
            <Skeleton className="h-8 w-44 mx-auto" />
          </div>
          <div className="space-y-8 pl-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-1.5">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-4 w-64" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 lg:px-12 bg-foreground/10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-lg mx-auto flex flex-col items-center gap-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-8 w-48" />
          <div className="space-y-1.5 w-full max-w-sm">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-4/5 mx-auto" />
          </div>
          <Skeleton className="h-12 w-44 mt-4 rounded-none" />
        </div>
      </section>
    </div>
  );
}
