import { Days } from "@prisma/client";
import { Errors } from "./Errors";

const DAYS: Days[] = ["월", "화", "수", "목", "금", "토", "일"];

interface DayToggleGroupProps {
  disabledDays: Days[];
  errors?: string[];
  onToggle: (day: Days) => void;
}

export function DayToggleGroup({
  disabledDays,
  errors = [],
  onToggle,
}: DayToggleGroupProps) {
  return (
    <>
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
      <Errors errors={errors} />
    </>
  );
}
