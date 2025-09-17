"use client";
import { useRef, useState } from "react";

interface SwipeInfo {
  type: "left" | "right";
  distance: number;
  ratio: number;
  width: number;
}
interface UseSwipeOptions {
  disabled?: boolean;
  maxDragRatio?: number;
  onSwipeLeft?: (info: SwipeInfo) => void;
  onSwipeRight?: (info: SwipeInfo) => void;
}

export function useSwipe({
  disabled = false,
  maxDragRatio = 0.3,
  onSwipeLeft,
  onSwipeRight,
}: UseSwipeOptions = {}) {
  const [baseX, setBaseX] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef<number | null>(null);
  const fired = useRef<"left" | "right" | null>(null);

  const endDrag = (el: HTMLElement | null) => {
    if (disabled) return;
    dragging.current = false;
    startX.current = null;
    fired.current = null;
    if (el) el.style.transition = "transform .18s ease-out";
    setBaseX(0);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    // 주 포인터 + 왼쪽 버튼만 허용 (마우스일 때)
    if (!e.isPrimary) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;

    dragging.current = true;
    startX.current = e.clientX;
    fired.current = null;

    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    e.currentTarget.style.transition = "none";
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (!dragging.current || startX.current === null) return;

    // 버튼이 눌려있지 않으면(예: 창 밖에서 놓고 들어온 경우) 강제 종료
    if (e.pointerType === "mouse" && e.buttons === 0) {
      endDrag(e.currentTarget as HTMLElement);
      return;
    }

    const dx = e.clientX - startX.current;
    const width = wrapRef.current?.clientWidth ?? 0;
    const MAX = width * maxDragRatio;

    const clamped = Math.max(-MAX, Math.min(MAX, dx));
    setBaseX(clamped);

    const threshold = width * maxDragRatio;
    if (Math.abs(clamped) >= threshold) {
      const type: "left" | "right" = clamped > 0 ? "left" : "right";
      if (fired.current !== type) {
        const info: SwipeInfo = {
          type,
          distance: clamped,
          ratio: width ? Math.min(1, Math.abs(clamped) / width) : 0,
          width,
        };
        type === "right" ? onSwipeRight?.(info) : onSwipeLeft?.(info);
        fired.current = type;
      }
    } else {
      fired.current = null;
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    endDrag(e.currentTarget as HTMLElement);
  };

  const onPointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    endDrag(e.currentTarget as HTMLElement);
  };

  const onPointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    // 캡처를 잡고 있으면 leave는 무시되지만, 혹시 모를 케이스 방지
    if (!dragging.current) return;
    if (e.pointerType === "mouse") endDrag(e.currentTarget as HTMLElement);
  };

  const onLostPointerCapture = (e: React.PointerEvent<HTMLDivElement>) => {
    // 사파리/모바일에서 캡처가 풀리면 드래그 종료
    endDrag(e.currentTarget as HTMLElement);
  };

  return {
    baseX,
    wrapRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onPointerLeave,
    onLostPointerCapture,
  };
}
