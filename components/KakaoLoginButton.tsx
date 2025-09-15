"use client";

import { handleKakaoLogin } from "@/app/login/actions";
import Image from "next/image";

interface KakaoLoginButtonProps {
  returnTo?: string;
}

export default function KakaoLoginButton({
  returnTo,
}: KakaoLoginButtonProps = {}) {
  return (
    <button
      onClick={() => handleKakaoLogin(returnTo)}
      className="w-full max-w-42 bg-[#FEE500] hover:opacity-90 active:scale-95 transition p-3 rounded-lg 
      flex gap-2 justify-center items-center cursor-pointer font-paperlogy"
    >
      <Image
        src="/kakao-icon.svg"
        alt="카카오 아이콘"
        width={20}
        height={20}
        priority
      />
      카카오 로그인
    </button>
  );
}
