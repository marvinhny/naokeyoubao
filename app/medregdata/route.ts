import { NextResponse } from "next/server";
import { renderResume } from "@/app/medregdata/resume";

export const dynamic = "force-dynamic";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_IN_WINDOW = 5;
const hits = new Map<string, number[]>();

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "local";
}

function tooMany(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  hits.set(ip, recent);
  return recent.length >= MAX_IN_WINDOW;
}

function remember(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
}

function clean(value: FormDataEntryValue | null, max: number) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

async function sendFeedback(body: {
  name: string;
  email: string;
  category: string;
  message: string;
  page_url: string;
}) {
  const session = await fetch("https://api.meddata123.com/app-api/v1/session", { cache: "no-store" });
  const cookies =
    typeof session.headers.getSetCookie === "function" ? session.headers.getSetCookie() : [];
  const pairs = cookies.map((cookie) => cookie.split(";")[0]?.trim()).filter(Boolean) as string[];
  const csrf = pairs.find((pair) => pair.startsWith("md_csrf="))?.slice("md_csrf=".length) ?? "";
  if (!csrf) return false;
  const response = await fetch("https://api.meddata123.com/app-api/v1/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrf,
      Cookie: pairs.join("; "),
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  return response.ok;
}

function backTo(request: Request, flag: "sent" | "short" | "mail" | "send" | "rate") {
  const back = new URL("/medregdata", request.url);
  back.hash = "ask";
  if (flag === "sent") back.searchParams.set("sent", "1");
  else back.searchParams.set("e", flag);
  return NextResponse.redirect(back, 303);
}

export function GET(request: Request) {
  const url = new URL(request.url);
  const notice = url.searchParams.get("sent") ? "sent" : (url.searchParams.get("e") ?? "");
  return new NextResponse(renderResume(notice), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(request: Request) {
  const form = await request.formData();
  if (clean(form.get("company"), 80)) return backTo(request, "sent");

  const ip = clientIp(request);
  if (tooMany(ip)) return backTo(request, "rate");

  const phone = clean(form.get("phone"), 40);
  const email = clean(form.get("email"), 80);
  const wechat = clean(form.get("wechat"), 40);
  if (!phone && !email && !wechat) return backTo(request, "mail");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return backTo(request, "mail");
  if (phone && !/^[+\d][\d\s()-]{5,22}$/.test(phone)) return backTo(request, "mail");
  if (wechat && wechat.length < 2) return backTo(request, "mail");
  const note = String(form.get("message") ?? "").replace(/\r\n/g, "\n").trim().slice(0, 800);
  if (note.length < 2) return backTo(request, "short");
  const contacts = [
    phone ? `电话：${phone}` : "",
    email ? `邮箱：${email}` : "",
    wechat ? `微信号：${wechat}` : "",
  ].filter(Boolean);

  try {
    const sent = await sendFeedback({
      name: phone || email || wechat,
      email: email || "admin@medregdata.com",
      category: "feature",
      message: `${contacts.join("\n")}\n\n${note}`,
      page_url: "https://naokeyoubao.com/medregdata",
    });
    if (!sent) return backTo(request, "send");
  } catch {
    return backTo(request, "send");
  }

  remember(ip);
  return backTo(request, "sent");
}
