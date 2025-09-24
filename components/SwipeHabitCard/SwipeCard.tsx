"use client";

import { useSwipe } from "@/components/SwipeHabitCard/useSwipe";

interface SwipeCardProps {
  disabled?: boolean;
  front?: React.ReactNode;
  back?: React.ReactNode;
}

export function SwipeCard({ disabled = false, front, back }: SwipeCardProps) {
  const {
    baseX,
    wrapRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onPointerLeave,
    onLostPointerCapture,
  } = useSwipe({
    disabled,
    maxDragRatio: 0.4,
    onSwipeLeft: (info) => console.log(info),
    onSwipeRight: (info) => console.log(info),
  });

  return (
    <div ref={wrapRef} className="relative w-full overflow-hidden rounded-2xl">
      {/* back layer */}
      {!disabled && (
        <div className="pointer-events-none absolute inset-0 z-0 w-full h-full">
          {back}
        </div>
      )}

      {/* front card */}
      <div
        onPointerDown={disabled ? undefined : onPointerDown}
        onPointerMove={disabled ? undefined : onPointerMove}
        onPointerUp={disabled ? undefined : onPointerUp}
        onPointerCancel={disabled ? undefined : onPointerCancel}
        onPointerLeave={disabled ? undefined : onPointerLeave}
        onLostPointerCapture={disabled ? undefined : onLostPointerCapture}
        className={`relative w-full h-full z-10 select-none transition-transform
          ${
            disabled
              ? "bg-neutral-200 opacity-60 cursor-not-allowed"
              : "bg-white cursor-grab"
          }`}
        style={{ transform: `translateX(${baseX}px)` }}
      >
        {front}
      </div>
    </div>
  );
}
