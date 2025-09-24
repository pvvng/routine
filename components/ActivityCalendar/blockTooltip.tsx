"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { Activity, BlockElement } from "react-activity-calendar";

interface CalendarBlockTooltipProp {
  children: BlockElement;
  activity: Activity;
}

export function CalendarBlockTooltip({
  children,
  activity,
}: CalendarBlockTooltipProp) {
  return (
    <Tooltip.Provider delayDuration={40}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            className="bg-neutral-900/80 text-white px-3 py-1 rounded shadow
            font-paperlogy text-center animate-fade-in z-10"
          >
            <p className="text-xs">
              {activity.date}: {activity.count}개 활동
            </p>
            <Tooltip.Arrow className="fill-neutral-900/80" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
