"use client";

import { useLayoutEffect, useRef, useState } from "react";

const PUPIL_RATIO = 76 / 204;
const BUFFER_RATIO = 5 / 102;

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
    const handleMouseMove = (event: MouseEvent) => {
      const eye = eyeRef.current;
      if (!eye) return;

      const rect = eye.getBoundingClientRect();
      const radius = rect.width / 2;
      const dx = event.clientX - (rect.left + radius);
      const dy = event.clientY - (rect.top + radius);
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

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
