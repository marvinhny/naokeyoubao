import { Link } from "react-router";
import { projects } from "../data/projects";

// 脑壳上的"包"：每个包是一个项目
const sizes = ["size-[78px]", "size-[60px]", "size-[46px]"];

export function Bumps() {
  return (
    <div className="flex items-end justify-center gap-6 h-[96px] -mb-[34px] relative z-10">
      {projects.map((p, i) => (
        <Link
          key={p.slug}
          to={`/projects/${p.slug}`}
          className={`group relative ${sizes[i % sizes.length]} rounded-full bg-[var(--cookie-monster-blue)] transition-transform duration-300 hover:-translate-y-2 ${i % 2 ? "self-center" : ""}`}
          aria-label={p.name}
        >
          <span className="pointer-events-none absolute left-1/2 -top-8 -translate-x-1/2 whitespace-nowrap rounded-full bg-black px-3 py-1 text-[12px] text-[var(--cream-background)] opacity-0 transition-opacity group-hover:opacity-100">
            {p.name}
          </span>
        </Link>
      ))}
      <span className="size-[30px] rounded-full border-2 border-dashed border-[var(--cookie-monster-blue)]/50 self-end mb-6" title="下一个包" />
    </div>
  );
}
