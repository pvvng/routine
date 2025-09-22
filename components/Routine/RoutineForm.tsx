"use client";

import { FormButton } from "../FormItems";

interface RoutineFormProps {
  action: (payload: FormData) => void;
  resetFormFields: () => void;
  children: React.ReactNode;
}

export function RoutineForm({
  action,
  resetFormFields,
  children,
}: RoutineFormProps) {
  return (
    <form action={action} className="space-y-8">
      {children}
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          className="rounded-2xl bg-white px-4 py-2 font-semibold shadow hover:opacity-90 active:scale-95 border border-neutral-50
        disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed disabled:hover:opacity-100 disabled:active:scale-none"
          onClick={resetFormFields}
        >
          초기화
        </button>
        <FormButton text="등록하기" />
      </div>
    </form>
  );
}
