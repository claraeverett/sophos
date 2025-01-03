/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    PINECONE_API_KEY: process.env.PINECONE_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  // Increase the timeout for serverless functions
  serverRuntimeConfig: {
    timeoutSeconds: 60,
  },
}

module.exports = nextConfig
