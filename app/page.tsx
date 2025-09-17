import { SwipeCard } from "@/components/SwipeHabitCard/SwipeCard";
import { SwipeContent } from "@/components/SwipeHabitCard/SwipeContent";
import { SwipeFeedback } from "@/components/SwipeHabitCard/SwipeFeedback";

export default function Home() {
  return (
    <div className="max-w-screen-sm mx-auto space-y-3">
      <SwipeCard front={<SwipeContent />} back={<SwipeFeedback />} />
    </div>
  );
}
