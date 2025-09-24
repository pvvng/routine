"use client";

import { HabitsField } from "@/components/Habits/HabitsField";
import { RoutinePreview } from "@/components/Routine/Preview";
import { RoutineField } from "@/components/Routine/RoutineField";
import { useHabit } from "@/lib/hooks/useHabit";
import { useImageInput } from "@/lib/hooks/useImageInput";
import { useRoutine } from "@/lib/hooks/useRoutine";

export default function AddRoutine() {
  const routineAPI = useRoutine();
  const habitAPI = useHabit();
  const { preview, getPhotoUrl, onImageChange } = useImageInput();

  return (
    <div className="relative grid grid-cols-2 w-full h-full">
      {/* 왼쪽 폼 영역 */}
      <div className="sticky top-0 h-screen overflow-y-auto">
        <form className="p-5 space-y-8">
          <RoutineField
            {...routineAPI}
            preview={preview}
            onImageChange={onImageChange}
          />
          <HabitsField {...habitAPI} />
        </form>
      </div>

      {/* 오른쪽 프리뷰 영역 */}
      <RoutinePreview
        routine={{ ...routineAPI.routine, preview }}
        habits={habitAPI.orderedHabits}
      />
    </div>
  );
}
