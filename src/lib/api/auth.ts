import { api } from "./api";

export const login = async (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    const response = await api.post("/auth/login", {
        email: cleanEmail,
        password: cleanPassword
    });

    const { data } = response;

    return data;
};

export const register = async (userData: any) => {
    const { data } = await api.post("/users/create", userData);
    return data;
};

export const logout = async () => {
    await api.post("/auth/logout");
};

export const getCurrentUser = async (cookie?: string) => {
    const config = cookie ? { headers: { Cookie: cookie } } : undefined;
    const { data } = await api.get("/auth/me", config as any);
    return data;
}