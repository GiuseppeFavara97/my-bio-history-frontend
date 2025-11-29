import { NextResponse, NextRequest } from "next/server";
import jwt_decode from "jwt-decode";

const roleDashboardMap: Record<string, string> = {
    ADMIN: "/dashboard/admin",
    DOCTOR: "/dashboard/doctor",
    PATIENT: "/dashboard/patient",
};

export function middleware(req: NextRequest) {
    const redirectTo = (path: string) => NextResponse.redirect(new URL(path, req.url));
    const token = req.cookies.get("access_token")?.value;

    if (!token) {
        // Non loggato → rimanda al login
        if (!req.nextUrl.pathname.startsWith("/login") && !req.nextUrl.pathname.startsWith("/register")) {
            return redirectTo("/login");
        }
        return NextResponse.next();
    }

    let role: string | null = null;

    try {
        const decoded: any = jwt_decode(token);
        role = decoded.role?.toUpperCase() || null;
    } catch {
        return redirectTo("/login"); // Token invalido
    }

    // Ruolo non valido → login
    if (!role || !roleDashboardMap[role]) return redirectTo("/login");

    // Smistamento /dashboard principale
    if (req.nextUrl.pathname === "/dashboard") {
        return redirectTo(roleDashboardMap[role]);
    }

    // Protezione rotte specifiche dashboard
    const userDashboard = roleDashboardMap[role];
    if (req.nextUrl.pathname.startsWith("/dashboard") && !req.nextUrl.pathname.startsWith(userDashboard)) {
        return redirectTo(userDashboard); // reindirizza alla dashboard corretta del ruolo
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/dashboard", "/login", "/register"],
};