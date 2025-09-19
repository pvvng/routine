import { HabitDraft } from "@/lib/hooks/useHabit";
import { Days } from "@prisma/client";
import {
  ColorInput,
  FormButton,
  LabeledInput,
  ToggleSwitch,
} from "../FormItems";
import { HabitList } from "../Habit/HabitList";
import { HabitCard } from "../Habit/HabitCard";
import { AddHabitButton, ResetHabitButton } from "../Habit/HabitHandlerButtons";
import { RoutineDraft } from "@/lib/hooks/useRoutine";

interface RoutineFormProps {
  // 루틴 전체 상태
  routine: RoutineDraft;

  // 루틴 상태 업데이트 핸들러
  updateRoutine: <K extends keyof RoutineDraft>(
    key: K,
    value: RoutineDraft[K]
  ) => void;
  toggleRoutine: (key: "isPublic" | "isActive") => void;
  resetRoutine: () => void;

  // 습관 리스트
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
}

export function RoutineForm({
  routine,
  updateRoutine,
  toggleRoutine,
  resetRoutine,
  habits,
  addHabit,
  resetHabit,
  removeHabit,
  updateHabit,
  toggleDisabledDay,
}: RoutineFormProps) {
  return (
    <form className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">루틴 생성하기</h1>
          <p className="text-sm text-neutral-600">*은 필수 항목입니다.</p>
        </div>
        <div className="flex items-center gap-3">
          <ToggleSwitch
            checked={routine.isPublic}
            onChange={() => toggleRoutine("isPublic")}
            label="공개"
          />
          <ToggleSwitch
            checked={routine.isActive}
            onChange={() => toggleRoutine("isActive")}
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
          value={routine.title}
          onChange={(e) => updateRoutine("title", e.target.value)}
        />
        <LabeledInput
          label="루틴 설명"
          name="desc"
          placeholder="루틴에 대한 설명"
          value={routine.desc}
          onChange={(e) => updateRoutine("desc", e.target.value)}
        />
        {/* <LabeledInput
          label="썸네일 URL (선택)"
          name="thumbnail"
          placeholder="https://…"
        />
        <ColorInput
          label="배경색 (선택)"
          value={routine.bgColor}
          onChange={(e) => updateRoutine("bgColor", e.target.value)}
        /> */}
      </div>

      {/* 습관 리스트 */}
      <HabitList>
        {habits.length === 0 && (
          <div className="space-y-3">
            <p className="text-sm text-neutral-500">
              아직 등록된 습관이 없습니다. <b>“+ 습관 추가”</b>를 눌러
              시작하세요.
            </p>
          </div>
        )}

        {habits.map((habit, idx) => (
          <HabitCard
            key={habit.id}
            idx={idx}
            habit={habit}
            onRemove={removeHabit}
            onUpdate={updateHabit}
            onToggleDay={toggleDisabledDay}
          />
        ))}
        <div className="flex gap-1 items-center">
          <AddHabitButton onAdd={addHabit} />
          <ResetHabitButton count={habits.length} onReset={resetHabit} />
        </div>
      </HabitList>

      <div className="flex justify-end">
        <FormButton
          text={"등록하기"}
          // disabled={!canSubmit || submitting}
        />
      </div>
    </form>
  );
}
