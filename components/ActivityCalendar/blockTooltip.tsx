"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { Activity, BlockElement } from "react-activity-calendar";

interface CalendarBlockTooltipProp {
  children: BlockElement;
  activity: Activity;
}

export default function CalendarBlockTooltip({
  children,
  activity,
}: CalendarBlockTooltipProp) {
  const [year, month, day] = activity.date.split("-");
  const dateString = `${year}년 ${month}월 ${day}일`;

  return (
    <Tooltip.Provider delayDuration={50}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            className="bg-neutral-900/80 text-white px-3 py-1 rounded shadow
            font-paperlogy text-center animate-fade-in z-10"
          >
            <p className="text-[11px]">{dateString}</p>
            <p className="text-xs font-semibold">{activity.count}개 투표</p>
            <Tooltip.Arrow className="fill-neutral-900/80" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
