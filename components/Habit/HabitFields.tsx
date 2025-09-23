"use client";

import { HabitDraft } from "@/lib/hooks/useHabit";
import { HabitList } from "./HabitList";
import { AddHabitButton, ResetHabitButton } from "./HabitHandlerButtons";
import { Days } from "@prisma/client";
import { DayToggleGroup, LabeledInput, ToggleSwitch } from "../FormItems";
import { Errors } from "../FormItems/Errors";

interface HabitFieldsProps {
  habits: HabitDraft[];
  addHabit: () => void;
  resetHabit: () => void;
  removeHabit: (idx: number) => void;
  updateHabit: <K extends keyof HabitDraft>(
    idx: number,
    key: K,
    value: HabitDraft[K]
  ) => void;
  toggleDisabledDay: (idx: number, day: Days) => void;
  errorsById?: Record<string, Record<string, string[]>>; // habits_<id> 매핑
  formErrors?: string[]; // 전역/기타 에러
}

export function HabitFields({
  habits,
  addHabit,
  resetHabit,
  removeHabit,
  updateHabit,
  toggleDisabledDay,
  errorsById = {},
  formErrors = [],
}: HabitFieldsProps) {
  const getErr = (id: string, field?: string) =>
    field ? errorsById[id]?.[field] ?? [] : errorsById[id]?._all ?? [];

  return (
    <HabitList>
      {habits.length === 0 && (
        <div className="space-y-3">
          <p className="text-sm text-neutral-500">
            아직 등록된 습관이 없습니다. <b>“+ 습관 추가”</b>를 눌러 시작하세요.
          </p>
        </div>
      )}

      {habits.map((habit, idx) => (
        <li
          key={habit.id}
          className="rounded-2xl bg-white p-4 shadow space-y-4"
        >
          <div className="flex items-center justify-between">
            <p className="font-semibold text-base">
              {habit.title || `습관 #${idx + 1}`}
            </p>
            <ToggleSwitch
              checked={habit.isActive}
              onChange={(val) => updateHabit(idx, "isActive", val)}
              label="활성화"
            />
          </div>

          {/* 카드 레벨 공통 에러 */}
          {getErr(habit.id).length > 0 && <Errors errors={getErr(habit.id)} />}

          <div className="space-y-3">
            <LabeledInput
              label="*습관 제목"
              name={`habits[${idx}].title`}
              placeholder="예) 물 2L 마시기"
              // required
              value={habit.title}
              onChange={(e) => updateHabit(idx, "title", e.target.value)}
              errors={getErr(habit.id, "title")}
            />

            <LabeledInput
              label="습관 설명"
              name={`habits[${idx}].desc`}
              placeholder="습관에 대한 설명"
              value={habit.desc ?? ""}
              onChange={(e) => updateHabit(idx, "desc", e.target.value)}
              errors={getErr(habit.id, "desc")}
            />
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-semibold">활성화 요일</legend>
            <DayToggleGroup
              disabledDays={habit.disabledDays}
              errors={getErr(habit.id, "disabledDays")}
              onToggle={(day) => toggleDisabledDay(idx, day)}
            />
          </fieldset>

          {/* 서버 제출 보조(원하면 유지) */}
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

          <button type="button" onClick={() => removeHabit(idx)} className="">
            삭제
          </button>
        </li>
      ))}

      <div className="flex gap-1 items-center">
        <AddHabitButton onAdd={addHabit} />
        <ResetHabitButton count={habits.length} onReset={resetHabit} />
      </div>

      {/* 폼 전역 에러 */}
      <Errors errors={formErrors} />
    </HabitList>
  );
}
