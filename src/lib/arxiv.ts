import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { getCachedData, setCachedData } from './cache';
import { indexArxivPaper, type ArxivMetadata } from './pinecone';

export interface ArxivPaper {
  id: string;
  title: string;
  summary: string;
  authors: string[];
  categories: string[];
  published: string;
}

const CACHE_TTL = 3600; // 1 hour

export async function searchArxiv(query: string, maxResults: number = 100): Promise<ArxivPaper[]> {
  // Check cache first
  const cacheKey = `arxiv_search:${query}:${maxResults}`;
  const cachedResult = getCachedData<ArxivPaper[]>(cacheKey);
  if (cachedResult) {
    return cachedResult;
  }

  // If not in cache, fetch from API
  const baseUrl = 'http://export.arxiv.org/api/query';
  const response = await axios.get(baseUrl, {
    params: {
      search_query: query,
      start: 0,
      max_results: maxResults,
    },
    timeout: 10000, // 10 second timeout
  });

  const result = await parseStringPromise(response.data);
  const entries = result.feed.entry || [];

  const papers = entries.map((entry: any) => ({
    id: entry.id[0].split('/abs/')[1],
    title: entry.title[0].trim(),
    summary: entry.summary[0].trim(),
    authors: entry.author.map((author: any) => author.name[0]),
    categories: entry['arxiv:primary_category'].map((cat: any) => cat.$.term),
    published: entry.published[0],
  }));

  // Cache the results
  setCachedData(cacheKey, papers, CACHE_TTL);
  
  return papers;
}

// Implement batch processing for vector store operations
export async function batchIndexArxivPapers(papers: ArxivPaper[], batchSize: number = 10) {
  for (let i = 0; i < papers.length; i += batchSize) {
    const batch = papers.slice(i, i + batchSize);
    await Promise.all(batch.map(paper => 
      indexArxivPaper(paper.summary, {
        paperId: paper.id,
        title: paper.title,
        authors: paper.authors,
        categories: paper.categories,
        published: paper.published,
        summary: paper.summary
      } as ArxivMetadata)
    ));
  }
}

export async function fetchPaperContent(paperId: string): Promise<string> {
  const response = await axios.get(`https://arxiv.org/abs/${paperId}`);
  return response.data;
}