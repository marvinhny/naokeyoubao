"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const POKE = "哎哟！再点就长包了";

export function IdlePoke() {
  const [tip, setTip] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element) || target.closest("a, button")) return;
      setTip({ x: event.clientX, y: event.clientY });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!tip) return;
    const timer = window.setTimeout(() => setTip(null), 1600);
    return () => window.clearTimeout(timer);
  }, [tip]);

  if (!tip) return null;

  return createPortal(
    <p
      role="status"
      className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-full bg-black px-4 py-2 text-[13px] text-[var(--cream-background)]"
      style={{ left: tip.x, top: tip.y - 12 }}
    >
      {POKE}
    </p>,
    document.body,
  );
}
