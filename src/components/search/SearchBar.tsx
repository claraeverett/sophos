'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (isHomePage) {
        router.push(`/results?q=${encodeURIComponent(query)}`);
      } else {
        onSearch?.(query);
        setQuery(''); // Clear the search bar after submission
      }
    }
  };

  return (
    <div className={isHomePage ? "w-full" : "fixed bottom-0 left-0 right-0 p-4 bg-[#1C1C1F] border-t border-[#2C2C30]"}>
      <form onSubmit={handleSubmit} className={isHomePage ? "w-full" : "max-w-2xl mx-auto"}>
        <div className="relative">
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a research question..."
            className="w-full bg-[#2C2C30] text-white rounded-lg px-4 py-3 placeholder:text-gray-500 ring-1 ring-[#3C3C40] focus:ring-gray-400 focus:outline-none transition-all duration-200"
          />
          <button 
            type="submit" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-md
                     hover:-translate-y-1/2 hover:translate-x-1 transition-transform duration-150"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400 hover:text-white transition-colors duration-150"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}