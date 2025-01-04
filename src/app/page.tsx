'use client';

import Layout from '@/components/layout/Layout';
import Header from '@/components/layout/Header';
import SearchBar from '@/components/search/SearchBar';
import ExampleQueries from '@/components/search/ExampleQueries';
import { useRouter } from 'next/router';

const exampleQueries = [
  "How do large language models handle reasoning tasks?",
  "What are the current challenges in reinforcement learning?",
  "Describe recent advances in computer vision architectures",
];

export default function Home() {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col">
        <div className="pt-4">
          <Header />
        </div>
        <main className="flex-1 flex flex-col items-center px-4">
          <div className="flex flex-col items-center max-w-2xl w-full mt-32">
            <h1 className="text-4xl font-medium mb-8 text-white">Find the best science, faster.</h1>
            <SearchBar isHomePage={true} />
            <ExampleQueries queries={exampleQueries} />
          </div>
        </main>
      </div>
    </Layout>
  );
}