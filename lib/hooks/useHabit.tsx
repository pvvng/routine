"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Days } from "@prisma/client";

export type HabitDraft = {
  id: string;
  title: string;
  desc?: string;
  disabledDays: Days[];
  isActive: boolean;
};

export function useHabit() {
  // habits
  const [habits, setHabits] = useState<HabitDraft[]>([]);
  const idxRef = useRef(0);

  const addHabit = useCallback(() => {
    setHabits((prev) => [
      ...prev,
      {
        id: `habit_${idxRef.current}`,
        title: "",
        desc: "",
        disabledDays: [],
        isActive: true,
      },
    ]);
    idxRef.current++;
  }, []);

  const removeHabit = useCallback(
    (idx: number) => setHabits((prev) => prev.filter((_, i) => i !== idx)),
    []
  );

  const updateHabit = useCallback(
    <K extends keyof HabitDraft>(idx: number, key: K, value: HabitDraft[K]) =>
      setHabits((prev) =>
        prev.map((h, i) => (i === idx ? { ...h, [key]: value } : h))
      ),
    []
  );

  const toggleDisabledDay = useCallback(
    (idx: number, day: Days) =>
      setHabits((prev) =>
        prev.map((h, i) => {
          if (i !== idx) return h;
          const exists = h.disabledDays.includes(day);
          return {
            ...h,
            disabledDays: exists
              ? h.disabledDays.filter((d) => d !== day)
              : [...h.disabledDays, day],
          };
        })
      ),
    []
  );

  const resetHabit = useCallback(() => {
    setHabits([]);
  }, []);

  const api = useMemo(
    () => ({
      habits,
      addHabit,
      removeHabit,
      updateHabit,
      resetHabit,
      toggleDisabledDay,
    }),
    [habits, addHabit, removeHabit, updateHabit, resetHabit, toggleDisabledDay]
  );

  return api;
}
