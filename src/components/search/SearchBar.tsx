'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addToHistory } from '@/lib/history';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  isHomePage?: boolean;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, isHomePage = false, isLoading = false }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addToHistory(query.trim());
      if (isHomePage) {
        router.push(`/results?q=${encodeURIComponent(query.trim())}`);
      } else {
        onSearch?.(query.trim());
        setQuery('');
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
        <div className="relative w-full">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a research question..."
            className="w-full bg-[#2C2C30] rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500/50"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-white hover:scale-110 transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}