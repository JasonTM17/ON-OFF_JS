const CDN_BASE = "https://2885966831.e.cdneverest.net";

export function getCDNUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${CDN_BASE}${path.startsWith("/") ? "" : "/"}${path}`;
}

export function getImageSizes(breakpoints: Record<string, string>): string {
  const entries = Object.entries(breakpoints);
  const conditions = entries
    .slice(0, -1)
    .map(([bp, size]) => `(max-width: ${bp}) ${size}`);
  const fallback = entries[entries.length - 1][1];
  return [...conditions, fallback].join(", ");
}

export function generateBlurDataURL(width: number, height: number): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="#E8E0D8"/></svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
