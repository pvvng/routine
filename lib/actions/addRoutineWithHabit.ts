"use server";

import { z } from "zod";
import db from "../api/prismadb";
import { getSession, logout } from "../api/session";
import { getObjectId } from "../api/getObjectId";
import { redirect } from "next/navigation";

const DaysEnum = z.enum(["월", "화", "수", "목", "금", "토", "일"]);

const str01ToBool = z
  .union([z.literal("0"), z.literal("1"), z.boolean()])
  .transform((v) => v === "1" || v === true);

// 안전한 JSON 파서 (string이면 JSON.parse, 아니면 그대로)
const parseJson = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((val) => {
    if (typeof val === "string") {
      try {
        return JSON.parse(val);
      } catch {
        // 파싱 실패 시 그대로 두면 이후 schema에서 에러로 잡힘
        return val;
      }
    }
    return val;
  }, schema);

// HEX 컬러(6 or 8자리) 정도만 간단 검증
const colorField = (defaultValue: string) =>
  z.preprocess(
    (val) => (val == null ? undefined : val),
    z
      .string()
      .regex(
        /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,
        "올바른 HEX 색상이어야 합니다."
      )
      .optional()
      .default(defaultValue)
  );

const habitSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "습관 제목은 필수입니다."),
  desc: z.string().optional().default(""),
  disabledDays: z
    .array(DaysEnum)
    .default([])
    .transform((arr) => Array.from(new Set(arr))),
  isActive: z.boolean(),
});

const routineSchema = z.object({
  title: z.string().min(1, "루틴 제목은 필수입니다."),
  desc: z.string().optional().default(""),
  isPublic: str01ToBool,
  isActive: str01ToBool,
  calendarColor: colorField("#3B82F6"),
  thumbnail: z.string(),
  habits: parseJson(z.array(habitSchema)),
});

export async function addRoutineWithHabit(_: unknown, formData: FormData) {
  const routineRaw = {
    title: formData.get("title"),
    desc: formData.get("desc"),
    isPublic: formData.get("isPublic"), // "0" | "1"
    isActive: formData.get("isActive"), // "0" | "1"
    thumbnail: formData.get("thumbnail"),
    calendarColor: formData.get("calendarColor"), // "#rrggbb" or "#rrggbbaa"
    habits: formData.get("habits"), // JSON string
  };

  const result = routineSchema.safeParse(routineRaw);

  if (!result.success) {
    const { fieldErrors, formErrors } = result.error.flatten();
    return {
      ok: false,
      errors: {
        fields: fieldErrors,
        form: formErrors,
      },
    };
  }

  const session = await getSession();
  const sessionId = session.id;

  if (!sessionId) {
    return {
      ok: false,
      errors: { fields: {}, form: ["로그인 후 이용 가능합니다."] },
    };
  }

  const user = await db.user.findUnique({
    where: { id: getObjectId(sessionId) },
    select: { id: true },
  });

  if (!user) {
    await logout();
    return {
      ok: false,
      errors: { fields: {}, form: ["사용자 정보를 확인하지 못했습니다."] },
    };
  }

  const data = result.data;
  try {
    const res = await db.$transaction(async (tx) => {
      const routine = await tx.routine.create({
        data: {
          title: data.title,
          desc: data.desc || null,
          calendarColor: data.calendarColor,
          isPublic: data.isPublic,
          isActive: data.isActive,
          thumbnail: data.thumbnail,
          userId: user.id,
        },
        select: { id: true },
      });

      // 습관들 매핑 (클라 id는 무시하고 order만 기록)
      const habitRows = data.habits.map((h) => ({
        routineId: routine.id,
        title: h.title,
        desc: h.desc || null,
        isActive: h.isActive,
        disabledDays: h.disabledDays,
      }));

      if (habitRows.length > 0) {
        await tx.habit.createMany({ data: habitRows });
      }

      return { routineId: routine.id, habitCount: habitRows.length };
    });

    return redirect("/r/all");
  } catch (e: unknown) {
    // Prisma 오류 메시지 등 로깅
    console.error(e);

    return {
      ok: false,
      errors: {
        fields: {},
        form: ["저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."],
      },
    };
  }
}
