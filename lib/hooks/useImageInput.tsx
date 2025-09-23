"use client";

import { useState } from "react";
import { getUploadUrl } from "../actions";

export const MAX_FILE_SIZE_MB = 1;

type GetPhotoUrlRes =
  | { ok: false; message: string }
  | { ok: true; data: string };

export function useImageInput() {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [imageId, setImageId] = useState<string | null>(null);

  const getPhotoUrl = async (payload: FormData): Promise<GetPhotoUrlRes> => {
    // 이미지에 변화가 없을때
    if (preview?.endsWith("public")) {
      return { ok: true, data: preview.replace(/\/public$/, "") };
    }

    // upload image
    const file = payload.get("thumbnail");

    if (!file || !uploadUrl) {
      return {
        ok: false,
        message: "이미지 업로드에 실패했습니다. 새로고침 후 다시 시도해주세요.",
      };
    }

    const cloudflareForm = new FormData();
    cloudflareForm.append("file", file);

    const response = await fetch(uploadUrl, {
      method: "post",
      body: cloudflareForm,
    });

    if (response.status !== 200) {
      return { ok: false, message: "이미지를 확인하지 못했습니다." };
    }

    // replace photo in formdata
    const photoUrl = `https://imagedelivery.net/MR01-6_39Z4fkK0Q1BsXww/${imageId}`;

    return { ok: true, data: photoUrl };
  };

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length == 0) {
      // 취소버튼 클릭하면 초기화 시켜야함
      setPreview(null);
      setImageId(null);
      return;
    }

    const file = files[0];

    if (!file.type.startsWith("image")) {
      alert("이미지 파일만 업로드 할 수 있습니다.");
      return;
    }

    if (MAX_FILE_SIZE_MB < file.size / (1024 * 1024)) {
      alert(`최대 ${MAX_FILE_SIZE_MB}MB의 이미지만 업로드 할 수 있습니다.`);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    const { success, result } = await getUploadUrl();

    if (!success) {
      alert("이미지 업로드에 실패했습니다.");
      return;
    }

    const { id, uploadURL } = result;
    setUploadUrl(uploadURL);
    setImageId(id);
  };

  return {
    preview,
    getPhotoUrl,
    onImageChange,
  };
}
