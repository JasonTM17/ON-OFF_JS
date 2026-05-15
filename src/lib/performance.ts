export function reportWebVitals(metric: {
  name: string;
  value: number;
  id: string;
  rating?: string;
}): void {
  if (process.env.NODE_ENV === "development") {
    console.log(`[Web Vitals] ${metric.name}: ${Math.round(metric.value)} (${metric.rating ?? "—"}) id=${metric.id}`);
  }
}

export async function measurePerformance<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  const startMark = `${name}:start`;
  const endMark = `${name}:end`;
  performance.mark(startMark);
  try {
    const result = await fn();
    performance.mark(endMark);
    performance.measure(name, startMark, endMark);
    return result;
  } catch (error) {
    performance.mark(endMark);
    performance.measure(name, startMark, endMark);
    throw error;
  }
}

export function prefetchRoute(path: string): void {
  if (typeof window === "undefined") return;
  const existing = document.querySelector(`link[rel="prefetch"][href="${path}"]`);
  if (existing) return;
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = path;
  document.head.appendChild(link);
}
