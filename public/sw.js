/**
 * Service Worker — bộ nhớ đệm ngoại tuyến cho tài nguyên tĩnh.
 * Chiến lược: Cache-First cho tài nguyên tĩnh, Network-First cho API.
 */

const CACHE_NAME = "onfit-static-v1";

// Các tài nguyên tĩnh cần cache ngay khi cài đặt
const PRECACHE_URLS = ["/", "/offline"];

// ─── Cài đặt ────────────────────────────────────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// ─── Kích hoạt ──────────────────────────────────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// ─── Xử lý yêu cầu ──────────────────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Bỏ qua các yêu cầu không phải GET
  if (request.method !== "GET") return;

  // Bỏ qua các yêu cầu tới API và Next.js internals
  if (
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/_next/data/") ||
    url.pathname.includes("__nextjs")
  ) {
    return;
  }

  // Tài nguyên tĩnh Next.js (_next/static): Cache-First
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Hình ảnh và font: Cache-First với fallback
  if (
    request.destination === "image" ||
    request.destination === "font"
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Trang HTML: Network-First với fallback về cache
  if (request.destination === "document") {
    event.respondWith(networkFirst(request));
    return;
  }
});

// ─── Chiến lược Cache-First ──────────────────────────────────────────────────
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response("Không có kết nối mạng.", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}

// ─── Chiến lược Network-First ────────────────────────────────────────────────
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;

    // Fallback trang offline nếu có
    const offline = await caches.match("/offline");
    if (offline) return offline;

    return new Response("Không có kết nối mạng.", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
