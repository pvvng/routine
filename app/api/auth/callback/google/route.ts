import { getAppUrl } from "@/lib/api/getAppUrl";
import { getObjectId } from "@/lib/api/getObjectId";
import { parseSafeState } from "@/lib/api/parseSafeState";
import db from "@/lib/api/prismadb";
import { getSession, login, logout } from "@/lib/api/session";
import { NextResponse } from "next/server";

interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
}

export async function GET(req: Request) {
  const appUrl = getAppUrl();

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  // ★ state에서 돌아갈 곳 복원
  const state = searchParams.get("state");
  const { returnTo } = await parseSafeState(state);

  // returnTo가 존재한다면 우선전으로 리디렉트, 없다면 프로필 페이지로
  const goTo = (pathFallback: string) =>
    NextResponse.redirect(new URL(returnTo ?? pathFallback, req.url));

  // 1) 토큰 교환 (Google)
  let tokenData: any;
  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${appUrl}/api/auth/callback/google`,
        code,
      }),
      cache: "no-store",
    });

    if (!tokenRes.ok) {
      const text = await tokenRes.text();
      console.error("구글 토큰 요청 실패:", text);
      return NextResponse.json(
        { error: "Failed to get token from Google" },
        { status: 502 }
      );
    }

    tokenData = await tokenRes.json();
  } catch (e) {
    console.error("구글 토큰 요청 중 예외 발생:", e);
    return NextResponse.json(
      { error: "Exception during token request" },
      { status: 500 }
    );
  }

  if (tokenData?.error) {
    return NextResponse.json(tokenData, { status: 400 });
  }

  // 2) 사용자 정보 (Google)
  const accessToken = tokenData.access_token as string;
  let userData: GoogleUser;
  try {
    const userRes = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      }
    );
    if (!userRes.ok) {
      const text = await userRes.text();
      console.error("구글 사용자 정보 요청 실패:", text);
      return NextResponse.json(
        { error: "Failed to get user info from Google" },
        { status: 502 }
      );
    }
    userData = await userRes.json();
  } catch (e) {
    console.error("구글 사용자 정보 요청 중 예외 발생:", e);
    return NextResponse.json(
      { error: "Exception during user info request" },
      { status: 500 }
    );
  }

  const providerId = userData.id;
  const name = userData.name;
  const avatar = userData.picture;
  const email = userData.email;

  // 3) 기존 세션이 이미 유효한 사용자 세션인지 확인
  const session = await getSession();
  const sessionId = session?.id ?? null;

  if (sessionId) {
    try {
      const found = await db.user.findUnique({
        where: { id: getObjectId(sessionId) },
        select: { id: true, providerId: true },
      });

      if (found && found.providerId === providerId) {
        return goTo(`/user/${found.id}`);
      } else {
        logout();
      }

      // 세션은 있는데 유저가 없으면 정리
      await logout();
    } catch (e) {
      console.error("세션 검증 중 에러:", e);
      return NextResponse.json({ error: "Invalid session" }, { status: 500 });
    }
  }

  // 4) 같은 providerId의 유저가 이미 있으면 로그인
  try {
    const existing = await db.user.findUnique({
      where: { providerId },
      select: { id: true },
    });

    if (existing) {
      await login(existing.id);
      return goTo(`/user/${existing.id}`);
    }
  } catch (e) {
    console.error("사용자 검색 중 에러 발생: ", e);
    return NextResponse.json(
      { error: "Error occurred while searching for user" },
      { status: 500 }
    );
  }

  // 5) 신규 생성 → 로그인 → 병합 → 리다이렉트
  try {
    const created = await db.user.create({
      select: { id: true },
      data: {
        id: getObjectId(),
        name,
        avatar,
        email,
        provider: "google",
        providerId,
      },
    });

    await login(created.id);
    return goTo(`/user/${created.id}`);
  } catch (e) {
    console.error("신규 사용자 추가 중 에러 발생: ", e);
    return NextResponse.json(
      { error: "Error occurred while adding new user" },
      { status: 500 }
    );
  }
}
