"use server";

import { redirect } from "next/navigation";
import { getObjectId } from "../api/getObjectId";
import db from "../api/prismadb";
import {
  buildHabitErrorsMap,
  HabitErrorsMap,
  habitRecordSchema,
  routineSchema,
} from "../api/schema";
import { getSession, logout } from "../api/session";
import { extractHabitBuckets } from "../utils";
import { isRedirectError } from "next/dist/client/components/redirect-error";

type RoutineFormState = {
  ok: boolean;
  errors?: {
    routine?: {
      formErrors: string[];
      fieldErrors: Record<string, string[]>;
    };
    habits?: HabitErrorsMap;
    _global?: string[];
  };
};

export async function postRoutineWithHabits(
  _: unknown,
  formData: FormData
): Promise<RoutineFormState> {
  const routineFields = {
    isActive: formData.get("isActive"),
    isPublic: formData.get("isPublic"),
    title: formData.get("title"),
    desc: formData.get("desc"),
    thumbnail: formData.get("thumbnail"),
    calendarColor: formData.get("calendarColor"),
  };

  const habitBuckets = extractHabitBuckets(formData);

  // validate
  const r = routineSchema.safeParse(routineFields);
  const h = habitRecordSchema.safeParse(habitBuckets);

  if (!r.success || !h.success) {
    const routineErrors = r.success
      ? { formErrors: [], fieldErrors: {} as Record<string, string[]> }
      : r.error.flatten();

    const habitErrors = h.success
      ? ({} as HabitErrorsMap)
      : buildHabitErrorsMap(h.error);

    console.log(h.error?.flatten());

    return {
      ok: false,
      errors: {
        routine: routineErrors,
        habits: habitErrors,
        _global: undefined,
      },
    };
  }

  // 사용자 검증
  const session = await getSession();
  const sessionId = session.id;

  if (!sessionId) {
    return {
      ok: false,
      errors: {
        routine: undefined,
        habits: undefined,
        _global: ["로그인 후 이용 가능합니다."],
      },
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
      errors: {
        routine: undefined,
        habits: undefined,
        _global: ["사용자 정보를 확인하지 못했습니다."],
      },
    };
  }

  const routine = r.data;
  const habits = Object.entries(h.data).map(([_, v]) => ({
    title: v.title,
    desc: v.desc,
    isActive: v.isActive,
    disabledDays: v.disabledDays,
  }));

  try {
    const result = await db.$transaction(async (tx) => {
      const createdRoutine = await tx.routine.create({
        data: {
          userId: user.id,
          title: routine.title,
          desc: routine.desc, // nullable
          isActive: routine.isActive,
          isPublic: routine.isPublic,
          thumbnail: routine.thumbnail,
          calendarColor: routine.calendarColor,
        },
        select: { id: true },
      });

      // 습관이 있으면 벌크 insert
      if (habits.length > 0) {
        // createMany는 기본적으로 반환값에 생성된 row id가 없음
        await tx.habit.createMany({
          data: habits.map((h) => ({
            routineId: createdRoutine.id,
            title: h.title,
            desc: h.desc,
            isActive: h.isActive,
            disabledDays: h.disabledDays,
          })),
        });
      }

      return createdRoutine.id;
    });

    return redirect(`/r/${result}`);
  } catch (err: any) {
    // Prisma 에러 처리
    console.error("postRoutine transaction error:", err);
    if (isRedirectError(err)) throw err; // 리다이렉트는 그대로 통과
    return {
      ok: false,
      errors: {
        routine: undefined,
        habits: undefined,
        _global: ["저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."],
      },
    };
  }
}
