'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { addToHistory } from '@/lib/history';
import { useDebounce } from '@/hooks/useDebounce';
import { getClientCachedData, setClientCachedData } from '@/lib/cache';
import { searchArxiv, type ArxivPaper } from '@/lib/arxiv';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  isHomePage?: boolean;
}

export default function SearchBar({ onSearch, isHomePage = false }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<ArxivPaper[]>([]);
  const debouncedQuery = useDebounce(query, 300);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    try {
      // Check client cache first
      const cacheKey = `search_suggestions:${searchQuery}`;
      const cachedResults = getClientCachedData<ArxivPaper[]>(cacheKey);
      if (cachedResults) {
        setSuggestions(cachedResults.slice(0, 5));
        return;
      }

      // If not in cache, fetch from API
      const results = await searchArxiv(searchQuery, 10);
      setClientCachedData(cacheKey, results);
      setSuggestions(results.slice(0, 5));
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery);
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery, performSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addToHistory(query.trim());
      if (isHomePage) {
        router.push(`/results?q=${encodeURIComponent(query.trim())}`);
      } else {
        onSearch?.(query.trim());
        setQuery('');
        setSuggestions([]);
      }
    }
  };

  const containerClasses = isHomePage
    ? "w-full max-w-2xl"
    : "fixed bottom-0 left-0 right-0 bg-[#1C1C1F] p-4";

  const formClasses = isHomePage
    ? "w-full"
    : "relative max-w-3xl mx-auto";

  return (
    <div className={containerClasses}>
      <form onSubmit={handleSubmit} className={formClasses}>
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a research question..."
            className="w-full bg-[#2C2C30] rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500/50"
          />
          <button
            type="submit"
            className="absolute right-2 p-2 text-gray-400 hover:text-white hover:scale-110 transition-all duration-200"
            disabled={isSearching}
          >
            {isSearching ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
          </button>
        </div>

        {suggestions.length > 0 && (
          <div className="absolute w-full mt-2 bg-[#2C2C30] rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            {suggestions.map((paper) => (
              <button
                key={paper.id}
                onClick={() => {
                  setQuery(paper.title);
                  setSuggestions([]);
                  handleSubmit({ preventDefault: () => {} } as React.FormEvent);
                }}
                className="w-full text-left p-3 hover:bg-[#3C3C40] transition-colors border-b border-[#1C1C1F] last:border-b-0"
              >
                <h3 className="text-white text-sm font-medium line-clamp-2">{paper.title}</h3>
                <p className="text-gray-400 text-xs mt-1 line-clamp-2">{paper.summary}</p>
              </button>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}