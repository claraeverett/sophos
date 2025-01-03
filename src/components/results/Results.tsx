import React from 'react';

interface Source {
  title: string;
  url: string;
  icon?: string;
  author: string;
  index: number;
}

interface ResultsProps {
  query: string;
  answer: string;
  sources: Source[];
}

export default function Results({ query, answer, sources }: ResultsProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Question */}
      <h1 className="text-2xl text-white mb-6">{query}</h1>

      {/* Answer Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
            <path d="M20 12H4m8-8v16" />
          </svg>
          <span className="text-white font-medium">Answer</span>
        </div>
        <div className="text-gray-300 space-y-4">
          {answer.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Sources Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <span className="text-white font-medium">Sources</span>
        </div>
        <div className="grid gap-2">
          {sources.map((source, index) => (
            <a
              key={index}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-[#212224] hover:bg-[#2A2B2D] transition-colors"
            >
              {source.icon ? (
                <img src={source.icon} alt="" className="w-5 h-5 rounded" />
              ) : (
                <div className="w-5 h-5 bg-gray-600 rounded" />
              )}
              <div className="flex-1 min-w-0">
                <div className="text-white truncate">{source.title}</div>
                <div className="text-gray-400 text-sm flex items-center gap-2">
                  <span>{source.author}</span>
                  <span>·</span>
                  <span>{source.index}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
