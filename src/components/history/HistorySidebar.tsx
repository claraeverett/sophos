'use client';

import { useRouter } from 'next/navigation';

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

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: Conversation[];
  onSelectConversation: (conversation: Conversation) => void;
}

export default function HistorySidebar({ 
  isOpen, 
  onClose, 
  conversations,
  onSelectConversation 
}: HistorySidebarProps) {
  const router = useRouter();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-[#191A1B] border-l border-[#2A2B2D] transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-[#2A2B2D] flex justify-between items-center">
            <h2 className="text-xl font-medium text-white">History</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => onSelectConversation(conversation)}
                className="w-full p-4 border-b border-[#2A2B2D] hover:bg-[#2A2B2D] transition-colors text-left group"
              >
                <h3 className="text-white font-medium truncate mb-1">
                  {conversation.title}
                </h3>
                <div className="flex items-center text-sm text-gray-400">
                  <span>{conversation.timestamp}</span>
                  <span className="mx-2">·</span>
                  <span>{conversation.messages.length} messages</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
