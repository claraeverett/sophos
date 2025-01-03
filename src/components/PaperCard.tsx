import { Paper } from '@/types';

interface PaperCardProps {
  paper: Paper;
}

export function PaperCard({ paper }: PaperCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <h3 className="font-bold text-xl mb-3 text-gray-900 hover:text-indigo-600">
        {paper.title}
      </h3>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          {paper.authors.join(', ')}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {paper.categories.map((category) => (
          <span 
            key={category}
            className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium"
          >
            {category}
          </span>
        ))}
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3">
        {paper.abstract}
      </p>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          Published: {formatDate(paper.published)}
        </div>
        
        <div className="flex gap-4">
          <a
            href={paper.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            View PDF
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}