"use server";

import { getAppUrl } from "@/lib/api/getAppUrl";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/** 카카오 로그인 handler */
export async function handleKakaoLogin(returnTo?: string) {
  const appUrl = getAppUrl();

  const baseURL = "https://kauth.kakao.com/oauth/authorize";
  const clientId = process.env.KAKAO_CLIENT_ID!;
  const redirectURI = `${appUrl}/api/auth/callback/kakao`;

  // 안전한 기본값 & 경로만 허용 (오픈 리다이렉트 방지)
  const safeReturnTo =
    typeof returnTo === "string" &&
    returnTo.startsWith("/") &&
    !returnTo.startsWith("//")
      ? returnTo
      : undefined;

  // CSRF 방지용 nonce를 쿠키에 저장
  const nonce = crypto.randomUUID();
  (await cookies()).set("oauth_nonce", nonce, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
  });

  // state에 returnTo와 nonce를 넣어 인코딩
  // state 구성: returnTo가 있을 때만 포함
  const statePayload: { nonce: string; returnTo?: string } = { nonce };
  if (safeReturnTo) statePayload.returnTo = safeReturnTo;

  const state = Buffer.from(JSON.stringify(statePayload)).toString("base64url");

  const params = {
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectURI,
    state,
  };

  const formattedParams = new URLSearchParams(params).toString();
  const kakaoAuthURL = `${baseURL}?${formattedParams}`;

  return redirect(kakaoAuthURL);
}
