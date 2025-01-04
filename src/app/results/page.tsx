'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Conversation from '@/components/conversation/Conversation';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div className="h-full">
      <Conversation initialQuery={query} />
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Layout>
      <Header />
      <main className="flex-1 overflow-hidden">
        <Suspense fallback={
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        }>
          <SearchResults />
        </Suspense>
      </main>
    </Layout>
  );
}