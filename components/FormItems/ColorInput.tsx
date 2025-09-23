import { useId } from "react";
import { Errors } from "./Errors";

type Props = {
  /** 라벨 텍스트 */
  label: string;
  /** 선택된 색상 값 (HEX 문자열) */
  value: string;
  /** 유효성 검사 에러 메시지 배열 */
  errors?: string[];
  /** 값이 바뀔 때 호출되는 핸들러 */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

/**
 * ColorInput 컴포넌트
 *
 * - 색상 선택용 `<input type="color">`를 시각적으로 숨기고,
 *   대신 둥근 미리보기 박스를 보여줌
 * - 접근성을 위해 실제 `<input>`은 sr-only로 유지, label과 연결
 * - 에러 메시지가 있으면 하단에 표시
 */
export function ColorInput({
  label,
  value,
  errors = [],
  onChange,
  ...rest
}: Props) {
  const id = useId(); // 접근성: label과 input 연결할 고유 id 생성

  return (
    <div className="space-y-2">
      {/* 필드 라벨 */}
      <span className="block text-sm font-semibold">{label}</span>

      {/* input + preview */}
      <label htmlFor={id} className="inline-block cursor-pointer">
        {/* 실제 색상 입력 (시각적으로 숨김, 접근성 유지) */}
        <input
          id={id}
          type="color"
          className="sr-only" // 스크린리더는 읽지만 화면엔 안 보임
          value={value}
          onChange={onChange}
          {...rest}
        />

        {/* 선택된 색상을 보여주는 미리보기 원 */}
        <div
          className="size-10 rounded-full border border-neutral-300 shadow"
          style={{ backgroundColor: value }}
        />
      </label>

      {/* 에러 메시지 출력 */}
      <Errors errors={errors} />
    </div>
  );
}
