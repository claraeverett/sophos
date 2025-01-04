import OpenAI from 'openai';

class ApiKeyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiKeyError';
  }
}

// Helper to get API key with better error handling
function getApiKey(): string {
  const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('OpenAI API key is not configured. Please check your environment variables.');
    throw new ApiKeyError('OpenAI API key not configured. Please add it to your environment variables.');
  }
  
  return apiKey;
}

// Singleton instance for better performance
let openaiInstance: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (!openaiInstance) {
    try {
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
    } catch (error) {
      if (error instanceof ApiKeyError) {
        throw error;
      }
      throw new Error('Failed to initialize OpenAI client: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }
  
  return openaiInstance;
}