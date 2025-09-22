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
import { useCallback, useMemo } from "react";

interface ActivityCalendarViewProps {
  activity: ActivityData[];
  loading?: boolean;
  calendarColor: string;
}

export function ActivityCalendar({
  activity: initialActivity,
  loading = false,
  calendarColor,
}: ActivityCalendarViewProps) {
  const { activity, selected, sortOptions, handleChange } = useActivityFilter({
    initialActivity,
  });

  const memoTheme = useMemo<ThemeInput>(
    () => ({
      light: ["#ffffff", calendarColor],
      dark: ["#ffffff", calendarColor],
    }),
    [calendarColor]
  );

  const renderBlock = useCallback(
    (block: BlockElement, a: ActivityData) => (
      <CalendarBlockTooltip activity={a}>{block}</CalendarBlockTooltip>
    ),
    []
  );

  return (
    <section className="w-full relative">
      <div className="mb-3">
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
          blockSize={18}
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
