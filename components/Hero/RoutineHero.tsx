import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { ActivityCalendar } from "../ActivityCalendar";
import { generatePastYearData } from "../ActivityCalendar/helpers";

export function RoutineHero() {
  return (
    <section className="relative rounded-2xl p-5 overflow-hidden">
      {/* 루틴 썸네일 */}
      <Image src="/test/piggy.jpg" alt="" fill className="object-cover" />

      {/* 설명 블록 */}
      <div className="relative space-y-10 p-5 bg-white/70 backdrop-blur rounded-2xl shadow">
        <div>
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

        <ActivityCalendar
          activity={generatePastYearData(new Date().toString())}
          count={30}
        />
      </div>
    </section>
  );
}
