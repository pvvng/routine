"use client";

export function ResetRoutineFormButton({ onReset }: { onReset: () => void }) {
  return (
    <button
      type="button"
      className="rounded-2xl bg-white px-4 py-2 font-semibold shadow hover:bg-neutral-50 active:scale-95 border border-neutral-100
      disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed disabled:hover:opacity-100 disabled:active:scale-none"
      onClick={onReset}
    >
      초기화
    </button>
  );
}
