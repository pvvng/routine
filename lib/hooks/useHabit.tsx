"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Days } from "@prisma/client";
import { randBase36 } from "../utils";

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

  const initHabit = (id: string): HabitDraft => ({
    id: `habit_${id}`,
    title: "",
    desc: "",
    disabledDays: [],
    isActive: true,
  });

  const addHabit = useCallback(() => {
    const id = randBase36();
    setHabits((prev) => {
      const next = [...prev, initHabit(id)];
      return next;
    });
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

  const resetHabit = useCallback(() => setHabits([]), []);

  /** 뷰 전용: 활성 먼저, 비활성은 하단.
   *  안정적 정렬을 위해 기존 인덱스를 키로 보조한다. */
  const orderedHabits = useMemo(() => {
    return habits
      .map((h, i) => ({ h, i })) // 원래 순서 기억
      .sort((a, b) => {
        // 활성(true) 먼저
        if (a.h.isActive !== b.h.isActive) {
          return a.h.isActive ? -1 : 1;
        }
        // 같은 그룹 내에서는 기존 순서 유지(안정적)
        return a.i - b.i;
      })
      .map((x) => x.h);
  }, [habits]);

  return {
    habits, // 원본
    orderedHabits, // 렌더링용(활성 -> 비활성)
    addHabit,
    removeHabit,
    updateHabit,
    resetHabit,
    toggleDisabledDay,
  };
}
