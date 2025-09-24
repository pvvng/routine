"use client";

import { useCallback, useRef, useState } from "react";
import { getUploadUrl } from "../actions";

export const MAX_FILE_SIZE_MB = 2;

const HASH_KEY = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH!;

type GetPhotoUrlResult =
  | { ok: false; message: string }
  | { ok: true; data: string };

export type UseImageInputReturn = ReturnType<typeof useImageInput>;

export function useImageInput() {
  const [preview, setPreview] = useState<string | null>(null);
  const uploadUrl = useRef<string | null>(null);
  const imageId = useRef<string | null>(null);

  const getPhotoUrl = useCallback(
    async (payload: FormData): Promise<GetPhotoUrlResult> => {
      // 이미 CloudFlare 이미지일때 얼리리턴
      if (preview?.includes(HASH_KEY) && preview?.endsWith("public")) {
        return { ok: true, data: preview };
      }

      // upload image
      const file = payload.get("thumbnail");

      // 사용자가 이미지를 변경하지 않거나 업로드 url 획득 실패
      if (!(file && uploadUrl.current && imageId.current)) {
        return {
          ok: false,
          message: "이미지를 확인하지 못했습니다.",
        };
      }

      const cloudflareForm = new FormData();
      cloudflareForm.append("file", file);

      const response = await fetch(uploadUrl.current, {
        method: "post",
        body: cloudflareForm,
      });

      if (response.status !== 200) {
        return {
          ok: false,
          message: "이미지 업로드에 실패했습니다",
        };
      }

      // replace photo in formdata
      const photoUrl = `https://imagedelivery.net/${HASH_KEY}/${imageId.current}/public`;
      // 프리뷰 이미지 url 변경
      setPreview(photoUrl);

      return {
        ok: true,
        data: photoUrl,
      };
    },
    []
  );

  const onImageChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (!files || files.length == 0) {
        // 취소버튼 클릭하면 초기화 시켜야함
        setPreview(null);
        imageId.current = null;
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
      uploadUrl.current = uploadURL;
      imageId.current = id;
    },
    []
  );

  const resetImageInput = useCallback(() => {
    setPreview(null);
    uploadUrl.current = null;
    imageId.current = null;
  }, []);

  return {
    preview,
    getPhotoUrl,
    onImageChange,
    resetImageInput,
  };
}
