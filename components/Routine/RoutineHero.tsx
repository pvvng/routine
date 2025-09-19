import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { ActivityCalendar } from "../ActivityCalendar";
import { generatePastYearData } from "../ActivityCalendar/helpers";
import { StatusBadge } from "./StatusBadge";

interface RoutineHeroProps {
  title: string;
  desc: string;
  thumbnail: string;
  authorName: string;
  authorAvatar: string;
  isPublic: boolean;
  isActive: boolean;
  bgColor: string;
}

export function RoutineHero({
  title,
  desc,
  thumbnail,
  authorName,
  authorAvatar,
  isPublic,
  isActive,
  bgColor,
}: RoutineHeroProps) {
  return (
    <section className="relative rounded-2xl p-5 overflow-hidden">
      {/* 루틴 썸네일 */}
      <Image
        src={thumbnail || "/test/piggy.jpg"}
        alt={title || "루틴 썸네일"}
        fill
        className="object-cover"
        priority
      />

      {/* 설명 블록 */}
      <div className="space-y-5">
        <BackdropWrapper>
          <div className="flex justify-between items-center mb-2">
            <div className="flex gap-1 items-center">
              <StatusBadge
                variant={isPublic ? "public" : "private"}
                label={isPublic ? "공개" : "비공개"}
              />
              <StatusBadge
                variant={isActive ? "active" : "inactive"}
                label={isActive ? "활성화" : "비활성화"}
              />
            </div>
            <button
              className="inline-flex shrink-0 items-center gap-1 rounded-2xl px-2 py-1 bg-neutral-50 hover:bg-neutral-100 transition shadow text-xs"
              type="button"
            >
              <FontAwesomeIcon icon={faUserCircle} />
              <span>{authorName}</span>
            </button>
          </div>

          <h2 className="truncate text-2xl font-bold tracking-tight text-slate-900 mb-1">
            {title || "루틴의 제목"}
          </h2>
          <p className="text-sm text-neutral-700 break-words">{desc}</p>
        </BackdropWrapper>

        <BackdropWrapper>
          <ActivityCalendar
            activity={generatePastYearData(new Date().toString())}
            count={0}
            bgColor={bgColor}
          />
        </BackdropWrapper>
      </div>
    </section>
  );
}

function BackdropWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative p-5 bg-white/60 backdrop-blur rounded-2xl shadow">
      {children}
    </div>
  );
}
