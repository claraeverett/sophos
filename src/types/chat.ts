export interface Paper {
  id: string;
  title: string;
  authors: string[];
  categories: string[];
  published: string;
  summary?: string;
  url?: string;
}

export interface Message {
  id: string;
  type: 'question' | 'answer' | 'error';
  content: string;
  papers?: Paper[];
}
