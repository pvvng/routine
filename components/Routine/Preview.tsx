import { HabitDraft } from "@/lib/hooks/useHabit";
import { RoutineDraft } from "@/lib/hooks/useRoutine";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { StatusBadge } from "../Badge/StatusBadge";
import { ActivityCalendar } from "../ActivityCalendar";
import { generateRandomActivityData } from "../ActivityCalendar/helpers";
import { useEffect, useMemo, useState } from "react";
import { ActivityData } from "../ActivityCalendar/types";
import { SwipeContent } from "../SwipeHabitCard/SwipeContent";
import { SwipeCard } from "../SwipeHabitCard/SwipeCard";
import { SwipeFeedback } from "../SwipeHabitCard/SwipeFeedback";

interface Props {
  routine: RoutineDraft & { preview: string | null };
  habits: HabitDraft[];
}

export function RoutinePreview({ routine, habits }: Props) {
  const [activity, setActivity] = useState<ActivityData[]>([]);

  useEffect(() => {
    setActivity(generateRandomActivityData(new Date().toISOString()));
  }, []);

  return (
    <div className="p-5 space-y-5 bg-neutral-50">
      <RoutineHero {...routine} thumbnail={routine.preview} />
      <div className="p-5 shadow rounded-2xl bg-white">
        <ActivityCalendar
          activity={activity}
          calendarColor={routine.calendarColor}
        />
        <p className="text-sm text-neutral-600 text-center">
          본 스트릭 데이터는 미리보기용으로 실제 데이터와 상이할 수 있습니다.
        </p>
      </div>
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
        ></SwipeCard>
      ))}
    </div>
  );
}

interface RoutineHeroProps {
  thumbnail: string | null;
  title: string;
  desc?: string;
  isActive: boolean;
  isPublic: boolean;
}

function RoutineHero({
  thumbnail,
  title,
  desc,
  isActive,
  isPublic,
}: RoutineHeroProps) {
  return (
    <div className="w-full aspect-3/2 relative rounded-2xl overflow-hidden bg-white shadow">
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt={title || "루틴 썸네일 이미지"}
          fill
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 w-full flex justify-center items-center">
          <FontAwesomeIcon icon={faCamera} className="text-4xl" />
        </div>
      )}
      <div className="absolute bottom-0 w-full bg-neutral-900/40 backdrop-blur text-white p-5 space-y-2">
        <div className="flex gap-2 items-center">
          <StatusBadge
            variant={isActive ? "active" : "inactive"}
            label={isActive ? "활성화" : "비활성화"}
          />
          <StatusBadge
            variant={isPublic ? "public" : "private"}
            label={isPublic ? "공개" : "비공개"}
          />
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-semibold break-words line-clamp-1">
            {title || "여기에 루틴 제목이 표시됩니다."}
          </p>
          <p className="text-neutral-100 line-clamp-2 break-words">
            {desc || "여기에 루틴 설명이 표시됩니다."}
          </p>
        </div>
      </div>
    </div>
  );
}
