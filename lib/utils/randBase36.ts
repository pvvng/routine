/** 16자 랜덤 영어 숫자 혼합 문자 생성 */
export function randBase36(len = 16) {
  return Array.from(crypto.getRandomValues(new Uint32Array(Math.ceil(len / 6))))
    .map((n) => n.toString(36).padStart(6, "0"))
    .join("")
    .slice(0, len);
}
