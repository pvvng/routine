import { Days } from "@prisma/client";
import { Errors } from "./Errors";

const DAYS: Days[] = ["월", "화", "수", "목", "금", "토", "일"];

interface Props {
  /** 인풋 이름 */
  name: string;
  /** 라벨 */
  label: string;
  /** 현재 비활성화(disabled) 상태인 요일 목록 */
  disabledDays: Days[];
  /** 해당 필드와 연결된 검증 에러 메시지 */
  errors?: string[];
  /** 특정 요일을 클릭했을 때 호출되는 콜백 (토글 역할) */
  onToggle: (day: Days) => void;
}

/**
 * 요일 선택 토글 그룹 컴포넌트
 *
 * - `disabledDays` 배열에 포함된 요일은 비활성화 상태(회색)로 표시됨
 * - 각 버튼을 누르면 `onToggle(day)`가 호출되어 상위 상태를 변경
 * - 검증 에러가 있으면 하단에 `Errors` 컴포넌트로 표시
 */
export function DayToggleGroup({
  name,
  label,
  disabledDays,
  errors = [],
  onToggle,
}: Props) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold inline-block">{label}</p>
      <div className="flex flex-wrap gap-2">
        {DAYS.map((day) => (
          <DayButton
            key={day}
            day={day}
            disabled={disabledDays.includes(day)}
            onClick={() => onToggle(day)}
          />
        ))}
        <input
          className="hidden"
          name={name}
          defaultValue={disabledDays.join(",")}
        />
      </div>
      <Errors errors={errors} />
    </div>
  );
}

interface DayButtonProps {
  /** 버튼이 나타낼 요일 문자열 */
  day: Days;
  /** 해당 요일이 비활성화(disabled) 상태인지 여부 */
  disabled: boolean;
  /** 버튼 클릭 시 호출되는 핸들러 */
  onClick: () => void;
}

/**
 * 개별 요일 토글 버튼
 *
 * - `disabled=true`이면 비활성화 색상(회색)으로 렌더링
 * - `disabled=false`이면 활성화 색상(초록색)으로 렌더링
 * - 클릭 시 상위로 이벤트를 전달 (`onClick`)
 */
function DayButton({ day, disabled, onClick }: DayButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "size-8 rounded-md text-sm transition flex justify-center items-center",
        disabled
          ? "bg-neutral-500 text-white"
          : "bg-emerald-500 text-white hover:bg-emerald-600",
      ].join(" ")}
      aria-pressed={disabled}
    >
      {day}
    </button>
  );
}
