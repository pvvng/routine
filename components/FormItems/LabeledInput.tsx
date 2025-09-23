"use client";

import { useId } from "react";
import { Errors } from "./Errors";

type Props = {
  /** 인풋 라벨 텍스트 */
  label: string;
  /**
   * 보조 설명 텍스트 (선택사항)
   * - 인풋 바로 아래에 작은 글씨로 출력
   * - 사용자가 입력할 때 참고할 수 있는 힌트나 가이드라인 표시
   * - 예: "최대 20자까지 입력 가능합니다."
   */
  helper?: string;
  /** 포커스 시 적용할 ring 클래스 (기본: 파란색) */
  ringClass?: string; // ex) "focus:ring-blue-500/30"
  /** 인풋 컨테이너 클래스명 (기본: space-y-2) */
  containerClassName?: string;
  /** 글자 수 카운터 표시 여부 (기본: maxLength가 있으면 자동 true) */
  showCounter?: boolean;
  /** 유효성 검사 에러 메시지 배열 */
  errors?: string[];
} & React.InputHTMLAttributes<HTMLInputElement>;

/**
 * LabeledInput 컴포넌트
 *
 * - 라벨 + input + 에러 + helper 텍스트를 한 세트로 묶어주는 UI
 * - `maxLength`가 지정되면 글자 수 카운터가 자동 표시됨
 * - `helper`는 유저에게 추가 힌트나 제약사항을 안내할 때 사용
 * - 에러 메시지는 Errors 컴포넌트로 표시
 * - 스타일링은 Tailwind로 기본 제공, 필요 시 `ringClass`/`className`으로 커스터마이징 가능
 */
export function LabeledInput({
  label,
  helper,
  ringClass = "focus:ring-blue-500/30",
  className,
  containerClassName,
  showCounter,
  maxLength,
  value,
  errors = [],
  ...rest
}: Props) {
  const id = useId(); // 접근성: label과 input 연결용 고유 id 생성
  const val = typeof value === "string" ? value : ((value ?? "") as string);
  const displayCounter = showCounter ?? !!maxLength; // 카운터 표시 여부 결정

  return (
    <div className={containerClassName ?? "space-y-2"}>
      {/* 라벨 */}
      <label className="text-sm font-semibold inline-block" htmlFor={id}>
        {label}
      </label>

      {/* input + counter (relative로 감쌈) */}
      <div className="relative">
        <input
          id={id}
          {...rest}
          value={value}
          maxLength={maxLength}
          className={[
            "w-full rounded-2xl border border-neutral-200 bg-white shadow-sm outline-none",
            "px-3 h-10 flex justify-center items-center",
            "focus:ring-1",
            ringClass,
            className ?? "",
          ].join(" ")}
        />

        {/* 글자수 카운터 (maxLength 있을 때만) */}
        {displayCounter &&
          typeof val === "string" &&
          typeof maxLength === "number" && (
            <span className="absolute right-3 bottom-2.5 text-xs text-neutral-400">
              {val.length}/{maxLength}
            </span>
          )}
      </div>

      {/* helper 텍스트: 인풋 가이드라인/설명 */}
      {helper && <p className="text-xs text-neutral-500">{helper}</p>}

      {/* 에러 메시지 */}
      <Errors errors={errors} />
    </div>
  );
}
