"use client";

import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ImageInput({
  preview,
  label,
  onImageChange,
}: {
  preview: string | null;
  label: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold">{label}</p>
      <label
        htmlFor="thumbnail"
        className="size-10 rounded-full border border-neutral-300 shadow bg-center bg-cover flex justify-center items-center"
        style={{ backgroundImage: preview ? `url(${preview})` : "none" }}
      >
        {!preview && (
          <FontAwesomeIcon icon={faCamera} className="text-gray-900" />
        )}
      </label>
      <input
        type="file"
        id="thumbnail"
        className="hidden"
        // 이미지만 받기
        name="thumbnail"
        accept="image/*"
        onChange={onImageChange}
      />
    </div>
  );
}
