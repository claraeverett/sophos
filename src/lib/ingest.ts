import { searchArxiv, fetchPaperContent } from './arxiv';
import { indexArxivPaper } from './pinecone';

async function ingestPapers(query: string = 'cat:cs.AI', maxResults: number = 100) {
  try {
    console.log(`Searching arXiv for: ${query}`);
    const papers = await searchArxiv(query, maxResults);
    
    console.log(`Found ${papers.length} papers. Starting ingestion...`);
    
    for (const paper of papers) {
      try {
        const content = `Title: ${paper.title}\n\nAbstract: ${paper.summary}\n\nAuthors: ${paper.authors.join(', ')}`;
        
        await indexArxivPaper(content, {
          paperId: paper.id,
          title: paper.title,
          authors: paper.authors,
          categories: paper.categories,
          published: paper.published,
        });
        
        console.log(`✓ Indexed paper: ${paper.title}`);
      } catch (error) {
        console.error(`Failed to index paper ${paper.id}:`, error);
      }
    }
    
    console.log('Ingestion complete!');
  } catch (error) {
    console.error('Error during ingestion:', error);
  }
}

// Export for use in scripts
export { ingestPapers };

// Allow running directly
if (require.main === module) {
  ingestPapers();
}