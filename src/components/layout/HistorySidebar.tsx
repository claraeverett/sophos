'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getHistory, formatTimestamp, type ChatHistory } from '@/lib/history';

const SIDEBAR_STATE_KEY = 'sidebar_state';

export default function HistorySidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [histories, setHistories] = useState<ChatHistory[]>([]);

  useEffect(() => {
    // Get initial sidebar state from localStorage
    const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
    if (savedState !== null) {
      setIsOpen(savedState === 'true');
    }

    // Initial history load
    setHistories(getHistory());

    // Set up event listener for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === SIDEBAR_STATE_KEY) {
        setIsOpen(e.newValue === 'true');
      } else {
        setHistories(getHistory());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', () => setHistories(getHistory()));

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', () => setHistories(getHistory()));
    };
  }, []);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem(SIDEBAR_STATE_KEY, String(newState));
  };

  const handleHistoryClick = (query: string) => {
    router.push(`/results?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className={`fixed left-0 top-[60px] h-[calc(100vh-60px)] bg-[#1C1C1F] border-r border-[#2C2C30] transition-all duration-300 ${isOpen ? 'w-72' : 'w-0'}`}>
      <button 
        onClick={handleToggle}
        className="absolute -right-10 top-4 bg-[#2C2C30] w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#3C3C40] transition-colors"
      >
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      
      {isOpen && (
        <div className="p-4">
          <h2 className="text-white text-lg font-medium mb-4">History</h2>
          <div className="space-y-3">
            {histories.length > 0 ? (
              histories.map((history) => (
                <button
                  key={history.id}
                  onClick={() => handleHistoryClick(history.query)}
                  className="w-full text-left group"
                >
                  <div className="p-3 rounded-lg bg-[#2C2C30] hover:bg-[#3C3C40] transition-colors">
                    <p className="text-white text-sm line-clamp-2">{history.query}</p>
                    <p className="text-gray-400 text-xs mt-1">{formatTimestamp(history.timestamp)}</p>
                  </div>
                </button>
              ))
            ) : (
              <div className="text-gray-400 text-sm text-center p-4">
                No search history yet
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
