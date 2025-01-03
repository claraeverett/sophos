import React, { useState } from 'react';

interface Source {
  title: string;
  url?: string;
  author: string;
  index: number;
}

interface ResultsProps {
  query: string;
  answer: string;
  sources: Source[];
}

export default function Results({ query, answer, sources }: ResultsProps) {
  const [showAllSources, setShowAllSources] = useState(false);
  const displayedSources = showAllSources ? sources : sources.slice(0, 3);

  const getSourceUrl = (source: Source) => {
    if (source.url) return source.url;
    return `https://arxiv.org/search/?query=${encodeURIComponent(source.title)}&searchtype=title`;
  };

  return (
    <div className="px-4 max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="text-white"
          >
            <path 
              d="M12 2L4 7L12 12L20 7L12 2Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M4 12L12 17L20 12" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          <h2 className="text-2xl text-white">Answer</h2>
        </div>
        <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
          {answer}
        </div>
      </div>

      {sources.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="text-white"
            >
              <path 
                d="M4 6H20M4 12H20M4 18H20" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="text-2xl text-white">Sources</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {displayedSources.map((source) => (
              <a
                key={source.index}
                href={getSourceUrl(source)}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-3 rounded-lg bg-[#2C2C30] hover:bg-[#3C3C40] transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="text-white text-base mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors duration-200">
                  {source.title}
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#1C1C1F] flex items-center justify-center text-xs">
                      {source.index}
                    </div>
                    <span className="text-sm truncate">{source.author.split(',')[0]}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          {sources.length > 3 && !showAllSources && (
            <div className="mt-4 text-center">
              <button 
                onClick={() => setShowAllSources(true)}
                className="text-gray-400 hover:text-white transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-[#2C2C30]"
              >
                View {sources.length - 3} more
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
