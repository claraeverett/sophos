'use client';

import Layout from '@/components/layout/Layout';
import Header from '@/components/layout/Header';
import SearchBar from '@/components/search/SearchBar';
import { useRouter } from 'next/navigation';

const exampleQueries = [
  "Tell me about machine learning",
  "What are transformers in deep learning?",
  "Latest research in quantum computing",
  "Explain neural networks"
];

export default function Home() {
  const router = useRouter();

  const handleExampleClick = (query: string) => {
    router.push(`/results?q=${encodeURIComponent(query)}`);
  };

  return (
    <Layout>
      <Header />
      <div className="flex flex-col items-center justify-center flex-1 p-4">
        <div className="w-full max-w-2xl flex flex-col items-center">
          <h1 className="text-4xl font-medium mb-6 text-white">Find the best science, faster.</h1>
          <SearchBar />
          <div className="mt-4 flex flex-col gap-2 w-full">
            {exampleQueries.map((query, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(query)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <span className="text-sm">↗</span>
                {query}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}