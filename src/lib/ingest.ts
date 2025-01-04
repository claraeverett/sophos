import { config } from 'dotenv';
import { searchArxiv, fetchPaperContent } from './arxiv';
import { indexArxivPaper } from './pinecone';
import pLimit from 'p-limit';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Load environment variables from .env file
config();

// Categories to ingest papers from
const CATEGORIES = [
  // Core Machine Learning & AI
  'cs.AI',    // Artificial Intelligence
  'cs.LG',    // Machine Learning
  'stat.ML',  // Statistics - Machine Learning
  'cs.NE',    // Neural and Evolutionary Computing
  
  // Natural Language Processing & Speech
  'cs.CL',    // Computation and Language
  'cs.IR',    // Information Retrieval
  'cs.SD',    // Sound
  'eess.AS',  // Audio and Speech Processing
  
  // Computer Vision & Graphics
  'cs.CV',    // Computer Vision
  'cs.GR',    // Graphics
  'cs.MM',    // Multimedia
  
  // Robotics & Systems
  'cs.RO',    // Robotics
  'cs.SY',    // Systems and Control
  
  // Theory & Algorithms
  'cs.DS',    // Data Structures and Algorithms
  'cs.CC',    // Computational Complexity
  'cs.GT',    // Computer Science and Game Theory
  
  // Applications
  'cs.HC',    // Human-Computer Interaction
  'cs.CR',    // Cryptography and Security
  'cs.DC',    // Distributed Computing

  // Mathematics
  'math.PR',  // Probability
  'math.ST',  // Statistics
  'math.OC',  // Optimization and Control
  'math.NA',  // Numerical Analysis
  'math.DS',  // Dynamical Systems
  
  // Physics
  'physics.comp-ph',  // Computational Physics
  'physics.data-an',  // Data Analysis, Statistics and Probability
  'physics.soc-ph',   // Physics and Society
  'quant-ph',        // Quantum Computing
  'cond-mat.stat-mech', // Statistical Mechanics
  
  // Economics & Finance
  'econ.TH',   // Economic Theory
  'econ.EM',   // Econometrics
  'q-fin.ST',  // Statistical Finance
  'q-fin.CP',  // Computational Finance
  'q-fin.PM',  // Portfolio Management
  
  // Biology & Life Sciences
  'q-bio.QM',    // Quantitative Methods
  'q-bio.NC',    // Neurons and Cognition
  'q-bio.GN',    // Genomics
  'q-bio.BM',    // Biomolecules
  'q-bio.PE',    // Populations and Evolution
];

// Configuration for ingestion
const CONFIG = {
  batchSize: 50,           // Number of papers to fetch per batch
  maxConcurrent: 3,        // Maximum concurrent requests
  retryDelay: 1000,        // Delay between retries in ms
  maxRetries: 5,           // Maximum number of retries per paper
  progressFile: '.ingest-progress.json',  // File to store progress
};

interface IngestionProgress {
  lastCategory: string;
  lastOffset: number;
  completedPapers: string[];
  failedPapers: { id: string; error: string }[];
  timestamp: string;
}

function loadProgress(): IngestionProgress {
  if (existsSync(CONFIG.progressFile)) {
    return JSON.parse(readFileSync(CONFIG.progressFile, 'utf-8'));
  }
  return {
    lastCategory: '',
    lastOffset: 0,
    completedPapers: [],
    failedPapers: [],
    timestamp: new Date().toISOString(),
  };
}

function saveProgress(progress: IngestionProgress) {
  writeFileSync(CONFIG.progressFile, JSON.stringify(progress, null, 2));
}

