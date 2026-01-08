import { User } from "@/Types/Types";
import { api } from "./api";

export const getUsers = () => api.get("/users").then(res => res.data);
export const getUserById = (id: string) => api.get(`/users/${id}`).then(res => res.data);
export const createUser = (data: any) => api.post("/users/create", data).then(res => res.data);
export const updateUser = (id: number, data: Partial<User>) => api.patch(`/users/update/${id}`).then(res => res.data);
export const softDelete = (id: number) => api.delete(`/users/softDelete/${id}`).then(res => res.data);