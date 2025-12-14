import { api } from "./api";

export const login = async (email: string, password: string) => {
    // Assicura che email e password siano trimmate
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    const response = await api.post("/auth/login", {
        email: cleanEmail,
        password: cleanPassword
    });

    const { data } = response;
    console.log("[Auth] Login response:", data);
    console.log("[Auth] Response headers:", response.headers);
    console.log("[Auth] Set-Cookie header:", response.headers["set-cookie"]);

    // Se il backend restituisce il token nel body, salvalo in sessionStorage come fallback
    if (data?.token) {
        if (typeof window !== "undefined") {
            sessionStorage.setItem("auth_token", data.token);
            console.log("[Auth] Token salvato in sessionStorage:", data.token);
        }
    }

    return data; // backend imposta cookie HttpOnly, data contiene info utente (role, email)
};

export const register = async (userData: any) => {
    const { data } = await api.post("/users/create", userData);
    return data; // backend imposta eventualmente cookie login automatico
};

export const logout = async () => {
    await api.post("/auth/logout"); // cancella cookie HttpOnly
};

export const getCurrentUser = async (cookie?: string) => {
    // Allow passing cookie header when called from server (Next.js server components)
    const config = cookie ? { headers: { Cookie: cookie } } : undefined;
    const { data } = await api.get("/auth/me", config as any);
    return data; // ritorna info utente loggato
}