"use client";

import { useHabit } from "@/lib/hooks/useHabit";
import { useRoutine } from "@/lib/hooks/useRoutine";
import { RoutineForm } from "@/components/Routine/RoutineForm";
import { HabitFields } from "@/components/Habit/HabitFields";
import { RoutineFields } from "@/components/Routine/RoutineFields";
import { startTransition, useActionState } from "react";
import { addRoutineWithHabit } from "@/lib/actions/addRoutineWithHabit";
import { RoutineHero } from "@/components/Routine/RoutineHero";
import { SwipeCard } from "@/components/SwipeHabitCard/SwipeCard";
import { SwipeContent } from "@/components/SwipeHabitCard/SwipeContent";
import { SwipeFeedback } from "@/components/SwipeHabitCard/SwipeFeedback";
import { useImageInput } from "@/lib/hooks/useImageInput";

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

  const { preview, getPhotoUrl, onImageChange } = useImageInput();

  const [state, action] = useActionState(addRoutineWithHabit, null);

  const interceptAction = async (payload: FormData) => {
    payload.set("isActive", routine.isActive ? "1" : "0");
    payload.set("isPublic", routine.isPublic ? "1" : "0");
    payload.set("habits", JSON.stringify(habits));

    const res = await getPhotoUrl(payload);
    if (!res.ok) {
      alert(res.message);
      return;
    }
    payload.set("thumbnail", res.data);

    startTransition(() => {
      action(payload);
    });
  };

  const fieldErrors = state?.errors.fields ?? {};
  const formErrors = state?.errors.form ?? [];

  // habits_<id> 또는 habits_<id>.<field> 를 파싱해서 묶음
  const habitErrorMap = Object.entries(fieldErrors).reduce(
    (acc, [key, msgs]) => {
      const m = key.match(/^habits_(.+?)(?:\.(.+))?$/); // id, optional field
      if (!m) return acc;
      const [, id, field] = m;
      acc[id] ??= {};
      const k = field ?? "_all";
      acc[id][k] = msgs as string[];
      return acc;
    },
    {} as Record<string, Record<string, string[]>>
  );

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
            preview={preview}
            calendarColor={routine.calendarColor}
            onImageChange={onImageChange}
            toggleRoutine={toggleRoutine}
            updateRoutine={updateRoutine}
            titleError={state?.errors.fields.title}
            descError={state?.errors.fields.desc}
            colorError={state?.errors.fields.calendarColor}
            switchError={[
              ...(state?.errors.fields.isActive ?? []),
              ...(state?.errors.fields.isPublic ?? []),
            ]}
          />

          <HabitFields
            habits={habits}
            addHabit={addHabit}
            resetHabit={resetHabit}
            removeHabit={removeHabit}
            updateHabit={updateHabit}
            toggleDisabledDay={toggleDisabledDay}
            errorsById={habitErrorMap}
            formErrors={formErrors}
          />
        </RoutineForm>
      </section>
      <section className="p-5 space-y-4">
        {/* 헤더 / 히어로 */}
        <RoutineHero
          title={routine.title ?? ""}
          desc={routine.desc ?? ""}
          thumbnail={preview}
          isPublic={routine.isPublic}
          isActive={routine.isActive}
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
