import { Props, ThemeInput } from "react-activity-calendar";

export const theme: ThemeInput = {
  light: ["#FAFAFA", "#10B981"],
  dark: ["#FAFAFA", "#10B981"],
};

export const labels = {
  months: [...Array(12)].map((_, i) => `${i + 1}월`),
  weekdays: ["일", "월", "화", "수", "목", "금", "토"],
  totalCount: "{{count}}개의 활동",
} satisfies Props["labels"];
