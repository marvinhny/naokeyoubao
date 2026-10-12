import Link from "next/link";

export default function NotFound() {
  return (
    <article className="w-full max-w-[458px] bg-[var(--cream-background)] p-[18px] text-black">
      <Link href="/" className="inline-flex items-center gap-1 text-[13px] text-black/60 hover:text-black">
        回到脑壳
      </Link>
      <p className="py-24 text-center text-[20px] font-bold">这个包还没长出来</p>
    </article>
  );
}
