"use client";

import { useMemo, useRef, useState, startTransition } from "react";
import { ActivityData } from "./types";
import { applyLevels, generatePastYearData, toLocalYMD } from "./helpers";

interface SortOption {
  label: string;
  value: string; // YYYY-MM-DD
}

interface UseActivityFilterProps {
  initialActivity: ActivityData[];
}

export function useActivityFilter({ initialActivity }: UseActivityFilterProps) {
  const todayKey = toLocalYMD(new Date());
  const thisYear = new Date().getFullYear();
  const lastYear = thisYear - 1;

  const sortOptions: SortOption[] = useMemo(
    () => [
      { label: "기본", value: todayKey },
      { label: `${lastYear}년`, value: `${lastYear}-12-31` },
      { label: `${thisYear}년`, value: `${thisYear}-12-31` },
    ],
    [todayKey, thisYear, lastYear]
  );

  // date -> count (level은 파생값이므로 신뢰 안 함)
  const countMap = useMemo(
    () => new Map(initialActivity.map((a) => [a.date, a.count])),
    [initialActivity]
  );

  // 베이스 캘린더 캐시
  const baseCacheRef = useRef(new Map<string, ActivityData[]>());
  const getBase = (key: string) => {
    const cached = baseCacheRef.current.get(key);
    if (cached) return cached;
    const base = generatePastYearData(key); // [{ date, count:0, level:0 }...]
    baseCacheRef.current.set(key, base);
    return base;
  };

  const [selected, setSelected] = useState(sortOptions[0]);
  const [activity, setActivity] = useState(() => applyLevels(initialActivity));

  const handleChange = (option: SortOption) => {
    setSelected(option);
    startTransition(() => {
      const base = getBase(option.value);
      const merged: ActivityData[] = base.map((e) => ({
        date: e.date,
        count: countMap.get(e.date) ?? 0,
        level: 0,
      }));
      setActivity(applyLevels(merged));
    });
  };

  return {
    activity,
    selected,
    sortOptions,
    handleChange,
  };
}
