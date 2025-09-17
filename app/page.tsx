"use client";

import { SwipeCard } from "@/components/SwipeHabitCard/SwipeCard";
import { SwipeContent } from "@/components/SwipeHabitCard/SwipeContent";
import { SwipeFeedback } from "@/components/SwipeHabitCard/SwipeFeedback";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Days } from "@prisma/client";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-auto max-w-screen-sm p-5 font-paperlogy">
      {/* 헤더 / 히어로 */}
      <RoutineHero />
      {/* TODO: heatmap 자리 */}
      <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

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

function RoutineHero() {
  return (
    <section className="relative rounded-2xl aspect-video overflow-hidden">
      {/* 루틴 썸네일 */}
      <Image src="/test/piggy.jpg" alt="" fill className="object-cover" />

      {/* 설명 블록 */}
      <div className="absolute inset-x-5 bottom-5 space-y-1 p-5 bg-white/70 backdrop-blur rounded-2xl shadow">
        <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-100/60 px-2 py-0.5 text-[11px] font-medium text-amber-700">
          공개
        </span>

        <div className="flex items-end justify-between">
          <h2 className="truncate text-2xl font-bold tracking-tight text-slate-900">
            루틴 이름
          </h2>
          <button
            className="inline-flex items-center gap-1 rounded-2xl px-2.5 py-1 text-sm bg-neutral-50 hover:bg-neutral-100 transition shadow"
            type="button"
          >
            <FontAwesomeIcon icon={faUserCircle} />
            <span>김동산</span>
          </button>
        </div>
      </div>
    </section>
  );
}
