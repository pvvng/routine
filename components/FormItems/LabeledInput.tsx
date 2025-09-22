"use client";

import { useId } from "react";
import { Errors } from "./Errors";

type Props = {
  label: string;
  helper?: string;
  ringClass?: string; // ex) "focus:ring-blue-500/30"
  containerClassName?: string;
  showCounter?: boolean; // 기본: maxLength가 있으면 자동 true
  errors?: string[];
} & React.InputHTMLAttributes<HTMLInputElement>;

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
  const id = useId();
  const val = typeof value === "string" ? value : ((value ?? "") as string);
  const displayCounter = showCounter ?? !!maxLength;

  return (
    <div className={containerClassName ?? "space-y-2"}>
      <label className="text-sm font-semibold inline-block" htmlFor={id}>
        {label}
      </label>
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
        {displayCounter &&
          typeof val === "string" &&
          typeof maxLength === "number" && (
            <span className="absolute right-3 bottom-2.5 text-xs text-neutral-400">
              {val.length}/{maxLength}
            </span>
          )}
      </div>
      {helper && <p className="text-xs text-neutral-500">{helper}</p>}
      <Errors errors={errors} />
    </div>
  );
}
