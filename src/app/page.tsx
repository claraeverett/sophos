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
      <main className="flex-1 flex flex-col items-center min-h-[calc(100vh-80px)]">
        <div className="flex flex-col items-center flex-1 justify-center max-w-2xl w-full px-4 -mt-20">
          <h1 className="text-4xl font-medium mb-6 text-white">Find the best science, faster.</h1>
          <SearchBar />
          <div className="mt-4 flex flex-col gap-2 w-full">
            {exampleQueries.map((query, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(query)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 group"
              >
                <span className="text-sm">↗</span>
                <span className="relative">
                  {query}
                  <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}