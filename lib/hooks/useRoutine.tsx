"use client";

import { useCallback, useState } from "react";

export type RoutineDraft = {
  title: string;
  desc: string;
  calendarColor: string;
  isPublic: boolean;
  isActive: boolean;
};

export type UseRoutineReturn = ReturnType<typeof useRoutine>;

const INITIAL_ROUTINE: RoutineDraft = {
  title: "",
  desc: "",
  calendarColor: "#3B82F6", // blue-500
  isPublic: false,
  isActive: true,
};

export function useRoutine() {
  const [routine, setRoutine] = useState<RoutineDraft>(INITIAL_ROUTINE);

  const updateRoutine = useCallback(
    <K extends keyof RoutineDraft>(key: K, value: RoutineDraft[K]) => {
      setRoutine((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const toggleRoutine = useCallback((key: "isPublic" | "isActive") => {
    setRoutine((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const resetRoutine = useCallback(() => {
    setRoutine(INITIAL_ROUTINE);
  }, []);

  return {
    routine, // 전체 상태
    updateRoutine, // 특정 필드 업데이트
    toggleRoutine, // 불리언 필드 토글
    resetRoutine,
  };
}
