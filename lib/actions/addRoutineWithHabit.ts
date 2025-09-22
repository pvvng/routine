"use server";

import { z } from "zod";
import { Days } from "@prisma/client";

// 1) 스키마 정의
const HabitSchema = z.object({
  title: z.string().min(1, "제목은 필수입니다."),
  desc: z
    .string()
    .optional()
    .nullable()
    .transform((v) => v ?? undefined),
  isActive: z.coerce.boolean(),
  disabledDays: z.array(z.nativeEnum(Days)).default([]),
  order: z.coerce.number().int().nonnegative().default(0),
});

const RoutineSchema = z.object({
  title: z.string().min(1),
  desc: z
    .string()
    .optional()
    .nullable()
    .transform((v) => v ?? undefined),
  isPublic: z.enum(["0", "1"]).transform((v) => v === "1"),
  isActive: z.enum(["0", "1"]).transform((v) => v === "1"),
  // bgColor: z.string().regex(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, "색상 형식 오류"),
});

// 2) FormData에서 habits[*] 필드만 뽑아 배열로 만드는 헬퍼
function parseHabitsFromFormData(fd: FormData) {
  // idx → 임시 오브젝트 누적
  const acc: Record<number, { [k: string]: any }> = {};

  for (const [key, raw] of fd.entries()) {
    const val = String(raw);

    // 예: habits[3].title / habits[2].disabledDays[] / habits[1].isActive
    const m = key.match(/^habits\[(\d+)\]\.(\w+)(\[\])?$/);
    if (!m) continue;

    const idx = Number(m[1]);
    const field = m[2]; // title | desc | isActive | disabledDays | order ...
    const isArray = Boolean(m[3]);

    if (!acc[idx]) acc[idx] = {};

    if (isArray) {
      // disabledDays 처럼 [] 배열 필드
      acc[idx][field] = acc[idx][field] ?? [];
      acc[idx][field].push(val);
    } else {
      acc[idx][field] = val;
    }
  }

  // 인덱스 순서대로 배열화
  const result = Object.keys(acc)
    .map(Number)
    .sort((a, b) => a - b)
    .map((i) => acc[i]);

  return result;
}

// 3) 메인 액션
export async function addRoutineWithHabit(_: unknown, formData: FormData) {
  // 루틴 본문 필드 파싱
  const routineRaw = {
    title: formData.get("title"),
    desc: formData.get("desc"),
    isPublic: formData.get("isPublic"),
    isActive: formData.get("isActive"),
    bgColor: formData.get("bgColor"),
  };

  // 배열 파싱
  const habitsRaw = parseHabitsFromFormData(formData);

  // 검증
  const routine = RoutineSchema.safeParse(routineRaw);
  const habits = z
    .array(HabitSchema)
    .min(1, "습관을 하나 이상 추가하세요")
    .safeParse(habitsRaw);

  console.log(routine, habits);

  // TODO: DB 트랜잭션으로 저장

  return { ok: true, routine, habits };
}
