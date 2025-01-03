'use client';

import { usePathname } from 'next/navigation';
import HistorySidebar from './HistorySidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div className={`min-h-screen bg-[#1C1C1F] ${isHomePage ? 'flex flex-col' : ''}`}>
      {children}
      {!isHomePage && <HistorySidebar />}
    </div>
  );
}