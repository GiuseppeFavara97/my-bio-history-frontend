import { api } from "./api";

export const getUsers = () => api.get("/users").then(res => res.data);
export const getUserById = (id: string) => api.get(`/users/${id}`).then(res => res.data);
export const createUser = (data: any) => api.post("/users/create", data).then(res => res.data);
export const updateUser = (id: string, data: any) => api.put(`/users/${id}`, data).then(res => res.data);
export const deleteUser = (id: string) => api.delete(`/users/${id}`).then(res => res.data);