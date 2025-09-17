"use server";

import { getAppUrl } from "@/lib/api/getAppUrl";
import { buildAuthURL, buildOAuthState } from "@/lib/api/oauth";
import { redirect } from "next/navigation";

const appUrl = getAppUrl();

const clientIds = {
  kakao: process.env.KAKAO_CLIENT_ID!,
  google: process.env.GOOGLE_CLIENT_ID!,
};

/** 카카오 로그인 handler */
export async function handleKakaoLogin(returnTo?: string) {
  const clientId = clientIds.kakao;
  const redirectURI = `${appUrl}/api/auth/callback/kakao`;

  const state = await buildOAuthState(returnTo);

  const kakaoAuthURL = buildAuthURL("https://kauth.kakao.com/oauth/authorize", {
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectURI,
    state,
  });

  return redirect(kakaoAuthURL);
}

/** 구글 로그인 handler */
export async function handleGoogleLogin(returnTo?: string) {
  const clientId = clientIds.google;
  const redirectURI = `${appUrl}/api/auth/callback/google`;

  const state = await buildOAuthState(returnTo);

  const googleAuthURL = buildAuthURL(
    "https://accounts.google.com/o/oauth2/v2/auth",
    {
      response_type: "code",
      client_id: clientId,
      redirect_uri: redirectURI,
      scope: "openid email profile",
      state,
      // prompt: "consent",
    }
  );

  return redirect(googleAuthURL);
}
