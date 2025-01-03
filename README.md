# Sophos: AI-Powered Research Paper Search Engine

Sophos is an intelligent search engine designed to help researchers efficiently discover and understand academic papers from arXiv. By leveraging advanced LLM technology, Sophos provides natural language search capabilities and intelligent summarization of research papers.

## Features

- 🔍 **Natural Language Search**: Search for papers using everyday language instead of exact keywords
- 📚 **arXiv Integration**: Direct access to arXiv's extensive database of research papers
- 🤖 **AI-Powered Summaries**: Get quick, accurate summaries of complex research papers
- 💡 **Smart Recommendations**: Discover related papers based on your interests and search history
- ⚡ **Fast & Modern Interface**: Clean, responsive design built with Next.js and Tailwind CSS

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **AI/ML**: Large Language Models for search and summarization
- **Data Source**: arXiv API
- **Styling**: Custom design system with modern UI/UX principles

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/sophos.git
cd sophos
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Add your API keys and configuration
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
sophos/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── styles/          # Global styles and Tailwind config
│   └── lib/             # Utility functions and API clients
├── public/              # Static assets
└── prisma/             # Database schema and migrations
```

## Future Enhancements

- [ ] Advanced filtering by research field, date, and citations
- [ ] PDF preview and annotation tools
- [ ] Citation export in multiple formats
- [ ] User collections and reading lists
- [ ] Collaborative features for research teams

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Acknowledgments

- arXiv for providing access to research papers
- The open-source community for the amazing tools and libraries

---

Built with ❤️ for the research community
