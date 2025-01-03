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
        const title = Array.isArray(result.metadata.title) 
          ? result.metadata.title[0] 
          : result.metadata.title;
        paperUrl = `https://arxiv.org/search/?query=${encodeURIComponent(title)}&searchtype=title`;
      }

      // Ensure all metadata fields are in the correct format
      const title = Array.isArray(result.metadata.title) 
        ? result.metadata.title[0] 
        : result.metadata.title;
      const authors = Array.isArray(result.metadata.authors) 
        ? result.metadata.authors 
        : [result.metadata.authors].filter(Boolean);
      const categories = Array.isArray(result.metadata.categories) 
        ? result.metadata.categories 
        : [result.metadata.categories].filter(Boolean);

      return {
        id: result.metadata.paperId || '',
        url: paperUrl,
        title,
        authors,
        summary: result.metadata.summary || '',
        content: result.metadata.content || '',
        categories,
        published: result.metadata.published
      };
    });

    // Create messages for chat completion
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Here is the user's query: "${query}"

Here are the relevant papers:

${papers.map((paper, index) => `
[${index + 1}] "${paper.title}"
Authors: ${paper.authors.join(', ')}
URL: ${paper.url}
Summary: ${paper.summary}
`).join('\n')}

Please analyze these papers in relation to the query. Focus on the key findings, relationships between papers, and research implications.`,
      },
    ];

    // Get chat completion from OpenAI
    const chatCompletion = await openai.chat.completions.create({
      messages: messages as any,
      model: 'gpt-4-1106-preview',
      temperature: 0.7,
      max_tokens: 1000,
    });

    return NextResponse.json({
      answer: chatCompletion.choices[0].message.content,
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
  } catch (error: any) {
    console.error('Error in chat route:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 }
    );
  }
}