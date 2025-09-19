interface HabitListProps {
  children: React.ReactNode;
}

export function HabitList({ children }: HabitListProps) {
  return (
    <div className="relative space-y-3">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">습관 추가하기</h2>
      </header>

      <ul className="space-y-4">{children}</ul>
    </div>
  );
}
