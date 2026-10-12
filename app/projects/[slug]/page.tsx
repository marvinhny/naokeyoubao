import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getProject, projects, statusDot } from "@/lib/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "这个包还没长出来" };
  return { title: project.name, description: project.summary };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  if (project.href) redirect(project.href);

  return (
    <article className="w-full max-w-[458px] bg-[var(--cream-background)] p-[18px] text-black">
      <Link href="/" className="inline-flex items-center gap-1 text-[13px] text-black/60 hover:text-black">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
        回到脑壳
      </Link>
      <div className="my-5 flex h-[160px] items-end justify-center rounded-t-[120px] bg-[var(--theme)] pb-6">
        <span className="text-[13px] tracking-[0.3em] text-[var(--cream-background)]/80">{project.date}</span>
      </div>
      <h1 className="text-[44px] font-bold leading-[1.1]">{project.name}</h1>
      {project.sub ? <p className="text-[20px] font-medium">{project.sub}</p> : null}
      <p className="mt-3 flex items-center gap-1.5 text-[13px] text-black/60">
        <i className={`size-2 rounded-full ${statusDot[project.status]}`} />
        {project.status}
      </p>
      <p className="mt-8 text-[16px] leading-relaxed">{project.summary}</p>
      <ul className="mt-6 divide-y divide-black/10 border-y border-black/10">
        {project.notes.map((note) => (
          <li key={note} className="py-3 text-[15px]">
            {note}
          </li>
        ))}
      </ul>
    </article>
  );
}
