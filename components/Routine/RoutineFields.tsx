"use client";

import { RoutineDraft } from "@/lib/hooks/useRoutine";
import { ColorInput, LabeledInput, ToggleSwitch } from "../FormItems";

type RoutineFieldsProps = RoutineDraft & {
  updateRoutine: <K extends keyof RoutineDraft>(
    key: K,
    value: RoutineDraft[K]
  ) => void;
  toggleRoutine: (key: "isPublic" | "isActive") => void;
};

export function RoutineFields({
  isPublic,
  isActive,
  title,
  desc,
  bgColor,
  cardColor,
  calendarColor,
  toggleRoutine,
  updateRoutine,
}: RoutineFieldsProps) {
  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">루틴 생성하기</h1>
          <p className="text-sm text-neutral-600">*은 필수 항목입니다.</p>
        </div>
        <div className="flex items-center gap-3">
          <ToggleSwitch
            checked={isPublic}
            onChange={() => toggleRoutine("isPublic")}
            label="공개"
          />
          <ToggleSwitch
            checked={isActive}
            onChange={() => toggleRoutine("isActive")}
            label="활성화"
          />
        </div>
      </header>

      {/* 루틴 기본 정보 */}
      <div className="space-y-3">
        <LabeledInput
          label="*루틴 제목"
          name="title"
          placeholder="(필수) 루틴 이름"
          required
          value={title}
          onChange={(e) => updateRoutine("title", e.target.value)}
        />
        <LabeledInput
          label="루틴 설명"
          name="desc"
          placeholder="루틴에 대한 설명"
          value={desc}
          onChange={(e) => updateRoutine("desc", e.target.value)}
        />

        <ColorInput
          label="스트릭 색상"
          value={calendarColor}
          onChange={(e) => updateRoutine("calendarColor", e.target.value)}
        />
      </div>
    </div>
  );
}
