// habit_<id>.<field> 형식 매칭
export const habitFieldRegex =
  /^habit_([A-Za-z0-9]+)\.(title|desc|disabledDays|isActive)$/;

// 습관 데이터가 임시로 모이는 버킷
export type HabitFormBucket = {
  title?: string;
  desc?: string;
  isActive?: string; // 폼 원본은 문자열 ("1" / "0")
  disabledDays: string[];
};

/** FormData -> 습관 임시 객체들 (id별로 그룹핑) */
export const extractHabitBuckets = (formData: FormData) => {
  const bucketsById: Record<string, HabitFormBucket> = {};

  for (const [key, raw] of formData.entries()) {
    if (!key.match(habitFieldRegex)) continue;

    const [habitId, field] = key.split(".");
    const value = typeof raw === "string" ? raw : "";

    // 버킷 보장 (없으면 생성)
    const bucket = (bucketsById[habitId] ??= { disabledDays: [] });

    switch (field) {
      case "title":
        bucket.title = value;
        break;
      case "desc":
        bucket.desc = value;
        break;
      case "isActive":
        bucket.isActive = value;
        break;
      case "disabledDays":
        if (value.trim() !== "") {
          for (const token of value
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)) {
            bucket.disabledDays.push(token);
          }
        }
        break;
    }
  }

  return bucketsById;
};
