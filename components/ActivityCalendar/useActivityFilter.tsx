"use client";

import {
  useMemo,
  useRef,
  useState,
  startTransition,
  useCallback,
  useEffect,
} from "react";
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
  // 오늘/연도는 렌더 간 안정적으로 고정
  const todayKey = useMemo(() => toLocalYMD(new Date()), []);
  const thisYear = useMemo(() => new Date().getFullYear(), []);
  const lastYear = thisYear - 1;

  const sortOptions: SortOption[] = useMemo(
    () => [
      { label: "기본", value: todayKey },
      { label: `${lastYear}년`, value: `${lastYear}-12-31` },
      { label: `${thisYear}년`, value: `${thisYear}-12-31` },
    ],
    [todayKey, thisYear, lastYear]
  );

  // date -> count (level은 파생값이므로 신뢰하지 않음)
  const countMap = useMemo(
    () => new Map(initialActivity.map((a) => [a.date, a.count])),
    [initialActivity]
  );

  // 베이스 캘린더 캐시
  const baseCacheRef = useRef(new Map<string, ActivityData[]>());
  const getBase = useCallback((key: string) => {
    const cached = baseCacheRef.current.get(key);
    if (cached) return cached;
    const base = generatePastYearData(key); // [{date, count:0, level:0}...]
    baseCacheRef.current.set(key, base);
    return base;
  }, []);

  // ★ 베이스 + countMap 머지 함수 (항상 동일 로직 사용)
  const makeMerged = useCallback(
    (key: string): ActivityData[] => {
      const base = getBase(key);
      const merged = base.map((e) => ({
        date: e.date,
        count: countMap.get(e.date) ?? 0,
        level: 0,
      }));
      return applyLevels(merged);
    },
    [countMap, getBase]
  );

  const [selected, setSelected] = useState(sortOptions[0]);

  // ★ 초기 상태부터 기본 정렬이 적용된 상태로
  const [activity, setActivity] = useState<ActivityData[]>(() =>
    makeMerged(todayKey)
  );

  const handleChange = (option: SortOption) => {
    setSelected(option);
    startTransition(() => {
      setActivity(makeMerged(option.value));
    });
  };

  // ★ initialActivity(=countMap)가 바뀌면 현재 선택값 기준으로 재계산
  useEffect(() => {
    setActivity(makeMerged(selected.value));
  }, [makeMerged, selected.value]);

  return {
    activity,
    selected,
    sortOptions,
    handleChange,
  };
}
