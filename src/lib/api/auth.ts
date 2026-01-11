import { api } from "./api";

export const login = async (email: string, password: string) => {
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    const response = await api.post("/auth/login", {
        email: cleanEmail,
        password: cleanPassword
    });

    return response.data;
};

export const register = async (userData: any) => {
    const { data } = await api.post("/users/create", userData);
    return data;
};

export const logout = async () => {
    await api.post("/auth/logout");
};