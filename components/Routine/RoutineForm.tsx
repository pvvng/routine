"use client";

import { FormButton } from "../FormItems";

interface RoutineFormProps {
  action: (payload: FormData) => void;
  children: React.ReactNode;
}

export function RoutineForm({ action, children }: RoutineFormProps) {
  return (
    <form action={action} className="space-y-8">
      {children}
      <div className="flex justify-end">
        <FormButton
          text={"등록하기"}
          // disabled={!canSubmit || submitting}
        />
      </div>
    </form>
  );
}
