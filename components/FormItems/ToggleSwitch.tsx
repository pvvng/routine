import { Errors } from "./Errors";

interface Props {
  /** input name */
  name: string;
  /** 현재 토글 상태 (true: 켜짐, false: 꺼짐) */
  checked: boolean;
  /** 토글 옆에 표시할 라벨 텍스트 (옵션) */
  label?: string;
  /** 유효성 검사 에러 메시지 배열 */
  errors?: string[];
  /** 상태 변경 시 호출되는 콜백 */
  onChange: (value: boolean) => void;
}

/**
 * ToggleSwitch 컴포넌트
 *
 * - on/off 상태를 시각적으로 표현하는 커스텀 토글 버튼
 * - 기본 HTML checkbox 대신 버튼과 스타일링을 이용
 * - 상태는 `checked`로 제어되며, 클릭 시 `onChange(!checked)`가 호출됨
 * - 라벨을 표시할 수 있고, 에러 메시지도 하단에 표시 가능
 * - 접근성을 위해 `aria-pressed` 속성을 사용해 현재 상태를 전달
 */
export function ToggleSwitch({
  name,
  checked,
  label,
  errors = [],
  onChange,
}: Props) {
  return (
    <div className="shrink-0 space-y-2">
      <div className="flex items-center gap-2">
        {label && (
          <span className="text-sm font-medium text-neutral-700">{label}</span>
        )}

        <button
          type="button"
          onClick={() => onChange(!checked)}
          className={[
            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200",
            checked ? "bg-emerald-500" : "bg-neutral-300",
          ].join(" ")}
          aria-pressed={checked}
        >
          <span
            className={[
              "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200",
              checked ? "translate-x-6" : "translate-x-1",
            ].join(" ")}
          />
        </button>
        {/* Form 제출 시 전달할 hidden input */}
        <input type="hidden" name={name} value={checked ? "1" : "0"} />
      </div>

      <Errors errors={errors} />
    </div>
  );
}
