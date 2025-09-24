export function StatusBadge({
  variant,
  label,
}: {
  variant: "public" | "private" | "active" | "inactive";
  label: string;
}) {
  const styles: Record<typeof variant, string> = {
    public: "border-amber-300 bg-amber-100 text-amber-700",
    private: "border-neutral-300 bg-neutral-100 text-neutral-600",
    active: "border-emerald-300 bg-emerald-100 text-emerald-700",
    inactive: "border-rose-300 bg-rose-100 text-rose-700",
  };

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[11px] font-medium shadow-sm ${styles[variant]}`}
    >
      {label}
    </span>
  );
}
