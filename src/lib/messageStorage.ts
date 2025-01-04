import { Message } from '@/types/chat';

const MESSAGES_STORAGE_KEY = 'perplexity_messages';

interface StoredConversation {
  query: string;
  messages: Message[];
  timestamp: number;
}

export function saveMessages(query: string, messages: Message[]) {
  if (typeof window === 'undefined') return;

  const conversation: StoredConversation = {
    query,
    messages,
    timestamp: Date.now(),
  };

  try {
    const existingData = localStorage.getItem(MESSAGES_STORAGE_KEY);
    const conversations: Record<string, StoredConversation> = existingData ? JSON.parse(existingData) : {};
    
    conversations[query] = conversation;
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(conversations));
  } catch (error) {
    console.error('Error saving messages to localStorage:', error);
  }
}

export function getMessages(query: string): Message[] | null {
  if (typeof window === 'undefined') return null;

  try {
    const existingData = localStorage.getItem(MESSAGES_STORAGE_KEY);
    if (!existingData) return null;

    const conversations: Record<string, StoredConversation> = JSON.parse(existingData);
    return conversations[query]?.messages || null;
  } catch (error) {
    console.error('Error retrieving messages from localStorage:', error);
    return null;
  }
}

export function clearMessages() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(MESSAGES_STORAGE_KEY);
}
