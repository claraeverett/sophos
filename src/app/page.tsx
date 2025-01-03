import Layout from '@/components/layout/Layout';
import Header from '@/components/layout/Header';
import SearchBar from '@/components/search/SearchBar';

const suggestions = [
  "what is farfalle?",
  "openai scarlett johansson?",
  "what is groq?",
  "what happened to ilya?"
];

export default function Home() {
  return (
    <Layout>
      <Header />
      <main className="flex-1 flex flex-col items-center min-h-[calc(100vh-80px)]">
        <div className="flex flex-col items-center flex-1 justify-center max-w-2xl w-full px-4 -mt-20">
          <h1 className="text-4xl font-medium mb-6 text-white">Find the best science, faster.</h1>
          <SearchBar />
          <div className="mt-4 flex flex-col gap-1 w-full">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="suggestion">
                <span className="suggestion-arrow">↗</span>
                {suggestion}
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}