import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
import { queryVectorStore } from '@/lib/pinecone';

const SYSTEM_PROMPT = `You are a research assistant analyzing scientific papers. 
Provide clear insights and connections between papers. Focus on:
- Key findings and contributions
- Relationships between papers
- Research implications
- Potential future directions

Base your analysis only on the provided papers and their content.`;

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    
    // Search vector store
    const searchResults = await queryVectorStore(query, 5);
    
    if (!searchResults.length) {
      return NextResponse.json(
        { error: 'No relevant papers found for your query' },
        { status: 404 }
      );
    }

    // Format papers for GPT
    const papers = searchResults.map(result => {
      if (!result.metadata) {
        throw new Error('Paper metadata is missing');
      }

      // Ensure we have a valid URL for the paper
      let paperUrl = result.metadata.url;
      if (!paperUrl && result.metadata.paperId) {
        // If we have a paperId but no URL, construct the arXiv URL
        paperUrl = `https://arxiv.org/abs/${result.metadata.paperId}`;
      } else if (!paperUrl) {
        // If we have neither, create a search URL
        paperUrl = `https://arxiv.org/search/?query=${encodeURIComponent(result.metadata.title)}&searchtype=title`;
      }

      return {
        id: result.metadata.paperId || '',
        url: paperUrl,
        title: result.metadata.title,
        authors: result.metadata.authors,
        summary: result.metadata.summary,
        content: result.metadata.content,
        categories: result.metadata.categories,
        published: result.metadata.published
      };
    });

    // Generate research insight using GPT-4
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { 
          role: "user", 
          content: `Research Query: ${query}\n\nPapers:\n${JSON.stringify(papers, null, 2)}` 
        }
      ],
      temperature: 0.7
    });

    return NextResponse.json({
      answer: completion.choices[0].message.content,
      papers: papers.map(paper => ({
        id: paper.id,
        url: paper.url,
        title: paper.title,
        abstract: paper.summary,
        authors: paper.authors,
        categories: paper.categories,
        published: paper.published
      }))
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process research query' }, 
      { status: 500 }
    );
  }
}