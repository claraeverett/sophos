// ResearchChat.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QueryResponse } from '@/types';

export function ResearchChat() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // ... rest of the submission logic
  };

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="relative">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything..."
          className="w-full bg-[#2A2A2A] text-white rounded-lg px-4 py-3 pr-24
                   placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="absolute right-2 top-2 flex items-center gap-2">
          <button
            type="button"
            className="text-gray-400 hover:text-white px-2 py-1"
          >
            Fast
          </button>
          <button
            type="button"
            className="text-gray-400 hover:text-white px-2 py-1"
          >
            Expert
          </button>
        </div>
      </form>
    </div>
  );
}