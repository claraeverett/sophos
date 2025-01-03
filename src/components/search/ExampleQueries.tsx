'use client';

import { useRouter } from 'next/navigation';

interface ExampleQueriesProps {
  queries: string[];
}

export default function ExampleQueries({ queries }: ExampleQueriesProps) {
  const router = useRouter();

  const handleExampleClick = (query: string) => {
    router.push(`/results?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="mt-8 flex flex-col gap-2 w-full">
      {queries.map((query, index) => (
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
  );
}
