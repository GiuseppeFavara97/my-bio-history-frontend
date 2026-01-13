import { UploadFile, UploadUpdatePayload } from "@/Types/Types";
import { api } from "./api";

const BASE_URL = "/uploads"; // api.ts ha già /api

export const getAllUploads = async () => {
    const { data } = await api.get("uploads");
    return data;
};

export const getUploadById = (id: number) =>
  api.get<UploadFile>(`${BASE_URL}/byId/${id}`).then(res => res.data);

export const updateUpload = (id: number, data: UploadUpdatePayload) =>
  api.patch<UploadFile>(`${BASE_URL}/update/${id}`, data).then(res => res.data);

export const softDeleteUpload = (id: number) =>
  api.patch<UploadFile>(`${BASE_URL}/softDelete/${id}`).then(res => res.data);

export const saveUploadWithFile = (file: File, patientId: number, name: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("patientId", patientId.toString());
  formData.append("name", name);

  return api.post<UploadFile>(`${BASE_URL}/upload`, formData).then(res => res.data);
};
