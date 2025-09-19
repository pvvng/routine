import { Days } from "@prisma/client";
import { LabeledInput } from "../FormItems/LabeledInput";
import { DayToggleGroup } from "../FormItems/DayToggleGroup";
import { ToggleSwitch } from "../FormItems/ToggleSwitch";
import { HabitDraft } from "@/lib/hooks/useHabit";

interface HabitCardProps {
  idx: number;
  habit: HabitDraft;
  onRemove: (idx: number) => void;
  onUpdate: <K extends keyof HabitDraft>(
    idx: number,
    key: K,
    value: HabitDraft[K]
  ) => void;
  onToggleDay: (idx: number, day: Days) => void;
}

export function HabitCard({
  idx,
  habit,
  onRemove,
  onUpdate,
  onToggleDay,
}: HabitCardProps) {
  return (
    <li className="rounded-2xl bg-white p-4 shadow space-y-4">
      <div className="flex items-center justify-between">
        <div className="font-semibold">
          {habit.title || `습관 #${idx + 1}`}
          <span className="ml-2 text-xs text-neutral-500">(중요도: {idx})</span>
        </div>

        <ToggleSwitch
          checked={habit.isActive}
          onChange={(val) => onUpdate(idx, "isActive", val)}
          label="활성화"
        />
      </div>

      <div className="space-y-3">
        <LabeledInput
          label="*습관 제목"
          name={`habits[${idx}].title`}
          placeholder="예) 물 2L 마시기"
          required
          value={habit.title}
          onChange={(e) => onUpdate(idx, "title", e.target.value)}
        />
        <LabeledInput
          label="습관 설명"
          name={`habits[${idx}].desc`}
          placeholder="습관에 대한 설명"
          value={habit.desc ?? ""}
          onChange={(e) => onUpdate(idx, "desc", e.target.value)}
        />
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold">활성화 요일</legend>
        <DayToggleGroup
          disabledDays={habit.disabledDays}
          onToggle={(day) => onToggleDay(idx, day)}
        />
      </fieldset>

      {/* 서버 제출 보조 (원하면 유지/삭제) */}
      <input type="hidden" name={`habits[${idx}].order`} value={idx} />
      <input
        type="hidden"
        name={`habits[${idx}].isActive`}
        value={String(habit.isActive)}
      />
      {habit.disabledDays.map((d, i2) => (
        <input
          key={i2}
          type="hidden"
          name={`habits[${idx}].disabledDays[]`}
          value={d}
        />
      ))}
      <button type="button" onClick={() => onRemove(idx)} className="">
        삭제
      </button>
    </li>
  );
}
