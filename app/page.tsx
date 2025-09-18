"use client";

import { RoutineHero } from "@/components/Hero/RoutineHero";
import { SwipeCard } from "@/components/SwipeHabitCard/SwipeCard";
import { SwipeContent } from "@/components/SwipeHabitCard/SwipeContent";
import { SwipeFeedback } from "@/components/SwipeHabitCard/SwipeFeedback";
import type { Days } from "@prisma/client";

export default function Home() {
  return (
    <div className="mx-auto max-w-screen-sm p-5 font-paperlogy space-y-4">
      {/* 헤더 / 히어로 */}
      <RoutineHero />

      {/* 습관 카드 리스트 */}
      <section className="space-y-4">
        <SwipeCard
          front={
            <SwipeContent
              id="habit1"
              title="아침 물 500ml 마시기"
              desc="일어나자마자 물 한 잔으로 하루를 시작하세요."
              disabledDays={["토", "일"] as Days[]} // 주말 OFF
            />
          }
          back={<SwipeFeedback />}
        />

        <SwipeCard
          front={
            <SwipeContent
              id="habit2"
              title="푸쉬업 20회"
              desc="폼을 유지하면서 천천히."
              disabledDays={[] as Days[]} // 매일 ON
            />
          }
          back={<SwipeFeedback />}
        />

        <SwipeCard
          front={
            <SwipeContent
              id="habit3"
              title="명상 5분"
              desc="호흡에 집중해 보세요."
              disabledDays={["수"] as Days[]} // 수요일 OFF
            />
          }
          back={<SwipeFeedback />}
        />
      </section>
    </div>
  );
}
