import OpenAI from 'openai';

export function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY environment variable');
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: 'https://api.openai.com/v1',
    defaultHeaders: {
      'Content-Type': 'application/json',
    },
    defaultQuery: undefined,
    fetch: fetch,
  });
}

export const openai = getOpenAIClient();