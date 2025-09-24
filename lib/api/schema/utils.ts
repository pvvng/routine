import z from "zod";

// 공백/빈문자면 null로
export const emptyToNull = z
  .string()
  .transform((s) => {
    const t = s.trim();
    return t === "" ? null : t;
  })
  .nullable();

// "1"/"0" → boolean
export const str01ToBool = z
  .union([z.literal("1"), z.literal("0")], "허용되는 형식이 아닙니다.")
  .transform((v) => v === "1");
