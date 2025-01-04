import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { getCachedData, setCachedData } from './cache';
import { indexArxivPaper, type ArxivMetadata } from './pinecone';

const ARXIV_API_URL = 'http://export.arxiv.org/api/query';
const CACHE_TTL = 3600; // 1 hour
const MAX_RETRIES = 5;
const BASE_DELAY = 1000; // 1 second base delay

interface ArxivPaper {
  id: string;
  title: string;
  summary: string;
  authors: string[];
  categories: string[];
  published: string;
  updated: string;
  doi?: string;
  journal_ref?: string;
  pdf_url?: string;
  version?: number;
}

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  retries = MAX_RETRIES,
  baseDelay = BASE_DELAY,
  factor = 2
): Promise<T> {
  let lastError: any;
  
  for (let i = 0; i < retries; i++) {
    try {
      // Add a small random delay before each request to prevent thundering herd
      await delay(Math.random() * 1000);
      return await operation();
    } catch (error: any) {
      lastError = error;
      
      // If this is a rate limit or connection error, wait and retry
      if (
        error.code === 'ECONNRESET' ||
        error.code === 'ETIMEDOUT' ||
        error.response?.status === 429 ||
        error.response?.status >= 500
      ) {
        const waitTime = baseDelay * Math.pow(factor, i) * (1 + Math.random() * 0.1);
        console.warn(`Request failed (attempt ${i + 1}/${retries}). Waiting ${Math.round(waitTime)}ms before retry...`);
        await delay(waitTime);
        continue;
      }
      
      // For other errors, throw immediately
      throw error;
    }
  }
  
  throw lastError;
}

export async function searchArxiv(
  query: string,
  maxResults: number = 100,
  start: number = 0,
  sortBy: 'submittedDate' | 'relevance' | 'lastUpdatedDate' = 'submittedDate',
  sortOrder: 'ascending' | 'descending' = 'descending'
): Promise<ArxivPaper[]> {
  // Check cache first
  const cacheKey = `arxiv_search:${query}:${maxResults}:${start}:${sortBy}:${sortOrder}`;
  const cachedResult = getCachedData<ArxivPaper[]>(cacheKey);
  if (cachedResult) {
    return cachedResult;
  }

  try {
    // Use retryWithBackoff for the API call
    const response = await retryWithBackoff(() => 
      axios.get(ARXIV_API_URL, {
        params: {
          search_query: query,
          start,
          max_results: maxResults,
          sortBy,
          sortOrder,
        },
        timeout: 30000, // 30 second timeout
        headers: {
          'User-Agent': 'Perplexity Research Assistant/1.0'
        }
      })
    );

    const result = await parseStringPromise(response.data);
    const entries = result.feed.entry || [];

    const papers = entries.map((entry: any) => {
      const categories = Array.isArray(entry.category)
        ? entry.category.map((cat: any) => cat.$.term)
        : [];

      const id = entry.id[0].split('/abs/')[1];
      const version = parseInt(id.split('v')[1]) || 1;

      return {
        id,
        title: entry.title[0].replace(/\s+/g, ' ').trim(),
        summary: entry.summary[0].replace(/\s+/g, ' ').trim(),
        authors: entry.author.map((author: any) => author.name[0]),
        categories,
        published: entry.published[0],
        updated: entry.updated[0],
        doi: entry['arxiv:doi']?.[0],
        journal_ref: entry['arxiv:journal_ref']?.[0],
        pdf_url: `https://arxiv.org/pdf/${id}.pdf`,
        version,
      };
    });

    // Cache the results
    setCachedData(cacheKey, papers, CACHE_TTL);
    return papers;
  } catch (error) {
    console.error('Error fetching from arXiv:', error);
    throw error;
  }
}

export async function fetchPaperContent(paperId: string): Promise<string> {
  try {
    // Use retryWithBackoff for the API call
    const response = await retryWithBackoff(() =>
      axios.get(`${ARXIV_API_URL}?id_list=${paperId}`, {
        timeout: 30000,
        headers: {
          'User-Agent': 'Perplexity Research Assistant/1.0'
        }
      })
    );
    
    const result = await parseStringPromise(response.data);
    const entry = result.feed.entry?.[0];
    
    if (!entry || !entry.summary) {
      throw new Error('No abstract available');
    }
    
    // Return the abstract
    return entry.summary[0].trim();
  } catch (error) {
    console.error('Error fetching paper content:', error);
    return ''; // Return empty string if fetch fails
  }
}

// Implement batch processing for vector store operations
export async function batchIndexArxivPapers(papers: ArxivPaper[], batchSize: number = 10) {
  for (let i = 0; i < papers.length; i += batchSize) {
    const batch = papers.slice(i, i + batchSize);
    await Promise.all(batch.map(paper => indexArxivPaper(
      `Title: ${paper.title}\n\nAbstract: ${paper.summary}\n\nAuthors: ${paper.authors.join(', ')}`,
      {
        paperId: paper.id,
        title: paper.title,
        authors: paper.authors,
        categories: paper.categories,
        published: paper.published,
      } as ArxivMetadata)
    ));
  }
}