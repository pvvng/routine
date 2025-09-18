"use client";

import { useFormStatus } from "react-dom";

interface Props {
  text: string;
  disabled?: boolean;
}

export function FormButton({ text, disabled }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="rounded-2xl bg-black px-4 py-2 text-white font-semibold shadow hover:opacity-90 active:scale-95
      disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed disabled:hover:opacity-100 disabled:active:scale-none"
    >
      {pending ? "로딩 중" : text}
    </button>
  );
}
