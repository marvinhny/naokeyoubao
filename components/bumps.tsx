import type { CSSProperties } from "react";
import { ProjectLink } from "@/components/project-link";
import { projects } from "@/lib/projects";

const sizes = ["size-[78px]", "size-[60px]", "size-[46px]"];

const motions = [
  { body: "2.4s", bodyDelay: "0s", label: "4.8s", labelDelay: "0.2s" },
  { body: "3.5s", bodyDelay: "0.7s", label: "3.3s", labelDelay: "1.1s" },
  { body: "2.1s", bodyDelay: "1.3s", label: "5.4s", labelDelay: "0.5s" },
  { body: "3.9s", bodyDelay: "0.4s", label: "4.1s", labelDelay: "1.7s" },
];

function motionStyle(index: number): CSSProperties {
  const motion = motions[index % motions.length];
  return {
    ["--bump-dur" as string]: motion.body,
    ["--bump-delay" as string]: motion.bodyDelay,
    ["--label-dur" as string]: motion.label,
    ["--label-delay" as string]: motion.labelDelay,
  };
}

export function Bumps() {
  return (
    <div className="relative z-10 -mb-[34px] flex h-[96px] items-end justify-center gap-6">
      {projects.map((project, index) => (
        <ProjectLink
          key={project.slug}
          project={project}
          aria-label={project.name}
          className={`group relative rounded-full transition-transform duration-300 hover:-translate-y-2 focus-visible:-translate-y-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black ${sizes[index % sizes.length]} ${index % 2 ? "self-center" : ""}`}
          style={motionStyle(index)}
        >
          <span className="bump-body absolute inset-0 rounded-full bg-[var(--theme)]" />
          <span className="bump-label pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black px-3 py-1 text-[12px] text-[var(--cream-background)]">
            {project.name}
          </span>
        </ProjectLink>
      ))}
      <span className="group relative mb-6 size-[30px] self-end" style={motionStyle(3)}>
        <span className="bump-body absolute inset-0 rounded-full border-2 border-dashed border-[var(--theme)]/50" />
        <span className="bump-label pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black px-3 py-1 text-[12px] text-[var(--cream-background)]">
          下一个包
        </span>
      </span>
    </div>
  );
}
