import axios from 'axios';
import { parseStringPromise } from 'xml2js';

export interface ArxivPaper {
  id: string;
  title: string;
  summary: string;
  authors: string[];
  categories: string[];
  published: string;
}

export async function searchArxiv(query: string, maxResults: number = 100): Promise<ArxivPaper[]> {
  const baseUrl = 'http://export.arxiv.org/api/query';
  const response = await axios.get(baseUrl, {
    params: {
      search_query: query,
      start: 0,
      max_results: maxResults,
    },
  });

  const result = await parseStringPromise(response.data);
  const entries = result.feed.entry || [];

  return entries.map((entry: any) => ({
    id: entry.id[0].split('/abs/')[1],
    title: entry.title[0].trim(),
    summary: entry.summary[0].trim(),
    authors: entry.author.map((author: any) => author.name[0]),
    categories: entry['arxiv:primary_category'].map((cat: any) => cat.$.term),
    published: entry.published[0],
  }));
}

export async function fetchPaperContent(paperId: string): Promise<string> {
  const response = await axios.get(`https://arxiv.org/abs/${paperId}`);
  // Note: This is a simplified version. In production, you'd want to properly parse the PDF
  // or use arXiv's API to get the full text if available
  return response.data;
}