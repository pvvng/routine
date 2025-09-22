"use client";

import { RoutineDraft } from "@/lib/hooks/useRoutine";
import { FormButton, LabeledInput, ToggleSwitch } from "../FormItems";

interface RoutineFieldsProps {
  // 루틴 전체 상태
  routine: RoutineDraft;

  // 루틴 상태 업데이트 핸들러
  updateRoutine: <K extends keyof RoutineDraft>(
    key: K,
    value: RoutineDraft[K]
  ) => void;
  toggleRoutine: (key: "isPublic" | "isActive") => void;
  resetRoutine: () => void;
}

export function RoutineFields({
  routine,
  updateRoutine,
  toggleRoutine,
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
            checked={routine.isPublic}
            onChange={() => toggleRoutine("isPublic")}
            label="공개"
          />
          <ToggleSwitch
            checked={routine.isActive}
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
          value={routine.title}
          onChange={(e) => updateRoutine("title", e.target.value)}
        />
        <LabeledInput
          label="루틴 설명"
          name="desc"
          placeholder="루틴에 대한 설명"
          value={routine.desc}
          onChange={(e) => updateRoutine("desc", e.target.value)}
        />
      </div>
    </div>
  );
}
