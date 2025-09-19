interface AddHabitButton {
  onAdd: () => void;
}

export function AddHabitButton({ onAdd }: AddHabitButton) {
  return (
    <button
      type="button"
      onClick={onAdd}
      className="rounded-2xl px-3 py-1.5 text-sm font-medium bg-emerald-500 text-white shadow hover:opacity-90"
    >
      + 습관 추가
    </button>
  );
}

interface ResetHabitButton {
  count: number;
  onReset: () => void;
}

export function ResetHabitButton({ count, onReset }: ResetHabitButton) {
  const disabled = count === 0;

  return (
    <button
      type="button"
      onClick={onReset}
      disabled={disabled}
      className="rounded-2xl px-3 py-1.5 text-sm font-medium bg-black text-white shadow hover:opacity-90
      disabled:bg-neutral-500 disabled:cursor-not-allowed disabled:hover:opacity-100"
    >
      리셋
    </button>
  );
}
