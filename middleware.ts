import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const stage = req.cookies.get("stage")?.value;
  const locked = req.cookies.get("locked")?.value === "1";

  // Always allow static assets & API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  /* ---------- ONBOARDING ---------- */
  if (pathname.startsWith("/onboarding")) {
    return NextResponse.next();
  }

  /* ---------- DASHBOARD ---------- */
  if (pathname.startsWith("/dashboard")) {
    if (!stage || Number(stage) < 2) {
      return NextResponse.redirect(
        new URL("/onboarding", req.url)
      );
    }
    return NextResponse.next();
  }

  /* ---------- LOCK ---------- */
  if (pathname.startsWith("/lock")) {
    if (!stage || Number(stage) < 2) {
      return NextResponse.redirect(
        new URL("/onboarding", req.url)
      );
    }

    if (Number(stage) === 4 || locked) {
      return NextResponse.redirect(
        new URL("/execution", req.url)
      );
    }

    return NextResponse.next();
  }

  /* ---------- EXECUTION ---------- */
  if (pathname.startsWith("/execution")) {
    if (Number(stage) !== 4 || !locked) {
      return NextResponse.redirect(
        new URL("/dashboard", req.url)
      );
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
