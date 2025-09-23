"use client";

import { CalendarBlockTooltip } from "./blockTooltip";
import { DropdownSelector } from "./DropdownSortSelector";
import {
  ActivityCalendar as AC,
  BlockElement,
  ThemeInput,
} from "react-activity-calendar";
import { ActivityData } from "./types";
import { useActivityFilter } from "./useActivityFilter";
import { labels } from "./constant";
import { memo, useCallback, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

interface ActivityCalendarViewProps {
  activity: ActivityData[];
  loading?: boolean;
  calendarColor: string;
}

export const ActivityCalendar = memo(
  ActivityCalendarImpl,
  (prev, next) =>
    prev.calendarColor === next.calendarColor &&
    prev.loading === next.loading &&
    prev.activity === next.activity
);

function ActivityCalendarImpl({
  activity: initialActivity,
  loading = false,
  calendarColor,
}: ActivityCalendarViewProps) {
  const { activity, selected, sortOptions, handleChange } = useActivityFilter({
    initialActivity,
  });

  const memoTheme = useMemo<ThemeInput>(
    () => ({
      // 두 번째 값에 CSS 변수 사용
      light: ["#f9fafb", "var(--cal-color)"],
      dark: ["#f9fafb", "var(--cal-color)"],
    }),
    [] // 테마 객체가 참조 동일하게 유지
  );

  const renderBlock = useCallback(
    (block: BlockElement, a: ActivityData) => (
      <CalendarBlockTooltip activity={a}>{block}</CalendarBlockTooltip>
    ),
    []
  );

  return (
    <section
      className="w-full relative"
      style={{ ["--cal-color" as string]: calendarColor }}
    >
      <div className="flex justify-between items-center mb-3">
        <p className="text-lg font-semibold text-neutral-800">
          <FontAwesomeIcon icon={faFlag} style={{ color: calendarColor }} />{" "}
          스트릭
        </p>
        <DropdownSelector
          options={sortOptions}
          selected={selected}
          onSelect={handleChange}
        />
      </div>
      <div style={{ direction: "rtl" }} className="mt-5 flex justify-center">
        <AC
          data={activity}
          loading={loading}
          blockMargin={3}
          blockRadius={2}
          blockSize={16}
          maxLevel={4}
          hideColorLegend
          fontSize={14}
          weekStart={1}
          labels={labels}
          theme={memoTheme}
          renderBlock={renderBlock}
        />
      </div>
    </section>
  );
}
