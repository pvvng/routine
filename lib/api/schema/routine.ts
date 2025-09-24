import z from "zod";
import { emptyToNull, str01ToBool } from "./utils";

// #10B981 같은 컬러 필드
export const colorField = (fallback: string) =>
  z
    .string()
    .regex(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)
    .catch(fallback);

// 루틴 스키마
export const routineSchema = z.object({
  isPublic: str01ToBool,
  isActive: str01ToBool,
  title: z
    .string()
    .trim()
    .min(1, "루틴 제목은 최소 1자 이상이어야 합니다.")
    .max(100, "루틴 제목은 최대 100자입니다.")
    .refine((s) => s.length > 0, "루틴 제목은 필수입니다."),
  desc: emptyToNull,
  thumbnail: z
    .url("이미지가 URL 형식이 아닙니다.")
    .refine(
      (t) => t.includes("MR01-6_39Z4fkK0Q1BsXww") && t.endsWith("/public"),
      "허용하는 형식의 URL이 아닙니다."
    ),
  calendarColor: colorField("#10B981"),
});
