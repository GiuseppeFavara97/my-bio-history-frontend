import { api } from "./api";

export const login = async (email: string, password: string) => {
    const cleanEmail = email.trim();

    const response = await api.post("/auth/login", {
        username: cleanEmail, // Standard per Spring Security
        email: cleanEmail,    // Come specificato dall'utente
        password: password 
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
