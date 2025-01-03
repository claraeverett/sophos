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

    // Update history when storage changes in other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === SIDEBAR_STATE_KEY) {
        setIsOpen(e.newValue === 'true');
      } else if (e.key === 'chat_history') {
        setHistories(getHistory());
      }
    };

    // Update history when custom event is fired (same tab updates)
    const handleHistoryUpdate = () => {
      setHistories(getHistory());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('historyUpdate', handleHistoryUpdate);
    window.addEventListener('focus', handleHistoryUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('historyUpdate', handleHistoryUpdate);
      window.removeEventListener('focus', handleHistoryUpdate);
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

  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-[60px] h-[calc(100vh-60px)] bg-[#1C1C1F] border-r border-[#2C2C30] transition-all duration-300 w-72">
      <button 
        onClick={handleToggle}
        className="absolute -right-10 top-4 bg-[#2C2C30] w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#3C3C40] transition-colors"
      >
        <svg
          className="w-4 h-4 text-gray-400 transition-transform duration-200 rotate-180"
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
    </div>
  );
}
