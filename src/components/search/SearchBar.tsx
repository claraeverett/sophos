'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { styles } from '@/styles/components/styles';

interface SearchBarProps {
  onSubmit?: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSubmit) {
        onSubmit(query);
        setQuery(''); // Clear input after submission
      } else {
        router.push(`/results?q=${encodeURIComponent(query)}`);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // No implementation provided
  };

  return (
    <form onSubmit={handleSubmit} className={styles.search.container}>
      <input 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className={styles.search.input}
        placeholder="Ask the research..."
      />
      <button type="submit" className={styles.search.submitButton}>
        <svg 
          className="submit-arrow"
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M5 12h14m-7-7l7 7-7 7" />
        </svg>
      </button>
    </form>
  );
}