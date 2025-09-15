import { cookies } from "next/headers";

export async function buildOAuthState(returnTo?: string) {
  const safeReturnTo =
    typeof returnTo === "string" &&
    returnTo.startsWith("/") &&
    !returnTo.startsWith("//")
      ? returnTo
      : undefined;

  // CSRF 방지 nonce 생성 및 쿠키 저장
  const nonce = crypto.randomUUID();
  (await cookies()).set("oauth_nonce", nonce, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
  });

  const statePayload: { nonce: string; returnTo?: string } = { nonce };
  if (safeReturnTo) statePayload.returnTo = safeReturnTo;

  return Buffer.from(JSON.stringify(statePayload)).toString("base64url");
}

export function buildAuthURL(baseURL: string, params: Record<string, string>) {
  const search = new URLSearchParams(params).toString();
  return `${baseURL}?${search}`;
}
