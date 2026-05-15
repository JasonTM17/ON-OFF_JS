export default function ProductsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="h-8 w-48 bg-accent/30 rounded animate-pulse mb-8" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-[3/4] bg-accent/20 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-accent/20 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-accent/20 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
