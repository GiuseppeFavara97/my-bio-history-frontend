import { User } from "@/Types/Types";
import { api } from "./api";

export const getUsers = async () => {
    const { data } = await api.get("users");
    return data;
};

export const getUserById = async (id: string) => {
    const { data } = await api.get(`users/${id}`);
    return data;
};

export const createUser = async (userData: any) => {
    const { data } = await api.post("users/create", userData);
    return data;
};

export const updateUser = async (id: number, userData: Partial<User>) => {
    const { data } = await api.patch(`users/update/${id}`, userData);
    return data;
};

export const softDelete = async (id: number) => {
    const { data } = await api.delete(`users/softDelete/${id}`);
    return data;
};
