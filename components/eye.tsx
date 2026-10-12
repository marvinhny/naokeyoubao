"use client";

import { useLayoutEffect, useRef, useState } from "react";

const PUPIL_RATIO = 76 / 204;
const BUFFER_RATIO = 5 / 102;
const LONG_PRESS_MS = 400;
const HOLD_MOVE_CANCEL_PX = 12;

const DEFAULT_OFFSET = {
  left: { x: (74.8272 - 102) / 102, y: (78.3184 - 102) / 102 },
  right: { x: (119.032 - 102) / 102, y: (117.787 - 102) / 102 },
};

export function Eye({ isRightEye = false }: { isRightEye?: boolean }) {
  const eyeRef = useRef<HTMLDivElement>(null);
  const offset = isRightEye ? DEFAULT_OFFSET.right : DEFAULT_OFFSET.left;
  const [pupil, setPupil] = useState({ x: offset.x * 102, y: offset.y * 102 });

  useLayoutEffect(() => {
    const eye = eyeRef.current;
    if (!eye) return;
    const radius = eye.getBoundingClientRect().width / 2;
    setPupil({ x: offset.x * radius, y: offset.y * radius });
  }, [offset.x, offset.y]);

  useLayoutEffect(() => {
    const lookAt = (clientX: number, clientY: number) => {
      const eye = eyeRef.current;
      if (!eye) return;

      const rect = eye.getBoundingClientRect();
      const radius = rect.width / 2;
      const dx = clientX - (rect.left + radius);
      const dy = clientY - (rect.top + radius);
      const distance = Math.hypot(dx, dy);
      const baseX = offset.x * radius;
      const baseY = offset.y * radius;
      const maxMovement = Math.max(0, radius - radius * PUPIL_RATIO - radius * BUFFER_RATIO);

      if (distance < 1) {
        setPupil({ x: baseX, y: baseY });
        return;
      }

      let moveX = Math.min(distance, maxMovement) * (dx / distance) + baseX;
      let moveY = Math.min(distance, maxMovement) * (dy / distance) + baseY;
      const total = Math.hypot(moveX - baseX, moveY - baseY);

      if (total > maxMovement) {
        const scale = maxMovement / total;
        moveX = baseX + (moveX - baseX) * scale;
        moveY = baseY + (moveY - baseY) * scale;
      }

      setPupil({ x: moveX, y: moveY });
    };

    const handleMouseMove = (event: MouseEvent) => {
      lookAt(event.clientX, event.clientY);
    };

    let holdTimer = 0;
    let holding = false;
    let startX = 0;
    let startY = 0;

    const ignored = (target: EventTarget | null) =>
      target instanceof Element && Boolean(target.closest("a, button"));

    const clearHold = () => {
      window.clearTimeout(holdTimer);
      holdTimer = 0;
      holding = false;
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1 || ignored(event.target)) {
        clearHold();
        return;
      }
      const touch = event.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      holdTimer = window.setTimeout(() => {
        holding = true;
        lookAt(startX, startY);
      }, LONG_PRESS_MS);
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      if (holding) {
        if (event.cancelable) event.preventDefault();
        lookAt(touch.clientX, touch.clientY);
        return;
      }
      if (holdTimer && Math.hypot(touch.clientX - startX, touch.clientY - startY) > HOLD_MOVE_CANCEL_PX) {
        window.clearTimeout(holdTimer);
        holdTimer = 0;
      }
    };

    const handleContextMenu = (event: Event) => {
      if (holding) event.preventDefault();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", clearHold);
    window.addEventListener("touchcancel", clearHold);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      clearHold();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", clearHold);
      window.removeEventListener("touchcancel", clearHold);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [offset.x, offset.y]);

  return (
    <div
      ref={eyeRef}
      className="relative aspect-square w-[calc(50%-2px)] overflow-hidden rounded-full bg-[var(--cream-background)]"
    >
      <div
        className="absolute rounded-full bg-black"
        style={{
          width: `${PUPIL_RATIO * 100}%`,
          height: `${PUPIL_RATIO * 100}%`,
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translate(${pupil.x}px, ${pupil.y}px)`,
        }}
      />
    </div>
  );
}
