export interface Paper {
    id: string;
    title: string;
    abstract: string;
    authors: string[];
    categories: string[];
    published: Date;
    updated: Date;
    pdfUrl: string;
  }
  
  export interface QueryResponse {
    id: string;
    query: string;
    response: string;
    papers: Paper[];
    createdAt: Date;
  }

export interface ArxivPaper {
  id: string;
  title: string;
  summary: string;
  authors: { name: string }[];
  categories: string[];
  published: string;
  updated: string;
  pdf_url: string;
}