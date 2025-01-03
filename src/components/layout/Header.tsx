'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HistorySidebar from '../history/HistorySidebar';
import Link from 'next/link';

interface HeaderProps {
  showHistory?: boolean;
}

interface Conversation {
  id: string;
  title: string;
  timestamp: string;
  messages: Array<{
    id: string;
    type: 'question' | 'answer';
    content: string;
    sources?: Array<{
      title: string;
      url: string;
      icon?: string;
      author: string;
      index: number;
    }>;
  }>;
}

// Mock data for conversations
const mockConversations = [
  {
    id: '1',
    title: 'What is farfalle pasta?',
    timestamp: '2 hours ago',
    messages: [
      {
        id: 'msg_1',
        type: 'question',
        content: 'What is farfalle pasta?'
      },
      {
        id: 'msg_2',
        type: 'answer',
        content: 'Farfalle is a type of pasta commonly known as bow-tie pasta...',
        sources: [
          {
            title: "What Is Farfalle? - The Spruce Eats",
            url: "https://www.thespruceeats.com/what-is-farfalle-pasta-995839",
            author: "thespruceeats",
            index: 1
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'How to cook quinoa?',
    timestamp: '1 day ago',
    messages: [
      {
        id: 'msg_3',
        type: 'question',
        content: 'How to cook quinoa?'
      },
      {
        id: 'msg_4',
        type: 'answer',
        content: 'To cook quinoa, first rinse it thoroughly...',
        sources: [
          {
            title: "How to Cook Perfect Quinoa",
            url: "https://example.com/quinoa",
            author: "cooking101",
            index: 1
          }
        ]
      }
    ]
  }
];

export default function Header({ showHistory = false }: HeaderProps) {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const router = useRouter();

  const handleNewChat = () => {
    router.push('/');
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setIsHistoryOpen(false);
    // Handle conversation selection
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1C1C1F]">
        <div className="flex justify-between items-center py-4 px-0 max-w-none mx-4">
          <div className="flex items-center gap-6 -ml-8">
            <Link href="/" className="flex items-center gap-3 pl-8">
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
              <span className="text-white text-2xl font-medium">sophos</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {showHistory && (
              <button 
                onClick={handleNewChat}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#212224] hover:bg-[#2A2B2D] transition-colors text-gray-300 hover:text-white text-sm"
              >
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className="relative top-[0.5px]"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                New
              </button>
            )}
            {showHistory && (
              <button 
                onClick={() => setIsHistoryOpen(true)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </header>

      {showHistory && (
        <HistorySidebar
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          conversations={mockConversations}
          onSelectConversation={handleSelectConversation}
        />
      )}
    </>
  );
}