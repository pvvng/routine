import { ActivityData } from "./types";

export const toLocalYMD = (d: Date | string): string => {
  const dt = new Date(d);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const day = String(dt.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

/** 0..steps 레벨 계산 (count=0이면 0, 그 외 1..steps) */
export const applyLevels = (
  data: ActivityData[],
  steps = 4
): ActivityData[] => {
  const max = data.reduce((m, d) => (d.count > m ? d.count : m), 0);
  if (max === 0) return data.map((d) => ({ ...d, level: 0 }));
  return data.map((d) =>
    d.count === 0
      ? { ...d, level: 0 }
      : { ...d, level: Math.max(1, Math.ceil((d.count / max) * steps)) }
  );
};

/**
 * 베이스 캘린더(과거 1년치 등)에 votes의 createdAt을 얹어서 집계 후 level까지 계산.
 * - baseDays: [{ date:'YYYY-MM-DD', count:0, level:0 } ...] 같이 연속된 날짜 배열
 * - votes: createdAt 포함한 레코드 배열 (Date|string 모두 허용)
 */
export const buildActivityFromBase = <T extends { createdAt: Date | string }>(
  baseDays: ActivityData[],
  votes: T[],
  steps = 4
): ActivityData[] => {
  if (!baseDays?.length) return [];

  // 날짜별 카운트
  const byDate = new Map<string, number>();
  for (const v of votes || []) {
    const key = toLocalYMD(v.createdAt);
    byDate.set(key, (byDate.get(key) ?? 0) + 1);
  }

  // 베이스에 카운트 주입
  const merged = baseDays.map((d) => ({
    date: d.date,
    count: (d.count ?? 0) + (byDate.get(d.date) ?? 0),
    level: 0,
  }));

  // 레벨 계산
  return applyLevels(merged, steps);
};

/**
 * baseDate 기준으로 이전 1년치 스트릭 데이터를 생성하는 함수
 * @param baseDate 기준 날짜
 */
export function generatePastYearData(baseDate: string): ActivityData[] {
  const end = new Date(baseDate); // 기준일
  const start = new Date(end);
  start.setFullYear(end.getFullYear() - 1); // 1년 전

  const result: ActivityData[] = [];

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0];
    result.push({ date: dateStr, count: 0, level: 0 });
  }

  return result;
}

/**
 * 임시 랜덤 ActivityData 생성기
 * @param baseDate 기준일 (YYYY-MM-DD 문자열, 기본은 오늘)
 * @param totalVotes 총 랜덤 카운트 수 (기본 400개 정도)
 * @param steps 레벨 단계 (기본 4)
 */
export function generateRandomActivityData(
  baseDate: string,
  totalVotes: number = 400,
  steps: number = 4
): ActivityData[] {
  // 1년치 베이스 생성
  const base = generatePastYearData(baseDate);

  // 총 투표 수만큼 랜덤 날짜에 분산
  for (let i = 0; i < totalVotes; i++) {
    const randIdx = Math.floor(Math.random() * base.length);
    base[randIdx].count += 1;
  }

  // 레벨 계산 적용
  return applyLevels(base, steps);
}
