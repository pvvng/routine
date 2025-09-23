import { UseRoutineReturn } from "@/lib/hooks/useRoutine";
import {
  ColorInput,
  ImageInput,
  LabeledInput,
  ToggleSwitch,
} from "../FormItems";

type Props = UseRoutineReturn & {
  preview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
};

export function RoutineField({
  routine,
  preview,
  updateRoutine,
  toggleRoutine,
  onImageChange,
}: Props) {
  return (
    <div className="space-y-4">
      <header className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">루틴 작성하기</h1>
          <p className="text-sm text-neutral-600">*은 필수 입력 항목입니다.</p>
        </div>
        <div className="flex gap-2 items-center">
          <ToggleSwitch
            name="isActive"
            checked={routine.isActive}
            onChange={() => toggleRoutine("isActive")}
            label="활성화"
          />
          <ToggleSwitch
            name="isPublic"
            checked={routine.isPublic}
            onChange={() => toggleRoutine("isPublic")}
            label="공개"
          />
        </div>
      </header>
      <LabeledInput
        label="*제목"
        name="title"
        required
        placeholder="루틴의 제목을 입력하세요."
        showCounter
        maxLength={100}
        ringClass="focus:ring-emerald-400"
        value={routine.title}
        onChange={(e) => updateRoutine("title", e.target.value)}
      />
      <LabeledInput
        label="설명"
        name="desc"
        placeholder="루틴의 설명을 입력하세요."
        showCounter
        maxLength={200}
        ringClass="focus:ring-emerald-400"
        value={routine.desc}
        onChange={(e) => updateRoutine("desc", e.target.value)}
      />
      <ImageInput
        name="thumbnail"
        label="배경 이미지"
        preview={preview}
        onImageChange={onImageChange}
      />
      <ColorInput
        name="calendarColor"
        label="스트릭 색상"
        value={routine.calendarColor}
        onChange={(e) => updateRoutine("calendarColor", e.target.value)}
      />
    </div>
  );
}
