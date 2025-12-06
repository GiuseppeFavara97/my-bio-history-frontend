import { NextResponse, NextRequest } from "next/server";

function parseJwt(token: string) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(Buffer.from(payload, "base64").toString("utf-8"));
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("access_token")?.value;

  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (!pathname.startsWith("/dashboard")) return NextResponse.next();

  const payload = token ? parseJwt(token) : null;
  const role = payload?.role;

  if (!role && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (pathname === "/dashboard") {
    switch (role) {
      case "ADMIN":
        return NextResponse.redirect(new URL("/dashboard/admin", req.url));
      case "DOCTOR":
        return NextResponse.redirect(new URL("/dashboard/doctor", req.url));
      case "PATIENT":
        return NextResponse.redirect(new URL("/dashboard/patient", req.url));
      default:
        return NextResponse.redirect(new URL("/auth", req.url));
    }
  }

  if (pathname.startsWith("/dashboard/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard/patient", req.url));
  }
  if (pathname.startsWith("/dashboard/patient") && role !== "PATIENT") {
    return NextResponse.redirect(new URL("/dashboard/admin", req.url));
  }
  if (pathname.startsWith("/dashboard/doctor") && role !== "DOCTOR") {
    return NextResponse.redirect(new URL("/dashboard/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
};