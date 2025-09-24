export const TABS = ["habits", "streak"] as const;
export type Tabs = (typeof TABS)[number];

export const TAB_LABEL: Record<Tabs, string> = {
  habits: "습관",
  streak: "스트릭",
};

interface TabButtonProps {
  id: string;
  controls: string;
  selected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}

export function TabButton({
  id,
  controls,
  selected,
  onSelect,
  children,
}: TabButtonProps) {
  return (
    <button
      id={id}
      role="tab"
      aria-selected={selected}
      aria-controls={controls}
      tabIndex={selected ? 0 : -1}
      onClick={onSelect}
      className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition
        ${
          selected
            ? "bg-emerald-500 text-white"
            : "text-neutral-700 hover:bg-neutral-100"
        }
      `}
    >
      {children}
    </button>
  );
}
