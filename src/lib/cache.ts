// Server-side cache implementation
const cache = new Map<string, { data: any; expiry: number }>();

export function getCachedData<T>(key: string): T | undefined {
  const item = cache.get(key);
  if (!item) return undefined;

  if (Date.now() > item.expiry) {
    cache.delete(key);
    return undefined;
  }

  return item.data as T;
}

export function setCachedData<T>(key: string, data: T, ttlSeconds: number = 3600): void {
  const expiry = Date.now() + (ttlSeconds * 1000);
  cache.set(key, { data, expiry });
}

export function clearCache(): void {
  cache.clear();
}

// Client-side cache implementation (using localStorage)
export function getClientCachedData<T>(key: string): T | undefined {
  if (typeof window === 'undefined') return undefined;
  
  const item = localStorage.getItem(key);
  if (!item) return undefined;

  const { data, expiry } = JSON.parse(item);
  if (Date.now() > expiry) {
    localStorage.removeItem(key);
    return undefined;
  }

  return data as T;
}

export function setClientCachedData<T>(key: string, data: T, ttlSeconds: number = 3600): void {
  if (typeof window === 'undefined') return;
  
  const expiry = Date.now() + (ttlSeconds * 1000);
  localStorage.setItem(key, JSON.stringify({ data, expiry }));
}

export function clearClientCache(): void {
  if (typeof window === 'undefined') return;
  localStorage.clear();
}

export function generateCacheKey(prefix: string, params: Record<string, any>): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}:${params[key]}`)
    .join('|');
  return `${prefix}:${sortedParams}`;
}
