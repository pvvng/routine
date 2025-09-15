import { ObjectId } from "bson";

/**
 * MongoDB ObjectId 생성 함수
 * - ObjectId는 24자리 16진수.
 * - id 유효하면 그대로 쓰고 아니면 새로 생성.
 * - id 없으면 새로 생성.
 */
export function getObjectId(id?: string): string {
  if (id && /^[a-fA-F0-9]{24}$/.test(id)) {
    return new ObjectId(id).toString();
  }

  return new ObjectId().toString();
}
