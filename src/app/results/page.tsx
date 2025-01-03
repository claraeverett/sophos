'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Conversation from '@/components/conversation/Conversation';

interface Message {
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
}

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const conversationId = searchParams.get('id');

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // In a real app, you would:
    // 1. Fetch conversation data if conversationId exists
    // 2. Otherwise, create a new conversation with the initial query
    if (conversationId) {
      // Mock fetching conversation data
      const mockConversation = {
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
            content: 'Farfalle is a type of pasta commonly known as bow-tie pasta or butterfly pasta due to its distinctive shape. The name "farfalle" actually means "butterflies" in Italian. This pasta is made from regular wheat flour and eggs, or durum wheat flour and water.\n\nThe unique shape is created by pinching rectangular pieces of pasta dough in the middle to create a bow-tie or butterfly wing effect. The center pinch creates a slightly denser texture, while the ruffled edges remain more delicate.',
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
      };
      setMessages(mockConversation.messages);
    } else {
      // Initialize new conversation with query
      setMessages([
        {
          id: 'msg_1',
          type: 'question',
          content: query
        }
      ]);
    }
  }, [query, conversationId]);

  const handleSubmit = (question: string) => {
    // Add user question
    const newQuestion: Message = {
      id: `msg_${Date.now()}_q`,
      type: 'question',
      content: question
    };
    setMessages(prev => [...prev, newQuestion]);

    // Mock API response
    setTimeout(() => {
      const newAnswer: Message = {
        id: `msg_${Date.now()}_a`,
        type: 'answer',
        content: 'This is a mock response to your question. In a real application, this would be replaced with an actual API response.',
        sources: [
          {
            title: "Example Source",
            url: "https://example.com",
            author: "example",
            index: 1
          }
        ]
      };
      setMessages(prev => [...prev, newAnswer]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#191A1B]">
      <Header showHistory />
      <main>
        <Conversation
          initialQuery={query}
          messages={messages}
          onSubmit={handleSubmit}
        />
      </main>
    </div>
  );
}
