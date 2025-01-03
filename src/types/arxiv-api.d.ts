declare module 'arxiv-api' {
  interface SearchOptions {
    searchQuery: string;
    maxResults?: number;
    sortBy?: string;
    sortOrder?: string;
  }

  function search(options: SearchOptions): Promise<any[]>;
  
  export default { search };
} 