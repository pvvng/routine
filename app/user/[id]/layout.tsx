export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen pb-[calc(5rem+env(safe-area-inset-bottom))]">
      {children}
    </div>
  );
}
