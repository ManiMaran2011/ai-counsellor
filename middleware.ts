import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Read stage from cookie
  const stage = req.cookies.get("stage")?.value;

  /* ===============================
     ALLOW ONBOARDING ALWAYS
  =============================== */
  if (pathname.startsWith("/onboarding")) {
    return NextResponse.next();
  }

  /* ===============================
     PROTECT DASHBOARD & EXECUTION
  =============================== */
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/execution")
  ) {
    // Stage < 2 → onboarding not complete
    if (!stage || Number(stage) < 2) {
      return NextResponse.redirect(
        new URL("/onboarding/step1", req.url)
      );
    }
  }

  return NextResponse.next();
}

/* ===============================
   MATCHER (important)
=============================== */
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/execution/:path*",
    "/onboarding/:path*",
  ],
};

