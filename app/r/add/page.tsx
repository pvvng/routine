"use client";

import { useHabit } from "@/lib/hooks/useHabit";
import { useRoutine } from "@/lib/hooks/useRoutine";
import { RoutineForm } from "@/components/Routine/RoutineForm";
import { RoutinePreview } from "@/components/Routine/RoutinePreview";
import { HabitFields } from "@/components/Habit/HabitFields";
import { RoutineFields } from "@/components/Routine/RoutineFields";
import { startTransition, useActionState } from "react";
import { addRoutineWithHabit } from "@/lib/actions/addRoutineWithHabit";

export default function AddRoutinePage() {
  const routine = useRoutine();
  const habit = useHabit();

  const [state, action] = useActionState(addRoutineWithHabit, null);

  const interceptAction = (payload: FormData) => {
    payload.set("isActive", routine.routine.isActive ? "1" : "0");
    payload.set("isPublic", routine.routine.isPublic ? "1" : "0");

    return action(payload);
  };

  return (
    <div className="grid grid-cols-2">
      <section className="p-5 sticky top-0 left-0 h-screen overflow-y-scroll bg-neutral-50">
        <RoutineForm action={interceptAction}>
          <RoutineFields {...routine} />
          <HabitFields {...habit} />
        </RoutineForm>
      </section>
      <section>
        <RoutinePreview
          routine={routine.routine}
          habits={habit.habits}
          thumbnail=""
          authorName="김동산"
          authorAvatar=""
        />
      </section>
    </div>
  );
}
