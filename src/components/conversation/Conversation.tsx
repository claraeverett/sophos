'use client';

import { useState, useEffect } from 'react';
import SearchBar from '../search/SearchBar';

interface Message {
  id: string;
  type: 'question' | 'answer';
  content: string;
  isInitial?: boolean;
  sources?: {
    title: string;
    url: string;
    icon?: string;
    author: string;
    index: number;
  }[];
}

interface ConversationProps {
  initialQuery?: string;
}

export default function Conversation({ initialQuery = '' }: ConversationProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (initialQuery) {
      setMessages([
        {
          id: '1',
          type: 'question',
          content: initialQuery,
          isInitial: true
        }
      ]);
      // Simulate API response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: '2',
          type: 'answer',
          content: `This is a simulated answer to your question: "${initialQuery}". In a real implementation, this would be replaced with an actual API response.`,
          sources: [
            {
              title: "Example Source",
              url: "https://example.com",
              author: "example",
              index: 1
            }
          ]
        }]);
      }, 1000);
    }
  }, [initialQuery]);

  const handleNewQuestion = (question: string) => {
    // Add the new question to the messages
    setMessages(prev => [...prev, {
      id: String(Date.now()),
      type: 'question',
      content: question,
      isInitial: false
    }]);

    // In a real app, you would make an API call here
    // For now, we'll just add a mock answer after a delay
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: String(Date.now() + 1),
        type: 'answer',
        content: `This is a mock answer to your question: "${question}". In a real implementation, this would be replaced with an actual API response.`,
        sources: [
          {
            title: "Example Source",
            url: "https://example.com",
            author: "example",
            index: 1
          }
        ]
      }]);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      {initialQuery && (
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-white">{initialQuery}</h1>
        </div>
      )}
      <div className="space-y-8 mb-24">
        {messages.map((message) => {
          if (message.isInitial) return null; // Skip the initial question as it's shown in the header
          
          return (
            <div key={message.id} className="animate-fadeIn">
              {message.type === 'question' ? (
                <div className="py-6 border-b border-[#2A2B2D]">
                  <div className="flex items-start">
                    <div className="flex-1">
                      <h2 className="text-xl text-white">{message.content}</h2>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-6 border-b border-[#2A2B2D]">
                  <div className="flex-1 space-y-8">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                          <path d="M20 12H4m8-8v16" />
                        </svg>
                        <span className="text-white font-medium">Answer</span>
                      </div>
                      <div className="space-y-4">
                        {message.content.split('\n\n').map((paragraph, index) => (
                          <p key={`${message.id}_p${index}`} className="text-gray-300">{paragraph}</p>
                        ))}
                      </div>
                    </div>

                    {message.sources && (
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                          </svg>
                          <span className="text-white font-medium">Sources</span>
                        </div>
                        <div className="grid gap-2">
                          {message.sources.map((source, index) => (
                            <a
                              key={`${message.id}_s${index}`}
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-3 rounded-lg bg-[#212224] hover:bg-[#2A2B2D] transition-colors"
                            >
                              {source.icon ? (
                                <img src={source.icon} alt="" className="w-5 h-5 rounded" />
                              ) : (
                                <div className="w-5 h-5 bg-gray-600 rounded" />
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="text-white truncate">{source.title}</div>
                                <div className="text-gray-400 text-sm flex items-center gap-2">
                                  <span>{source.author}</span>
                                  <span>·</span>
                                  <span>{source.index}</span>
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Fixed search bar at bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#191A1B]">
        <div className="max-w-3xl mx-auto">
          <SearchBar onSubmit={handleNewQuestion} />
        </div>
      </div>
    </div>
  );
}
