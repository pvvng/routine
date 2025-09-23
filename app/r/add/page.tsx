"use client";

import { HabitsField } from "@/components/Habits/HabitsField";
import { RoutineField } from "@/components/Routine/RoutineField";
import { useHabit } from "@/lib/hooks/useHabit";
import { useImageInput } from "@/lib/hooks/useImageInput";
import { useRoutine } from "@/lib/hooks/useRoutine";

export default function AddRoutine() {
  const routineAPI = useRoutine();
  const habitAPI = useHabit();
  const { preview, getPhotoUrl, onImageChange } = useImageInput();

  return (
    <div className="grid grid-cols-2 gap-5">
      <form className="p-5 space-y-8">
        <RoutineField
          {...routineAPI}
          preview={preview}
          onImageChange={onImageChange}
        />
        <HabitsField {...habitAPI} />
      </form>
    </div>
  );
}
