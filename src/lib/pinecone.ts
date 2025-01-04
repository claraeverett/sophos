import { Pinecone } from '@pinecone-database/pinecone';
import { OpenAIEmbeddings } from '@langchain/openai';
import { getClientCachedData, setClientCachedData } from './cache';

function getEnvVar(name: string): string {
  const value = process.env[name] || process.env[`NEXT_PUBLIC_${name}`];
  if (!value) {
    throw new Error(`Missing ${name} environment variable. Please add it to your .env file.`);
  }
  return value;
}

export function getPineconeClient() {
  const apiKey = getEnvVar('PINECONE_API_KEY');
  
  return new Pinecone({
    apiKey,
  });
}

export function getOpenAIEmbeddings() {
  const apiKey = getEnvVar('OPENAI_API_KEY');
  
  return new OpenAIEmbeddings({
    openAIApiKey: apiKey,
  });
}

// Initialize clients lazily to avoid issues with Edge Runtime
let pineconeClient: Pinecone | null = null;
let embeddingsClient: OpenAIEmbeddings | null = null;

export function getPinecone() {
  if (!pineconeClient) {
    pineconeClient = getPineconeClient();
  }
  return pineconeClient;
}

export function getEmbeddings() {
  if (!embeddingsClient) {
    embeddingsClient = getOpenAIEmbeddings();
  }
  return embeddingsClient;
}

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
  const indexName = getEnvVar('PINECONE_INDEX_NAME');
  const indexList = await getPinecone().listIndexes();
  
  if (!indexList.indexes?.find(index => index.name === indexName)) {
    await getPinecone().createIndex({
      name: indexName,
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

  const index = getPinecone().Index(indexName);
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
  doi?: string;
  journalRef?: string;
  license?: string;
  updateDate?: string;
  version?: number;
}

export async function indexArxivPaper(content: string, metadata: ArxivMetadata) {
  const index = await initializeIndex();
  const vector = await getEmbeddings().embedQuery(content);

  // Convert ArxivMetadata to Record<string, any> for Pinecone
  const pineconeMetadata: Record<string, any> = {
    paperId: metadata.paperId,
    title: metadata.title,
    authors: metadata.authors,
    categories: metadata.categories,
    published: metadata.published,
    summary: metadata.summary,
    url: metadata.url,
    doi: metadata.doi,
    journalRef: metadata.journalRef,
    license: metadata.license,
    updateDate: metadata.updateDate,
    version: metadata.version
  };

  await index.upsert([{
    id: metadata.paperId,
    values: vector,
    metadata: pineconeMetadata,
  }]);
}

export interface QueryResult {
  score: number;
  metadata: ArxivMetadata;
}

export async function queryVectorStore(query: string, topK: number = 3): Promise<QueryResult[]> {
  const index = await initializeIndex();
  const queryEmbedding = await getEmbeddings().embedQuery(query);

  const results = await index.query({
    vector: queryEmbedding,
    topK,
    includeMetadata: true,
  });

  return results.matches.map(match => ({
    score: match.score || 0,
    metadata: match.metadata as ArxivMetadata,
  }));
}