import { NextResponse, NextRequest } from "next/server";

function parseJwt(token: string) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(Buffer.from(payload, "base64").toString());
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("access_token")?.value;

  // Non autenticato → redirect login
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Solo dashboard deve essere protetta
  if (!pathname.startsWith("/dashboard")) return NextResponse.next();

  const payload = token ? parseJwt(token) : null;
  const role = payload?.role?.toLowerCase();

  // Se token invalido o senza role → login
  if (!role && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // /dashboard → redirect in base al ruolo
  if (pathname === "/dashboard") {
    if (role === "admin") return NextResponse.redirect(new URL("/dashboard/admin", req.url));
    if (role === "business") return NextResponse.redirect(new URL("/dashboard/business", req.url));
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Accesso errato: admin vs business
  if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard/business", req.url));
  }
  if (pathname.startsWith("/dashboard/business") && role !== "business") {
    return NextResponse.redirect(new URL("/dashboard/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
};