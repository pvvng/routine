"use client";

import { FormButton } from "@/components/FormItems";
import { HabitsField } from "@/components/Habits/HabitsField";
import { RoutinePreview } from "@/components/Routine/Preview";
import { ResetRoutineFormButton } from "@/components/Routine/ResetRoutineFormButton";
import { RoutineField } from "@/components/Routine/RoutineField";

import { useHabit } from "@/lib/hooks/useHabit";
import { useImageInput } from "@/lib/hooks/useImageInput";
import { useRoutine } from "@/lib/hooks/useRoutine";

import { postRoutineWithHabits } from "@/lib/actions";

import { useActionState } from "react";

export function AddRoutineForm() {
  const routineAPI = useRoutine();
  const habitAPI = useHabit();
  const imageInputAPI = useImageInput();

  const interceptAction = async (_: unknown, formData: FormData) => {
    const result = await imageInputAPI.getPhotoUrl(formData);

    if (!result.ok) {
      return alert(result.message);
    }

    const photoUrl = result.data;
    formData.set("thumbnail", photoUrl);

    return postRoutineWithHabits(_, formData);
  };

  const [state, action] = useActionState(interceptAction, null);

  return (
    <div className="relative grid grid-cols-2 w-full h-full">
      {/* 왼쪽 폼 영역 */}
      <div className="sticky top-0 h-screen overflow-y-auto">
        <form className="p-5 space-y-8" action={action}>
          <RoutineField
            {...routineAPI}
            preview={imageInputAPI.preview}
            errors={state?.errors?.routine?.fieldErrors}
            onImageChange={imageInputAPI.onImageChange}
          />
          <HabitsField {...habitAPI} errors={state?.errors?.habits} />
          <div className="flex gap-2 justify-end items-center">
            <FormButton text="루틴 등록하기" />
            <ResetRoutineFormButton
              onReset={() => {
                routineAPI.resetRoutine();
                habitAPI.resetHabit();
                imageInputAPI.resetImageInput();
              }}
            />
          </div>
        </form>
      </div>

      <RoutinePreview
        routine={{
          ...routineAPI.routine,
          preview: imageInputAPI.preview,
        }}
        habits={habitAPI.orderedHabits}
      />
    </div>
  );
}
