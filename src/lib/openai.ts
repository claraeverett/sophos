import OpenAI from 'openai';

// Helper to get API key with better error handling
function getApiKey() {
  const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('OpenAI API key is not configured. Please check your environment variables.');
    throw new Error('OpenAI API key not configured. Please add it to your environment variables.');
  }
  
  return apiKey;
}

// Singleton instance for better performance
let openaiInstance: OpenAI | null = null;

export function getOpenAIClient() {
  if (!openaiInstance) {
    const apiKey = getApiKey();
    
    openaiInstance = new OpenAI({
      apiKey,
      baseURL: 'https://api.openai.com/v1',
      defaultHeaders: {
        'Content-Type': 'application/json',
      },
      defaultQuery: undefined,
      fetch: fetch,
    });
  }
  
  return openaiInstance;
}