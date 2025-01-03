import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
import { queryVectorStore } from '@/lib/pinecone';
import type { ArxivMetadata } from '@/lib/pinecone';
import type { ChatCompletionMessageParam } from 'openai/resources/chat';

const SYSTEM_PROMPT = `You are a research assistant analyzing scientific papers. 
Provide clear insights and connections between papers. Focus on:
- Key findings and contributions
- Relationships between papers
- Research implications
- Potential future directions

Base your analysis only on the provided papers and their content.`;

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query must be a non-empty string' },
        { status: 400 }
      );
    }

    // Search vector store
    const searchResults = await queryVectorStore(query, 5);
    
    if (!searchResults.length) {
      return NextResponse.json(
        { error: 'No relevant papers found for your query' },
        { status: 404 }
      );
    }

    // Format papers for GPT
    const papers = searchResults.map((result, index) => {
      const metadata = result.metadata;
      const score = result.score;

      // Ensure we have a valid URL for the paper
      let paperUrl = metadata.url;
      if (!paperUrl && metadata.paperId) {
        paperUrl = `https://arxiv.org/abs/${metadata.paperId}`;
      }

      return {
        title: metadata.title,
        authors: metadata.authors.join(', '),
        categories: metadata.categories.join(', '),
        summary: metadata.summary || '',
        published: metadata.published,
        url: paperUrl,
        score: score
      };
    });

    // Prepare the message for GPT
    const paperDescriptions = papers.map((paper, index) => `
Paper ${index + 1}:
Title: ${paper.title}
Authors: ${paper.authors}
Categories: ${paper.categories}
Published: ${paper.published}
Summary: ${paper.summary}
URL: ${paper.url}
Relevance Score: ${paper.score.toFixed(3)}
`).join('\n');

    const messages: ChatCompletionMessageParam[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `Query: ${query}\n\nRelevant Papers:\n${paperDescriptions}` }
    ];

    // Get response from GPT
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      return NextResponse.json(
        { error: 'Failed to generate response' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      response,
      papers
    });

  } catch (error: any) {
    console.error('Error in chat route:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.status || 500 }
    );
  }
}