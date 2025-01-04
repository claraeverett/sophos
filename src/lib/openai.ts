import OpenAI from 'openai';

export function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY environment variable');
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