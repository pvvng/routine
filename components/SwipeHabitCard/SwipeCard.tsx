"use client";

import { useSwipe } from "@/lib/hooks/useSwipe";

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
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden font-paperlogy shadow rounded-2xl"
    >
      {/* back layer (고정 배경) */}
      {!disabled && (
        <div className="pointer-events-none absolute inset-0 z-0">{back}</div>
      )}

      {/* front card (콘텐츠) */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onPointerLeave={onPointerLeave}
        onLostPointerCapture={onLostPointerCapture}
        className={`${
          !disabled && "cursor-grab"
        } relative w-full h-full z-10 bg-gray-50 transition-transform touch-pan-y select-none`}
        style={{ transform: `translateX(${baseX}px)` }}
      >
        {front}
      </div>
    </div>
  );
}
