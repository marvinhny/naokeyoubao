import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { projects, statusDot } from "../data/projects";

export function ProjectPage() {
  const { slug } = useParams();
  const p = projects.find((x) => x.slug === slug);

  return (
    <article className="w-full max-w-[458px] bg-[var(--cream-background)] p-[18px] text-black">
      <Link to="/" className="inline-flex items-center gap-1 text-[13px] text-black/60 hover:text-black">
        <ArrowLeft className="size-4" /> 回到脑壳
      </Link>
      {!p ? (
        <p className="py-24 text-center text-[20px] font-bold">这个包还没长出来</p>
      ) : (
        <>
          <div className="my-5 flex h-[160px] items-end justify-center rounded-t-[120px] bg-[var(--cookie-monster-blue)] pb-6">
            <span className="text-[13px] tracking-[0.3em] text-[var(--cream-background)]/80">{p.date}</span>
          </div>
          <h1 className="text-[44px] font-bold leading-[1.1]">{p.name}</h1>
          {p.sub && <p className="text-[20px] font-medium">{p.sub}</p>}
          <p className="mt-3 flex items-center gap-1.5 text-[13px] text-black/60">
            <i className={`size-2 rounded-full ${statusDot[p.status]}`} /> {p.status}
          </p>
          <p className="mt-8 text-[16px] leading-relaxed">{p.summary}</p>
          <ul className="mt-6 divide-y divide-black/10 border-y border-black/10">
            {p.notes.map((n) => (
              <li key={n} className="py-3 text-[15px]">{n}</li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}
