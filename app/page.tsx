import { EyeCard } from "@/components/eye-card";
import { IdlePoke } from "@/components/idle-poke";
import { ProjectLink } from "@/components/project-link";
import { projects, statusDot } from "@/lib/projects";

export default function HomePage() {
  return (
    <div className="flex w-full max-w-[458px] flex-col gap-3">
      <IdlePoke />
      <EyeCard />
      <nav aria-label="项目" className="grid grid-cols-2 gap-3">
        {projects.map((project) => (
          <ProjectLink
            key={project.slug}
            project={project}
            className="group flex w-full flex-col items-stretch justify-between gap-6 bg-[var(--cream-background)] p-4 text-left transition-transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between text-[12px] text-black/60">
              <span className="flex items-center gap-1.5">
                <i className={`size-2 rounded-full ${statusDot[project.status]}`} />
                {project.status}
              </span>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-4 transition-transform group-hover:rotate-45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17 17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </div>
            <div>
              <p className="text-[18px] font-bold leading-tight text-black">{project.name}</p>
              <p className="text-[12px] text-black/50">{project.sub ?? project.date}</p>
            </div>
          </ProjectLink>
        ))}
      </nav>
    </div>
  );
}
