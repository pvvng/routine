import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: string;
}

/** **사용자가 로그인 한 상태인지 확인하는 함수**
 *
 * 반환된 쿠키에 아이디가 존재하면 로그인한 상태
 */
export async function getSession() {
  return await getIronSession<SessionContent>(await cookies(), {
    cookieName: "challenge",
    password: process.env.COOKIE_PASSWORD!,
  });
}

/** 사용자 로그인
 * @param id 로그인 할 유저의 id
 */
export async function login(id: string) {
  const session = await getSession();
  session.id = id;
  await session.save();
}

/** 사용자 로그아웃 */
export async function logout() {
  const session = await getSession();
  await session.destroy();
}
