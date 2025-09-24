import z from "zod";
import { emptyToNull, str01ToBool } from "./utils";

export const DaysEnum = z.enum(
  ["월", "화", "수", "목", "금", "토", "일"],
  "허용되는 날짜 형식이 아닙니다."
);

export const habitSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "습관 제목은 최소 1자 이상이어야 합니다.")
    .max(200, "습관 제목은 최대 200자입니다.")
    .refine((s) => s.length > 0, "습관 제목은 필수입니다."),
  desc: emptyToNull,
  isActive: str01ToBool,
  disabledDays: z.array(DaysEnum),
});

export const habitRecordSchema = z.record(z.string(), habitSchema);

/** mapping habits record error */

type HabitFieldKey = keyof z.infer<typeof habitSchema>;
type HabitFieldErrors = Partial<Record<HabitFieldKey, string[]>>;
export type HabitErrorsMap = Record<string, HabitFieldErrors>;

export const buildHabitErrorsMap = (err: z.ZodError): HabitErrorsMap => {
  const out: HabitErrorsMap = {};

  for (const issue of err.issues) {
    // path 예시: ["9tb54b1g9q7bc18m","title"]
    const [habitId, fieldMaybe] = issue.path;
    if (typeof habitId !== "string") continue;

    const bucket = (out[habitId] ??= {});
    const field = fieldMaybe as HabitFieldKey | undefined;

    if (
      field &&
      (
        ["title", "desc", "isActive", "disabledDays"] as HabitFieldKey[]
      ).includes(field)
    ) {
      (bucket[field] ??= []).push(issue.message);
    } else {
      // 필드 미지정(레코드 레벨) 에러가 있다면 여기에 모아도 됨
      (bucket["title"] ??= []).push(issue.message); // 필요 시 공통 슬롯 추가
    }
  }
  return out;
};
