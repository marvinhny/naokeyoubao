"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";

const WECHAT_ID = "Marvin_HanYi";
const itemClass =
  "relative flex size-[22px] items-center justify-center rounded-full bg-[var(--cream-background)] text-[var(--theme)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--cream-background)]";

function WeChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-2.5" fill="currentColor">
      <path d="M9.5 4.2c-4.1 0-7.4 2.7-7.4 6.1 0 2 1.1 3.8 2.8 5l-.7 2.1 2.4-1.2c.8.2 1.6.4 2.5.4.3 0 .5 0 .8-.1-.2-.6-.3-1.2-.3-1.8 0-3.5 3.3-6.3 7.3-6.3.2 0 .5 0 .7 0C16.6 6 13.4 4.2 9.5 4.2m-2.3 3.4a1 1 0 1 1 0 2 1 1 0 0 1 0-2m4.7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
      <path d="M17.4 9.4c-3.6 0-6.5 2.4-6.5 5.4s2.9 5.4 6.5 5.4c.7 0 1.3-.1 1.9-.3l2.1 1-.6-1.8c1.4-1 2.3-2.5 2.3-4.3 0-3-2.9-5.4-6.5-5.4m-2.2 3.3a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8m4.4 0a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-2.5" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.02-1.88-2.78.62-3.37-1.2-3.37-1.2-.46-1.2-1.12-1.52-1.12-1.52-.91-.64.07-.63.07-.63 1.01.07 1.54 1.06 1.54 1.06.9 1.57 2.36 1.12 2.94.85.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.8c.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.64 1.03 2.76 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.38-.01 2.48-.01 2.82 0 .10.20.0.2.48 3.96-1.36 6.83-5.2 6.83-9.72C22 6.58 17.52 2 12 2" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-2.5" fill="currentColor">
      <path d="M6.5 9H3v12h3.5zM4.75 3A2.25 2.25 0 1 0 4.75 7.5 2.25 2.25 0 0 0 4.75 3M21 14.25V21h-3.5v-6.2c0-1.56-.56-2.62-1.95-2.62-1.06 0-1.7.72-1.98 1.41-.1.25-.13.6-.13.95V21H10V9h3.35v1.64c.45-.7 1.25-1.7 3.04-1.7 2.22 0 3.61 1.45 3.61 4.56z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-2.5" fill="currentColor">
      <path d="M14 9h3.5V5.5H14C11.5 5.5 10 7.1 10 9.6V12H7v3.5h3V22h4v-6.5h3.2L18 12h-4z" />
    </svg>
  );
}

export function Socials() {
  const [tip, setTip] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!tip) return;
    const timer = window.setTimeout(() => setTip(null), 1600);
    return () => window.clearTimeout(timer);
  }, [tip]);

  function copyWeChat(event: MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setTip({ x: rect.left + rect.width / 2, y: rect.top });
    void navigator.clipboard.writeText(WECHAT_ID).catch(() => {});
  }

  return (
    <nav aria-label="社交" className="mt-3 flex items-center justify-center gap-2">
      <button type="button" className={itemClass} aria-label="复制微信号" onClick={copyWeChat}>
        <WeChatIcon />
      </button>
      {tip
        ? createPortal(
            <p
              role="status"
              className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-full bg-black px-4 py-2 text-[13px] text-[var(--cream-background)]"
              style={{ left: tip.x, top: tip.y - 10 }}
            >
              已复制微信号 {WECHAT_ID}
            </p>,
            document.body,
          )
        : null}
      <a
        className={itemClass}
        href="https://github.com/marvinhny/naokeyoubao"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <GitHubIcon />
      </a>
      <a
        className={itemClass}
        href="https://www.linkedin.com/in/marvinhan/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <LinkedInIcon />
      </a>
      <a
        className={itemClass}
        href="https://www.facebook.com/marvin.hanyi"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
      >
        <FacebookIcon />
      </a>
    </nav>
  );
}
