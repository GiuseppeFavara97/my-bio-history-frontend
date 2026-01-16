import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Cookie HttpOnly settato dal backend
  const hasAccessToken = req.cookies.has("access_token");
  const hasRefreshToken = req.cookies.has("refresh_token");

  // Protegge tutte le dashboard
  if (pathname.startsWith("/dashboard") && !hasAccessToken && !hasRefreshToken) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
};