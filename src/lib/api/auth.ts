import { api } from "./api";

export const login = async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", { email, password });
    console.log(data)
    return data; // backend imposta cookie HttpOnly, data contiene info utente (role, email)
};

export const register = async (userData: any) => {
    const { data } = await api.post("/users/create", userData);
    return data; // backend imposta eventualmente cookie login automatico
};

export const logout = async () => {
    await api.post("/auth/logout"); // cancella cookie HttpOnly
};