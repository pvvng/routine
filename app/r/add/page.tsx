"use client";

import {
  ColorInput,
  ImageInput,
  LabeledInput,
  ToggleSwitch,
} from "@/components/FormItems";
import { useImageInput } from "@/lib/hooks/useImageInput";
import { useState } from "react";

export default function AddRoutine() {
  const [isActive, setIsActive] = useState(true);
  const [isPublic, setIsPublic] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [calendarColor, setCalendarColor] = useState("#ffffff");

  const { preview, getPhotoUrl, onImageChange } = useImageInput();

  return (
    <div className="p-5 space-y-4">
      <div className="flex justify-between items-end">
        <h1 className="text-2xl font-semibold">루틴 작성하기</h1>
        <div className="space-y-1">
          <ToggleSwitch
            label={isActive ? "활성화" : "비활성화"}
            checked={isActive}
            onChange={() => setIsActive((prev) => !prev)}
          />
          <ToggleSwitch
            label={isPublic ? "공개" : "비공개"}
            checked={isPublic}
            onChange={() => setIsPublic((prev) => !prev)}
          />
        </div>
      </div>
      <LabeledInput
        label="제목"
        name="title"
        required
        placeholder="루틴의 제목을 입력하세요."
        showCounter
        maxLength={100}
        ringClass="focus:ring-emerald-400"
        helper="필수 입력 항목입니다."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <LabeledInput
        label="설명"
        name="desc"
        placeholder="루틴의 설명을 입력하세요."
        showCounter
        maxLength={200}
        ringClass="focus:ring-emerald-400"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <ColorInput
        label="스트릭 색상"
        value={calendarColor}
        onChange={(e) => setCalendarColor(e.target.value)}
      />
      <ImageInput
        label="썸네일 이미지"
        preview={preview}
        onImageChange={onImageChange}
      />
    </div>
  );
}
