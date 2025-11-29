import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt_decode from "jwt-decode";

export function middleware(req: NextRequest) {
    const redirectTo = (path: string) => NextResponse.redirect(new URL(path, req.url));
    const token = req.cookies.get("access_token")?.value;

    const roleDashboardMap: Record<string, string> = {
        ADMIN: "/dashboard/admin",
        DOCTOR: "/dashboard/doctor",
        PATIENT: "/dashboard/patient",
    };

    if (!token) {
        // Non loggato → rimanda al login
        if (!req.nextUrl.pathname.startsWith("/login") && !req.nextUrl.pathname.startsWith("/register")) {
            return redirectTo("/login");
        }
        return NextResponse.next();
    }

    try {
        const decoded: any = jwt_decode(token);
        const role = decoded.role?.toUpperCase();

        if (!role || !roleDashboardMap[role]) {
            return redirectTo("/login"); // Ruolo non valido
        }

        // Smistamento dashboard
        if (req.nextUrl.pathname === "/dashboard") {
            return redirectTo(roleDashboardMap[role]);
        }

        // Protezione rotte dashboard
        if (req.nextUrl.pathname.startsWith("/dashboard") && !req.nextUrl.pathname.startsWith(roleDashboardMap[role])) {
            return redirectTo("/"); // Non autorizzato
        }

        return NextResponse.next();
    } catch {
        return redirectTo("/login"); // Token invalido
    }
}

export const config = {
    matcher: ["/dashboard/:path*", "/login", "/register"],
};