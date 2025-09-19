"use client";

import { useHabit } from "@/lib/hooks/useHabit";
import { useRoutine } from "@/lib/hooks/useRoutine";
import { RoutineForm } from "@/components/Routine/RoutineForm";
import { RoutinePreview } from "@/components/Routine/RoutinePreview";

export default function AddRoutinePage() {
  const { routine, updateRoutine, toggleRoutine, resetRoutine } = useRoutine();
  const {
    habits,
    addHabit,
    removeHabit,
    updateHabit,
    resetHabit,
    toggleDisabledDay,
  } = useHabit();

  return (
    <div className="grid grid-cols-2">
      <div className="p-5 sticky top-0 left-0 h-screen overflow-y-scroll bg-neutral-50">
        <RoutineForm
          routine={routine}
          updateRoutine={updateRoutine}
          toggleRoutine={toggleRoutine}
          resetRoutine={resetRoutine}
          habits={habits}
          addHabit={addHabit}
          resetHabit={resetHabit}
          removeHabit={removeHabit}
          updateHabit={updateHabit}
          toggleDisabledDay={toggleDisabledDay}
        />
      </div>
      <div className="">
        <RoutinePreview
          {...routine}
          thumbnail=""
          authorName="김동산"
          authorAvatar=""
          habits={habits}
        />
      </div>
    </div>
  );
}
