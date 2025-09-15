import { cookies } from "next/headers";

/** oauth 로그인 state parse */
export async function parseSafeState(
  state: string | null
): Promise<{ returnTo?: string }> {
  if (!state) return {};
  try {
    const cookieStore = await cookies();
    const got = JSON.parse(
      Buffer.from(state, "base64url").toString("utf8")
    ) as { nonce?: string; returnTo?: string };

    // nonce 검증
    const nonceCookie = cookieStore.get("oauth_nonce")?.value;
    if (!got?.nonce || !nonceCookie || got.nonce !== nonceCookie) {
      throw new Error("Invalid nonce");
    }

    // 쿠키 소모(재사용 방지)
    cookieStore.set("oauth_nonce", "", {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: 0,
    });

    // returnTo sanity check
    if (
      got.returnTo &&
      got.returnTo.startsWith("/") &&
      !got.returnTo.startsWith("//")
    ) {
      return { returnTo: got.returnTo };
    }
    return {};
  } catch {
    return {};
  }
}
