"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { projectHref, type Project } from "@/lib/projects";

const UNRIPE = "哎哟，这个包还没长出来";

export function ProjectLink({
  project,
  className,
  style,
  children,
  "aria-label": ariaLabel,
}: {
  project: Project;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  "aria-label"?: string;
}) {
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(false), 2200);
    return () => window.clearTimeout(timer);
  }, [notice]);

  if (project.unripe) {
    return (
      <button
        type="button"
        style={style}
        className={`relative cursor-pointer border-0 text-left font-[inherit] text-inherit ${className ?? ""}`}
        aria-label={ariaLabel ?? project.name}
        onClick={() => setNotice(true)}
      >
        {notice ? (
          <p
            role="status"
            className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black px-4 py-2 text-[13px] text-[var(--cream-background)]"
          >
            {UNRIPE}
          </p>
        ) : null}
        {children}
      </button>
    );
  }

  if (project.href) {
    return (
      <a href={project.href} className={className} style={style} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <Link href={projectHref(project)} className={className} style={style} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
