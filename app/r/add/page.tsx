"use client";

import { RoutineField } from "@/components/Routine/RoutineField";
import { useImageInput } from "@/lib/hooks/useImageInput";
import { useRoutine } from "@/lib/hooks/useRoutine";

export default function AddRoutine() {
  const routineAPI = useRoutine();
  const { preview, getPhotoUrl, onImageChange } = useImageInput();

  return (
    <div className="p-5 space-y-8">
      <RoutineField
        {...routineAPI}
        preview={preview}
        onImageChange={onImageChange}
      />
    </div>
  );
}
