"use client";

import { useCallback, useRef, useState } from "react";
import { Days } from "@prisma/client";

export type HabitDraft = {
  id: string;
  title: string;
  desc?: string;
  disabledDays: Days[];
  isActive: boolean;
};

export type UseHabitReturn = ReturnType<typeof useHabit>;

export function useHabit() {
  const [habits, setHabits] = useState<HabitDraft[]>([]);
  const idxRef = useRef(0);

  const initHabit = () => {
    return {
      id: `habit_${idxRef.current}`,
      title: "",
      desc: "",
      disabledDays: [],
      isActive: true,
    };
  };

  const addHabit = useCallback(() => {
    setHabits((prev) => [...prev, initHabit()]);
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

  return {
    habits,
    addHabit,
    removeHabit,
    updateHabit,
    resetHabit,
    toggleDisabledDay,
  };
}
