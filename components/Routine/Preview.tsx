"use client";

import { HabitDraft } from "@/lib/hooks/useHabit";
import { RoutineDraft } from "@/lib/hooks/useRoutine";
import { ActivityCalendar } from "../ActivityCalendar";
import { generateRandomActivityData } from "../ActivityCalendar/helpers";
import { useEffect, useMemo, useState } from "react";
import { ActivityData } from "../ActivityCalendar/types";
import { RoutineHero } from "./Hero";
import { HabitsList } from "../Habits/HabitsList";
import { TAB_LABEL, TabButton, Tabs, TABS } from "./PreviewTab";

interface Props {
  routine: RoutineDraft & { preview: string | null };
  habits: HabitDraft[];
}

export function RoutinePreview({ routine, habits }: Props) {
  // 탭 상태: 기본 'habits'
  const [tab, setTab] = useState<Tabs>("habits");

  // 스트릭 더미 데이터: 최초 마운트 시 1회 생성
  const [activity, setActivity] = useState<ActivityData[]>([]);
  useEffect(() => {
    setActivity(generateRandomActivityData(new Date().toISOString()));
  }, []);

  const activeCount = useMemo(
    () => habits.filter((h) => h.isActive).length,
    [habits]
  );

  return (
    <div className="p-5 space-y-5 bg-neutral-100">
      <RoutineHero
        thumbnail={routine.preview}
        title={routine.title}
        desc={routine.desc}
        isActive={routine.isActive}
        isPublic={routine.isPublic}
      />

      {/* 탭 헤더 */}
      <div
        role="tablist"
        aria-label="루틴 미리보기 탭"
        className="flex w-full rounded-xl bg-white p-1 shadow gap-1"
      >
        {TABS.map((t) => (
          <TabButton
            key={t}
            id={`tab-${t}`}
            controls={`panel-${t}`}
            selected={tab === t}
            onSelect={() => setTab(t)}
          >
            <span>{TAB_LABEL[t]}</span>
            {t === "habits" && (
              <span className="ml-2 text-xs opacity-80">
                ({activeCount}/{habits.length})
              </span>
            )}
          </TabButton>
        ))}
      </div>

      {/* 탭 패널: 습관 */}
      {tab === "habits" && <HabitsList habits={habits} />}

      {/* 탭 패널: 스트릭 */}
      {tab === "streak" && (
        <div
          role="tabpanel"
          id="panel-streak"
          aria-labelledby="tab-streak"
          className="rounded-2xl bg-white p-5 shadow"
        >
          <ActivityCalendar
            activity={activity}
            calendarColor={routine.calendarColor}
          />
          <p className="text-sm text-neutral-600 mb-2">
            본 스트릭 데이터는 참고용으로 실제 데이터와 상이할 수 있습니다.
          </p>
        </div>
      )}
    </div>
  );
}
