import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { openai } from '@/lib/openai';
import arxiv from 'arxiv-api';
import { ArxivPaper } from '@/types';

const SYSTEM_PROMPT = `You are a research assistant analyzing scientific papers. 
Provide clear insights and connections between papers. Focus on:
- Key findings and contributions
- Relationships between papers
- Research implications
- Potential future directions`;

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    
    // Search arXiv
    const searchResults = await arxiv.search({
      searchQuery: query,
      maxResults: 5,
      sortBy: 'submittedDate',
      sortOrder: 'descending'
    });

    // Generate research insight using GPT-4
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Research Query: ${query}\n\nPapers:\n${JSON.stringify(searchResults)}` }
      ],
      temperature: 0.7
    });

    // Save to database
    const savedQuery = await prisma.query.create({
      data: {
        query,
        response: completion.choices[0].message.content,
        papers: {
          create: searchResults.map((paper: ArxivPaper) => ({
            id: paper.id,
            title: paper.title,
            abstract: paper.summary,
            authors: paper.authors.map(a => a.name),
            categories: paper.categories,
            published: new Date(paper.published),
            updated: new Date(paper.updated),
            pdfUrl: paper.pdf_url
          }))
        }
      },
      include: {
        papers: true
      }
    });

    return NextResponse.json(savedQuery);
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process research query' }, 
      { status: 500 }
    );
  }
}