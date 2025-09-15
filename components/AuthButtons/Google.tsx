"use client";

import { handleGoogleLogin } from "@/app/login/actions";
import Image from "next/image";

interface GoogleLoginButtonProps {
  returnTo?: string;
}

export function AuthGoogle({ returnTo }: GoogleLoginButtonProps = {}) {
  return (
    <button
      onClick={() => handleGoogleLogin(returnTo)}
      className="w-full max-w-52 bg-neutral-50 ring ring-neutral-200 hover:opacity-85 active:scale-95 transition p-3 rounded-lg 
      flex gap-2 justify-center items-center cursor-pointer shadow"
    >
      <Image
        src="/google-icon.svg"
        alt="구글 아이콘"
        width={20}
        height={20}
        priority
      />
      구글 로그인
    </button>
  );
}
