import OpenAI from 'openai';

export function getOpenAIClient() {
  // Access environment variable directly for Edge Runtime
  const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY environment variable. Please add it to your Vercel project settings.');
  }

  return new OpenAI({
    apiKey,
    baseURL: 'https://api.openai.com/v1',
    defaultHeaders: {
      'Content-Type': 'application/json',
    },
    defaultQuery: undefined,
    fetch: fetch,
  });
}

// Don't create a global instance for Edge Runtime
// export const openai = getOpenAIClient();