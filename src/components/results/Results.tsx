import React, { useState } from 'react';

interface Source {
  title: string;
  url?: string;
  author: string;
  index: number;
  categories?: string[];
  summary?: string;
  published?: string;
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

  // Format the answer with bold sections and better spacing
  const formatAnswer = (text: string) => {
    return text
      .split('\n')
      .map((paragraph, i) => {
        // Bold section headers (lines ending with ':')
        if (paragraph.trim().endsWith(':')) {
          return `<h3 class="text-xl font-bold text-white mt-4 mb-2">${paragraph}</h3>`;
        }
        // Bold key terms (wrapped in *)
        const formattedText = paragraph
          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em class="text-white">$1</em>');
        
        return `<p class="mb-3">${formattedText}</p>`;
      })
      .join('');
  };

  // Format date to be more readable
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Answer Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="text-white flex-shrink-0"
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
        <div 
          className="text-white leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatAnswer(answer) }}
        />
      </div>

      {/* Sources Section */}
      {sources.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="text-white flex-shrink-0"
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
          <div className="grid grid-cols-1 gap-4">
            {displayedSources.map((source) => (
              <a
                key={source.index}
                href={getSourceUrl(source)}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-4 rounded-lg bg-[#2C2C30] hover:bg-[#3C3C40] transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#1C1C1F] flex-shrink-0 flex items-center justify-center text-sm font-medium text-white">
                    {source.index}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white text-lg font-medium mb-2 group-hover:text-white transition-colors duration-200">
                      {source.title}
                    </h3>
                    
                    {/* Authors and Date */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-400 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm truncate">
                          {source.author.split(',').slice(0, 3).join(', ')}
                          {source.author.split(',').length > 3 && ' et al.'}
                        </span>
                        {source.published && (
                          <span className="text-sm">
                            • {formatDate(source.published)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Categories */}
                    {source.categories && source.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {source.categories.map((cat) => (
                          <span
                            key={cat}
                            className="px-2 py-1 rounded-full bg-[#1C1C1F] text-sm text-gray-300"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Summary */}
                    {source.summary && (
                      <p className="text-gray-400 text-sm line-clamp-2 group-hover:text-gray-300 transition-colors duration-200">
                        {source.summary}
                      </p>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
          
          {/* Show More Button */}
          {sources.length > 3 && !showAllSources && (
            <button
              onClick={() => setShowAllSources(true)}
              className="mt-4 w-full py-2 px-4 rounded-lg bg-[#2C2C30] hover:bg-[#3C3C40] text-white transition-all duration-200 flex items-center justify-center gap-2"
            >
              View {sources.length - 3} more sources
            </button>
          )}
        </div>
      )}
    </div>
  );
}
