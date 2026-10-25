import { NextResponse } from "next/server";
import { applyLike, getLikeCount } from "./store";

const COOKIE = "expolens_like";

function likedFrom(request: Request) {
  const raw = request.headers.get("cookie") ?? "";
  return raw.split(";").some((part) => {
    const [key, value] = part.trim().split("=");
    return key === COOKIE && value === "1";
  });
}

function respond(count: number, liked: boolean, writeCookie: boolean) {
  const response = NextResponse.json(
    { count, liked },
    { headers: { "Cache-Control": "no-store" } },
  );
  if (writeCookie) {
    response.cookies.set(COOKIE, liked ? "1" : "0", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: liked ? 60 * 60 * 24 * 400 : 0,
    });
  }
  return response;
}

export async function GET(request: Request) {
  return respond(await getLikeCount(), likedFrom(request), false);
}

export async function POST(request: Request) {
  let body: { liked?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const already = likedFrom(request);
  const liked = body.liked === true;
  const count = await applyLike(liked, already);
  return respond(count, liked, true);
}
