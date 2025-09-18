import { Days } from "@prisma/client";

/** Prisma enum Days와 이름을 맞춤 */
const DAYS: Days[] = ["월", "화", "수", "목", "금", "토", "일"];

interface DayToggleGroupProps {
  disabledDays: Days[];
  onToggle: (day: Days) => void;
}

export function DayToggleGroup({
  disabledDays,
  onToggle,
}: DayToggleGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {DAYS.map((day) => {
        const disabled = disabledDays.includes(day);
        return (
          <button
            key={day}
            type="button"
            onClick={() => onToggle(day)}
            className={[
              "px-2.5 py-1.5 rounded-md text-sm transition",
              disabled
                ? "bg-neutral-500 text-white"
                : "bg-emerald-500 text-white hover:bg-emerald-600",
            ].join(" ")}
            aria-pressed={disabled}
          >
            {day}
          </button>
        );
      })}
    </div>
  );
}
