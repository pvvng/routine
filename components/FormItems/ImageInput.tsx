"use client";

import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useId } from "react";

interface Props {
  /** 인풋 이름 */
  name: string;
  /** 미리보기용 이미지 URL (선택 전에는 null) */
  preview: string | null;
  /** 인풋 라벨 텍스트 */
  label: string;
  /** 파일 선택 시 실행되는 핸들러 (이미지 업로드 처리) */
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

/**
 * ImageInput 컴포넌트
 *
 * - 사용자 프로필 이미지/썸네일 업로드 UI
 * - 실제 `<input type="file">`는 숨기고,
 *   원형 라벨 영역을 클릭해서 파일 선택 창을 열 수 있게 함
 * - 이미지가 선택되면 preview 이미지를 배경으로 보여줌
 * - 이미지가 없을 땐 카메라 아이콘 표시
 */
export function ImageInput({ name, preview, label, onImageChange }: Props) {
  const id = useId();

  return (
    <div className="space-y-2">
      {/* 입력 필드 라벨 */}
      <p className="text-sm font-semibold">{label}</p>

      {/* 클릭 가능한 썸네일 미리보기 영역 (라벨이 input과 연결됨) */}
      <label
        htmlFor={id}
        className="size-10 rounded-full border border-neutral-300 shadow bg-center bg-cover flex justify-center items-center"
        style={{ backgroundImage: preview ? `url(${preview})` : "none" }}
      >
        {/* preview가 없을 때는 카메라 아이콘 보여줌 */}
        {!preview && (
          <FontAwesomeIcon icon={faCamera} className="text-gray-900" />
        )}
      </label>

      {/* 실제 파일 선택 input (숨김 처리) */}
      <input
        type="file"
        id={id}
        className="hidden"
        name={name} // FormData에 담길 key
        accept="image/*" // 이미지 파일만 허용
        onChange={onImageChange} // 선택 시 콜백 실행
      />
    </div>
  );
}
