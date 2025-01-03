export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-[#1C1C1F]">
            {children}
        </div>
    );
}