/**
 * Bộ nhớ đệm trong bộ nhớ (in-memory cache) với TTL cho các truy vấn cơ sở dữ liệu.
 * Dùng trong Server Components — không dùng phía client.
 */

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

class InMemoryCache {
  private store = new Map<string, CacheEntry<unknown>>();

  /**
   * Lấy giá trị từ cache. Trả về `undefined` nếu không tồn tại hoặc đã hết hạn.
   */
  get<T>(key: string): T | undefined {
    const entry = this.store.get(key) as CacheEntry<T> | undefined;
    if (!entry) return undefined;

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return undefined;
    }

    return entry.value;
  }

  /**
   * Lưu giá trị vào cache với TTL tính bằng giây (mặc định 60 giây).
   */
  set<T>(key: string, value: T, ttlSeconds = 60): void {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  /**
   * Xoá một mục khỏi cache.
   */
  delete(key: string): void {
    this.store.delete(key);
  }

  /**
   * Xoá tất cả các mục đã hết hạn.
   */
  purgeExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.expiresAt) {
        this.store.delete(key);
      }
    }
  }

  /**
   * Xoá toàn bộ cache.
   */
  clear(): void {
    this.store.clear();
  }

  /**
   * Số lượng mục hiện có trong cache (bao gồm cả mục đã hết hạn chưa được dọn).
   */
  get size(): number {
    return this.store.size;
  }
}

// Singleton — dùng chung trong toàn bộ server process
export const cache = new InMemoryCache();

/**
 * Hàm tiện ích: lấy từ cache hoặc gọi `fetcher` rồi lưu kết quả.
 *
 * @example
 * const products = await withCache('products:all', () => db.product.findMany(), 300);
 */
export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds = 60
): Promise<T> {
  const cached = cache.get<T>(key);
  if (cached !== undefined) return cached;

  const value = await fetcher();
  cache.set(key, value, ttlSeconds);
  return value;
}
