import { ArxivPaper } from './arxiv';

const SEARCH_CACHE_KEY = 'search_results_cache';
const MAX_CACHE_AGE = 1000 * 60 * 60; // 1 hour
const MAX_CACHE_ITEMS = 50;

interface CacheEntry {
  timestamp: number;
  query: string;
  results: ArxivPaper[];
}

interface SearchCache {
  [key: string]: CacheEntry;
}

function getCache(): SearchCache {
  if (typeof window === 'undefined') return {};
  
  const cached = localStorage.getItem(SEARCH_CACHE_KEY);
  return cached ? JSON.parse(cached) : {};
}

function setCache(cache: SearchCache) {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(SEARCH_CACHE_KEY, JSON.stringify(cache));
}

export function getCachedSearch(query: string): ArxivPaper[] | null {
  const cache = getCache();
  const entry = cache[query];
  
  if (!entry) return null;
  
  // Check if cache is still valid
  if (Date.now() - entry.timestamp > MAX_CACHE_AGE) {
    // Remove expired entry
    delete cache[query];
    setCache(cache);
    return null;
  }
  
  return entry.results;
}

export function setCachedSearch(query: string, results: ArxivPaper[]) {
  const cache = getCache();
  
  // Add new entry
  cache[query] = {
    timestamp: Date.now(),
    query,
    results,
  };
  
  // Remove oldest entries if cache is too large
  const entries = Object.entries(cache);
  if (entries.length > MAX_CACHE_ITEMS) {
    const sortedEntries = entries.sort((a, b) => b[1].timestamp - a[1].timestamp);
    const newCache = Object.fromEntries(sortedEntries.slice(0, MAX_CACHE_ITEMS));
    setCache(newCache);
  } else {
    setCache(cache);
  }
}

export function clearSearchCache() {
  localStorage.removeItem(SEARCH_CACHE_KEY);
}