async function ingestPaper(paper: any, progress: IngestionProgress, retries = 0): Promise<void> {
  try {
    // Skip if already processed
    if (progress.completedPapers.includes(paper.id)) {
      console.log(`📚 I've already read "${paper.title}" - moving on!`);
      return;
    }

    // Fetch full paper content including PDF if available
    const fullContent = await fetchPaperContent(paper.id);
    
    // Create a more engaging, conversational content format
    const content = `
Let me tell you about an interesting paper I found! 🎓

Title: ${paper.title}

Quick Summary:
${paper.summary}

Written by these brilliant minds: ${paper.authors.join(', ')} ✍️

Research Areas: ${paper.categories.map((cat: string) => {
  // Make category names more friendly
  const friendlyNames: Record<string, string> = {
    'cs.AI': '🤖 Artificial Intelligence',
    'cs.LG': '🧠 Machine Learning',
    'cs.CL': '💬 Natural Language Processing',
    'cs.CV': '👁️ Computer Vision',
    'cs.RO': '🤖 Robotics',
    'stat.ML': '📊 Statistical Machine Learning',
    'cs.NE': '🧬 Neural Computing',
    'math.PR': '🎲 Probability',
    'math.ST': '📈 Statistics',
    'physics.comp-ph': '⚡ Computational Physics',
    'q-bio.QM': '🧬 Quantitative Biology',
    'econ.TH': '💰 Economic Theory'
  };
  return friendlyNames[cat] || cat;
}).join(', ')}

Key Insights:
${fullContent}

Want to learn more? Check it out here: https://arxiv.org/abs/${paper.id} 📖
`.trim();

    // Index with enhanced metadata
    await indexArxivPaper(content, {
      paperId: paper.id,
      title: paper.title,
      authors: paper.authors,
      categories: paper.categories,
      published: paper.published,
      summary: paper.summary,
      url: `https://arxiv.org/abs/${paper.id}`,
      doi: paper.doi,
      journalRef: paper.journal_ref,
      version: paper.version,
    });

    progress.completedPapers.push(paper.id);
    console.log(`✨ Just finished reading "${paper.title}" - fascinating stuff!`);
  } catch (error) {
    if (retries < CONFIG.maxRetries) {
      console.log(`⚠️ Attempt ${retries + 1} failed for "${paper.title}". Retrying...`);
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, retries) * 1000));
      return ingestPaper(paper, progress, retries + 1);
    }
    
    progress.failedPapers.push({ 
      id: paper.id, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
    console.error(`❌ Unfortunately, I couldn't process "${paper.title}" after ${CONFIG.maxRetries} attempts:`, error);
  } finally {
    saveProgress(progress);
  }
}

async function ingestCategory(category: string, progress: IngestionProgress) {
  const limit = pLimit(CONFIG.maxConcurrent);
  let offset = category === progress.lastCategory ? progress.lastOffset : 0;
  
  // Get friendly category name
  const getCategoryName = (cat: string) => {
    const names: Record<string, string> = {
      'cs.AI': 'Artificial Intelligence',
      'cs.LG': 'Machine Learning',
      'cs.CL': 'Natural Language Processing',
      'cs.CV': 'Computer Vision',
      'cs.RO': 'Robotics',
      'stat.ML': 'Statistical Machine Learning',
      // Add more friendly names as needed
    };
    return names[cat] || cat;
  };

  console.log(`\n🔍 Exploring ${getCategoryName(category)} papers...`);
  
  while (true) {
    const papers = await searchArxiv(`cat:${category}`, CONFIG.batchSize, offset);
    if (!papers.length) break;
    
    console.log(`\n📚 Found ${papers.length} interesting papers to read!`);
    await Promise.all(papers.map(paper => limit(() => ingestPaper(paper, progress))));
    
    offset += papers.length;
    progress.lastCategory = category;
    progress.lastOffset = offset;
    saveProgress(progress);
    
    console.log(`\n✅ Made great progress! Read ${offset} papers in ${getCategoryName(category)} so far.`);
  }
}

async function ingestPapers() {
  console.log('🚀 Starting my research journey! Time to dive into some fascinating papers...\n');
  const progress = loadProgress();
  
  // Find starting category
  const startIdx = progress.lastCategory
    ? CATEGORIES.indexOf(progress.lastCategory)
    : 0;
  
  // Process each category
  for (let i = startIdx; i < CATEGORIES.length; i++) {
    const category = CATEGORIES[i];
    console.log(`\n📚 Category ${i + 1}/${CATEGORIES.length}: Let's explore ${category}!`);
    await ingestCategory(category, progress);
  }
  
  console.log('\n🎉 Research complete! Here\'s what I accomplished:');
  console.log(`📖 Read and processed: ${progress.completedPapers.length} papers`);
  if (progress.failedPapers.length > 0) {
    console.log(`❌ Had some trouble with: ${progress.failedPapers.length} papers`);
  } else {
    console.log('✨ Successfully processed all papers!');
  }
}

// Export for use in scripts
export { ingestPapers };

// Allow running directly
if (require.main === module) {
  ingestPapers().catch(console.error);
}