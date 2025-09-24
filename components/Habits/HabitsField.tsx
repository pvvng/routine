import { UseHabitReturn } from "@/lib/hooks/useHabit";
import { DayToggleGroup, LabeledInput, ToggleSwitch } from "../FormItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { HabitErrorsMap } from "@/lib/api/schema";

export function HabitsField({
  habits,
  errors = {},
  addHabit,
  removeHabit,
  updateHabit,
  toggleDisabledDay,
}: UseHabitReturn & { errors?: HabitErrorsMap }) {
  // 안전하게 에러 꺼내는 헬퍼
  const getErr = (
    id: string,
    key: "title" | "desc" | "isActive" | "disabledDays"
  ) => errors?.[id]?.[key];

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">습관 추가하기</h2>
        {habits.length === 0 ? (
          <p className="text-sm text-neutral-600">
            아직 추가한 습관이 없습니다. + 버튼을 눌러 습관을 추가해보세요.
          </p>
        ) : (
          <p className="text-sm text-neutral-600">*은 필수 입력 항목입니다.</p>
        )}
      </div>

      {habits.map((habit, idx) => (
        <div
          key={habit.id}
          className="space-y-4 p-5 bg-neutral-50 shadow rounded-2xl"
        >
          <div className="flex justify-between items-center gap-2">
            <p className="text-lg font-semibold">
              {habit.title || `습관 #${idx + 1}`}
            </p>
            <ToggleSwitch
              label="활성화"
              checked={habit.isActive}
              name={`${habit.id}.isActive`}
              onChange={() => updateHabit(idx, "isActive", !habit.isActive)}
              errors={getErr(habit.id, "isActive")}
            />
          </div>

          <LabeledInput
            label="*제목"
            name={`${habit.id}.title`}
            // required
            placeholder="습관의 제목을 입력하세요."
            showCounter
            maxLength={100}
            ringClass="focus:ring-emerald-400"
            value={habit.title}
            onChange={(e) => updateHabit(idx, "title", e.target.value)}
            errors={getErr(habit.id, "title")}
          />

          <LabeledInput
            label="설명"
            name={`${habit.id}.desc`}
            placeholder="루틴의 설명을 입력하세요."
            showCounter
            maxLength={200}
            ringClass="focus:ring-emerald-400"
            value={habit.desc}
            onChange={(e) => updateHabit(idx, "desc", e.target.value)}
            errors={getErr(habit.id, "desc")}
          />

          <DayToggleGroup
            name={`${habit.id}.disabledDays`}
            label="활성화 요일"
            disabledDays={habit.disabledDays}
            onToggle={(day) => toggleDisabledDay(idx, day)}
            errors={getErr(habit.id, "disabledDays")}
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => removeHabit(idx)}
              className="text-sm text-red-500 hover:text-red-600 font-medium"
            >
              <FontAwesomeIcon icon={faTrashCan} /> 삭제
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        className="px-4 py-1 rounded-2xl shadow bg-emerald-500 hover:bg-emerald-600 transition text-white font-semibold"
        onClick={addHabit}
      >
        + 습관
      </button>
    </div>
  );
}
