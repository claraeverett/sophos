import * as dotenv from 'dotenv';
import { Pinecone } from '@pinecone-database/pinecone';
import { OpenAIEmbeddings } from '@langchain/openai';
import { getClientCachedData, setClientCachedData } from './cache';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

if (!process.env.PINECONE_API_KEY) {
  throw new Error('Missing PINECONE_API_KEY environment variable');
}

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

const PINECONE_INDEX_NAME = 'perplexity';

// Initialize Pinecone client
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

// Initialize OpenAI embeddings
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function waitForIndex(index: any, maxRetries = 5): Promise<void> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      // Try a simple describe operation to check if the index is ready
      await index.describeIndexStats();
      return;
    } catch (error: any) {
      if (i === maxRetries - 1) throw error;
      // Exponential backoff: 1s, 2s, 4s, 8s, 16s
      const delay = Math.pow(2, i) * 1000;
      console.log(`Index not ready, retrying in ${delay}ms...`);
      await wait(delay);
    }
  }
}

export async function initializeIndex() {
  const indexList = await pinecone.listIndexes();
  
  if (!indexList.indexes?.find(index => index.name === PINECONE_INDEX_NAME)) {
    await pinecone.createIndex({
      name: PINECONE_INDEX_NAME,
      dimension: 1536,
      metric: 'cosine',
      spec: {
        serverless: {
          cloud: 'aws',
          region: 'us-west-2'
        }
      }
    });
  }

  const index = pinecone.Index(PINECONE_INDEX_NAME);
  await waitForIndex(index);
  return index;
}

export interface ArxivMetadata {
  paperId: string;
  title: string;
  authors: string[];
  categories: string[];
  published: string;
  summary?: string;
  url?: string;
}

export async function indexArxivPaper(content: string, metadata: ArxivMetadata) {
  const index = await initializeIndex();
  const vector = await embeddings.embedQuery(content);

  await index.upsert([{
    id: metadata.paperId,
    values: vector,
    metadata
  }]);
}

interface QueryResult {
  score: number;
  metadata: ArxivMetadata;
}

export async function queryVectorStore(query: string, topK: number = 3): Promise<QueryResult[]> {
  // Check if we have a cached embedding for this query
  const cacheKey = `query_embedding:${query}`;
  let queryEmbedding = getClientCachedData<number[]>(cacheKey);

  if (!queryEmbedding) {
    queryEmbedding = await embeddings.embedQuery(query);
    setClientCachedData(cacheKey, queryEmbedding, 3600); // Cache for 1 hour
  }

  const index = pinecone.Index(PINECONE_INDEX_NAME);
  
  const results = await index.query({
    vector: queryEmbedding,
    topK,
    includeMetadata: true,
  });

  return results.matches?.map(match => {
    const metadata = match.metadata as Record<string, any>;
    return {
      score: match.score,
      metadata: {
        paperId: metadata.paperId || '',
        title: metadata.title || '',
        authors: Array.isArray(metadata.authors) ? metadata.authors : [],
        categories: Array.isArray(metadata.categories) ? metadata.categories : [],
        published: metadata.published || '',
        summary: metadata.summary,
        url: metadata.url
      }
    };
  }) || [];
}