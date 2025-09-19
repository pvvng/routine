"use client";

import { RoutineHero } from "@/components/Routine/RoutineHero";
import { SwipeCard } from "@/components/SwipeHabitCard/SwipeCard";
import { SwipeContent } from "@/components/SwipeHabitCard/SwipeContent";
import { SwipeFeedback } from "@/components/SwipeHabitCard/SwipeFeedback";
import { HabitDraft } from "@/lib/hooks/useHabit";

interface RoutinePreviewProps {
  title: string;
  desc: string;
  thumbnail: string;
  authorName: string;
  authorAvatar: string;
  isPublic: boolean;
  isActive: boolean;
  habits: HabitDraft[];
  bgColor: string;
}

export function RoutinePreview(props: RoutinePreviewProps) {
  return (
    <div className="mx-auto max-w-screen-sm p-5 space-y-4">
      {/* 헤더 / 히어로 */}
      <RoutineHero {...props} />

      {/* 습관 카드 리스트 */}
      <section className="space-y-4">
        {props.habits.map((habit) => (
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
          />
        ))}
      </section>
    </div>
  );
}
