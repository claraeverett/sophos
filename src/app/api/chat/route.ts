import { NextResponse } from 'next/server';
import { getOpenAIClient } from '@/lib/openai';
import { queryVectorStore } from '@/lib/pinecone';
import type { ChatCompletionMessageParam } from 'openai/resources/chat';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const SYSTEM_PROMPT = `You are a research assistant analyzing scientific papers. 
Provide clear insights and connections between papers. Focus on:
- Key findings and contributions
- Relationships between papers
- Research implications
- Potential future directions

Base your analysis only on the provided papers and their content.`;

export async function POST(req: Request) {
  try {
    // Validate request body
    const body = await req.json();
    const query = body?.query;
    
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return new NextResponse(
        JSON.stringify({ error: 'Query must be a non-empty string' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Initialize OpenAI client
    let openai;
    try {
      openai = getOpenAIClient();
    } catch (error: any) {
      console.error('Failed to initialize OpenAI client:', error);
      return new NextResponse(
        JSON.stringify({ 
          error: 'OpenAI API configuration error. Please check the server configuration.',
          details: process.env.NODE_ENV === 'development' ? error?.message || 'Unknown error' : undefined
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify environment variables are available
    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { status: 500 }
      );
    }

    if (!process.env.PINECONE_API_KEY) {
      return new NextResponse(
        JSON.stringify({ error: 'Pinecone API key not configured' }),
        { status: 500 }
      );
    }

    // Search vector store
    const searchResults = await queryVectorStore(query, 5);
    
    if (!searchResults.length) {
      return new NextResponse(
        JSON.stringify({ error: 'No relevant papers found for your query' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Format papers for GPT
    const papers = searchResults.map((result) => {
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

    const response = completion.choices[0]?.message?.content || 'No response generated';

    return new NextResponse(
      JSON.stringify({ response, papers }),
      { headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in chat route:', error);

    // Handle missing API key error specifically
    if (error.message.includes('OPENAI_API_KEY')) {
      return new NextResponse(
        JSON.stringify({ error: 'OpenAI API key is not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (error.message.includes('Pinecone')) {
      return new NextResponse(
        JSON.stringify({ error: 'An error occurred while querying the vector store' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new NextResponse(
      JSON.stringify({ error: 'An error occurred while processing your request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}