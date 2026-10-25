import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET() {
  const file = path.join(process.cwd(), "app/expolens", "智能眼镜逛展系统.html");
  const html = await readFile(file, "utf8");
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
