import { useId } from "react";
import { Errors } from "./Errors";

type ColorInputProps = {
  label: string;
  value: string;
  errors?: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function ColorInput({
  label,
  value,
  errors = [],
  onChange,
  ...rest
}: ColorInputProps) {
  const id = useId();

  return (
    <div className="space-y-2">
      <span className="block text-sm font-semibold">{label}</span>
      <label htmlFor={id} className="inline-block cursor-pointer">
        <input
          id={id}
          type="color"
          className="sr-only" // 접근성 유지하면서 화면엔 숨김
          value={value}
          onChange={onChange}
          {...rest}
        />
        <div
          className="size-10 rounded-full border border-neutral-300 shadow"
          style={{ backgroundColor: value }}
        />
      </label>
      <Errors errors={errors} />
    </div>
  );
}
