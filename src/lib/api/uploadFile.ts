import { UploadFile } from "../../../Types/Types";
import { api } from "./api";

export const getAllUploads= () => api.get("/uploads").then(res => res.data);
export const getUploadById = (id: number) => api.get(`/uploads/byId/${id}`).then(res => res.data);
export const createUpload = (data: FormData) => api.post("/uploads/create", data, { headers: {} }).then(res => res.data);
export const updateUpload = (id: number, data: Partial<UploadFile>) => api.patch(`/uploads/update/${id}`, data).then(res => res.data);
export const softDeleteUpload = (id: number) => api.delete(`/uploads/softDelete/${id}`).then(res => res.data);
export const saveUpload = (id: number) => api.get(`/uploads/create/test/${id}`, {responseType: 'blob'}).then(res => res.data);