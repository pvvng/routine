"use client";

import CalendarBlockTooltip from "./blockTooltip";
import DropdownSelector from "./DropdownSortSelector";
import { ActivityCalendar as AC, ThemeInput } from "react-activity-calendar";
import { ActivityData } from "./types";
import { useActivityFilter } from "./useActivityFilter";
import { labels, theme } from "./constant";

interface ActivityCalendarViewProps {
  activity: ActivityData[];
  count: number;
  bgColor: string;
}

export function ActivityCalendar({
  activity: initialActivity,
  count,
  bgColor,
}: ActivityCalendarViewProps) {
  const { activity, selected, sortOptions, handleChange } = useActivityFilter({
    initialActivity,
  });

  const theme: ThemeInput = {
    light: ["#ffffff", bgColor],
    dark: ["#ffffff", bgColor],
  };

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
          blockMargin={3}
          blockRadius={2}
          blockSize={18}
          maxLevel={4}
          hideColorLegend
          totalCount={count}
          fontSize={14}
          weekStart={1}
          labels={labels}
          theme={theme}
          renderBlock={(block, activity) => (
            <CalendarBlockTooltip activity={activity}>
              {block}
            </CalendarBlockTooltip>
          )}
        />
      </div>
    </section>
  );
}
