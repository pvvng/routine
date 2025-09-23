import { Days } from "@prisma/client";
import { StatusBadge } from "../Badge/StatusBadge";

interface SwipeContentProps {
  id: string;
  title: string;
  desc?: string;
  disabledDays: Days[];
  isActive: boolean;
}

const days: Days[] = ["월", "화", "수", "목", "금", "토", "일"];

export function SwipeContent({
  id,
  title,
  desc,
  disabledDays,
  isActive,
}: SwipeContentProps) {
  return (
    <div key={id} className="w-full p-5 space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-lg">{title || "습관의 제목"}</h3>
          {desc && (
            <p className="line-clamp-2 text-sm text-neutral-600">{desc}</p>
          )}
        </div>
        <StatusBadge
          variant={isActive ? "active" : "inactive"}
          label={isActive ? "활성화" : "비활성화"}
        />
      </div>
      <div className="w-full flex gap-1 items-center">
        {days.map((day) => {
          return (
            <div
              key={day}
              className={`text-sm size-6 flex justify-center items-center rounded border ${
                disabledDays.includes(day)
                  ? "bg-gray-200 border-gray-300 text-gray-800"
                  : "bg-green-200 border-green-300 text-green-800"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
