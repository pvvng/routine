"use client";

import { Days } from "@prisma/client";
import { LabeledInput } from "@/components/FormItems/LabeledInput";
import { FormButton } from "@/components/FormItems/FormButton";
import { ToggleSwitch } from "@/components/FormItems/ToggleSwitch";
import { DayToggleGroup } from "@/components/FormItems/DayToggleGroup";
import { useState } from "react";
import { ColorInput } from "@/components/FormItems/ColorInput";

export default function AddRoutine() {
  // routine
  const [isPublicRoutine, setIsPublicRoutine] = useState(false);
  const [isActiveRoutine, setIsActiveRoutine] = useState(true);
  const [routineTitle, setRoutineTitle] = useState("");
  const [routineDesc, setRoutineDesc] = useState("");
  const [bgColor, setBgColor] = useState("");

  // habits
  const [habits, setHabits] = useState<HabitDraft[]>([]);

  const addHabit = () =>
    setHabits((prev) => [
      ...prev,
      { title: "", desc: "", disabledDays: [], isActive: true },
    ]);

  const removeHabit = (idx: number) =>
    setHabits((prev) => prev.filter((_, i) => i !== idx));

  const updateHabit = <K extends keyof HabitDraft>(
    idx: number,
    key: K,
    value: HabitDraft[K]
  ) =>
    setHabits((prev) =>
      prev.map((h, i) => (i === idx ? { ...h, [key]: value } : h))
    );

  const toggleDisabledDay = (idx: number, day: Days) =>
    setHabits((prev) =>
      prev.map((h, i) => {
        if (i !== idx) return h;
        const exists = h.disabledDays.includes(day);
        return {
          ...h,
          disabledDays: exists
            ? h.disabledDays.filter((d) => d !== day)
            : [...h.disabledDays, day],
        };
      })
    );

  const toggleIsPulicRoutine = () => setIsPublicRoutine((prev) => !prev);
  const toggleIsActiveRoutine = () => setIsActiveRoutine((prev) => !prev);

  return (
    <div className="grid grid-cols-2">
      <form className="space-y-6 p-5 sticky top-0 left-0 max-h-screen overflow-y-scroll">
        <header className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-semibold">루틴 생성하기</h1>
            <p className="text-sm text-neutral-600">*은 필수 항목입니다.</p>
          </div>
          <div className="flex items-center gap-3">
            <ToggleSwitch
              checked={isPublicRoutine}
              onChange={toggleIsPulicRoutine}
              label="공개"
            />
            <ToggleSwitch
              checked={isActiveRoutine}
              onChange={toggleIsActiveRoutine}
              label="활성화"
            />
          </div>
        </header>

        {/* 루틴 기본 정보 */}
        <div className="space-y-3">
          <LabeledInput
            label="*루틴 제목"
            name="title"
            placeholder="(필수) 루틴 이름"
            required
            value={routineTitle}
            onChange={(e) => setRoutineTitle(e.target.value)}
          />
          <LabeledInput
            label="루틴 설명"
            name="desc"
            placeholder="루틴에 대한 설명"
            value={routineDesc}
            onChange={(e) => setRoutineDesc(e.target.value)}
          />
          <LabeledInput
            label="썸네일 URL (선택)"
            name="thumbnail"
            placeholder="https://…"
          />
          <ColorInput
            label="배경색 (선택)"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </div>

        {/* 습관 리스트 */}
        <HabitList
          habits={habits}
          onAdd={addHabit}
          onRemove={removeHabit}
          onUpdate={updateHabit}
          onToggleDay={toggleDisabledDay}
        />

        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-500">
            {/* 습관 개수: <b>{habitCount}</b> */}
          </p>
          <FormButton
            text={"등록하기"}
            // disabled={!canSubmit || submitting}
          />
        </div>
      </form>
      {/* preview */}
      <div className="bg-neutral-50 h-[1000px]" />
    </div>
  );
}

type HabitDraft = {
  title: string;
  desc?: string;
  disabledDays: Days[];
  isActive: boolean;
};

// ---------------- Reusable HabitList ----------------
type HabitListProps = {
  habits: HabitDraft[];
  onAdd: () => void;
  onRemove: (idx: number) => void;
  onUpdate: <K extends keyof HabitDraft>(
    idx: number,
    key: K,
    value: HabitDraft[K]
  ) => void;
  onToggleDay: (idx: number, day: Days) => void;
};

export function HabitList({
  habits,
  onAdd,
  onRemove,
  onUpdate,
  onToggleDay,
}: HabitListProps) {
  return (
    <div className="relative space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">습관 추가하기</h2>
        {habits.length > 0 && (
          <button
            type="button"
            onClick={onAdd}
            className="rounded-2xl px-3 py-1.5 text-sm font-medium bg-emerald-500 text-white shadow hover:opacity-90"
          >
            + 습관 추가
          </button>
        )}
      </div>

      {habits.length === 0 && (
        <div className="space-y-3">
          <p className="text-sm text-neutral-500">
            아직 등록된 습관이 없습니다. <b>“+ 습관 추가”</b>를 눌러 시작하세요.
          </p>
          <button
            type="button"
            onClick={onAdd}
            className="rounded-2xl px-3 py-1.5 text-sm font-medium bg-emerald-500 text-white shadow hover:opacity-90"
          >
            + 습관 추가
          </button>
        </div>
      )}

      <ul className="space-y-4">
        {habits.map((habit, idx) => (
          <li
            key={idx}
            className="rounded-2xl bg-neutral-50 p-4 shadow space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="font-semibold">
                {habit.title || `습관 #${idx + 1}`}
                <span className="ml-2 text-xs text-neutral-500">
                  (중요도: {idx})
                </span>
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

            <div>
              <p className="mb-2 text-sm text-neutral-700">
                비활성화 요일 (체크한 요일은 비활성화)
              </p>
              <DayToggleGroup
                disabledDays={habit.disabledDays}
                onToggle={(day) => onToggleDay(idx, day)}
              />
            </div>

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
        ))}
      </ul>
    </div>
  );
}
