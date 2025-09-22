"use client";

import { useHabit } from "@/lib/hooks/useHabit";
import { useRoutine } from "@/lib/hooks/useRoutine";
import { RoutineForm } from "@/components/Routine/RoutineForm";
import { HabitFields } from "@/components/Habit/HabitFields";
import { RoutineFields } from "@/components/Routine/RoutineFields";
import { useActionState } from "react";
import { addRoutineWithHabit } from "@/lib/actions/addRoutineWithHabit";
import { RoutineHero } from "@/components/Routine/RoutineHero";
import { SwipeCard } from "@/components/SwipeHabitCard/SwipeCard";
import { SwipeContent } from "@/components/SwipeHabitCard/SwipeContent";
import { SwipeFeedback } from "@/components/SwipeHabitCard/SwipeFeedback";

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

  const [state, action] = useActionState(addRoutineWithHabit, null);

  const interceptAction = (payload: FormData) => {
    payload.set("isActive", routine.isActive ? "1" : "0");
    payload.set("isPublic", routine.isPublic ? "1" : "0");
    payload.set("habits", JSON.stringify(habits));

    return action(payload);
  };

  return (
    <div className="grid grid-cols-2">
      <section className="p-5 sticky top-0 left-0 h-screen overflow-y-scroll bg-neutral-50">
        <RoutineForm
          action={interceptAction}
          resetFormFields={() => {
            resetHabit();
            resetRoutine();
          }}
        >
          <RoutineFields
            isPublic={routine.isPublic}
            isActive={routine.isActive}
            title={routine.title ?? ""}
            desc={routine.desc ?? ""}
            bgColor={routine.bgColor}
            calendarColor={routine.calendarColor}
            cardColor={routine.cardColor}
            toggleRoutine={toggleRoutine}
            updateRoutine={updateRoutine}
          />
          <HabitFields
            habits={habits}
            addHabit={addHabit}
            resetHabit={resetHabit}
            removeHabit={removeHabit}
            updateHabit={updateHabit}
            toggleDisabledDay={toggleDisabledDay}
          />
        </RoutineForm>
      </section>
      <section className="p-5 space-y-4">
        {/* 헤더 / 히어로 */}
        <RoutineHero
          title={routine.title ?? ""}
          desc={routine.desc ?? ""}
          thumbnail={""}
          isPublic={false}
          isActive={false}
          calendarColor={routine.calendarColor}
          authorAvatar=""
          authorName=""
        />

        {/* 습관 카드 리스트 */}
        <section className="space-y-4">
          {habits.map((habit) => (
            <SwipeCard
              key={habit.id}
              front={
                <SwipeContent
                  id={habit.id}
                  title={habit.title}
                  desc={habit.desc}
                  disabledDays={habit.disabledDays}
                  isActive={habit.isActive}
                />
              }
              back={<SwipeFeedback />}
            />
          ))}
        </section>
      </section>
    </div>
  );
}
