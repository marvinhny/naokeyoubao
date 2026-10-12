import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { EyeCard } from "../components/EyeCard";
import { projects, statusDot } from "../data/projects";

export function Home() {
  return (
    <div className="flex w-full max-w-[458px] flex-col gap-3">
      <EyeCard />
      <nav className="grid grid-cols-2 gap-3">
        {projects.map((p) => (
          <Link
            key={p.slug}
            to={`/projects/${p.slug}`}
            className="group flex flex-col justify-between gap-6 bg-[var(--cream-background)] p-4 transition-transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between text-[12px] text-black/60">
              <span className="flex items-center gap-1.5">
                <i className={`size-2 rounded-full ${statusDot[p.status]}`} />
                {p.status}
              </span>
              <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
            </div>
            <div>
              <p className="text-[18px] font-bold leading-tight text-black">{p.name}</p>
              <p className="text-[12px] text-black/50">{p.sub ?? p.date}</p>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}
