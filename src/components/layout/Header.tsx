'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import HistorySidebar from './HistorySidebar';

interface HeaderProps {
  showHistory?: boolean;
}

export default function Header({ showHistory = false }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNewChat = () => {
    router.push('/');
  };

  const handleHistoryClick = () => {
    localStorage.setItem('sidebar_state', String(!isHistoryOpen));
    setIsHistoryOpen(!isHistoryOpen);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isScrolled ? 'bg-[#1C1C1F] shadow-lg' : 'bg-[#1C1C1F]'
      }`}>
        <div className="flex justify-between items-center py-4 px-4 max-w-none mx-auto">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="text-3xl">
                <svg 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.75" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
                  <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
                </svg>
              </div>
              <span className="text-2xl font-medium text-white">sophos</span>
            </Link>
            {showHistory && (
              <button 
                onClick={handleNewChat}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
              </button>
            )}
            {showHistory && (
              <button
                onClick={handleHistoryClick}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 8v4l3 3" />
                  <path d="M3.05 11a9 9 0 1 1 .5 4" />
                  <path d="M3 16V8h8" />
                </svg>
              </button>
            )}
          </div>
          <nav className="flex items-center gap-4">
          </nav>
        </div>
      </header>
      <div className="h-16"></div> {/* Spacer to prevent content from going under header */}
      {isHistoryOpen && <HistorySidebar />}
    </>
  );
}