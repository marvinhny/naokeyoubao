import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

type Store = { count: number };

function filePath() {
  return process.env.EXPOLENS_LIKE_FILE || path.join(process.cwd(), "data", "expolens-likes.json");
}

let chain: Promise<unknown> = Promise.resolve();

function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = chain.then(fn, fn);
  chain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function readStore(): Promise<Store> {
  try {
    const data = JSON.parse(await readFile(filePath(), "utf8")) as Store;
    const count = Number(data.count);
    if (!Number.isFinite(count) || count < 0) return { count: 0 };
    return { count: Math.floor(count) };
  } catch {
    return { count: 0 };
  }
}

async function writeStore(store: Store) {
  const file = filePath();
  await mkdir(path.dirname(file), { recursive: true });
  const tmp = `${file}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(store), "utf8");
  await rename(tmp, file);
}

export function getLikeCount() {
  return withLock(async () => (await readStore()).count);
}

export function applyLike(nextLiked: boolean, alreadyLiked: boolean) {
  return withLock(async () => {
    const store = await readStore();
    if (nextLiked && !alreadyLiked) store.count += 1;
    if (!nextLiked && alreadyLiked) store.count = Math.max(0, store.count - 1);
    await writeStore(store);
    return store.count;
  });
}
