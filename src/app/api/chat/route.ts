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
    let body;
    try {
      body = await req.json();
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

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
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!process.env.PINECONE_API_KEY) {
      return new NextResponse(
        JSON.stringify({ error: 'Pinecone API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Search vector store
    let searchResults;
    try {
      searchResults = await queryVectorStore(query, 5);
    } catch (error: any) {
      console.error('Vector store query error:', error);
      return new NextResponse(
        JSON.stringify({ error: 'Failed to search papers. Please try again.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
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
      const paperId = metadata.paperId;
      const paperUrl = metadata.url || (paperId ? `https://arxiv.org/abs/${paperId}` : undefined);

      return {
        id: paperId,
        title: metadata.title,
        authors: metadata.authors,
        categories: metadata.categories,
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
Authors: ${paper.authors.join(', ')}
Categories: ${paper.categories.join(', ')}
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
    let completion;
    try {
      completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      });
    } catch (error: any) {
      console.error('OpenAI API error:', error);
      return new NextResponse(
        JSON.stringify({ error: 'Failed to generate response. Please try again.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      return new NextResponse(
        JSON.stringify({ error: 'No response generated' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new NextResponse(
      JSON.stringify({ response, papers }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in chat route:', error);

    // Ensure we always return a proper JSON response
    return new NextResponse(
      JSON.stringify({ 
        error: 'An unexpected error occurred. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}