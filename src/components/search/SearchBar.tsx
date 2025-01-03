import { styles } from '@/styles/components/styles';

export default function SearchBar() {
  return (
    <div className={styles.search.container}>
      <input 
        type="text"
        placeholder="Ask anything..."
        className={styles.search.input}
      />
      <button className={styles.search.submitButton}>
        <svg 
          className="submit-arrow"
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M5 12h14m-7-7l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}