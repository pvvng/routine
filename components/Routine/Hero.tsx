import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { StatusBadge } from "../Badge/StatusBadge";

interface RoutineHeroProps {
  thumbnail: string | null;
  title: string;
  desc?: string;
  isActive: boolean;
  isPublic: boolean;
}

export function RoutineHero({
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
