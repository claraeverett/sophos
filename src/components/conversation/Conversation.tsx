'use client';

import { useState, useEffect, useRef } from 'react';
import SearchBar from '../search/SearchBar';
import Results from '../results/Results';
import { Message, Paper } from '@/types/chat';
import { saveMessages, getMessages } from '@/lib/messageStorage';

interface ConversationProps {
  initialQuery?: string;
}

// Helper function to format paper URL
function getPaperUrl(paper: Paper): string {
  if (paper.url) return paper.url;
  if (paper.id) return `https://arxiv.org/abs/${paper.id}`;
  return '#';
}

// Helper function to format authors
function formatAuthors(authors: string[]): string {
  return Array.isArray(authors) ? authors.join(', ') : authors;
}

export default function Conversation({ initialQuery = '' }: ConversationProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const initialQueryProcessed = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isInitialQuery = useRef(true); // Track if this is the initial query from home page

  // Load messages from storage when component mounts or query changes
  useEffect(() => {
    if (query && !isInitialQuery.current) {
      const storedMessages = getMessages(query);
      if (storedMessages) {
        setMessages(storedMessages);
      }
    }
  }, [query]);

  // Save messages to storage whenever they change
  useEffect(() => {
    if (query && messages.length > 0 && !isInitialQuery.current) {
      saveMessages(query, messages);
    }
  }, [query, messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Scroll when messages change

  const askQuestion = async (newQuery: string) => {
    console.log('Asking question:', newQuery);
    setQuery(newQuery);
    
    // Only check stored messages if not initial query
    if (!isInitialQuery.current) {
      const storedMessages = getMessages(newQuery);
      if (storedMessages) {
        setMessages(storedMessages);
        return;
      }
    }
    
    const questionId = Date.now().toString();
    setMessages(prev => [...prev, 
      { id: questionId, type: 'question', content: newQuery }
    ]);
    
    setIsLoading(true);
    let response;
    
    try {
      response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: newQuery }),
      });
    } catch (networkError) {
      console.error('Network error:', networkError);
      setMessages(prev => [...prev, 
        { 
          id: Date.now().toString(), 
          type: 'error', 
          content: 'Failed to connect to server. Please check your internet connection and try again.',
        }
      ]);
      setIsLoading(false);
      isInitialQuery.current = false;
      return;
    }

    try {
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch response');
      }

      setMessages(prev => [...prev, 
        { 
          id: Date.now().toString(), 
          type: 'answer', 
          content: data.response,
          papers: data.papers
        }
      ]);
    } catch (error) {
      console.error('Error:', error);
      let errorMessage = 'An error occurred while processing your request.';
      
      if (error instanceof Error) {
        if (error.message.includes('JSON')) {
          errorMessage = 'Server returned an invalid response. Please try again.';
        } else {
          errorMessage = error.message;
        }
      }
      
      setMessages(prev => [...prev, 
        { 
          id: Date.now().toString(), 
          type: 'error', 
          content: errorMessage,
        }
      ]);
    } finally {
      setIsLoading(false);
      isInitialQuery.current = false;
    }
  };

  useEffect(() => {
    if (initialQuery && !initialQueryProcessed.current) {
      console.log('Processing initial query:', initialQuery);
      initialQueryProcessed.current = true;
      isInitialQuery.current = true; // Ensure initial query is treated as new
      askQuestion(initialQuery);
    }
  }, [initialQuery]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto pb-32 pt-16">
        {messages.map((message, index) => (
          <div key={message.id} className="mb-6">
            {message.type === 'question' && (
              <div className="text-center py-2">
                <h1 className="text-3xl font-medium text-white mb-4 px-4 max-w-3xl mx-auto text-left">
                  {message.content}
                </h1>
              </div>
            )}
            {message.type === 'answer' && (
              <Results 
                query={messages[index - 1]?.content || ''}
                answer={message.content}
                sources={message.papers?.map((paper, idx) => ({
                  title: paper.title,
                  url: getPaperUrl(paper),
                  author: formatAuthors(paper.authors),
                  index: idx + 1
                })) || []}
              />
            )}
            {message.type === 'error' && (
              <div className="text-red-500 text-center">
                {message.content}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
        {!messages.length && !isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-2xl text-white mb-8">Ask me anything about research papers</h1>
          </div>
        )}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
      </div>
      <div className="mt-auto">
        <SearchBar onSearch={(query) => askQuestion(query)} />
      </div>
    </div>
  );
}