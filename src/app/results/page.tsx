'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Conversation from '@/components/conversation/Conversation';
import Layout from '@/components/layout/Layout';

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <Layout>
      <Header />
      <main className="flex-1 overflow-hidden">
        <div className="h-full">
          <Conversation initialQuery={query} />
        </div>
      </main>
    </Layout>
  );
}