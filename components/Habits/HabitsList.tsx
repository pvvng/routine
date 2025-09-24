import { HabitDraft } from "@/lib/hooks/useHabit";
import { memo } from "react";
import { SwipeCard } from "../SwipeHabitCard/SwipeCard";
import { SwipeContent } from "../SwipeHabitCard/SwipeContent";
import { SwipeFeedback } from "../SwipeHabitCard/SwipeFeedback";

export const HabitsList = memo(function HabitsList({
  habits,
}: {
  habits: HabitDraft[];
}) {
  if (habits.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center text-neutral-500 shadow">
        아직 등록한 습관이 없어요.
      </div>
    );
  }

  return habits.map((habit) => (
    <SwipeCard
      key={habit.id}
      disabled={!habit.isActive}
      front={
        <SwipeContent
          id={habit.id}
          title={habit.title}
          desc={habit.desc}
          disabledDays={habit.disabledDays}
          isActive={habit.isActive}
        />
      }
      back={<SwipeFeedback />}
    />
  ));
});
