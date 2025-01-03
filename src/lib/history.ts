export interface ChatHistory {
  id: string;
  query: string;
  timestamp: number;
}

const HISTORY_KEY = 'chat_history';
const MAX_HISTORY_ITEMS = 50;

export function getHistory(): ChatHistory[] {
  if (typeof window === 'undefined') return [];
  
  const history = localStorage.getItem(HISTORY_KEY);
  return history ? JSON.parse(history) : [];
}

export function addToHistory(query: string): void {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  const newItem: ChatHistory = {
    id: Date.now().toString(),
    query,
    timestamp: Date.now(),
  };

  // Add new item to the beginning and limit the total number
  const updatedHistory = [newItem, ...history].slice(0, MAX_HISTORY_ITEMS);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  
  // Dispatch a custom event for the history update
  window.dispatchEvent(new CustomEvent('historyUpdate'));
}

export function formatTimestamp(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  // Less than a minute
  if (diff < 60000) {
    return 'Just now';
  }
  
  // Less than an hour
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  
  // Less than a day
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  
  // Less than a week
  if (diff < 604800000) {
    const days = Math.floor(diff / 86400000);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  
  // Format as date
  return new Date(timestamp).toLocaleDateString();
}
