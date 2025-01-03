import { styles } from '@/styles/components/Layout';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ backgroundColor: '#191A1B' }} className={`min-h-screen flex flex-col ${styles.container}`}>
            {children}
        </div>
    );
}